using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOS
{
    public class RegisterDTOS
    {
        public string Username {get; set;}
        public string Email {get; set;}
        public string Password { get; set; }
    }
}