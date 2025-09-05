import './styles.css';

const categorias = [
  { nombre: 'Todas', icono: '🧾' },
  { nombre: 'Tecnología', icono: '📱' },
  { nombre: 'Moda', icono: '👕' },
  { nombre: 'Deportes', icono: '⚽' },
  { nombre: 'Libros', icono: '📚' },
];

const Categorias = ({ categoriaSeleccionada, setCategoria }) => (
  <div className="categorias-container">
    <h3>Categorías</h3>
    <div className="categorias-list">
      {categorias.map(cat => (
        <button
          key={cat.nombre}
          className={`categoria-btn${categoriaSeleccionada === cat.nombre ? ' selected' : ''}`}
          onClick={() => setCategoria(cat.nombre)}
        >
          <div className="categoria-icon">{cat.icono}</div>
          <span>{cat.nombre}</span>
        </button>
      ))}
    </div>
  </div>
);

export default Categorias;