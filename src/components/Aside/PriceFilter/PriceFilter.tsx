import React, {useContext, useState} from "react"
import {Context} from "../../../index";
import q from "../Aside.module.css";

interface IPriceFilterProps {
  onPriceFilterInputChange: (min: number, max: number) => void,
}

export const PriceFilter = (props: IPriceFilterProps) => {
  const { store } = useContext(Context)

  const [minPriceFilter, setMinPriceFilter] = useState(0)
  const [maxPriceFilter, setMaxPriceFilter] = useState(Math.max(...store.currentData.map(it => it.price)))

  return (
    <div className={q.inputsContainer}>
      <h3>Price Filter</h3>
      <label htmlFor="min">min current value: { minPriceFilter }$</label>
      <input name={"min"} max={Math.max(...store.currentData.map(x => x.price))} type="range" onChange={(e) => {
        setMinPriceFilter(e.currentTarget.valueAsNumber)
        props.onPriceFilterInputChange(minPriceFilter, maxPriceFilter)
      }}/>
      <label htmlFor="max">max current value: {maxPriceFilter}$</label>
      <input name="max" type="range" max={Math.max(...store.currentData.map(x => x.price))} onChange={(e) => {
        setMaxPriceFilter(e.currentTarget.valueAsNumber)
        props.onPriceFilterInputChange(minPriceFilter, maxPriceFilter)
      }}/>
    </div>
  )
}
