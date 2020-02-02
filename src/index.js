import React, { createContext, useState, useContext, useRef } from 'react';
import nanoid from 'nanoid/non-secure/generate';

export const nanoidComponentId = () =>
  nanoid('0123456789abcdefghijklmnopqrstuvwxyz', 8);

export const componentIdSuffix = ({ componentId }) => componentId;

export const IDContext = createContext();

export const IDContextProvider = ({
  generateComponentId = nanoidComponentId,
  generateSuffix = componentIdSuffix,
  children,
}) => {
  let registeredIdsRef = useRef({});
  const generateId = (id, componentId) => {
    let registeredIds = registeredIdsRef.current;
    if (!registeredIds[id]) {
      let generatedId = id;
      registeredIds[id] = { [componentId]: generatedId };
      return generatedId;
    }
    if (registeredIds[id][componentId]) {
      return registeredIds[id][componentId];
    }
    let count = Object.keys(registeredIds[id]).length;
    let suffix = generateSuffix({ id, componentId, count, registeredIds });
    let generatedId = `${id}-${suffix}`;
    registeredIds[id][componentId] = generatedId;
    return generatedId;
  };
  return (
    <IDContext.Provider
      value={{
        generateId,
        generateComponentId,
      }}
    >
      {children}
    </IDContext.Provider>
  );
};

export function useID() {
  const { generateId, generateComponentId } = useContext(IDContext);
  const [componentId] = useState(generateComponentId);
  const [generatedIds, setGeneratedIds] = useState({});
  return id => {
    if (id in generatedIds) {
      return generatedIds[id];
    }
    const generatedId = generateId(id, componentId);
    setGeneratedIds({ ...generatedIds, [id]: generatedId });
    return generatedId;
  };
}
