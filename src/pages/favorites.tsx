import React, {useContext, useEffect, useState} from "react";
import Card from "../Components/Card/Card";
import {AppContext, CardsType} from "../App";
import axios from "axios";

type FavoritesPropsType = {
    setFavorites: (data: CardsType[]) => void
}

const Favorites: React.FC<FavoritesPropsType> = ({setFavorites}) => {

 const {favorites,removeFavorite, items} = useContext(AppContext)
useEffect(() => {
     axios.get<Array<CardsType>>('https://60d626fe943aa60017768e96.mockapi.io/favorites')
        .then(res => setFavorites(res.data))
},[])
    return(

      <div className="content p-40">
            <div className={'d-flex align-center mb-40 justify-between'}>
                <h1>"Избраное"</h1>
            </div>
            <div className="sneakersItems d-flex">
                {

                       favorites && favorites.map( (card,index) => {
                           return  <Card
                               id={card.id ? card.id : index}
                               key={card.id}
                               title={card.title}
                               price={card.price}
                               imageUrl={card.imageUrl}
                               favorited={true}
                               onAddFavorite={removeFavorite}
                           />
                       })
                }
            </div>
        </div>
    )
}
export default Favorites