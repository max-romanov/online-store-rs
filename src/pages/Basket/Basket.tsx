import React, {useContext} from 'react';
import {Context} from "../../index";
import q from "./Basket.module.css";
import Item from "../../components/Item/Item";

const Basket = () => {

    const {store} = useContext(Context)

    return (
        <div className={q.basket}>

            <span className={q.basketTitle}>Basket</span>

            {store.basket.length ? store.basket
                    .map((it, i) =>
                        <Item key={it.id} {...it}/>
                    )
                : <span className={q.empty}>Loading ...</span>}
        </div>
    );
};

export default Basket;
