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
        public IActionResult Get(int pageSize = 5, int pageNum = 1)
        {
            var something = _bookContext.Books
                .Skip((pageNum - 1) * pageSize )
                .Take(pageSize)
                .ToList();
            
            var totalNumBooks = _bookContext.Books.Count();

            var someObject = new
            {
                Books = something,
                Total = totalNumBooks
            };

            // Return the full object
            return Ok(someObject);

        }
        
    } 
}

