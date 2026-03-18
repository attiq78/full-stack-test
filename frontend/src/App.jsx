import './index.css';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>🛍️ Marketplace</h1>
        <p>Browse our collection of products</p>
      </header>
      <main>
        <ProductList />
      </main>
    </div>
  );
}

export default App;
