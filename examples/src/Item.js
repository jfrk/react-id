import React from 'react';
import { useID } from '@jfrk/react-id';

export default function Item({ children }) {
  const id = useID();
  return (
    <li id={id('item')} className="grid__item">
      <h2>{children}</h2>
      <div>
        <small>
          <code>{`id="${id('item')}"`}</code>
        </small>
      </div>
    </li>
  );
}
