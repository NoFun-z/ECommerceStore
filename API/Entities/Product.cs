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
        public long Discount { get; set; } = 0;
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
                if (Rating.Count > 1 && Rating[0] == 0)
                {
                    // Skip the first item (0) and calculate the average of the rest
                    return Rating.Skip(1).Average();
                }
                else
                {
                    return Rating.Average();
                }
            }
            set
            {
                Rating.Add(value);
            }
        }

    }
}