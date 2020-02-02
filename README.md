# React ID

A React hook that ensures unique id attributes on HTML elements.

## Get started

Install with npm:

```bash
npm install --save @jfrk/react-id
```

… or with Yarn:

```bash
yarn add @jfrk/react-id
```

## Usage

Wrap your app in the `IDContextProvider` component and then use the `useID` hook
to get a function that generates unique IDs for your elements. Example:

```js
// App.js

import React from 'react';
import { IDContextProvider } from '@jfrk/react-id';

export default function App() {
  return <IDContextProvider>{/* Your app code here */}</IDContextProvider>;
}
```

```js
// TextInput.js

import React from 'react';
import { useID } from '@jfrk/react-id';

export default function TextInput({ label, ...restProps }) {
  const id = useID();
  return (
    <div>
      <label htmlFor={id('field')}>{label}</label>
      <input id={id('field')} type="text" {...restProps} />
    </div>
  );
}
```

## How it works

Each component instance gets a unique ID (using
[nanoid](https://github.com/ai/nanoid)) that is added to the string passed to
`id()` if there is already another element with that ID. So the first element
that calls `id("field")` will get `"field"` returned, but other elements will
have their unique component ID appended, e.g. `"field-pszjtj4u"`.

## API

### `<IDContextProvider>` component

The exported `<IDContextProvider>` component can take these props:

- `generateComponentId` – By setting this prop, you can override the default
  function used to generate the unique ID for a component instance. This default
  to the exported function `nanoidComponentId` which uses the fast (non-secure)
  version of [nanoid](https://github.com/ai/nanoid) to generate a short string.
  The function receives no arguments.
- `generateSuffix` – Set this prop to a function to override the default
  behavior for generating ID suffixes. The default function is the exported
  `componentIdSuffix` which simply uses the already generared unique component
  ID. The function receives an objects with these properties:
  - `id` – The ID that have been passed to `id()` by the component
  - `componentId` – The unique component instance ID
  - `count` – The number of components that already uses this ID
  - `registeredIds` – An object containing all the information about what IDs
    have been generated for each component.
