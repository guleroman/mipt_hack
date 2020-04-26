import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import ClientOrders from '../components/ClientOrders'

import axios from 'axios'

import './Tab1.css';

interface CP {
  onOrdersFetch: Function;
}

const OrdersTab: React.FC<CP> = ({onOrdersFetch}) => {

  const [orders, setOrders] = useState([])
  const [query, setQuery] = useState('')
  useEffect(() => {
    var filters = { HasSalesBudgetReservation: true }
    if(query != '') {
      (filters as any).COLAlloc = query
    }
    axios.post('http://194.67.112.246/api/v1/', {
      "table":"01.COLs.xlsx",
      "filters": filters
    }).then(function (response) {
      console.log(response.data);
      setOrders(response.data)
    })
  }, [query])


  useEffect(() => {
    onOrdersFetch(orders)
  }, [orders])

  const onQueryChange = (val:string) => {
    setQuery(val)
  }
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Клиенские заказы</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Клиенские заказы</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ClientOrders orders={orders} onQueryChange={onQueryChange} />
      </IonContent>
    </IonPage>
  );
};

export default OrdersTab;
