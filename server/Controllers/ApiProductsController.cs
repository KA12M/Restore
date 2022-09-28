using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Data;
using server.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.RequestHelpers;
using server.Extenstions;

namespace server.Controllers
{
    public class ApiProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        public ApiProductsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = _context.Products
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands, productParams.Types)
                .AsQueryable();
            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);
            //เพื่อส่งค่ำกำรแบ่งหน้ำไปให้ Axios Interceptor น ำไปใช้ต่อ
            Response.AddPaginationHeader(products.MetaData);
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            return Ok(product);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetFilters()
        {
            //อ่ำนค่ำที่ซ ้ำกันมำเพียงค่ำเดียว
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();
            return Ok(new { brands, types });
        }

    }
}