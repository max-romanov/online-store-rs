import React, {useEffect, useState} from "react"
import {IProduct} from "@/interfaces/IProduct";
import {ProductCard} from "@/components/pages/products/productCard/productCard";
import {SearchBar} from "@/components/pages/products/searchBar/searchbar";

interface IServerRes {
  products: IProduct[];
  total: number;
  skip: number;
  limit: 30;
}

interface IListProps {
  input: string,
  data: IServerRes
}

function List(props: IListProps) {
  const filtered = props.data.products.filter(product => {
    if (props.input === '') {
      return product;
    }

    return product.title.toLowerCase().includes(props.input.toLowerCase())
  })

  return (
    <div>
      {filtered.map((product) => {
        return (
          <ProductCard data={product} key={product.id} />
        )
      })}
    </div>
  )
}
export function ProductsPage() {
  const [products, setProducts] = useState<IServerRes>(null)
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    fetch('https://dummyjson.com/products').then(res => res.json())
      .then(data => {
        console.log(data)
        setProducts(data)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      {products && <>
          <SearchBar onInput={(str) => setInputValue(str)} placeholder={'search'} />
          <List data={products} input={inputValue} />
      </>}
    </div>
  )
}
