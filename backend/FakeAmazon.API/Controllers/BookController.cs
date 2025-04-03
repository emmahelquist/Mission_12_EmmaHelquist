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

        [HttpPost("AddBook")]
        // Add a new book
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        // Update book
        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook) {
            var existingBook = _bookContext.Books.Find(bookID);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Author;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();

            return Ok(existingBook);
        }

        // Delete
        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            var book = _bookContext.Books.Find(bookID);

            if (book == null)
            {
                return NotFound(new {message="Book not found"});
            }

            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();

            return NoContent();
        }

        
    } 
}

