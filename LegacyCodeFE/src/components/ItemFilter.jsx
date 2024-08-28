import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from 'react-bootstrap';
import '../CSS/ItemFilter.css';  // Import the CSS file

function ItemFilter({ items, onFilter }) {
  const [filters, setFilters] = useState({
    name: "",
    minPrice: "",
    maxPrice: "",
    category: "",
    sort: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const uniqueCategories = [...new Set(items.map(item => item.category))].filter(Boolean);
    setCategories(uniqueCategories);
  }, [items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters(); // Apply the filters when the form is submitted
  };

  const applyFilters = () => {
    let filtered = items.filter((item) => {
      const matchesName = filters.name
        ? item.name.toLowerCase().includes(filters.name.toLowerCase())
        : true;

      const matchesMinPrice = filters.minPrice
        ? item.price >= parseFloat(filters.minPrice)
        : true;

      const matchesMaxPrice = filters.maxPrice
        ? item.price <= parseFloat(filters.maxPrice)
        : true;

      const matchesCategory = filters.category
        ? item.category.toLowerCase() === filters.category.toLowerCase()
        : true;

      return matchesName && matchesMinPrice && matchesMaxPrice && matchesCategory;
    });

    if (filters.sort === "stock") {
      filtered = filtered.sort((a, b) => b.stock - a.stock);
    } else if (filters.sort === "priceLowHigh") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "priceHighLow") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    onFilter(filtered); // Pass the filtered items back to the parent component
  };

  const handleClearFilters = () => {
    setFilters({
      name: "",
      minPrice: "",
      maxPrice: "",
      category: "",
      sort: "",
    });
    onFilter(items); // Reset the filtered items to the original list
  };

  return (
    <Form className="search-filter" onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group controlId="name" className="form-group">
            <Form.Label className="form-label">Item Name: </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={filters.name}
              onChange={handleChange}
              className="form-control"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="minPrice" className="form-group">
            <Form.Label className="form-label">Min Price: </Form.Label>
            <Form.Control
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              className="form-control"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="maxPrice" className="form-group">
            <Form.Label className="form-label">Max Price: </Form.Label>
            <Form.Control
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              className="form-control"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId="category" className="form-group">
            <Form.Label className="form-label">Category: </Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="sort" className="form-group">
            <Form.Label className="form-label">Sort By: </Form.Label>
            <Form.Control
              as="select"
              name="sort"
              value={filters.sort}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select</option>
              <option value="stock">Stock Availability</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Button variant="primary" type="submit" className="btn-custom mt-3">
            Apply Filters
          </Button>
        </Col>
        <Col xs={12} className="mt-2">
          <Button
            variant="secondary"
            onClick={handleClearFilters}
            className="btn-custom"
          >
            Clear Filters
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default ItemFilter;
