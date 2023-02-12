'use client';

import { useAppStore } from '../lib/store';
import { useState, useRef } from 'react';
import debounce from 'lodash/debounce';

export const Search = () => {
  const [search, setSearch] = useState<string>('');
  const store = useAppStore();

  const fetchMovies = (value) => {
    store.setSearch(value);
  };

  const setSearchDebounced = useRef(debounce(fetchMovies, 300));

  const handleChange = ({ currentTarget: { value } }) => {
    setSearch(value);
    setSearchDebounced.current(value);
  };

  return (
    <input
      type="text"
      value={search}
      placeholder="Search for movie"
      className="input input-bordered"
      onChange={handleChange}
    />
  );
};
