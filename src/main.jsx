import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Create context for general users
export const Context = createContext({ isAuthenticated: false });

// Create context for admin
export const AdminContext = createContext({ isAdminAuthenticated: false });

// Functional component that acts as a wrapper for the main App component
const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      <AdminContext.Provider value={{ isAdminAuthenticated, setIsAdminAuthenticated }}>
        <App />
      </AdminContext.Provider>
    </Context.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
