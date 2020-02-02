import React, { useState } from 'react';
import { IDContextProvider } from '@jfrk/react-id';
import useInterval from '@use-it/interval';
import { sampleSize } from 'lodash';

import './App.css';
import Item from './Item';

const allItems = [
  'Rat',
  'Ox',
  'Tiger',
  'Rabbit',
  'Dragon',
  'Snake',
  'Horse',
  'Goat',
  'Monkey',
  'Rooster',
  'Dog',
  'Pig',
];

export default function App() {
  const [items, setItems] = useState(allItems);
  useInterval(() => {
    setItems(sampleSize(allItems, 6));
  }, 5000);
  // const items = allItems;
  return (
    <IDContextProvider>
      <ul className="grid">
        {items.map(key => {
          return <Item key={key}>{key}</Item>;
        })}
      </ul>
    </IDContextProvider>
  );
}
