import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import q from './Aside.module.css'
import {IProduct} from "../../interfaces/IProduct";


const Aside = ({itemsFilter}: { itemsFilter: Function }) => {

    const {store} = useContext(Context)

    const [current, setCurrent] = useState('')

    const [brandsArray, setBrandsArray]: [brandsArray: Array<string>, setBrandsArray: Function] = useState([])

    const setBrandFunction = (arg: Array<IProduct>): Array<string> => Array.from(new Set(arg.map((i: IProduct) => i.brand)))

    const setFilter = (arg: Array<string>, i:string | undefined) => {
        setBrandsArray(arg)
        if (i?.length) itemsFilter(i.toLowerCase())
    }

    const sortBrands = (i: string) => {
        if (brandsArray.includes(i.toLowerCase())) {
            const temp = JSON.parse(JSON.stringify(brandsArray.filter(it => it !== i.toLowerCase())))
            setFilter(temp,i)
        } else {
            const temp = JSON.parse(JSON.stringify(brandsArray))
            temp.push(i.toLowerCase())
            setFilter(temp,i)
        }

    }

    const sortItem = (arg: string) => {
        if (current !== arg) {
            store.setCurrentCategory(arg)
            setCurrent(arg)
            setFilter([],'')
        }
    }

    const [curAv, setCurAv] = useState(false)

    const chAviability = () => {
        setCurAv(!curAv)
    }

    return (
        <div className={q.asideField}>
            <div className={q.title}>
                Categories
            </div>
            <nav className={q.asideCategories}>

                {store.categories.map((i, idx) =>
                        // <Link key={idx} to={"all_items/" + i}>{i.slice(0,1).toUpperCase() + i.slice(1)}</Link>
                        <span
                            key={idx}
                            className={i === current ? (q.current) : ''}
                            onClick={() => sortItem(i)}>
                        {i.slice(0, 1).toUpperCase() + i.slice(1)} ({store.allData.filter(item => item.category === i).length})
                </span>
                )}
                <span onClick={() => sortItem('')}>All ({store.categories.length})</span>
            </nav>

            <div className={q.title}>
                Brands
            </div>

            <nav className={q.asideCategories}>

                {setBrandFunction(store.currentData).map((i, idx) =>
                    // <Link key={idx} to={"all_items/" + i}>{i.slice(0,1).toUpperCase() + i.slice(1)}</Link>
                    <span
                        key={idx}
                        className={brandsArray.includes(i.toLowerCase()) ? (q.current) : ''}
                        onClick={() => sortBrands(i)}
                    >
                        {i.slice(0, 1).toUpperCase() + i.slice(1)} ({store.currentData.filter(item => item.brand === i).length})
                    </span>
                )}
            </nav>

            <div className={q.title}>
                Price
            </div>
            <span>min</span>
            <span>max</span>

            <div className={q.title}>
                Availability
            </div>
            <div className={q.aviability}>
                <button
                    className={!curAv ? [q.avBtn, q.act].join(' ') : q.avBtn}
                    onClick={chAviability}
                    title="Show all"
                >all</button>
                <button
                    className={curAv ? [q.avBtn, q.act].join(' ') : q.avBtn}
                    onClick={chAviability}
                    title="Show in stock"
                >in stock</button>
            </div>
        </div>
    );
};

export default observer(Aside);
