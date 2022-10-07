using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOS
{
    public class BasketDTOS
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItemDTOS> Items { get; set; }

        public string PaymentIntentId { get; set; }
        public string ClientSecret { get; set; }
    }
}