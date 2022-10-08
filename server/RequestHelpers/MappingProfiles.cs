using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using server.DTOS;
using server.Entities;

namespace server.RequestHelpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<CreateProductDTOS, Product>(); //from CreateProductDto to Product
            CreateMap<UpdateProductDTOS, Product>();
        }
    }
}