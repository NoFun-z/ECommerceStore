using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Product
    {

        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long Price { get; set; }
        public string PictureURL { get; set; }
        public string Type { get; set; }
        public string Brand { get; set; }
        public int QuantityInStock { get; set; }
        
        [NotMapped]
        public int[] Rating { get; set; }
        public string PublicID { get; set; }
        
        //Public property for rating average
        public double AverageRating
        {
            get
            {
                if (Rating == null || Rating.Length == 0)
                {
                    return 0;
                }
                return Rating.Average();
            }
        }
    }
}