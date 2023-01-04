import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Store from "./store";
import {BrowserRouter as Router} from "react-router-dom";

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
