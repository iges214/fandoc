import { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export const useToys = (category = '') => {
  const [allToys, setAllToys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all toys once
  useEffect(() => {
    const fetchToys = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/toys`);
        if (!response.ok) throw new Error('Failed to fetch Products');
        const data = await response.json();
        setAllToys(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchToys();
  }, []);

  // Filter toys based on category
  const filteredToys = category 
    ? allToys.filter(toy => {
        // console.log('Toy categories:', toy.category, 'Looking for:', category);
        return toy.category.includes(category);
      })
    : allToys;

  // console.log('Filtered toys for', category, ':', filteredToys.length);

  return { 
    toys: filteredToys, 
    loading, 
    error 
  };
};