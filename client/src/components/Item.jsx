import { useState, children } from 'react';

function Item({ name, price }) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(q => q + 1);
  const handleDecrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  return (
    <div className="cart-item">
      <h3>{name}</h3>
      <p>Precio: ${price}</p>
      <div>
        <button onClick={handleDecrease}>-</button>
        <span style={{ margin: '10px 10px' }}>{quantity}</span>
        <button onClick={handleIncrease}>+</button>
      </div>
      {children}
    </div>
  );
}

export default Item;