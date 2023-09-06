using System.ComponentModel.DataAnnotations;

namespace API.Entities.OrderAggregate
{
    public class Order
    {
        public int ID { get; set; }
        public string BuyerID { get; set; }

        [Required]
        public ShippingAddress ShippingAddress { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public List<OrderItem> OrderItems { get; set; }
        public long Subtotal { get; set; }
        public long DeliveryFee { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public string PaymentIntentID { get; set; }

        public long GetTotal()
        {
            return Subtotal + (Subtotal / 100 * 15) + DeliveryFee;
        }
    }
}