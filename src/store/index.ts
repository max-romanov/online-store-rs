import {makeAutoObservable} from "mobx";
import {IProduct} from "../interfaces/IProduct";


export default class Store {
    private readonly address: string = 'https://dummyjson.com/products?limit=100'

    allData: Array<IProduct> = []
    categories: Array<string> = []
    basket: Array<IProduct> = []
    currentData: Array<IProduct> = []

    constructor() {
        this.setBasket()
        makeAutoObservable(this)
    }

    setBasket() {
        const storageValue = localStorage.getItem("basket")
        if (!storageValue) {
            return
        }
        const parsed = JSON.parse(storageValue)
        if (!(parsed instanceof Array<IProduct>)) {
            throw new Error("?")
        }

        this.basket = parsed
    }

    async setStore() {
        try {
            await fetch(this.address)
                .then(res => res.json())
                .then(({products}) => {
                    this.setData(products)
                })
        } catch (e) {
            throw new Error('Bad day !!!')
        }
    }

    setData(arr: Array<IProduct>): void {
        if (!this.categories.length) {
            const categories = Array.from(new Set(arr.map(i => i.category)))
            this.categories.push(...categories)
        }
        this.allData.push(...arr)
        this.currentData.push(...this.allData)
    }

    setCurrentCategory(arg: string) {
        this.currentData = this.allData.filter(i => arg.length ? i.category === arg : i)
    }

    addToBasket(item: IProduct) {
        this.basket.push(item)
        localStorage.setItem("basket", JSON.stringify(this.basket))
    }

    clearBasket() {
        this.basket = []
        localStorage.setItem("basket", JSON.stringify(this.basket))
    }

    // setBrands() {
    //     const tempData = this.currentData.length ? this.currentData : this.allData
    //     const brands = Array.from(new Set(tempData.map(i => i.brand)
    //     ))
    //     if (this.brands.length) this.brands.length = 0
    //     this.brands.push(...brands)
    //     console.log(this.currentData)
    // }
}
