import './App.css'
import Item from './components/Item'
import Button from './components/Button'

function App() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }} className="container-app" >
        <Item
          name="Producto uno"
          price={199.99}
        >
          <Button />
        </Item>
        <Item
          name="Producto dos"
          price={199.99}
        >
          <Button />
        </Item>
        <Item
          name="Producto tres"
          price={220}
        >
          <Button />
        </Item>
        <Item
          name="Producto cuatro"
          price={100}
        >
          <Button />
        </Item>
      </div>
    </>
  );
}

export default App
