using System.Reflection.Metadata;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelper;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;

        public ProductsController(StoreContext context, IMapper mapper, ImageService imageService)
        {
            _imageService = imageService;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();

            return Ok(products);
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = _context.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands, productParams.Types)
            .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query,
             productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);


            return products;
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDTO productDTO)
        {
            var product = _mapper.Map<Product>(productDTO);

            if (productDTO.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(productDTO.File);

                if (imageResult.Error != null)
                {
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
                }

                product.PictureURL = imageResult.SecureUrl.ToString();
                product.PublicID = imageResult.PublicId;
            }

            _context.Products.Add(product);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetProduct", new { Id = product.ID }, product);

            return BadRequest(new ProblemDetails { Title = "Problem creating new product" });
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Product>> UpdateProduct([FromForm] UpdateProductDTO productDTO)
        {
            var product = await _context.Products.FindAsync(productDTO.ID);

            if (product == null) return NotFound();

            _mapper.Map(productDTO, product);

            if (productDTO.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(productDTO.File);

                if (imageResult.Error != null)
                {
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
                }

                if (!string.IsNullOrEmpty(product.PublicID)) await _imageService.DeleteImageAsync(product.PublicID);

                product.PictureURL = imageResult.SecureUrl.ToString();
                product.PublicID = imageResult.PublicId;
            }


            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(product);

            return BadRequest(new ProblemDetails { Title = "Problem updating product" });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            if (!string.IsNullOrEmpty(product.PublicID)) await _imageService.DeleteImageAsync(product.PublicID);

            _context.Products.Remove(product);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting product" });
        }

        [Authorize]
        [HttpPut("ratings")]
        public async Task<ActionResult<Product>> UpdateProductRating([FromForm] UpdateProductRatingDTO productDTO)
        {
            var product = await _context.Products.FindAsync(productDTO.ID);

            if (product == null) return NotFound();

            _mapper.Map(productDTO, product);

            _context.Entry(product).Property(p => p.AverageRating).IsModified = true;

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(product);

            return BadRequest(new ProblemDetails { Title = "Problem updating product rating" });
        }

        [HttpPut("discount")]
        public async Task<ActionResult<Product>> UpdateProductDiscount([FromForm] UpdateProductDiscountDTO productDTO)
        {
            var product = await _context.Products.FindAsync(productDTO.ID);

            if (product == null) return NotFound();

            _mapper.Map(productDTO, product);

            await _context.Database
            .ExecuteSqlInterpolatedAsync($@"
                UPDATE Products
                SET Discount = 0
                WHERE ID != {productDTO.ID}");

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(product);

            return BadRequest(new ProblemDetails { Title = "Problem updating product discount" });
        }

        [HttpGet("comments/all")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetAllComments()
        {
            var comments = await _context.Comments.ToListAsync();

            return Ok(comments);
        }

        [HttpGet("comments", Name = "GetComment")]
        public async Task<ActionResult<PagedList<Comment>>> GetComments([FromQuery] ProductCommentParams productCommentParams)
        {
            var query = _context.Comments
            .FilterComment(productCommentParams.ProductID)
            .AsQueryable();

            var comments = await PagedList<Comment>.ToPagedList(query,
             productCommentParams.PageNumber, productCommentParams.PageSize);

            Response.AddPaginationHeader(comments.MetaData);


            return comments;
        }

        [Authorize]
        [HttpPost("comments")]
        public async Task<ActionResult<Comment>> CreateComment([FromForm] CreateCommentDTO commentDTO)
        {
            var comment = _mapper.Map<Comment>(commentDTO);

            _context.Comments.Add(comment);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetComment", new { Id = comment.ID }, comment);

            return BadRequest(new ProblemDetails { Title = "Problem creating new Comment" });
        }
    }
}