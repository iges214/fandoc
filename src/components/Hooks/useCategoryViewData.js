import { useState, useEffect } from "react";

const API_BASE = "http://localhost:5000";

export const useCategoryViewData = (selectedCategory) => {
  const [allToys, setAllToys] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch toys and categories in parallel
        const [toysResponse, categoriesResponse] = await Promise.all([
          fetch(`${API_BASE}/toys`),
          fetch(`${API_BASE}/categories`),
        ]);

        if (!toysResponse.ok) throw new Error("Failed to fetch toys");
        if (!categoriesResponse.ok)
          throw new Error("Failed to fetch categories");

        const toysData = await toysResponse.json();
        const categoriesData = await categoriesResponse.json();

        setAllToys(toysData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get toys for selected category
  const selectedCategoryToys = selectedCategory
    ? allToys.filter((toy) => toy.category.includes(selectedCategory))
    : [];

  // Get toys for all other categories
  const otherCategories = categories.filter(
    (cat) => cat.name !== selectedCategory
  );
  const toysByOtherCategories = otherCategories.reduce((acc, category) => {
    acc[category.name] = allToys.filter((toy) =>
      toy.category.includes(category.name)
    );
    return acc;
  }, {});

  return {
    selectedCategoryToys,
    toysByOtherCategories,
    allToys,
    categories,
    otherCategories,
    loading,
    error,
  };
};
