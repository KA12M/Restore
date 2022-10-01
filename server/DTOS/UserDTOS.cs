using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOS
{
    public class UserDTOS
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public BasketDTOS Basket { get; set; }
    }
}