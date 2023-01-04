import React, {useContext, useState} from "react"
import q from "../../pages/Basket/Basket.module.css";
import {Context} from "../../index";
import {ErrorsContext} from "./context";
import Form from "./Form/Form";

interface IBasketPopupProps {
  closeComponent: JSX.Element
  onSubmit: () => void
}


export const BasketPopup = (props: IBasketPopupProps) => {
  const {store} = useContext(Context)
  const {errors} = useContext(ErrorsContext)

  const [succes, setSucces] = useState(false);

  return (
    <div className={q.basketPopup}>
      {props.closeComponent}
      <h3>Order</h3>
      <p>total: {store.basket.reduce((total, product) => total + product.price, 0)}$</p>
      <Form/>
      <button className={q.basketPopupButton} onClick={() => {
        if (!errors.nameError && !errors.phoneNumberError && !errors.addressError && !errors.codeError && !errors.validThruError && !errors.cardNumberError) {
          props.onSubmit()
          setSucces(true)
        }
      }}>Order
      </button>
      {succes && <p>ordered succesful</p>}
    </div>
  )
}

