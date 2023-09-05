using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "Member1A",
                    Email = "MemberA1RT@gmail.com"
                };

                var result = await userManager.CreateAsync(user, "Pa$$w0rd");

                if (result.Succeeded)
                {
                    // Update the security stamp
                    await userManager.UpdateSecurityStampAsync(user);
                    await userManager.AddToRoleAsync(user, "Member");
                }

                var admin = new User
                {
                    UserName = "AdminART",
                    Email = "AdminArt@gmail.com"
                };

                var result2 = await userManager.CreateAsync(admin, "Pa$$w0rd");

                if (result2.Succeeded)
                {
                    // Update the security stamp
                    await userManager.UpdateSecurityStampAsync(admin);
                    await userManager.AddToRolesAsync(admin, new[] { "Member", "Admin" });
                }
            }

            if (context.Products.Any()) return;

            var products = new List<Product>{
                new Product
                {
                    Name = "Angular Speedster Board 2000",
                    Description =
                        "Unleash the Angular Speedster Board 2000: where technology meets thrill. Glide with precision and style, conquering every curve with finesse. Experience the future of riding today.",
                    Price = 20000,
                    PictureURL = "/images/products/sb-ang1.png",
                    Brand = "Angular",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Green Angular Board 3000",
                    Description = "Experience the thrill of speed and style with the Green Angular Board 3000. This high-performance board is designed for agile maneuvers and rapid rides. Whether you're a seasoned rider or a beginner, this board is perfect for carving up the streets with confidence.",
                    Price = 15000,
                    PictureURL = "/images/products/sb-ang2.png",
                    Brand = "Angular",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Core Board Speed Rush 3",
                    Description = "Step up your game with the Core Board Speed Rush 3. This board is your ticket to an exhilarating experience on the streets. Its agile design and superior control make it ideal for racing through urban environments. Get ready to embrace the rush of speed like never before.",
                    Price = 18000,
                    PictureURL = "/images/products/sb-core1.png",
                    Brand = "NetCore",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Net Core Super Board",
                    Description = "Elevate your riding experience with the Net Core Super Board. With its cutting-edge technology and sleek design, this board offers unparalleled performance. Whether you're a seasoned pro or a beginner, the Net Core Super Board will take your skills to the next level.",
                    Price = 30000,
                    PictureURL = "/images/products/sb-core2.png",
                    Brand = "NetCore",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "React Board Super Whizzy Fast",
                    Description = "Experience the thrill of speed and agility with the React Board Super Whizzy Fast. Designed for maximum control and maneuverability, this board is perfect for riders seeking an adrenaline-packed adventure. Get ready to carve up the streets in style!",
                    Price = 25000,
                    PictureURL = "/images/products/sb-react1.png",
                    Brand = "React",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Typescript Entry Board",
                    Description = "Embark on your journey with the Typescript Entry Board. Whether you're a coding enthusiast or a tech-savvy explorer, this board is your ultimate companion. Designed for comfort and performance, it's time to hit the streets and embrace the world of innovation.",
                    Price = 12000,
                    PictureURL = "/images/products/sb-ts1.png",
                    Brand = "TypeScript",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Core Blue Hat",
                    Description = "Elevate your style with the Core Blue Hat. Designed for comfort and fashion, this hat is perfect for any occasion. Whether you're hitting the streets or attending a special event, the Core Blue Hat adds a touch of sophistication to your look.",
                    Price = 1000,
                    PictureURL = "/images/products/hat-core1.png",
                    Brand = "NetCore",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Green React Woolen Hat",
                    Description = "Stay cozy and stylish with the Green React Woolen Hat. Crafted with the finest materials, this hat provides warmth without compromising on fashion. Perfect for chilly days or adding a trendy accessory to your outfit.",
                    Price = 8000,
                    PictureURL = "/images/products/hat-react1.png",
                    Brand = "React",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Purple React Woolen Hat",
                    Description = "Make a statement with the Purple React Woolen Hat. Designed for those who love to stand out, this hat combines comfort and flair. Whether you're exploring the city or heading out with friends, this hat adds a pop of color to your look.",
                    Price = 1500,
                    PictureURL = "/images/products/hat-react2.png",
                    Brand = "React",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Blue Code Gloves",
                    Description = "Stay connected and keep your hands warm with the Blue Code Gloves. Designed for tech-savvy individuals, these gloves provide functionality and style. Whether you're typing away or braving the cold, the Blue Code Gloves have got you covered.",
                    Price = 1800,
                    PictureURL = "/images/products/glove-code1.png",
                    Brand = "VS Code",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Green Code Gloves",
                    Description = "Enhance your coding experience with the Green Code Gloves. Designed for comfort and precision, these gloves are a must-have for developers on the go. Whether you're debugging code or working on a project, the Green Code Gloves keep you in control.",
                    Price = 1500,
                    PictureURL = "/images/products/glove-code2.png",
                    Brand = "VS Code",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Purple React Gloves",
                    Description = "Elevate your style with the Purple React Gloves. Designed for comfort and fashion, these gloves are perfect for any season. Whether you're typing away or exploring the outdoors, the Purple React Gloves offer a blend of functionality and elegance.",
                    Price = 1600,
                    PictureURL = "/images/products/glove-react1.png",
                    Brand = "React",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Green React Gloves",
                    Description = "Stay connected and stylish with the Green React Gloves. Crafted with precision and care, these gloves provide a snug fit for your hands. Whether you're coding or on the move, the Green React Gloves keep you comfortable and ready for action.",
                    Price = 1400,
                    PictureURL = "/images/products/glove-react2.png",
                    Brand = "React",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Redis Red Boots",
                    Description = "Step up your footwear game with the Redis Red Boots. Combining comfort and durability, these boots are designed for both style and adventure. Whether you're hitting the trails or strolling through the city, Redis Red Boots are your go-to choice.",
                    Price = 25000,
                    PictureURL = "/images/products/boot-redis1.png",
                    Brand = "Redis",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Core Red Boots",
                    Description = "Experience comfort and sophistication with the Core Red Boots. Crafted with the finest materials, these boots are designed to make a statement. Whether you're attending an event or stepping out for a casual day, Core Red Boots elevate your look.",
                    Price = 18999,
                    PictureURL = "/images/products/boot-core2.png",
                    Brand = "NetCore",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Core Purple Boots",
                    Description = "Make a bold impression with the Core Purple Boots. Created for those who love to stand out, these boots combine functionality and style seamlessly. Whether you're exploring new horizons or enjoying your everyday routine, Core Purple Boots are your perfect companion.",
                    Price = 19999,
                    PictureURL = "/images/products/boot-core1.png",
                    Brand = "NetCore",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Angular Purple Boots",
                    Description = "Experience the allure of the Angular Purple Boots. Crafted to blend style and comfort, these boots are perfect for any occasion. Whether you're exploring the city streets or stepping out for an adventure, the Angular Purple Boots complement your unique sense of fashion.",
                    Price = 15000,
                    PictureURL = "/images/products/boot-ang2.png",
                    Brand = "Angular",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Angular Blue Boots",
                    Description = "Elevate your footwear collection with the Angular Blue Boots. Designed for those who appreciate quality and aesthetics, these boots provide a harmonious balance between form and function. From urban exploration to outdoor escapades, the Angular Blue Boots are your perfect companion.",
                    Price = 18000,
                    PictureURL = "/images/products/boot-ang1.png",
                    Brand = "Angular",
                    Type = "Boots",
                    QuantityInStock = 100
                }
            };

            foreach (var item in products)
            {
                context.Products.Add(item);
            }

            context.SaveChanges();
        }
    }
}