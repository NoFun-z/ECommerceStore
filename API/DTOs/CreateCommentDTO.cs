namespace API.DTOs
{
    public class CreateCommentDTO
    {
        public int ProductID { get; set; }
        public string BuyerID { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public double Rating { get; set; }
    }
}