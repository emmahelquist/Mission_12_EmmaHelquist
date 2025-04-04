import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useState } from 'react';
import WelcomeBand from '../components/WelcomeBand';

function DonatePage() {
  const navigate = useNavigate();
  const { title, bookID, bookAmount } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(0);

  // Convert to number safely (with fallback)
  const numericBookID = Number(bookID);
  const numericBookAmount = Number(bookAmount) || 0;

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: numericBookID,
      Title: title || 'No Project Found',
      bookAmount: numericBookAmount,
      quantity,
      totalPrice: numericBookAmount * quantity,
    };
    addToCart(newItem);
    navigate('/cart');
    console.log('Params:', { title, bookID, bookAmount });
  };

  return (
    <>
      <WelcomeBand />
      <h2>How many copies of {title} would you like to order?</h2>
      <p>Price per book: ${numericBookAmount.toFixed(2)}</p>
      <div>
        <input
          type="number"
          placeholder="Enter quantity amount"
          value={quantity}
          onChange={(x) => setQuantity(Number(x.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default DonatePage;
