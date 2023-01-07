import React, {FormEvent, useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import q from "./Basket.module.css";
import Item from "../../components/Item/Item";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const Basket = () => {
    const {store} = useContext(Context)
    const pc: Array<[string, number]> = [['801', 0.15], ['cherry', 0.3], ['dramen', 0.4], ['duck', 0.5], ['me', 0.05]]
    const navigate = useNavigate()

    useEffect(() => {
        if (!store.basket.length) {
            const to = setTimeout(() => {
                navigate("/")
                clearTimeout(to)
            }, 2000)
        }
    }, [])

    const [discountPromoCode, setDiscountPromoCode] = useState('')
    const [discount, setDiscount] = useState(0)

    const checkDiscount = () => {
        const temp = pc.find(it => it[0].toLowerCase() === discountPromoCode.toLowerCase())
        if (temp) {
            if (!store.oldPromoCodes.includes(temp[0])) {
                setDiscount(temp[1])
                store.setOldPromo(temp[0])
            } else {
                setDiscount(0)
            }
        } else {
            setDiscount(0)
        }
    }

    const setDiscountPromoCodeFunc = (e: FormEvent<HTMLInputElement>) => setDiscountPromoCode(e.currentTarget.value)

    return (
        <div className={q.basket}>

            <span className={q.basketTitle}>Basket</span>
            <div className={q.basketItemsField}>
                <div className={q.basketItems}>
                    {store.basket.length
                        ? store.basket.map((it) =>
                            <Item key={it.id} {...it} showControls={true}/>
                        )
                        : <span className={q.empty}>You basket is empty<br/>you will be redirected</span>
                    }
                </div>
                <div className={q.discountItems}>
                    <div className={q.discountItem}>
                        <span
                            className={q.discountPrice}>{
                            (store.basket.reduce((a: number, b) => a + b.price * b.count, 0) * (1 - discount || 0)).toFixed(2)
                        } $ - to pay</span>
                        <span className={q.discountPrice}>
                            your discount - {discount > 0 ? (discount * store.basket.reduce((a: number, b) => a + b.price * b.count, 0)).toFixed(2) : 0} $
                        </span>
                        <div className={q.discountPromoCodeField}>
                            <input
                                className={q.discountPromoCode}
                                type="text"
                                placeholder="your promo-code"
                                value={discountPromoCode}
                                onInput={(e) => setDiscountPromoCodeFunc(e)}
                            />
                            <button onClick={() => checkDiscount()}>CHECK</button>
                        </div>
                        <span className={q.prommo}>{
                            pc.map(it =>
                                    <span className={store.oldPromoCodes.includes(it[0].toLowerCase()) ? q.old : ''}>
                                {it[0]}
                            </span>
                            )}</span>
                        <button className={q.buyButton}>Buy now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(Basket);
