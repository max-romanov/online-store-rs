import React, {useContext} from 'react';
import './App.css';
import Layout from "./components/Layout";
import Main from "./pages/Main/Main";
import {Route, Routes} from "react-router-dom";
import Error from "./pages/Error/Error";
import {Context} from "./index";
import Basket from "./pages/Basket/Basket";


const App = () => {
    const {store} = useContext(Context)

    return (
        <Layout>
            <main>
                <div className="mainContainer">
                    <Routes>
                        <Route path="/" element={<Main/>}/>
                            <Route index element={<Main/>}/>
                            {/*{store.categories.map((i, idx) =>*/}
                            {/*    <Route key={idx} path={"all_items/" + i} element={<Category/>}/>*/}
                            {/*)}*/}
                            <Route path="basket" element={<Basket/>}/>
                            <Route path='*' element={<Error/>}/>
                        {/*</Route>*/}
                    </Routes>
                </div>
            </main>
        </Layout>
    );
}

export default App;
