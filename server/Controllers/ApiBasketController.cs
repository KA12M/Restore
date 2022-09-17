using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Data;
using server.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.DTOS;

namespace server.Controllers
{
    public class ApiBasketController : BaseApiController
    {
        private readonly StoreContext context;
        public ApiBasketController(StoreContext context)
        {
            this.context = context;
        }
 
        [HttpGet("[action]", Name = "GetBasket")]
        public async Task<ActionResult<BasketDTOS>> GetBasket()
        {
            var basket = await RetrieveBasket();
            if (basket is null) return NotFound();

            return Ok(MapBasketToDTOS(basket));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<BasketDTOS>> AddItemToBasket(int productId, int quantity)
        {
            //ขั้นตอนกำรเพิ่มสินค้ำเข้ำตะกร้ำ
            //get basket
            //get product
            //add item
            //save changes
            var basket = await RetrieveBasket();
            if (basket == null) basket = CreateBasket();

            var product = await context.Products.FindAsync(productId);
            if (product == null) return NotFound();
            
            basket.AddItem(product, quantity);
            var result = await context.SaveChangesAsync() > 0;
            //Redirect to Route
            if (result) return CreatedAtRoute("GetBasket", MapBasketToDTOS(basket));
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }

        [HttpDelete("[action]")]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            basket.RemoveItem(productId, quantity);
            var result = await context.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem removing item from thebasket" });
        }

        private BasketDTOS MapBasketToDTOS(Basket basket) =>
            new BasketDTOS
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDTOS
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };

        private async Task<Basket> RetrieveBasket() =>
            await context.Baskets
                .Include(i => i.Items)
                    .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();

            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            var basket = new Basket { BuyerId = buyerId };

            context.Baskets.Add(basket);
            return basket;
        }

    }
}