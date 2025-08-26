import { useState } from 'react';

function Button() {
	const [added, setAdded] = useState(false);

	const handleClick = () => {
		setAdded(prev => !prev);
	};

	return (
		<button style={{ marginTop: '10px' }} onClick={handleClick}>
			{added ? 'Eliminar del carrito' : 'Agregar al carrito'}
		</button>
	);
}

export default Button;
