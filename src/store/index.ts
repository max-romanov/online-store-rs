import { makeAutoObservable } from 'mobx'
import { IProduct, IProductB } from '../interfaces/IProduct'
import { all_data, ls_basket, old_promo } from '../constants'
import { IPromocode } from '../promoCodes'

export default class Store {
  private readonly address: string = 'https://dummyjson.com/products?limit=100'

  allData: Array<IProduct> = []
  categories: Array<string> = []
  basket: Array<IProductB> = []
  currentData: Array<IProduct> = []
  promoCodes: IPromocode[]
  oldPromoCodes: Array<string> = []
  sA: boolean = true

  constructor(codes: IPromocode[]) {
    makeAutoObservable(this)
  }

  async setStore() {
    if (!localStorage.getItem(all_data)) {
      try {
        await fetch(this.address)
          .then((res) => res.json())
          .then(({ products }) => {
            this.setData(products)
            localStorage.setItem(all_data, JSON.stringify(products))
          })
      } catch (e) {
        throw new Error('Bad day !!!')
      }
    } else {
      const data = localStorage.getItem(all_data)
      if (data) {
        this.setData(JSON.parse(data))
      }
    }
  }

  setData(arr: Array<IProduct>): void {
    if (!this.categories.length) {
      const categories = Array.from(new Set(arr.map((i) => i.category)))
      this.categories.push(...categories)
    }
    this.allData.push(...arr)
    this.currentData.push(...this.allData)
    const bskt = localStorage.getItem(ls_basket)
    if (bskt) this.basket.push(...JSON.parse(bskt))
    const oldP = localStorage.getItem(old_promo)
    if (oldP) this.oldPromoCodes.push(...JSON.parse(oldP))
  }

  setCurrentCategory(arg: string) {
    this.currentData = this.allData.filter((i) =>
      arg.length ? i.category === arg : i
    )
  }

  addToBasket(item: IProduct) {
    const temp = { ...item, count: 1 }
    this.basket.push(temp)
    localStorage.setItem(ls_basket, JSON.stringify(this.basket))
  }

  setOldPromo(code: string) {
    this.oldPromoCodes.push(code)
    localStorage.setItem(old_promo, JSON.stringify(this.oldPromoCodes))
  }

  buy(promo: string) {
    if (promo) this.setOldPromo(promo)

    const temp = this.basket.map(({ id, count }) => [id, count])
    temp.forEach((it) => {
      const curr = this.allData.find((q) => q.id === it[0])
      if (curr) curr.stock -= it[1]
    })

    this.clearBasket()
    localStorage.setItem(all_data, JSON.stringify(this.allData))
  }

  showAll() {
    this.sA = !this.sA
  }

  clearBasket() {
    this.basket.length = 0
    localStorage.removeItem(ls_basket)
  }

  filterBasket(arr: Array<IProductB>) {
    this.clearBasket()
    this.basket.push(...arr)
    localStorage.setItem(ls_basket, JSON.stringify(this.basket))
  }

  setBasketCount({ id }: { id: number }, arg: boolean) {
    if (arg) {
      this.basket.map((it) => (it.id === id ? (it.count += 1) : it))
    } else {
      this.basket.map((it) => (it.id === id ? (it.count -= 1) : it))
    }
    localStorage.setItem(ls_basket, JSON.stringify(this.basket))
  }
}
