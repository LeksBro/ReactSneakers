import React, {useContext, useEffect, useState} from "react";
import {AppContext, CardsType} from "../App";
import Card from "../Components/Card/Card";
import axios from "axios";
import CardLoader from "../Components/Card/CardLoader";

const Orders = () => {
    const {} = useContext(AppContext)
    const [orders, setOrders] = useState<Array<CardsType>>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
useEffect(() => {

    setIsLoading(true);
    ( () => {
         axios.get('https://60d626fe943aa60017768e96.mockapi.io/order')
             .then(res => {
                 console.log(res.data.map((obj: { items: any; }) => obj.items).flat())
                 setOrders(res.data.reduce((arg: any, obj: { items: any; }) => [...arg, ...obj.items],[]))
                 setIsLoading(false)
             })
    })()

},[])
    return(

        <div className="content p-40">
            <div className={'d-flex align-center mb-40 justify-between'}>
                <h1>"Мои заказы"</h1>
            </div>
            <div className="sneakersItems d-flex">
                {
                    isLoading
                        ? [...Array(8)].map((fakeKart) => <CardLoader />)
                        : orders.map((card,index) => {
                        return   <Card
                            id={card.id ? card.id: index}
                            key={card.id}
                            title={card.title}
                            price={card.price}
                            imageUrl={card.imageUrl}
                            favorited={false}
                        />
                    })
                }
            </div>
        </div>
    )
}
export default Orders