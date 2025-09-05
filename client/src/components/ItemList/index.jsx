import './styles.css';

const ItemList = ({item}) => {
  console.log(item);
  const {
    imagen,
    nombre,
    descripcion,
    precio,
    stock
  } = item;
  return (
      <div class="product-card">
        <div class="product-image">
            <img src={imagen} alt="Producto" />
        </div>
        <div class="product-info">
          <h3 class="product-title">{nombre}</h3>
          <p class="product-description">{descripcion}</p>
          <div class="product-price-section">
            <div>
              <span class="product-price">{precio}</span>
            </div>
          </div>
          <div class="product-actions">
            {
              stock > 0 ? 
                <button class="add-to-cart-btn">
                🛒 Agregar al Carrito
                </button> 
              : <button class="add-to-cart-btn out-of-stock-btn" disabled>
                  Sin stock
                </button>
            }
          </div>
        </div>
      </div>
  );
};

export default ItemList;