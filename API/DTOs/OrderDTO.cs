using API.Entities.OrderAggregate;

namespace API.DTOs
{
    public class OrderDTO
    {
        public int ID { get; set; }
        public string BuyerID { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
        public DateTime OrderDate { get; set; }
        public List<OrderItemDTO> OrderItems { get; set; }
        public long Subtotal { get; set; }
        public long DeliveryFee { get; set; }
        public string OrderStatus { get; set; }
        public long Total { get; set; }
    }
}