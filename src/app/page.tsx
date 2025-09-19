'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Item {
  id: number;
  name: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/data');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      const response = await axios.post('/api/data', { name: newItem });
      setItems([...items, response.data]);
      setNewItem('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Items</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="border p-2 mr-2 flex-grow"
          placeholder="Enter a new item"
        />
        <button onClick={handleAddItem} className="bg-blue-500 text-white p-2">
          Add Item
        </button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="border-b p-2">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
