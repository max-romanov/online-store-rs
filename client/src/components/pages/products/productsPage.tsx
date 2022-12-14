import React, {useEffect, useState} from "react"
import {IProduct} from "@/interfaces/IProduct";
import {ProductCard} from "@/components/pages/products/productCard/productCard";

interface IServerRes {
  products: IProduct[];
  total: number;
  skip: number;
  limit: 30;
}
export function ProductsPage() {
  const [products, setProducts] = useState<IServerRes>(null)

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
      {products && products.products.map((product, indx) => {
        return (
          <ProductCard key={indx} data={product}/>
        )
      })}
    </div>
  )
}
