import React, { useState, useEffect } from 'react';
import useFetchItems from '../components/FetchItems';
import ItemList from '../components/ItemList';
import ItemFilter from '../components/ItemFilter'; // Import the ItemFilter component
import '../CSS/ShopPage.css';

const ShopPage = () => {
  const { items, error } = useFetchItems();
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    setFilteredItems(items); // Initially display all items when fetched
  }, [items]);

  const handleFilter = (filtered) => {
    setFilteredItems(filtered); // Update the displayed items based on the applied filters
  };

  if (error) return <div>Error loading items: {error.message}</div>;

  return (
    <div className="shop-body">
      <ItemFilter items={items} onFilter={handleFilter} /> {/* Add the ItemFilter component */}
      {Array.isArray(filteredItems) && <ItemList items={filteredItems} />} {/* Pass filteredItems to ItemList */}
    </div>
  );
};

export default ShopPage;
