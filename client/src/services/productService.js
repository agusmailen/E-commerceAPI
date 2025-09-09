const BASE_URL = "http://localhost:3000";

/**
 * Busca productos por nombre usando diferentes estrategias de búsqueda
 * @param {string} searchTerm - Término de búsqueda
 * @returns {Promise<Array>} - Lista de productos que coinciden con la búsqueda
 */
export async function searchProducts(searchTerm) {
  try {
    // Primero intentamos con el parámetro 'q' que hace búsqueda de texto completo
    let response = await fetch(`${BASE_URL}/productos?q=${encodeURIComponent(searchTerm)}`);
    
    if (!response.ok) {
      throw new Error('Error al buscar productos');
    }
    
    let products = await response.json();
    
    // Si no encontramos resultados con 'q', intentamos búsqueda manual
    if (products.length === 0) {
      // Obtenemos todos los productos y filtramos manualmente
      response = await fetch(`${BASE_URL}/productos`);
      if (!response.ok) {
        throw new Error('Error al obtener productos');
      }
      
      const allProducts = await response.json();
      
      // Filtrar productos que contengan el término de búsqueda en el nombre (case insensitive)
      products = allProducts.filter(product => 
        product.nombre && 
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return products;
  } catch (error) {
    console.error('Error en searchProducts:', error);
    throw error;
  }
}

/**
 * Obtiene todos los productos
 * @returns {Promise<Array>} - Lista de todos los productos
 */
export async function getAllProducts() {
  try {
    const response = await fetch(`${BASE_URL}/productos`);
    
    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }
    
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error en getAllProducts:', error);
    throw error;
  }
}

/**
 * Obtiene un producto por ID
 * @param {string|number} id - ID del producto
 * @returns {Promise<Object>} - Producto encontrado
 */
export async function getProductById(id) {
  try {
    const response = await fetch(`${BASE_URL}/productos/${id}`);
    
    if (!response.ok) {
      throw new Error('Producto no encontrado');
    }
    
    const product = await response.json();
    return product;
  } catch (error) {
    console.error('Error en getProductById:', error);
    throw error;
  }
}
