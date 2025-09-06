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
      <div class="product-list-card">
        <div class="product-list-image">
            <img src={imagen} alt="Producto" />
        </div>
        <div class="product-list-info">
          <h3 class="product-list-title">{nombre}</h3>
          <p class="product-list-description">{descripcion}</p>
          <div class="product-list-price-section">
            <div>
              <span class="product-list-price">{precio}</span>
            </div>
          </div>
          <div class="product-list-actions">
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