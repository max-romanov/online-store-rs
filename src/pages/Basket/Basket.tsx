import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import q from "./Basket.module.css";
import Item from "../../components/Item/Item";
import {Popup} from "../../components/Popup/Popup";


const Basket = () => {
  const {store} = useContext(Context)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const canPay = !!store.basket.length

  return (
    <div className={q.basket}>

      <span className={q.basketTitle}>Basket</span>

      {store.basket.length ? store.basket.map((it, i) => <Item key={it.id} {...it}/>) : <span className={q.empty}>Loading ...</span>}

      {(isOpen) && <div className={q.basketPopup}>
          <h3>pay</h3>
          <p>total: {store.basket.reduce((total, alalla) => total + alalla.price, 0)}$</p>

          <button onClick={() => {
            setIsOpen(false)
          }}>Close</button>
      </div>}

      <button onClick={() => {
        canPay && setIsOpen(true)
      }}>Pay</button>
    </div>
  );
};

export default Basket;
