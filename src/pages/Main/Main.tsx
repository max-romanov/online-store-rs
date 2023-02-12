import React, { useContext, useEffect, useState } from 'react'
import q from './Main.module.css'
import Aside from '../../components/Aside/Aside'
import { observer } from 'mobx-react-lite'
import Category from '../Category/Category'
import { Context } from '../../index'
import { IProduct } from '../../interfaces/IProduct'
import { SearchBar } from '../../components/Search/Search'

const Main = () => {
  const { store } = useContext(Context)

  const [items, setItems] = useState(store.currentData)
  const [brandsFilter, setBrandsFilter] = useState<string[]>([])

  useEffect(() => {
    setItems(store.currentData)
    setBrandsFilter([])
  }, [store.currentData])

  useEffect(() => {
    if (!store.allData.length) {
      store.setStore().then((d) => {
        setItems(store.currentData)
      })
    }
  }, [])

  const itemsFilter = (arg: string) => {
    if (brandsFilter.includes(arg)) {
      setBrandsFilter(brandsFilter.filter((it: string) => it !== arg))
    } else {
      setBrandsFilter((brandsFilter: Array<string>) => [...brandsFilter, arg])
    }
  }

  useEffect(() => {
    if (brandsFilter.length) {
      setItems(
        store.currentData.filter((it: IProduct) =>
          brandsFilter.includes(it.brand.toLowerCase())
        )
      )
    } else {
      setItems(store.currentData)
    }
  }, [brandsFilter])

  // const availability = () => {
  //
  // }

  const [mainSearch, setMainSearch] = useState(false)

  const onSearch = (text: string) => {
    setItems(
      store.currentData.filter((el) => {
        return (
          el.title.toLowerCase().includes(text.toLowerCase()) ||
          el.brand.toLowerCase().includes(text.toLowerCase()) ||
          el.description.toLowerCase().includes(text.toLowerCase()) ||
          el.price.toString().toLowerCase().includes(text.toLowerCase()) ||
          el.discountPercentage
            .toString()
            .toLowerCase()
            .includes(text.toLowerCase())
        )
      })
    )
    if (!mainSearch) {
      setMainSearch(true)
    }
  }
  const [text, setText] = useState('')

  useEffect(() => {
    setText('')
  }, [store.currentData])

  return (
    <div className={q.mainPage}>
      <div className={q.asideField}>
        <Aside itemsFilter={itemsFilter} />
      </div>
      <div className={q.searchBarWrapper}>
        <SearchBar
          text={text}
          setText={setText}
          placeholder='search here'
          onSearch={onSearch}
        />
        <span
          style={{ transform: 'translate(-130%, 10%)' }}
          className='material-symbols-outlined'
          onClick={() => {
            setText('')
            store.resetData()
          }}
        >
          cancel
        </span>
      </div>
      <div className={q.mainField}>
        <Category items={items} />
      </div>
    </div>
  )
}

export default observer(Main)
