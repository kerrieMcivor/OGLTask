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
    <div className="product-page">
    <div className="back" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>↲ Return</div>
    <div className="product">
      <h3>{product.name}</h3>
      <div className="product-content">
        <div className="col mx-5">
          <img src={product.image} alt={product.name} id="productImg"/>
        </div>
        <div className="col" id="rightCol">
          <div className="product-details">
            <h4>{product.description}</h4>
            <h5 className="mt-3">{stock}</h5>
            <h5 className="mt-3">{product.price}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default Product;
