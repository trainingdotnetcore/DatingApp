using System;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<User> Login(string userName, string password)
        {
        
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == userName);
            if(user == null)
                return null;
            if(!VerifyUserPasswordHash(password,user.PasswordHash,user.PasswordSalt))
                return null;
            return user;
        }

        private bool VerifyUserPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
           using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
           {
            
            var passwordHashComputed =hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));  
            for(int i=0;i<passwordHashComputed.Length;i++)
            {
               if(passwordHashComputed[i] != passwordHash[i])
                return false;
            }
            return true;
           }
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash,passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            user.PasswordHash =passwordHash;
            user.PasswordSalt =passwordSalt;

            await _context.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
           using (var hmac = new System.Security.Cryptography.HMACSHA512())
           {
            passwordSalt = hmac.Key;
            passwordHash =hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));   
           }
        }

        public async Task<bool> UserExists(string userName)
        {
           if(await _context.Users.AnyAsync(x => x.Username == userName))
                return true;
            
            return false;  
        }
    }
}