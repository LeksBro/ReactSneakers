import React, {useContext, useState} from "react";
import styles from './Card.module.scss'
import {AppContext, CardsType} from "../../App";

export type ItemsType = {
    id?: string | number
    title: string
    parentId?:string | number
    imageUrl: string
    price: number

}
type CardPropsType = {
    id: string | number
    title: string
    price: number
    imageUrl: string
    onPlus?: ({id,title, parentId, imageUrl, price}: ItemsType) => void
    onAddFavorite?: ({title, imageUrl, price}: CardsType) => void
    favorited?: boolean
}
const Card: React.FC<CardPropsType> = ({favorited = false, ...props}) => {

    const [isFavorite, setIsFavorite] = useState<boolean>(favorited)
    const {isAddedItem} = useContext(AppContext)
    const {isAddedFavorite} = useContext(AppContext)
    const onClickPlus = () => {
        if (props.onPlus)
            props.onPlus({id: props.id, parentId: props.id, title: props.title, imageUrl: props.imageUrl, price: props.price})
    }

    const onFavorite = () => {
        const obj = {id: props.id, title: props.title, imageUrl: props.imageUrl, price: props.price}
        if (props.onAddFavorite)
            props.onAddFavorite(obj)
            setIsFavorite(!isFavorite)
    }
    return (
        <div className={styles.card}>
                <div className={styles.favorite} onClick={onFavorite}>
                    {props.onAddFavorite && <img src={isFavorite || !(isAddedFavorite) || isAddedFavorite(props.id) ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="unliked"/>}
                </div>
                <img width={170} height={150} src={props.imageUrl} alt="Sneakers"/>
                <h5>{props.title}</h5>

                <div className={`${styles.cardButton} d-flex justify-between align-center`}>
                <div className={'d-flex flex-column '}>
                <span>Цена:</span>
                <b>{props.price} руб.</b>
                </div>
                    {

                     props.onPlus &&  <img className={styles.plus} onClick={onClickPlus}
                             src={isAddedItem && isAddedItem(String(props.id) ? String(props.id): '') ? "../img/btn-checked.svg" : "../img/btn-plus.svg"} alt="Plus"/>
                    }


                </div>
        </div>
    )
}
export default Card