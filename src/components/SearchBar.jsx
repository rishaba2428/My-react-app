import { useState, useEffect, useRef } from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState('');
  const debounceRef = useRef(null);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (value.trim()) {
      debounceRef.current = setTimeout(() => {
        onSearch(value.trim());
      }, 500);
    }
    return () => clearTimeout(debounceRef.current);
  }, [value]);

  function handleKeyDown(e) {
    if (e.key === 'Enter' && value.trim()) {
      clearTimeout(debounceRef.current);
      onSearch(value.trim());
    }
  }

  function handleClear() {
    setValue('');
    onSearch('');
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrap}>
        <span className={styles.icon}>🔍</span>
        <input
          type="text"
          className={styles.input}
          placeholder="Search recipes… e.g. chicken, pasta, butter"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {value && (
          <button className={styles.clear} onClick={handleClear} aria-label="Clear search">✕</button>
        )}
      </div>
      {loading && <div className={styles.loader}><span /><span /><span /></div>}
    </div>
  );
}
