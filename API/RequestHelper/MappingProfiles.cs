using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.RequestHelper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<CreateProductDTO, Product>();
            CreateMap<UpdateProductDTO, Product>();
            CreateMap<UpdateProductRatingDTO, Product>()
            .ForMember(dest => dest.AverageRating, opt => opt.MapFrom(src => src.AverageRating));
            CreateMap<UpdateProductDiscountDTO, Product>()
            .ForMember(dest => dest.Discount, opt => opt.MapFrom(src => src.Discount));
            CreateMap<CreateCommentDTO, Comment>();
        }
    }
}