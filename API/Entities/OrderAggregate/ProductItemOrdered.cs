using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderAggregate
{
    [Owned]
    public class ProductItemOrdered
    {
        public int ProductID { get; set; }
        public string Name { get; set; }
        public string PictureURL { get; set; }
    }
}