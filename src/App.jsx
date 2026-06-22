import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import IngredientTags from './components/IngredientTags';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import { useRecipes, fetchMealById } from './hooks/useRecipes';
import styles from './App.module.css';

export default function App() {
  const { meals, loading, error, status, searchByName, filterByIngredient, loadInitial } = useRecipes();
  const [activeTag, setActiveTag] = useState('');
  const [modalMeal, setModalMeal] = useState(undefined);
  const queryRef = useRef('');

  useEffect(() => { loadInitial(); }, []);

  function handleSearch(q) {
    queryRef.current = q;
    if (activeTag) filterByIngredient(activeTag, q);
    else searchByName(q);
  }

  function handleTagChange(tag) {
    setActiveTag(tag);
    filterByIngredient(tag, queryRef.current);
  }

  async function openModal(id) {
    setModalMeal(null);
    const meal = await fetchMealById(id);
    setModalMeal(meal);
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <SearchBar onSearch={handleSearch} loading={loading} />
          <IngredientTags active={activeTag} onChange={handleTagChange} />

          {error && <div className={styles.errorBox}>⚠️ {error}</div>}

          {!error && (
            <>
              {status && <p className={styles.statusText}>{status}</p>}

              {!loading && meals.length === 0 && (
                <div className={styles.empty}>
                  <div className={styles.emptyIcon}>🍽️</div>
                  <h3>No recipes found</h3>
                  <p>Try a different search term or ingredient filter</p>
                </div>
              )}

              {meals.length > 0 && (
                <div className={styles.grid}>
                  {meals.map(meal => (
                    <RecipeCard key={meal.idMeal} meal={meal} onClick={openModal} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {modalMeal !== undefined && (
        <RecipeModal meal={modalMeal} onClose={() => setModalMeal(undefined)} />
      )}
    </div>
  );
}
