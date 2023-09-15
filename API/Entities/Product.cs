using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.IdentityModel.Tokens;

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
        private List<double> Rating { get; set; } = new List<double>();
        public string PublicID { get; set; }

        //Public property for rating average
        public double AverageRating
        {
            get
            {
                if (Rating == null || Rating.Count == 0)
                {
                    return 0;
                }
                return Rating.Average();
            }
            set
            {
                Rating.Add(value);
                if (Rating[0] == 0)
                {
                    Rating.RemoveAt(0);
                }
            }
        }
    }
}