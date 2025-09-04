import './styles.css';

const ItemList = ({title, description, price, image}) => {
  return (
      <div class="product-card">
        <div class="product-image">
            <img src={image} alt="Producto" />
        </div>
        <div class="product-info">
          <h3 class="product-title">{title}</h3>
          <p class="product-description">{description}</p>
          <div class="product-price-section">
            <div>
              <span class="product-price">{price}</span>
            </div>
          </div>
          <div class="product-actions">
            <button class="add-to-cart-btn" data-id="${product.id}">
              🛒 Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
  );
};

export default ItemList;