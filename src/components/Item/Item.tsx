import React, {useContext} from 'react';
import {IProduct} from "../../interfaces/IProduct";
import q from './Item.module.css'
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";

const Item = (item: IProduct) => {
    const {store} = useContext(Context)
    let navigate = useNavigate()

    const addToBasket = () => {
        store.addToBasket(item)
    }

    const showInfo = () => {
        navigate("basket")
    }

    return (
        <div
            className={q.item}
        >
            <div className={q.image}
                 style={{backgroundImage: `url(${item.thumbnail})`}}
            >
            </div>

            <span className={q.brand}>
                {item.brand}
            </span>

            <span className={q.title}>
                {item.title}
            </span>

            <span className={q.cash}>
                <span className={q.rating}>
                rating - {item.rating}
                </span>
                <span className={q.price}>
                price - {item.price} $
                </span>
            </span>


            <div className={q.info}>
                <span
                    className={q.infoI}
                    onClick={showInfo}
                >
                    <span
                        className="material-symbols-outlined"
                        title="more info"
                    >unknown_document</span>
                    <span>Details</span>
                </span>

                <span
                    className={q.cart}
                    onClick={addToBasket}
                >
                    <span className="material-symbols-outlined" title="add to cart">add_shopping_cart</span>
                    <span className={q.addToCart}>Add to cart </span>
                </span>

            </div>

        </div>
    );
};

export default Item;
