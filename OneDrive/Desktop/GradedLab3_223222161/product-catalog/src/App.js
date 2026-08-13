import {useState, useEffect} from 'react';
import './App.css';  

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {
      setProducts(data);
      setLoading(false);
    })
    .catch(() => {
      setError("Failed to load products");
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log("component mounted");
  }, []);

  useEffect(() => {
    console.log("Search query changed:", searchQuery);
  }, [searchQuery]);

  return ( 
    <>
      <h1>Product Catalog</h1>

      <input type='text' placeholder='Search products...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      <ul className="product-list">
        {products.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase())).map(product => (
          <li key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
 
export default ProductCatalog;