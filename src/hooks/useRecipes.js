import { useState, useCallback } from 'react';

const BASE = 'https://www.themealdb.com/api/json/v1/1';

export function useRecipes() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');

  const searchByName = useCallback(async (query) => {
    if (!query) { setMeals([]); setStatus(''); return; }
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(query)}`);
      const data = await res.json();
      const results = data.meals || [];
      setMeals(results);
      setStatus(results.length ? `${results.length} recipe${results.length !== 1 ? 's' : ''} found` : 'No recipes found');
    } catch {
      setError('Failed to fetch recipes. Check your internet connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  const filterByIngredient = useCallback(async (ingredient, query = '') => {
    if (!ingredient) {
      if (query) { searchByName(query); return; }
      setMeals([]); setStatus(''); return;
    }
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${BASE}/filter.php?i=${encodeURIComponent(ingredient)}`);
      const data = await res.json();
      let results = data.meals || [];
      if (query) results = results.filter(m => m.strMeal.toLowerCase().includes(query.toLowerCase()));
      setMeals(results);
      setStatus(results.length ? `${results.length} recipe${results.length !== 1 ? 's' : ''} with ${ingredient}` : `No recipes found with ${ingredient}`);
    } catch {
      setError('Failed to fetch recipes. Check your internet connection.');
    } finally {
      setLoading(false);
    }
  }, [searchByName]);

  const loadInitial = useCallback(async () => {
    setLoading(true);
    try {
      const letters = ['a', 'c', 'b'];
      const results = await Promise.all(
        letters.map(l => fetch(`${BASE}/search.php?f=${l}`).then(r => r.json()))
      );
      const all = results.flatMap(d => d.meals || []).slice(0, 20);
      setMeals(all);
      setStatus('Popular recipes');
    } catch {
      setError('Could not load recipes.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { meals, loading, error, status, searchByName, filterByIngredient, loadInitial };
}

export async function fetchMealById(id) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals?.[0] || null;
}
