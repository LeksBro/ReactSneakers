import React, {ChangeEvent, createContext, Dispatch, SetStateAction, useEffect, useState} from 'react';
import './App.css';
import Header from "./Components/Header";
import Drawer from "./Components/Drawer/Drawer";
import axios from "axios";
import {Route} from 'react-router-dom'
import Home from "./pages/Home";
import Favorites from "./pages/favorites";
import Orders from "./pages/Orders";
import {ItemsType} from "./Components/Card/Card";
export type CardsType = {
    id?: string | number
    title: string
    price: number
    imageUrl: string
}
export type ContextProps = {
    items: Array<CardsType>
    cartItems: Array<ItemsType>
    favorites: Array<CardsType>
    removeFavorite: (obj: CardsType) => void
    isAddedItem: (id: string | number) => boolean
    setCartOpened: (cartOpened: boolean) => void
    isAddedFavorite: (id: string | number) => boolean
    setCartItems: Dispatch<SetStateAction<CardsType[]>>
}
export const AppContext = createContext<Partial<ContextProps>>({})

function App() {
  const [items, setItems] = useState<Array<ItemsType>>([])
  const [cartItems, setCartItems] = useState<Array<ItemsType>>([])
  const [favorites, setFavorites] = useState<Array<CardsType>>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [cartOpened, setCartOpened] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

    console.log(cartItems)
useEffect(() => {
    async function fetchData () {
        setIsLoading(true)
        try {
            await  axios.get<Array<ItemsType>>('https://60d626fe943aa60017768e96.mockapi.io/cart')
                .then(res => setCartItems(res.data))
            await axios.get<Array<CardsType>>('https://60d626fe943aa60017768e96.mockapi.io/items')
                .then(res => setItems(res.data))
            setIsLoading(false)
        }
        catch (error) {
            alert('Не удалось выполнить запрос')
        }

    }
    fetchData()

},[])
    const onAddToCart = async (obj: CardsType) => {
      const findItem = cartItems.find(card => card.parentId == obj.id)
    if (findItem){
        console.log(cartItems)
        axios.delete(`https://60d626fe943aa60017768e96.mockapi.io/cart/${String(findItem.id)}`)
            .then(res => setCartItems(prevState => prevState.filter(card => card.parentId != obj.id)))
    }else {
            await axios.post<Array<ItemsType>>('https://60d626fe943aa60017768e96.mockapi.io/cart', obj)
            axios.get<Array<ItemsType>>('https://60d626fe943aa60017768e96.mockapi.io/cart')
            .then(res => setCartItems(prevState => [...res.data]))
    }
}
    const onRemoveCartItem = async  (id: string) => {
        await axios.get<Array<CardsType>>('https://60d626fe943aa60017768e96.mockapi.io/items')
            .then(res => setItems(res.data))
        axios.delete(`https://60d626fe943aa60017768e96.mockapi.io/cart/${id}`)
        .then(res => {
            setCartItems(prevState => prevState.filter(cart => cart.id != id))
        })
}
    const onSearchInputClear = () => {
      setSearchValue('')
}
    const onChangeSearchInput = (event:ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value)
}
    const onAddFavorite  = (obj: CardsType) => {
    axios.post('https://60d626fe943aa60017768e96.mockapi.io/favorites',obj)
}
    const removeFavorite = (obj: CardsType) => {
        axios.delete(`https://60d626fe943aa60017768e96.mockapi.io/favorites/${obj.id}`)
            .then(() => {
                setFavorites(prevState => prevState.filter(card => card.id !== obj.id))
            })
    }
    const isAddedItem = (id: string | number) => {
      return cartItems.some(card => card.parentId == id)
    }
    const isAddedFavorite = (id:string | number ) => {
        return favorites.some(card => card.id == id)
    }
    return (
        <AppContext.Provider value = {
            {items,cartItems,favorites, removeFavorite,isAddedItem, setCartOpened, setCartItems,isAddedFavorite }}>
        <div className="wrapper clear">
            <div style={{textAlign: 'center'}}>

            </div>
                <Drawer
                    onClose = {() => setCartOpened(false)}
                    onRemove={onRemoveCartItem}
                    opened = {cartOpened}
                />
            <Header
                onClickKart = {() => setCartOpened(true)}
            />
            <Route path={'/'} exact>
                <Home
                    cartItems={cartItems}
                    searchValue={searchValue}
                    items={items}
                    onAddToCart={onAddToCart}
                    onSearchInputClear={onSearchInputClear}
                    onChangeSearchInput={onChangeSearchInput}
                    onAddFavorite={onAddFavorite}
                    isLoading={isLoading}
                />
            </Route>
            <Route path={'/favorites'} exact >
                < Favorites setFavorites={setFavorites}/>
            </Route>
            <Route path={'/orders'} exact >
                < Orders/>
            </Route>
        </div>
        </AppContext.Provider>
    );
}

export default App;
