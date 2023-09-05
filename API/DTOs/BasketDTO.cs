namespace API.DTOs
{
    public class BasketDTO
    {
        public int ID { get; set; }
        public string BuyerID { get; set; }
        public List<BasketItemDTO> Items { get; set; }

        //Payment Fields
        public string PaymentIntentID { get; set; }
        public string ClientSecret { get; set; }
    }
}