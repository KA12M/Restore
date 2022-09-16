using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Entities;

namespace server.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set;}
        public DbSet<Basket> Baskets { get; set;}
        public DbSet<BasketItem> BasketItems { get; set;}
        
    }
}