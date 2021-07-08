import React, {useEffect, useState} from "react";
import { CardsType} from "../../App";
import Info from "../info";
import axios from "axios";
import {useCart} from "../../hooks/useCart";
import style from './Drawer.module.scss'
import {ItemsType} from "../Card/Card";
type DrawerPropsType = {
    onClose: () => void
    onRemove: (id: string) => void
    opened: boolean
}

const Drawer: React.FC<DrawerPropsType> =({onClose, onRemove, opened}) => {

    const [isOrderCompleted, setIsOrderCompleted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const {cartItems, setCartItems, totalPrice} = useCart()

    const taxPrice = totalPrice && totalPrice / 100 * 5
    const delay = () => new Promise((resolve) => setTimeout(resolve, 1000))
    const onClickOrder = async (obj: Array<CardsType> | undefined) => {
        setIsLoading(true)
        try {
          let {data} = await axios.post(`https://60d626fe943aa60017768e96.mockapi.io/order`,{items: cartItems})
            console.log(cartItems)
            if (cartItems){
                for (let i = 0; i < cartItems?.length; i++){

                    let cart = cartItems[i]
                   await axios.delete(`https://60d626fe943aa60017768e96.mockapi.io/cart/${cart.parentId}`)
                    await delay()
                }
            }
            setOrderId(data.id)
            setIsOrderCompleted(true)
            if (setCartItems) {
                setCartItems([])
            }
        } catch (error) {
            alert('Не удалось создать заказ')
            console.log(error)
        }
        setIsLoading(false)
    }
return(
    <div className={`${style.overlay} ${opened ? style.overlayVisible : ''}`}>
    <div className={style.drawer}>
        <h2 className={'mb-40'}>Корзина <img onClick={onClose} className={'removeBtn'} src="/img/btn-remove.svg" alt="remove"/></h2>
        {
            cartItems && cartItems.length > 0
                ?
                <div className="d-flex flex-column flex">
                    <div className="items">
                        {cartItems?.map((obj ,index) =>{
                            return (
                                <div key={index} className="cartItem d-flex align-center mb-20">
                                    <div
                                        style={{ backgroundImage: `url(${obj.imageUrl})` }}
                                        className="cartItemImg">

                                    </div>

                                    <div className="mr-20 flex">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    <img
                                        onClick={() =>{

                                            onRemove(String(obj.id))}
                                        }
                                        className="removeBtn"
                                        src="/img/btn-remove.svg"
                                        alt="Remove"
                                    />
                                </div>
                            )
                        } )}
                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <b>{totalPrice}</b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <b>{taxPrice && Math.ceil(taxPrice)}</b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={() => onClickOrder(cartItems)} className="greenButton">
                                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
                            </button>
                        </div>
                    </div>

                </div>
                :
                <Info
                    title={isOrderCompleted? 'Заказ оформлен!':'Корзина Пуста'}
                    image={isOrderCompleted? '/img/complete-order.jpg': '/img/empty-cart.jpg'}
                    description={isOrderCompleted? `Ваш заказ ${orderId} скоро будет передан курьерской доставке` :'Добавьте хотябы одну пару кроссовок чтобы сделать заказ'}/>

        }


    </div>
    </div>
)
}
export default Drawer