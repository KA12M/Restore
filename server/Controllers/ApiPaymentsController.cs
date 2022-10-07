using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOS;
using server.Entities.OrderAggregate;
using server.Extenstions;
using server.services;
using Stripe;

namespace server.Controllers
{
    public class ApiPaymentsController : BaseApiController
    {
        private readonly PaymentService _paymentService;
        private readonly StoreContext _context;
        private readonly IConfiguration _config;
        public ApiPaymentsController(PaymentService paymentService, StoreContext context, IConfiguration configuration)
        {
            _context = context;
            _config = configuration;
            _paymentService = paymentService;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BasketDTOS>> CreateOrUpdatePaymentIntent()
        {
            var basket = await _context.Baskets.RetrieveBasketWithItems(User.Identity.Name).FirstOrDefaultAsync();
            if (basket == null) return NotFound();
            var intent = await _paymentService.CreateOrUpdatePaymentIntent(basket);

            if (intent == null) return BadRequest(new ProblemDetails
            {
                Title = "Problem creating payment intent"
            });

            if (!string.IsNullOrEmpty(intent.Id))
            {
                basket.PaymentIntentId = intent.Id;
                basket.ClientSecret = intent.ClientSecret;
            }
            _context.Update(basket);

            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return BadRequest(new ProblemDetails
            {
                Title = "Problem updating basket with intent"
            });
            return basket.MapBasketToDto();
        }

        [HttpPost("webhook")] //ใช้ตามเขาไป
        public async Task<ActionResult> StripeWebhook()
        {
            #region รับค่าเข้ามาจาก Webhook และได้รับออกเจค
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"],
            _config["StripeSettings:WhSecret"], throwOnApiVersionMismatch: false);
            var charge = (Charge)stripeEvent.Data.Object;
            #endregion
            
            //ค้นหา order ตาม PaymentIntentId
            var order = await _context.Orders.FirstOrDefaultAsync(x =>
            x.PaymentIntentId == charge.PaymentIntentId);
            //เปลี่ยน OrderStatus ตามเหตุการณ์ที่ได้รับมา
            if (charge.Status == "succeeded") order.OrderStatus = OrderStatus.PaymentReceived;
            await _context.SaveChangesAsync();
            return new EmptyResult();
        }

    }
}