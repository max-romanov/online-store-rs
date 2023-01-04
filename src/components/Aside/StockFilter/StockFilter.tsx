import React, {useContext, useState} from "react"
import q from "../Aside.module.css";
import {Context} from "../../../index";

interface IStockFilterProps {
  onStockFilterChange: (min: number, max: number) => void
}

export const StockFilter = (props: IStockFilterProps) => {
  const {store} = useContext(Context)

  const [minStock, setMinStock] = useState(0)
  const [maxStock, setMaxStock] = useState(Math.max(...store.currentData.map(it => it.stock)))

  return (
    <div className={q.inputsContainer}>
      <h3>Stock Filter</h3>
      <label htmlFor="min">max current value: {minStock}</label>
      <input type="range" onChange={(e) => {
        setMinStock(e.currentTarget.valueAsNumber)
        props.onStockFilterChange(minStock, maxStock)
      }} min={Math.min(...store.currentData.map(it => it.stock))}
             max={Math.max(...store.currentData.map(it => it.stock))} name={"min"}/>

      <label htmlFor="max">max current value: {maxStock}</label>
      <input type="range" onChange={(e) => {
        setMaxStock(e.currentTarget.valueAsNumber)
        props.onStockFilterChange(minStock, maxStock)
      }} min={Math.min(...store.currentData.map(it => it.stock))}
             max={Math.max(...store.currentData.map(it => it.stock))} name={"max"}/>
    </div>
  )
}
