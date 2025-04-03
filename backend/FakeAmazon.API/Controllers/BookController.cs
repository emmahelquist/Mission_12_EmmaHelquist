using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FakeAmazon.API.Data;

namespace FakeAmazon.API.Controllers

{
    //Path 
    [Route("api/book")]
    [ApiController]
    
    // Constructor
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;

        public BookController(BookDbContext bookContext)
        {
            _bookContext = bookContext;
        }

        // Controller for loading all the books, includes pagination
        [HttpGet("AllBooks")]
        public IActionResult Get(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? Category = null)
        {   
            // Diff between list: built for queries
            var query = _bookContext.Books.AsQueryable();
            if (Category != null && Category.Any())
            {
                query = query.Where(b => Category.Contains(b.Category));
            }

             // Update this
            var totalNumBooks = query.Count();

            var books = query
                .Skip((pageNum - 1) * pageSize )
                .Take(pageSize)
                .ToList();
            

            var response = new
            {
                Books = books,
                Total = totalNumBooks
            };

            // Return the full object
            return Ok(response);

        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

                return Ok(bookTypes);
        }

        
    } 
}

