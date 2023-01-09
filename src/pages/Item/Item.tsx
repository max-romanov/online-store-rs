import React, { useContext, useEffect, useState } from 'react'
import q from './Item.module.css'
import { IProduct } from '../../interfaces/IProduct'
import { useParams } from 'react-router-dom'
import { Context } from '../../index'

const Item = () => {
  const { id } = useParams()
  const { store } = useContext(Context)
  const [product, setProduct] = useState<IProduct | null>(null)
  const [mainImageUrl, setMainImageUrl] = useState('')

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

  return (
    <div className={q.main}>
      {product ? (
        <div>
          <div className={q.textSectionFirst}>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
          </div>
          <p>{product.brand}</p>
          <p>price: {product.price}</p>
          <p>discount: {product.discountPercentage}</p>
          <img
            className={q.mainImage}
            loading='lazy'
            src={mainImageUrl || ''}
            alt='alalla'
          />
          <div className={q.smallImagesWrapper}>
            {product.images.map((imageSrc) => {
              return (
                <img
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
        </div>
      ) : (
        <h1>404</h1>
      )}
    </div>
  )
}

export default Item
