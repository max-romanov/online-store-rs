import React, { useContext, useEffect, useState } from 'react'
import { IProduct, IProductB } from '../../interfaces/IProduct'
import q from './Item.module.css'
import { Context } from '../../index'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

const Item = (item: IProduct & { showControls: boolean }) => {
  const { store } = useContext(Context)
  const navigate = useNavigate()

  const addToBasket = () => {
    store.addToBasket(item)
  }

  const [currentCount, setCurrentCount] = useState(1)

  const setCount = (arg: boolean, item: IProductB | undefined) => {
    if (item) {
      if (item.count === 1 && !arg) {
        const temp = store.basket.filter((it) => it.id !== item.id)
        store.filterBasket(temp)
        if (!store.basket.length) {
          const to = setTimeout(() => {
            navigate('/')
            clearTimeout(to)
          }, 3000)
        }
        return
      }
      if (arg) {
        if (item.count < item.stock) {
          store.setBasketCount(item, arg)
        }
      } else {
        store.setBasketCount(item, arg)
      }
    }
  }

  const removeItemFromBasket = (id: number) => {
    const temp = store.basket.filter((it) => it.id !== id)
    store.filterBasket(temp)
    if (!store.basket.length) {
      const to = setTimeout(() => {
        navigate('/')
        clearTimeout(to)
      }, 3000)
    }
    return
  }

  useEffect(() => {
    setCurrentCount(function () {
      let t = store.basket.find((it) => it.id === item.id)
      if (t) {
        return t.count
      } else {
        return 1
      }
    })
  }, [store.basket.find((it) => it.id === item.id)?.count])

  const showInfo = (id: number) => {
    navigate('product/' + id.toString())
  }

  return (
    <div className={item.showControls ? [q.item, q.basket].join(' ') : q.item}>
      <div className={q.imageField}>
        <div
          className={q.image}
          style={{ backgroundImage: `url(${item.thumbnail})` }}
        ></div>
      </div>

      <div className={q.textWrapper}>
        <span className={q.brand}>{item.brand.toUpperCase()}</span>

        <span className={q.title}>{item.title}</span>

        {item.showControls ? (
          <span className={q.description}>{item.description}</span>
        ) : null}
      </div>
      <div className={q.infoField}>
        <span className={q.cash}>
          {item.showControls ? (
            <span
              className='material-symbols-outlined trash'
              title='remove item'
              onClick={() => removeItemFromBasket(item.id)}
            >
              delete
            </span>
          ) : null}
          <span className={q.rating}>&#9733; - {item.rating}</span>
          <span className={q.price}>
            {item.showControls ? currentCount * item.price : item.price} $
          </span>
        </span>

        {!item.showControls ? (
          <div className={q.info}>
            <span className={q.infoI}>
              <span className='material-symbols-outlined' title='more info'>
                unknown_document
              </span>
              <span onClick={() => showInfo(item.id)}>Details</span>
            </span>
            <span
              className={
                store.allData.find((it) => it.id === item.id)?.stock
                  ? store.basket.filter((it) => it.id === item.id).length > 0
                    ? [q.cart, q.dis].join(' ')
                    : q.cart
                  : [q.cart, q.z].join(' ')
              }
              onClick={addToBasket}
            >
              {!store.basket.filter((it) => it.id === item.id).length &&
              store.allData.find((it) => it.id === item.id)?.stock ? (
                <span className='material-symbols-outlined' title='add to cart'>
                  add_shopping_cart
                </span>
              ) : null}
              {store.allData.find((it) => it.id === item.id)?.stock ? (
                <span className={q.addToCart}>
                  {store.basket.filter((it) => it.id === item.id).length > 0
                    ? 'Added to cart'
                    : 'Add to cart'}
                </span>
              ) : (
                <span>Not available</span>
              )}
            </span>
          </div>
        ) : null}
        {item.showControls ? (
          <div className={[q.info, q.setCount].join(' ')}>
            <span className={q.stock}>
              stock - {item.stock ? item.stock + 'pc' : 'absent'}
            </span>
            <span className={q.buttonsField}>
              <span
                className='material-symbols-outlined'
                onClick={() =>
                  setCount(
                    false,
                    store.basket.find((it) => it.id === item.id)
                  )
                }
              >
                indeterminate_check_box
              </span>
              <input
                type="text"
                placeholder={store.basket.find(it => it.id === item.id)?.count.toString()}
                className={q.countInput}
                readOnly
              />
              <span
                className='material-symbols-outlined'
                onClick={() =>
                  setCount(
                    true,
                    store.basket.find((it) => it.id === item.id)
                  )
                }
              >
                add_box
              </span>
            </span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default observer(Item)
