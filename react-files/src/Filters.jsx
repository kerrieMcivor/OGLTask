// FilterSection.js
import React from 'react';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Slider from "@mui/material/Slider";

function FilterSection({ checkboxes, handleCheck, sortOptions, setSortOrder, range, handleChange, searchValue, handleSearch }) {
  return (
    <div className="col" id="filterSection">
      <div className="px-2 mx-2">
        <Dropdown className="mb-3">
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Sort Order
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {sortOptions.map((option) => (
              <Dropdown.Item key={option.value} onClick={() => setSortOrder(option.value)}>
                {option.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <h5 className="mb-2">Products:</h5>
        <Form>
          {checkboxes.map((checkbox) => (
            <Form.Check
              key={checkbox.id}
              type='checkbox'
              id={checkbox.id}
              label={checkbox.label}
              onChange={() => handleCheck(checkbox.id)}
              checked={checkbox.checked}
            />
          ))}
        </Form>
        <h5 className="mb-2 mt-3">Price Range:</h5>
        <Slider value={range} onChange={handleChange} valueLabelDisplay="auto"></Slider>
      </div>
      <Form>
      <Form.Group className="mb-0 mt-4 mx-3" controlId="search">
        <Form.Control size="md" placeholder="Search" type="text" value={searchValue} onChange={handleSearch}></Form.Control>
      </Form.Group>
      </Form>
    </div>
  );
}

export default FilterSection;
