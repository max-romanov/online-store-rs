import React from 'react';
import './App.css';
import Layout from "./components/Layout";
import Main from "./pages/Main/Main";
import {Route, Routes} from "react-router-dom";
import Error from "./pages/Error/Error";
import Basket from "./pages/Basket/Basket";
import Item from "./pages/Item/Item";


const App = () => {

    return (
        <Layout>
            <main>
                <div className="mainContainer">
                    <Routes>
                        <Route path="/" element={<Main/>}/>
                        <Route index element={<Main/>}/>
                        <Route path="item/:id" element={<Item />}/>
                        <Route path="basket" element={<Basket/>}/>
                        <Route path='*' element={<Error/>}/>
                    </Routes>
                </div>
            </main>
        </Layout>
    );
}

export default App;
