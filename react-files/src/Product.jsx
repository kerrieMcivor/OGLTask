import './Product.css';
import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';


function Product() {
  const navigate = useNavigate()
  const { sku } = useParams();
  const location = useLocation();
  const product = location.state && location.state.product;
  let stock;
  if (!product) {
    return <div>Product details not available.</div>;
  }
  if (product['stock-level'] > 0) {
    stock = "In Stock"
  } else {
    stock = "Out of Stock"
  }

  return (
    <div>
    <div className="back" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>↲ Return </div>
    <div className="product">
      <h2>Product Details</h2>
    <div className="col">
      <img src={product.image_url}  alt={product.name} />
    </div>
    <div className="col">
    <div className="Product">
      <h5>{product.name}</h5>
      <p>{product.description}</p>
      <p>{stock}</p>
      <p>{product.price}</p>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Product;
