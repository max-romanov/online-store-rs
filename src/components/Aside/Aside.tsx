import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import q from './Aside.module.css'
import { IProduct } from '../../interfaces/IProduct'

const Aside = ({ itemsFilter }: { itemsFilter: React.Dispatch<IProduct[]> }) => {
  const { store } = useContext(Context)

  const [current, setCurrent] = useState('')

  const [queryPrice, setQueryPrice] = useState(0)
  const [ratingPrice, setRatingPrice] = useState(0)

  const [brandsArray, setBrandsArray] = useState([])

  const setBrandFunction = (arg: Array<IProduct>): Array<string> =>
    Array.from(new Set(arg.map((i: IProduct) => i.brand)))

  const setFilter = (arg: Array<string>, i: string | undefined) => {
    setBrandsArray(arg)
    if (i?.length) itemsFilter(i.toLowerCase())
  }

  const sortBrands = (i: string) => {
    if (brandsArray.includes(i.toLowerCase())) {
      const temp = JSON.parse(
        JSON.stringify(brandsArray.filter((it) => it !== i.toLowerCase()))
      )
      setFilter(temp, i)
    } else {
      const temp = JSON.parse(JSON.stringify(brandsArray))
      temp.push(i.toLowerCase())
      setFilter(temp, i)
    }
  }

  const sortItem = (arg: string) => {
    if (current !== arg) {
      store.setCurrentCategory(arg)
      setCurrent(arg)
      setFilter([], '')
    }
  }

  const [curAv, setCurAv] = useState(false)

  const chAviability = (arg: boolean) => {
    // setCurAv(!curAv)
    // store.showAll(  )
    // setFilter([], '')
    store.checkAviability(arg)
  }

  useEffect(() => {
    console.log(queryPrice, ratingPrice)
  }, [queryPrice, ratingPrice])

  return (
    <div className={q.asideField}>
      <div className={q.title}>Categories</div>
      <nav className={q.asideCategories}>
        {store.categories.map((i, idx) => (
          // <Link key={idx} to={"all_items/" + i}>{i.slice(0,1).toUpperCase() + i.slice(1)}</Link>
          <span
            key={idx}
            className={i === current ? q.current : ''}
            onClick={() => sortItem(i)}
          >
            {i.slice(0, 1).toUpperCase() + i.slice(1)} (
            {store.allData.filter((item) => item.category === i).length})
          </span>
        ))}
        <span onClick={() => sortItem('')}>
          All ({store.categories.length})
        </span>
      </nav>

      <div className={q.title}>Brands</div>

      <nav className={q.asideCategories}>
        {setBrandFunction(store.currentData).map((i, idx) => (
          // <Link key={idx} to={"all_items/" + i}>{i.slice(0,1).toUpperCase() + i.slice(1)}</Link>
          <span
            key={idx}
            className={brandsArray.includes(i.toLowerCase()) ? q.current : ''}
            onClick={() => sortBrands(i)}
          >
            {i.slice(0, 1).toUpperCase() + i.slice(1)} (
            {store.currentData.filter((item) => item.brand === i).length})
          </span>
        ))}
      </nav>

      <div className={q.title}>Price</div>
      <span>min</span>
      <span>max</span>

      <div className={q.title}>Availability</div>
      <div className={q.aviability}>
        <button
          className={!curAv ? [q.avBtn, q.act].join(' ') : q.avBtn}
          onClick={() => {
            chAviability(true)
          }}
          title='Show all'
        >
          all
        </button>
        <button
          className={curAv ? [q.avBtn, q.act].join(' ') : q.avBtn}
          onClick={() => {
            chAviability(false)
          }}
          title='Show in stock'
        >
          in stock
        </button>
      </div>
      <div className={q.title}>Sort by</div>
      <div className={q.aviability}>
        <button
          onClick={() => {
            setQueryPrice(!queryPrice ? 1 : queryPrice === 1 ? 2 : 1)
          }}
          className={q.avBtn}
        >
          price
          {queryPrice === 1 ? ' ▲' : queryPrice === 2 ? ' ▼' : ''}
        </button>
        <button
          onClick={() => {
            setRatingPrice(!ratingPrice ? 1 : ratingPrice === 1 ? 2 : 1)
          }}
          className={q.avBtn}
        >
          rating
          {ratingPrice === 1 ? ' ▲' : ratingPrice === 2 ? ' ▼' : ''}
        </button>
        <button
          onClick={() => {
            setQueryPrice(0)
            setRatingPrice(0)
          }}
          className={q.avBtn}
        >
          reset
        </button>
      </div>
      <div className={q.aviability}>
        <button
          className={q.avBtn}
          onClick={() => {
            store.resetData()
            sortItem('')
            // sortBrands("")
            setBrandsArray([])
          }}
        >
          reset all filters
        </button>
      </div>
    </div>
  )
}

export default observer(Aside)
