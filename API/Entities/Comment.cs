
namespace API.Entities
{
    public class Comment
    {
        public int ID {get; set;}
        public int productID {get; set;}
        public string buyerID {get; set;}
        public string Title {get; set;}
        public string Text {get; set;}
        public double Rating {get; set;}
        public DateTime DatePosted {get; set;} = DateTime.UtcNow;
    }
}