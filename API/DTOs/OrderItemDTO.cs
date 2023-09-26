namespace API.DTOs
{
    public class OrderItemDTO
    {

        public int ProductID { get; set; }
        public string Name { get; set; }
        public string PictureURL { get; set; }
        public long Price { get; set; }
        public int Quantity { get; set; }
    }
}