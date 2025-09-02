import './App.css';
import EcommerceContainer from './EcommerceContainer';
import { CarritoProvider } from './contexts/CarritoProvider';

function App() {
  return (
    <>
    <CarritoProvider>
        <EcommerceContainer />
    </CarritoProvider>
    </>
  );
}

export default App
