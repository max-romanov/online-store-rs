import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { Context } from '../../index'
import q from './Basket.module.css'
import Item from '../../components/Item/Item'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { BasketPopup } from '../../components/basketPopup/BasketPopup'
import { ErrorsContext } from '../../components/basketPopup/context'

const Basket = () => {
  const { store } = useContext(Context)
  const { errors } = useContext(ErrorsContext)
  const navigate = useNavigate()
  const [popupIsOpen, setPopupIsOpen] = useState(false)
  const [succes, setSucces] = useState(false)

  useEffect(() => {
    if (!store.basket.length) {
      const to = setTimeout(() => {
        navigate('/')
        clearTimeout(to)
      }, 2000)
    }
  }, [])

  const [discountPromoCode, setDiscountPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const checkDiscount = () => {
    const temp = store.promoCodes.find((it) => {
      return it.name.toLowerCase() === discountPromoCode.toLowerCase()
    })
    if (!temp) {
      setDiscount(0)
      return
    }
    if (store.oldPromoCodes.includes(temp.name)) {
      setDiscount(0)
      return
    }

    setDiscount(temp.discount)
  }

  const setDiscountPromoCodeFunc = (e: FormEvent<HTMLInputElement>) =>
    setDiscountPromoCode(e.currentTarget.value)

  const buy = () => {
    if (store.basket.length) {
      const temp = store.promoCodes.find(
        (it) => it.name.toLowerCase() === discountPromoCode.toLowerCase()
      )
      store.buy(temp ? discountPromoCode : '')
    }
    setSucces(true)
  }

  return (
    <div className={q.basket}>
      {succes && <div className={q.succesPopup}>Order is processed</div>}
      <span className={q.basketTitle}>Basket</span>
      <div className={q.basketItemsField}>
        <div className={q.basketItems}>
          {store.basket.length ? (
            store.basket.map((it) => (
              <Item key={it.id} {...it} showControls={true} />
            ))
          ) : (
            <span className={q.empty}>
              You basket is empty
              <br />
              you will be redirected
            </span>
          )}
        </div>
        <div className={q.discountItems}>
          <div className={q.discountItem}>
            <span className={q.discountPrice}>
              {(
                store.basket.reduce(
                  (a: number, b) => a + b.price * b.count,
                  0
                ) * (1 - discount || 0)
              ).toFixed(2)}{' '}
              $ - to pay
            </span>
            {discount ? (
              <span
                className={q.discountPrice}
                style={{ textDecoration: 'line-through' }}
              >
                {store.basket.reduce((acc, curr) => acc + curr.price, 0)} $
              </span>
            ) : null}
            <span className={q.discountPrice}>
              {store.basket.reduce((acc, curr) => curr.count + acc, 0)} - items
            </span>
            <span className={q.discountPrice}>
              your discount -{' '}
              {discount > 0
                ? (
                    discount *
                    store.basket.reduce(
                      (a: number, b) => a + b.price * b.count,
                      0
                    )
                  ).toFixed(2)
                : 0}{' '}
              $
            </span>
            <div className={q.discountPromoCodeField}>
              <input
                className={q.discountPromoCode}
                type='text'
                placeholder='your promo'
                value={discountPromoCode}
                onInput={(e) => setDiscountPromoCodeFunc(e)}
              />
              <button onClick={() => checkDiscount()}>CHECK</button>
            </div>
            <span className={q.prommo}>
              {store.promoCodes.map((it) => (
                <span
                  key={it.name}
                  title={it.discount * 100 + '%'}
                  className={
                    store.oldPromoCodes.includes(it.name.toLowerCase())
                      ? q.old
                      : ''
                  }
                >
                  {it.name} - {it.discount * 100}%
                </span>
              ))}
            </span>
            <button
              className={q.buyButton}
              onClick={() => {
                setPopupIsOpen(true)
              }}
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
      {popupIsOpen && (
        <BasketPopup
          onSubmit={() => {
            const num = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000

            // console.log(num)
            // console.log('order succes')

            buy()

            setTimeout(() => {
              errors.setDefaults()
              setSucces(false)
              navigate('/')
            }, num)
            setPopupIsOpen(false)
          }}
          closeComponent={
            <span
              style={{ background: 'transparent', marginLeft: 'auto' }}
              onClick={() => {
                setPopupIsOpen(false)
              }}
              className='material-symbols-outlined close-popup'
            >
              close
            </span>
          }
        ></BasketPopup>
      )}
    </div>
  )
}

export default observer(Basket)
