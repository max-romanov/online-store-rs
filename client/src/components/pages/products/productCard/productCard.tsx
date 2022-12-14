import React from "react";
import {IProduct} from "@/interfaces/IProduct";
interface ICardProps {
  data: IProduct
}
export function ProductCard(props: ICardProps) {
  return (
    <div className={"m-20"}>
      <h3 className={"text-3xl"}>{props.data.title}</h3>
      <span>{props.data.description}</span>
      <img className="w-[10em] rounded-md" src={props.data.images.splice(0, 1)[0]} alt=""/>
    </div>
  )
}
