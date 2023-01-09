import React, {useContext} from 'react';
import q from './Header.module.css'
import {Context} from "../../index";
import {toJS} from 'mobx'
import {observer} from "mobx-react-lite";
import {Link, useNavigate} from "react-router-dom";
import {IProduct} from "../../interfaces/IProduct";

const Header = () => {
    const {store} = useContext(Context)

    const navigate = useNavigate()

    const showBasket = (): void => {
        if (store.basket.length > 0) {
            console.log(toJS(store.basket))
            navigate("basket")
        }
    }


    return (
        <header className={q.header}>
            <div className="mainContainer">
                <div className={q.headerItems}>
                    <Link
                        to="/"
                        className={q.headerLogo}
                    >
                        Mega Shop
                    </Link>

                    <div
                        className={q.basket}
                        onClick={showBasket}
                        title={
                            "in your cart "
                            + store.basket.length +
                            " product" + (store.basket.length === 0 || store.basket.length > 1 ? "s" : ""
                            )
                                // : store.basket.length % 10 === 1 ? ""
                                //     : store.basket.length % 10 > 1 && store.basket.length % 10 < 5 ? "s"
                                //         : "s")
                        }
                    >
                        <span className="material-symbols-outlined hhh">shopping_cart_checkout</span>

                        <span className={q.itemsCount}>
                            {store.basket.length}
                        </span>

                        {store.basket.length
                            ? <span className={q.price}>
                            {/*общая стоимость - */}
                                total - {store.basket.reduce((a: number, b) => a + b.price * b.count, 0)} $
                        </span>
                            : ''
                        }

                    </div>

                </div>
            </div>
        </header>
    );
};

export default observer(Header);
