using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.DTOS;
using server.Entities;

namespace server.Extenstions
{
    public static class BasketExtensions
    {
        public static BasketDTOS MapBasketToDto(this Basket basket)
        {
            return new BasketDTOS
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
        }

        public static IQueryable<Basket> RetrieveBasketWithItems(this IQueryable<Basket> query,
        string buyerId)
        {
            return query.Include(i => i.Items).ThenInclude(p => p.Product).Where(b => b.BuyerId == buyerId);
        }
    }
}