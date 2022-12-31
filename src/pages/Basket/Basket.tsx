import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import q from "./Basket.module.css";
import Item from "../../components/Item/Item";
import {BasketPopup} from "../../components/basketPopup/BasketPopup";
import {useNavigate} from "react-router-dom";
import {ErrorsContext} from "../../components/basketPopup/context"

const Basket = () => {
  const {store} = useContext(Context)
  const {errors} = useContext(ErrorsContext)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const canPay = !!store.basket.length

  return (
    <div className={q.basket}>

      <span className={q.basketTitle}>Basket</span>

      {store.basket.length ? store.basket.map((it, i) => <Item key={it.id} {...it}/>) :
        <span className={q.empty}>Loading ...</span>}

      {(isOpen) && <BasketPopup onSubmit={() => {
        const num = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;

        console.log(num)
        console.log("order succes")

        setTimeout(() => {
          store.clearBasket()
          errors.setDefaults()
          navigate("/")
        }, num)
      }} closeComponent={<button className={q.basketPopupCloseButton}  onClick={() => {
        setIsOpen(false)
      }}></button>}/>}

      <button onClick={() => {
        canPay && setIsOpen(true)
      }}>Pay
      </button>
    </div>
  );
};

export default Basket;
