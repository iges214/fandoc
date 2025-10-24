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

export const useToys = (categories = []) => {
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

  // Filter toys based on categories array
  const filteredToys = categories.length > 0 
    ? allToys.filter(toy => {
        // Check if toy belongs to any of the specified categories
        return categories.some(category => toy.category.includes(category));
      })
    : allToys;

  return { 
    toys: filteredToys, 
    loading, 
    error 
  };
};

// New hook to get toys by multiple categories with separate arrays
export const useToysByMultipleCategories = (categories = []) => {
  const [allToys, setAllToys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Return toys grouped by category
  const toysByCategory = categories.reduce((acc, category) => {
    acc[category] = allToys.filter(toy => toy.category.includes(category));
    return acc;
  }, {});

  return {
    toysByCategory,
    allToys,
    loading,
    error
  };
};