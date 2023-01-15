import React, { useContext, useEffect, useState } from 'react'
import q from './Item.module.css'
import { IProduct } from '../../interfaces/IProduct'
import { useParams } from 'react-router-dom'
import { Context } from '../../index'
import { BasketPopup } from '../../components/basketPopup/BasketPopup'

const Item = () => {
  const { id } = useParams()
  const { store } = useContext(Context)
  const [product, setProduct] = useState<IProduct | null>(null)
  const [mainImageUrl, setMainImageUrl] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    store.setStore().then(() => {
      setProduct(
        store.allData.find((product) => product.id.toString() === id) || null
      )
      if (!product) {
        return
      }
      setMainImageUrl(product.images[0])
    })
  }, [])

  const addToBasket = () => {
    if (product && !store.basket.find((item) => item.id === product.id)) {
      store.addToBasket(product)
    }
  }

  const onSubmit = () => {
    console.log('submit')
  }

  return (
    <div className={q.main}>
      {isOpen && (
        <BasketPopup
          onSubmit={onSubmit}
          closeComponent={
            <span
              style={{ background: 'transparent', marginLeft: 'auto' }}
              onClick={() => {
                setIsOpen(false)
              }}
              className='material-symbols-outlined close-popup'
            >
              close
            </span>
          }
        />
      )}
      {product ? (
        <div className={q.content}>
          <h1 className={q.productTitle}>{product.title}</h1>
          <p className={q.description}>description: {product.description}</p>
          <p className={q.description}>brand: {product.brand}</p>
          <p className={q.description}>price: {product.price}$</p>
          <p className={q.description}>stock: {product.stock} pc</p>
          <p className={q.description}>
            discount: {product.discountPercentage}%
          </p>
          {mainImageUrl && (
            <img
              className={q.mainImage}
              loading='lazy'
              src={mainImageUrl}
              alt='alalla'
            />
          )}
          <div className={q.smallImagesWrapper}>
            {product.images.map((imageSrc, i) => {
              return (
                <img
                  key={i}
                  className={q.smallImage}
                  src={imageSrc}
                  alt=';'
                  onClick={() => {
                    setMainImageUrl(imageSrc)
                  }}
                />
              )
            })}
          </div>
          <div className={q.info}>
            <span
              className={q.infoI}
              onClick={() => {
                setIsOpen(true)
                if (!store.basket.find((item) => item.id === product.id)) {
                  store.addToBasket(product)
                }
              }}
            >
              <span className='material-symbols-outlined'>payments</span>
              <span>quick buy</span>
            </span>
            <span
              className={
                store.allData.find((it) => it.id === product.id)?.stock
                  ? store.basket.filter((it) => it.id === product.id).length > 0
                    ? [q.cart, q.dis].join(' ')
                    : q.cart
                  : [q.cart, q.z].join(' ')
              }
              onClick={addToBasket}
            >
              {!store.basket.filter((it) => it.id === product.id).length &&
              store.allData.find((it) => it.id === product.id)?.stock ? (
                <span className='material-symbols-outlined' title='add to cart'>
                  add_shopping_cart
                </span>
              ) : null}
              {store.allData.find((it) => it.id === product.id)?.stock ? (
                <span className={q.addToCart}>
                  {store.basket.filter((it) => it.id === product.id).length > 0
                    ? 'Added to cart'
                    : 'Add to cart'}
                </span>
              ) : (
                <span>Not available</span>
              )}
            </span>
          </div>
        </div>
      ) : (
        <h1>404</h1>
      )}
    </div>
  )
}

export default Item
