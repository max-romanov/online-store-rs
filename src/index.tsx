import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Store from "./store";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NotFoundPage from "./pages/Error/Error"

const store = new Store();
export const Context = React.createContext({store});


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
  <Router>
    <App/>
  </Router>
);
