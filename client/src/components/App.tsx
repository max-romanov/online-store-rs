import React from "react"
import '../index.css'
import {Header} from "@/components/header/header";
import {Page} from "@/components/page"

export function App() {
  const routes = {
    cart: {},
    products: {},
    home: {},
  }

  window.onpopstate = () => {

  }

  return (
    <>
      <Header els={Object.keys(routes)} onElClick={(elName) => {
        window.location.hash = elName
      }}/>
      <div>
        <Page />
      </div>
    </>
  )
}
