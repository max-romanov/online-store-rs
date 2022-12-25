import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import q from './Aside.module.css'
import {IProduct} from "../../interfaces/IProduct";


interface IAsideProps {
  itemsFilter: (arg: string) => void
  onPriceFilterInputChange: (min: number, max: number) => void,
  onStockFilterChange: (min: number, max: number) => void
}

const Aside = (props: IAsideProps) => {
  const {store} = useContext(Context)

  const [minStock, setMinStock] = useState(0)
  const [maxStock, setMaxStock] = useState(Math.max(...store.currentData.map(it => it.stock)))

  const [minPrice, setMinPrice] = useState(0)
  const [maxPriceFilter, setMaxPriceFilter] = useState(Math.max(...store.currentData.map(it => it.stock)))

  const [current, setCurrent] = useState('')

  const [brandsArray, setBrandsArray]: [brandsArray: Array<string>, setBrandsArray: Function] = useState([])

  const setBrandFunction = (arg: Array<IProduct>): Array<string> => Array.from(new Set(arg.map((i: IProduct) => i.brand)))

  const setFilter = (arg: Array<string>, i?: string) => {
    setBrandsArray(arg)
    if (i && i.length) {
      props.itemsFilter(i.toLowerCase())
    }
  }

  const sortBrands = (i: string) => {
    if (brandsArray.includes(i.toLowerCase())) {
      const temp = JSON.parse(JSON.stringify(brandsArray.filter(it => it !== i.toLowerCase())))
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
  // sortPrice(10, 15)

  // let minPrice = 0
  // let maxPriceFilter = 0
  //
  // let minStock = 0;
  // let maxStock = 0;

  return (
    <div className={q.asideField}>
      <div className={q.title}>
        Categories
      </div>
      <nav className={q.asideCategories}>

        {store.categories.map((i, idx) =>
          // <Link key={idx} to={"all_items/" + i}>{i.slice(0,1).toUpperCase() + i.slice(1)}</Link>
          <span
            key={idx}
            className={i === current ? (q.current) : ''}
            onClick={() => sortItem(i)}>
                        {i.slice(0, 1).toUpperCase() + i.slice(1)} ({store.allData.filter(item => item.category === i).length})
                </span>
        )}
        <span onClick={() => sortItem('')}>All ({store.categories.length})</span>
      </nav>

      <div className={q.title}>
        Brands
      </div>

      <nav className={q.asideCategories}>

        {setBrandFunction(store.currentData).map((i, idx) =>
          // <Link key={idx} to={"all_items/" + i}>{i.slice(0,1).toUpperCase() + i.slice(1)}</Link>
          <span
            key={idx}
            className={brandsArray.includes(i.toLowerCase()) ? (q.current) : ''}
            onClick={() => sortBrands(i)}
          >
                        {i.slice(0, 1).toUpperCase() + i.slice(1)} ({store.currentData.filter(item => item.brand === i).length})
                    </span>
        )}
      </nav>

      <div>
        <div className={q.inputsContainer}>
          <h3>Price Filter</h3>
          <label htmlFor="min">min</label>
          <input name={"min"} max={Math.max(...store.currentData.map(x => x.price))} type="range" value="0" onChange={(e) => {
            setMinPrice(e.currentTarget.valueAsNumber)
            props.onPriceFilterInputChange(minPrice, maxPriceFilter)
          }}/>
          <label htmlFor="max">max</label>
          <input name="max" type="range" max={Math.max(...store.currentData.map(x => x.price))} onChange={(e) => {
            setMaxPriceFilter(e.currentTarget.valueAsNumber)
            props.onPriceFilterInputChange(minPrice, maxPriceFilter)
          }}/>
        </div>
      </div>
      <div className={q.inputsContainer}>
        <h3>Stock Filter</h3>
        <input type="range" value={""} onChange={(e) => {
          setMinStock(e.currentTarget.valueAsNumber)
          props.onStockFilterChange(minStock, maxStock)
        }} min={Math.min(...store.currentData.map(it => it.stock))} max={Math.max(...store.currentData.map(it => it.stock))} name={"min"}/>

        <input type="range" value={""} onChange={(e) => {
          setMaxStock(e.currentTarget.valueAsNumber)
          props.onStockFilterChange(minStock, maxStock)
        }} min={Math.min(...store.currentData.map(it => it.stock))} max={Math.max(...store.currentData.map(it => it.stock))} name={"max"}/>
      </div>
    </div>
  );
};

export default observer(Aside);
