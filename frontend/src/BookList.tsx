import { useEffect, useState } from 'react';
import { Book } from './types/book';

function BookList() {
  // Stuff I need
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sorted, setSorted] = useState(false);

  // Don't overload the server, add pagination
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/api/book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.total);
      setTotalPages(Math.ceil(data.total / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum]);

  // Function to sort books by name
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortBooksByName = () => {
    const sortedBooks = [...books].sort((a, b) =>
      sortDirection === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
    setBooks(sortedBooks);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); // Toggle sort direction
  };

  // HTML structure
  return (
    <>
      <h1>Books</h1>
      <br />
      <h4>Made by Emma Helquist</h4>
      <br />
      <button onClick={sortBooksByName} disabled={sorted}>
        Sort by Book Name
      </button>
      <br />
      <br />
      {books.map((b) => (
        <div key={b.bookID} id="projectCard" className="card">
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong> {b.author}
              </li>
              <li>
                <strong>Publisher: </strong> {b.publisher}
              </li>
              <li>
                <strong>ISBN: </strong> {b.isbn}
              </li>
              <li>
                <strong>Classification: </strong> {b.classification}
              </li>
              <li>
                <strong>Category: </strong> {b.category}
              </li>
              <li>
                <strong>Page Count: </strong> {b.pageCount}
              </li>
              <li>
                <strong>Price: </strong> ${b.price}
              </li>
            </ul>
          </div>
        </div>
      ))}

      {/* Button Structure */}
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
