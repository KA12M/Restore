using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using server.Entities;

namespace server.services
{
    public class TokenService
    {
        private readonly UserManager<User> userManager;
        private readonly IConfiguration config;
        public TokenService(UserManager<User> userManager, IConfiguration config)
        {
            this.config = config;
            this.userManager = userManager;
        }

        public async Task<string> GenerateToken(User user)
        {
            var claims = await GenClaims(user);

            //อ่านค่ารหัสลับ และก าหนดอัลกอริทึมการเข้ารหัส
            var key = new
            SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWTSettings:TokenKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
            //รวบรวมค่าต่างๆ ส าหรับบรรจุไว้ใน container Token 
            var tokenOptions = new JwtSecurityToken
            (
                issuer: null,
                audience: null,
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );
            //สร้าง Token
            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

        private async Task<List<Claim>> GenClaims(User user)
        {
            //Claim คือข้อมูลที่เราต้องการน ามาเก็บไว้ในตั๋ว ส าหรับใช้ยืนยันตัวตน
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.UserName)
            };
            var roles = await userManager.GetRolesAsync(user);
            //กรณีมีหลาย roles
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            return claims;
        }
        
    }
}