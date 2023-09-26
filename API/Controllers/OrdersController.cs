using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly StoreContext _context;

        public OrdersController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDTO>>> GetOrders()
        {
            return await _context.Orders
            .ProjectOrderToOrderDTO()
            .Where(x => x.BuyerID == User.Identity.Name)
            .ToListAsync();
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDTO>> GetOrder(int id)
        {
            return await _context.Orders
            .ProjectOrderToOrderDTO()
            .Where(x => x.BuyerID == User.Identity.Name && x.ID == id)
            .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder(CreateOrderDTO orderDTO)
        {
            var basket = await _context.Baskets
            .RetrieveBasketWithItems(User.Identity.Name)
            .FirstOrDefaultAsync();

            if (basket == null) return BadRequest(new ProblemDetails { Title = "Could not locate basket" });

            var items = new List<OrderItem>();

            foreach (var item in basket.Items)
            {
                var productItem = await _context.Products.FindAsync(item.ProductID);
                var itemOrdered = new ProductItemOrdered
                {
                    ProductID = productItem.ID,
                    Name = productItem.Name,
                    PictureURL = productItem.PictureURL
                };
                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Price = productItem.Price,
                    Quantity = item.Quantity,
                    Discount = productItem.Discount
                };
                items.Add(orderItem);
                productItem.QuantityInStock -= item.Quantity;
            }

            var Subtotal = items.Sum(item => (item.Price - item.Discount + (item.Price / 100 * 15)) * item.Quantity);
            var deliveryfee = Subtotal > 10000 ? 0 : 500;

            var order = new Order
            {
                OrderItems = items,
                BuyerID = User.Identity.Name,
                ShippingAddress = orderDTO.ShippingAddress,
                Subtotal = Subtotal,
                DeliveryFee = deliveryfee,
                PaymentIntentID = basket.PaymentIntentID
            };

            _context.Orders.Add(order);
            _context.Baskets.Remove(basket);

            if (orderDTO.SaveAddress)
            {
                var user = await _context.Users.Include(u => u.Address).FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);
                var address = new UserAddress
                {
                    FullName = orderDTO.ShippingAddress.FullName,
                    Address1 = orderDTO.ShippingAddress.Address1,
                    Address2 = orderDTO.ShippingAddress.Address2,
                    City = orderDTO.ShippingAddress.City,
                    State = orderDTO.ShippingAddress.State,
                    Zip = orderDTO.ShippingAddress.Zip,
                    Country = orderDTO.ShippingAddress.Country,
                };
                user.Address = address;
                //_context.Update(user);
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetOrder", new { id = order.ID }, order.ID);

            return BadRequest("Problem creating order");
        }
    }
}