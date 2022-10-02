using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Entities.OrderAggregate;

namespace server.DTOS
{
    public class CreateOrderDTOS
    {
        public bool SaveAddress { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
    }
}