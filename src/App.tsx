import React, {useContext} from 'react';
import './App.css';
import Layout from "./components/Layout";
import Main from "./pages/Main/Main";
import {Route, Routes} from "react-router-dom";
import NotFoundPage from "./pages/Error/Error";
import {Context} from "./index";
import Basket from "./pages/Basket/Basket";


const App = () => {
  const {store} = useContext(Context)

  return (
    <Layout>
      <main>
        <div className="mainContainer">
          <Routes>
            <Route path="/">
              <Route index element={<Main/>}/>
              <Route path="basket" element={<Basket/>}/>
              <Route path="*" element={<NotFoundPage/>}/>
            </Route>
          </Routes>
        </div>
      </main>
    </Layout>
  );
}

export default App;
