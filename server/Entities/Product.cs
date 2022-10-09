
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Entities
{
    public class Product
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public string PictureUrl { get; set; } = string.Empty;
        public string Type { get; set; }
        public string Brand { get; set; }
        public int QuantityInStock { get; set; }

        public string PublicId { get; set; } = string.Empty;
    }
}