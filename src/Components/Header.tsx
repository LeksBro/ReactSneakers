import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {AppContext} from "../App";
type HeaderPropsType = {
    onClickKart: () => void
}
function Header(props:HeaderPropsType) {
const {cartItems} = useContext(AppContext)
let totalPrice = cartItems?.reduce((sum, obj) => obj.price + sum,0)
return(
    <header className={'d-flex justify-between align-center'}>
        <Link to={'/'}>
        <div className={'d-flex align-center'}>

            <img width={40} height={40} src="../img/logo.png" alt="#"/>

            <div>
                <h3 className={'text-uppercase'}>React Sneakers</h3>
                <p className={'opacity-5'}>Мазазин лучших кросовок</p>
            </div>

        </div>
    </Link>
        <ul className={'d-flex'}>
            <li className={'mr-30 cu-p'} onClick={props.onClickKart}>
                <img src="../img/card.svg" alt="Корзина"/>
                <span>{totalPrice}</span>
            </li>
            <li className={'mr-30 cu-p'}>
                <Link to={'/favorites'}>
                <img src="../img/heartFavorites.svg" alt="Закладки"/>
                </Link>
            </li>
            <li>
                <Link to={'/orders'}>
                <img src="../img/user.svg" alt="Пользователь"/>
                </Link>
            </li>
        </ul>
    </header>
)
}
export default Header