import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Saws() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://kerriemcivor.co.uk/data_call.php')
      .then((response) => response.json())
      .then((result) => {
        const filteredProducts = result.data.data.filter((product) =>
          product.name.includes('saw')
        );
        setFilteredProducts(filteredProducts);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const openProduct = (sku) => {
    const product = filteredProducts.find((p) => p.sku === sku);
    console.log(product);
    if (product) {
      navigate(`/product/${sku}`, { state: { product } });
    } else {
      console.error(`Product with SKU ${sku} not found.`);
    }
  };

  return (
    <div>
      <div className="row overflow-auto">
        {filteredProducts.map((product) => (
          <div className="col-md-2" key={product.sku} onClick={() => openProduct(product.sku)} style={{ cursor: 'pointer' }}>
            <div className="card mb-2 border-0">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  {product['stock-level'] > 0 ? `${product['stock-level']} Available` : "Out of Stock"}
                </p>
                <p className="card-text">£{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Saws;
