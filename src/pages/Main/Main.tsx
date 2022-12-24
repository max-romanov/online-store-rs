import React, {useContext, useEffect, useState} from 'react';
import q from './Main.module.css'
import Aside from "../../components/Aside/Aside";
import {observer} from "mobx-react-lite";
import Category from "../Category/Category";
import {Context} from "../../index";
import {IProduct} from "../../interfaces/IProduct";

const Main = () => {
    const {store} = useContext(Context)

    const [items, setItems] = useState(store.currentData)
    const [brandsFilter, setBrandsFilter]: [brandsFilter: Array<string>, setBrandsFilter: Function] = useState([])

    useEffect(() => {
        setItems(store.currentData)
        setBrandsFilter([])
    }, [store.currentData])

    useEffect(() => {
        if (!store.allData.length) {
            store.setStore()
                .then(d => {
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
            setItems(store.currentData.filter((it: IProduct) => brandsFilter.includes(it.brand.toLowerCase())))
        } else {
            setItems(store.currentData)
        }
    }, [brandsFilter])


    return (
        <div className={q.mainPage}>
            <div className={q.asideField}>
                <Aside itemsFilter={itemsFilter}/>
            </div>
            <div className={q.mainField}>
                <Category items={items}/>
            </div>
        </div>
    );
};

export default observer(Main);
