import styles from './RecipeCard.module.css';

export default function RecipeCard({ meal, onClick }) {
  return (
    <div className={styles.card} onClick={() => onClick(meal.idMeal)} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(meal.idMeal)}>
      <div className={styles.imgWrap}>
        <img
          src={`${meal.strMealThumb}/preview`}
          alt={meal.strMeal}
          className={styles.img}
          loading="lazy"
          onError={e => { e.target.style.display = 'none'; }}
        />
        {meal.strCategory && (
          <span className={styles.badge}>{meal.strCategory}</span>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{meal.strMeal}</h3>
        {meal.strArea && <p className={styles.area}>🌍 {meal.strArea} cuisine</p>}
        <p className={styles.cta}>View recipe →</p>
      </div>
    </div>
  );
}
