// src/context/ApiProvider.jsx
import { ApiContext } from './ApiContext.js';

// eslint-disable-next-line react/prop-types
const ApiProvider = ({ children }) => {
  const API_URL =
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_PROD_API_URL
      : import.meta.env.VITE_DEV_API_URL;

  return (
    <ApiContext.Provider value={{ API_URL }}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
