using Microsoft.EntityFrameworkCore;

namespace FakeAmazon.API.Data;

public class BookDbContext : DbContext
{
    public BookDbContext(DbContextOptions options) : base(options)
    {
    }

    //Table name
    public DbSet<Book> Books { get; set; }
}