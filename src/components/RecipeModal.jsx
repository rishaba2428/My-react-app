import { useEffect } from 'react';
import styles from './RecipeModal.module.css';

export default function RecipeModal({ meal, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  if (!meal) return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.loadingBox}>
          <div className={styles.spinner} />
          <p>Loading recipe…</p>
        </div>
      </div>
    </div>
  );

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && ing.trim()) ingredients.push({ ing: ing.trim(), meas: (meas || '').trim() });
  }

  const steps = (meal.strInstructions || '')
    .split(/\r?\n/)
    .map(s => s.trim())
    .filter(Boolean);

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label={meal.strMeal}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>

        <div className={styles.imgWrap}>
          <img src={meal.strMealThumb} alt={meal.strMeal} className={styles.img} />
          <div className={styles.imgOverlay}>
            <h2 className={styles.mealName}>{meal.strMeal}</h2>
            <div className={styles.metaRow}>
              {meal.strCategory && <span className={styles.pill}>🍽️ {meal.strCategory}</span>}
              {meal.strArea && <span className={styles.pill}>🌍 {meal.strArea}</span>}
            </div>
          </div>
        </div>

        <div className={styles.body}>
          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ytBtn}
            >
              ▶ Watch on YouTube
            </a>
          )}

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Ingredients <span className={styles.count}>({ingredients.length})</span></h3>
            <div className={styles.ingredientsGrid}>
              {ingredients.map(({ ing, meas }, i) => (
                <div key={i} className={styles.ingRow}>
                  <span className={styles.ingName}>• {ing}</span>
                  <span className={styles.ingMeas}>{meas}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Instructions</h3>
            <ol className={styles.steps}>
              {steps.map((step, i) => (
                <li key={i} className={styles.step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
