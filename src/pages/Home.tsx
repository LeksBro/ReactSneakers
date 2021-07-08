import Card, {ItemsType} from "../Components/Card/Card";
import React, {ChangeEvent, useContext} from "react";
import {AppContext, CardsType} from "../App";
import CardLoader from "../Components/Card/CardLoader";
type HomePropsType = {
  cartItems: Array<CardsType>
  searchValue: string
  items: Array<ItemsType>
  onAddToCart: (object: CardsType) => void
  onSearchInputClear: () => void
  onChangeSearchInput: (event: ChangeEvent<HTMLInputElement>) => void
  onAddFavorite: (obj: CardsType) => void
  isLoading: boolean

}
const Home: React.FC<HomePropsType> = ({ isLoading,cartItems,searchValue,items, onAddToCart, onSearchInputClear, onChangeSearchInput, onAddFavorite,}
) => {


    const renderItems = () => {

     return isLoading
           ? [...Array(12)].map((fakeCard, index) => <CardLoader key={index} />)
           : items.filter(card => card.title.toLowerCase().includes(searchValue.toLowerCase()))
            .map((card,index) =>{
                return <Card
                    key={card.id}
                    title={card.title}
                    price={card.price}
                    id={card.id? card.id : index}
                    imageUrl={card.imageUrl}
                    onAddFavorite={onAddFavorite}
                    onPlus={(obj) => onAddToCart(obj)}
                />
            } )
    }
    return <div className="content p-40">
        <div className={'d-flex align-center mb-40 justify-between'}>
            <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : "Все кроссовки"}</h1>
            <div className="search-block d-flex">

                <img src="/img/search.svg" alt="search"/>
                {searchValue &&
                <img onClick={onSearchInputClear} className={'clear'} src="/img/btn-remove.svg" alt="clear"/>}
                <input onChange={onChangeSearchInput} value={searchValue} placeholder={'Поиск...'}/>
            </div>
        </div>
        <div className="sneakersItems d-flex">
            {
                renderItems()
            }
        </div>
    </div>
}
export default Home