import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useState } from 'react';
import WelcomeBand from '../components/WelcomeBand';

function DonatePage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      Title: title || 'No Project Found',
      Price: Number(price),
      quantity,
      totalPrice: price * quantity,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>How many copies of {title} would you like to order?</h2>
      <p>Price per book: ${price}</p>
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
