using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpdateProductRatingDTO
    {
        public int ID { get; set; }
        public double AverageRating { get; set; }
    }
}