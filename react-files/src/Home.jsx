import './Home.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterSection from './Filters.jsx';
import ResultSection from './ResultSection.jsx';

function Home() {
  const [products, setProducts] = useState([]);
  const [range, setRange] = useState([5, 100]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('sku');
  const [searchValue, setSearchValue] = useState('')
  const [checkboxes, setCheckboxes] = useState([
    { id: 'glueGun', label: 'Glue Gun', checked: false },
    { id: 'handtools', label: 'Handtools', checked: false },
    { id: 'saws', label: 'Saws', checked: false },
    { id: 'drills', label: 'Drills', checked: false },
    { id: 'torches', label: 'Torches', checked: false },
    { id: 'sandpaper', label: 'Sandpaper', checked: false },
  ]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  } 

  const handleCheck = (checkboxId) => {
    setCheckboxes((prevCheckboxes) => 
      prevCheckboxes.map((checkbox) =>
        checkbox.id === checkboxId
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    )
  };

  useEffect(() => {
    const selectedTypes = checkboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.id);
    if (selectedTypes.length === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>  { 
        selectedTypes.includes(product.type)}
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
    const query = searchValue.toLowerCase()
    if (query === '') {
      setFilteredProducts([...products]);
    } else if (query.length > 2) {
      const searchResults = products.filter((product) => {
        const description = product.description.toLowerCase();
        const name = product.name.toLowerCase();
        return name.includes(query) || description.includes(query);
      });
      setFilteredProducts(searchResults);
    }
  }, [searchValue, products]);
  

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

  useEffect(() => {
    const selectedTypes = checkboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.id);
      const filteredByPrice = products.filter((product) => {
        const price = product.price;
        return price >= range[0] && price <= range[1];
      });
      const filtered = selectedTypes.length === 0
      ? filteredByPrice
      : filteredByPrice.filter((product) => selectedTypes.includes(product.type));
      setFilteredProducts(filtered);
  }, [checkboxes, products, range]);

  const handleChange = (event, newValue) => {
    setRange(newValue);
  };
  

  const sortOptions = [
    { label: 'SKU', value: 'sku' },
    { label: 'Price', value: 'price' },
    { label: 'Stock', value: 'stock' },
  ];

  return (
    <div className="Home">
      <FilterSection
        checkboxes={checkboxes}
        handleCheck={handleCheck}
        sortOptions={sortOptions}
        setSortOrder={setSortOrder}
        range={range}
        handleChange={handleChange}
        searchValue={searchValue}
        handleSearch={handleSearch}
      />
      <ResultSection filteredProducts={filteredProducts} openProduct={openProduct} />
    </div>
  );
}

export default Home;
