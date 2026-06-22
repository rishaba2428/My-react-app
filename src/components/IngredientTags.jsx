import styles from './IngredientTags.module.css';

const TAGS = [
  { label: 'All', value: '', emoji: '🍽️' },
  { label: 'Chicken', value: 'Chicken', emoji: '🍗' },
  { label: 'Pasta', value: 'Pasta', emoji: '🍝' },
  { label: 'Beef', value: 'Beef', emoji: '🥩' },
  { label: 'Tomato', value: 'Tomato', emoji: '🍅' },
  { label: 'Egg', value: 'Egg', emoji: '🥚' },
  { label: 'Salmon', value: 'Salmon', emoji: '🐟' },
  { label: 'Potato', value: 'Potato', emoji: '🥔' },
  { label: 'Cheese', value: 'Cheese', emoji: '🧀' },
  { label: 'Garlic', value: 'Garlic', emoji: '🧄' },
  { label: 'Mushroom', value: 'Mushroom', emoji: '🍄' },
];

export default function IngredientTags({ active, onChange }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Filter by ingredient</p>
      <div className={styles.row}>
        {TAGS.map(tag => (
          <button
            key={tag.value}
            className={`${styles.tag} ${active === tag.value ? styles.active : ''}`}
            onClick={() => onChange(tag.value)}
          >
            <span>{tag.emoji}</span>
            {tag.label}
          </button>
        ))}
      </div>
    </div>
  );
}
