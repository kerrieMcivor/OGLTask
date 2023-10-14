import './Home.css';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import Slider from "@mui/material/Slider";

function Home() {
  const [products, setProducts] = useState([]);
  const [range, setRange] = useState([5, 100]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('sku');
  const [checkboxes, setCheckboxes] = useState([
    { id: 'glueGun', label: 'Glue Gun', checked: false },
    { id: 'handtools', label: 'Handtools', checked: false },
    { id: 'saws', label: 'Saws', checked: false },
    { id: 'drills', label: 'Drills', checked: false },
    { id: 'torches', label: 'Torches', checked: false },
    { id: 'sandpaper', label: 'Sandpaper', checked: false },
  ]);
  const navigate = useNavigate();

  const handleCheck = (checkboxId) => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === checkboxId
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  useEffect(() => {
    const selectedTypes = checkboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.id);

    if (selectedTypes.length === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        selectedTypes.includes(product.type)
      );
      setFilteredProducts(filtered);
    }
  }, [checkboxes, products]);

  useEffect(() => {
    fetch('https://kerriemcivor.co.uk/data_call.php')
      .then((response) => response.json())
      .then((result) => {
        setProducts(result.data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const openProduct = (sku) => {
    const product = products.find((p) => p.sku === sku);
    if (product) {
      navigate(`/product/${sku}`, { state: { product } });
    } else {
      console.error(`Product with SKU ${sku} not found.`);
    }
  };

  useEffect(() => {
    const selectedTypes = checkboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.id);
    const filteredByPrice = products.filter((product) => {
      const price = product.price;
      return price >= range[0] && price <= range[1];
    });
    const filtered = selectedTypes.length === 0 ? filteredByPrice : filteredByPrice.filter((product) => selectedTypes.includes(product.type));
    setFilteredProducts(filtered);
  }, [checkboxes, products, range]);

  useEffect(() => {
    let sortedFilteredProducts = [...filteredProducts];
    if (sortOrder === 'sku') {
      sortedFilteredProducts.sort((a, b) => a.sku - b.sku);
    } else if (sortOrder === 'price') {
      sortedFilteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'stock') {
      sortedFilteredProducts.sort((a, b) => a['stock-level'] - (b['stock-level']))
    }

    setFilteredProducts(sortedFilteredProducts);
  }, [sortOrder]);

  const handleChange = (event, newValue) => {
    setRange(newValue);
  };

  return (
    <div className="Home overflow-auto">
      <div className="col" id="filterSection">
      <div className="px-2 mx-2">
        <Dropdown className="mb-5">
        <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        Sort Order
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setSortOrder('sku')}>SKU</Dropdown.Item>
        <Dropdown.Item onClick={() => setSortOrder('price')}>Price</Dropdown.Item>
        <Dropdown.Item onClick={() => setSortOrder('stock')}>Stock</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </Dropdown>
        <h5 className="mb-2">Products:</h5>
        <Form>
          <Form.Check 
            type='checkbox'
            id='glueGun'
            label='Glue Guns'
            onClick={() => handleCheck('glueGun')}
            checked={checkboxes.find((checkbox) => checkbox.id === "glueGun").checked}
          />
          <Form.Check 
            type='checkbox'
            id='handtools'
            label='Handtools'
            onClick={() => handleCheck('handtools')}
            checked={checkboxes.find((checkbox) => checkbox.id === "handtools").checked}
          />
          <Form.Check 
            type='checkbox'
            id='saws'
            label='Saws'
            onClick={() => handleCheck('saws')}
            checked={checkboxes.find((checkbox) => checkbox.id === "saws").checked}
          />
          <Form.Check 
            type='checkbox'
            id='drills'
            label='Drills'
            onClick={() => handleCheck('drills')}
            checked={checkboxes.find((checkbox) => checkbox.id === "drills").checked}
          />
          <Form.Check 
            type='checkbox'
            id='torches'
            label='Torches'
            onClick={() => handleCheck('torches')}
            checked={checkboxes.find((checkbox) => checkbox.id === "torches").checked}
          />
          <Form.Check 
            type='checkbox'
            id='sandpaper'
            label='Sandpaper'
            onClick={() => handleCheck('sandpaper')}
            checked={checkboxes.find((checkbox) => checkbox.id === "sandpaper").checked}
          />
        </Form>
        <h5 className="mb-2 mt-5">Price Range:</h5>
        <Slider value={range} onChange={handleChange} valueLabelDisplay="auto"></Slider>
        </div>
      </div>
      <div className="col px-2" id="resultSection">
        <div className="row">
          {filteredProducts.map((product) => {
            let stock;
               if (product['stock-level'] > 0) {
                stock = product['stock-level'] + ' Available'
              } else {
                stock = "Out of Stock"
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
            <div className="col-md-4" key={product.sku} onClick={() => openProduct(product.sku)} style={{ cursor: 'pointer' }}>
              <div className="card mb-4 border-0">
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
    </div>
  );
}

export default Home;
