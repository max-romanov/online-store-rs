import {observer} from "mobx-react-lite";
import Item from "../../components/Item/Item";
import q from './Category.module.css'
import {IProduct} from "../../interfaces/IProduct";


const Category = ({items} : {items: Array<IProduct>}) => {

    return (
        <div className={q.category}>
            {items.length
                ? items.map((it: IProduct) =>
                    <Item key={it.id} {...it} showControls={false}/>
                )
                : <span className={q.empty}>Loading ...</span>}
        </div>
    );
};

export default observer(Category);
