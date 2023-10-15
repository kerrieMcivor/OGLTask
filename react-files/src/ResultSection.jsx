// ResultSection.js
import React from 'react';

function ResultSection({ filteredProducts, openProduct }) {
  return (
    <div className="col px-2" id="results">
      <div className="row">
        {filteredProducts.map((product) => {
          let stock;
          if (product['stock-level'] > 0) {
            stock = product['stock-level'] + ' Available';
          } else {
            stock = "Out of Stock";
          }
          if (product.name.includes('Glue')) {
            product.type = "glueGun"
          } else if (product.name.includes('saw')) {
              product.type = "saws"
          } else if (product.name.includes('Drill')) {
             product.type = "drills"
          } else if (product.name.includes('Torch')) {
            product.type = "torches"
          } else if (product.name.includes('Hand Tool')) {
            product.type = "handtools"
          } else if (product.name.includes('Sandpaper')) {
            product.type = "sandpaper"
          }
          return (
            <div className="col-md-3" key={product.sku} onClick={() => openProduct(product.sku)} style={{ cursor: 'pointer' }}>
              <div className="card mb-1 border-0">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">{stock}</p>
                  <p className="card-text">£{product.price}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ResultSection;
