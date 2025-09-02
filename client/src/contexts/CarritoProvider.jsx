import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
	const [carrito, setCarrito] = useState([]);

	// Agrega un producto al carrito
	const agregarProducto = (producto) => {
		setCarrito((prev) => [...prev, producto]);
	};

	// Puedes agregar más funciones aquí (eliminar, vaciar, etc.)

	return (
		<CarritoContext.Provider value={{ carrito, agregarProducto }}>
			{children}
		</CarritoContext.Provider>
	);
};

// Hook para consumir el contexto desde cualquier componente
export const useCarrito = () => useContext(CarritoContext);
