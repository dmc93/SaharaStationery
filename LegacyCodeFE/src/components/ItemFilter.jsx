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
  const [showFilters, setShowFilters] = useState(false); // State to control visibility of filter options

  useEffect(() => {
    const uniqueCategories = [...new Set(items.map(item => item.category))].filter(Boolean);
    setCategories(uniqueCategories);
  }, [items]);

  // Handle search input and filter as you type
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      name: value,
    }));
    applyFilters({ ...filters, name: value });
  };

  // Handle filter changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters(filters);
    setShowFilters(false); // Optionally hide filters after applying
  };

  const applyFilters = (filtersToApply) => {
    let filtered = items.filter((item) => {
      const matchesName = filtersToApply.name
        ? item.name.toLowerCase().includes(filtersToApply.name.toLowerCase())
        : true;

      const matchesMinPrice = filtersToApply.minPrice
        ? item.price >= parseFloat(filtersToApply.minPrice)
        : true;

      const matchesMaxPrice = filtersToApply.maxPrice
        ? item.price <= parseFloat(filtersToApply.maxPrice)
        : true;

      const matchesCategory = filtersToApply.category
        ? item.category.toLowerCase() === filtersToApply.category.toLowerCase()
        : true;

      return matchesName && matchesMinPrice && matchesMaxPrice && matchesCategory;
    });

    if (filtersToApply.sort === "stock") {
      filtered = filtered.sort((a, b) => b.stock - a.stock);
    } else if (filtersToApply.sort === "priceLowHigh") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (filtersToApply.sort === "priceHighLow") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    onFilter(filtered); // Pass the filtered items back to the parent component
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      name: "",
      minPrice: "",
      maxPrice: "",
      category: "",
      sort: "",
    };
    setFilters(clearedFilters);
    onFilter(items); // Reset the filtered items to the original list
  };

  return (
    <div className="item-filter-container">
      {/* Search Bar */}
      <Form.Group controlId="name" className="form-group search-bar">
        <Form.Label className="form-label">Search: </Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={filters.name}
          onChange={handleSearchChange}
          className="form-control"
          placeholder="Search items..."
        />
      </Form.Group>

      {/* Filter Button */}
      <Button variant="secondary" onClick={() => setShowFilters(!showFilters)} className="filter-btn">
        {showFilters ? "Hide Filter Options" : "Show Filter Options"}
      </Button>

      {/* Filter Options - Hidden/Shown based on `showFilters` */}
      {showFilters && (
        <div className="filter-options">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
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
              <Col md={6}>
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
            <Button variant="primary" type="submit" className="mt-3 w-100" style={{marginRight: "1em"}}>
              Apply Filters
            </Button>
            <Button variant="secondary" onClick={handleClearFilters} className="mt-2 w-100">
              Clear Filters
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}

export default ItemFilter;
