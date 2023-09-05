using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class BasketExtensions
    {
        //Mapping basket to basketDTO
        public static BasketDTO MapBasketToDTO(this Basket basket)
        {
            return new BasketDTO
            {
                ID = basket.ID,
                BuyerID = basket.BuyerID,
                PaymentIntentID = basket.PaymentIntentID,
                ClientSecret = basket.ClientSecret,
                Items = basket.Items.Select(item => new BasketItemDTO
                {
                    ProductID = item.ProductID,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureURL = item.Product.PictureURL,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }

        //Retrieve Basket function
        public static IQueryable<Basket> RetrieveBasketWithItems(this IQueryable<Basket> query, string buyerID)
        {
            return query.Include(i => i.Items).ThenInclude(i => i.Product).Where(b => b.BuyerID == buyerID);
        }
    }
}