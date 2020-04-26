import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonBadge } from '@ionic/react';

import axios from 'axios'

import SupplyOrders from '../components/client_order/SupplyOrders'

interface ContainerProps {
  order: any;
}

const ClientOrderTab: React.FC<ContainerProps> = ({order}) => {
  if(!order) {
    order = {
      "index": 8,
      "#": 8,
      "COLAlloc": "40362033/5",
      "Quantity": 27.1,
      "MinQuantity": 20.46,
      "MaxQuantity": 31.46,
      "HasSalesBudgetReservation": true,
      "RequiresOrderCombination": false,
      "NrOfActiveRoutingChainUpstream": 96,
      "SelectedShippingShop": 13,
      "Вид ГП": "ПХТД",
      "DeliveryType": "ЛСТ",
      "ImgPlannedStatus": "ImgPlannedStatus3",
      "RoutingId": "40184259|1|01|059T",
      "Name": "Отгрузка ЦХПП",
      "ProductId": "QHF_0104120_C",
      "ProductName": "Х/к термообработанный прокат углеродистой стали",
      "LatestDesiredDeliveryDate": "19-апр.-2020",
      "ProductSpecificationId": "B7C26FB8153F0A2E55C028DFDD7FC174",
      "ResourceGroupIds": "G_OTGRH"
    }
  }

  const [supplyOrders, setSupplyOrders] = useState([])
  useEffect(() => {
    axios.post('http://194.67.112.246/api/v1/', {
      "table":"02.Supply Orders.xlsx",
      "filters":{
        DownstreamCustomerOrders: order.COLAlloc
      }
    }).then(function (response) {
      console.log(response.data);
      setSupplyOrders(response.data)
    })
  }, [])

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="К заказам" defaultHref="/orders" />
          </IonButtons>
            <IonTitle>Заказ №{order.COLAlloc}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Заказ №{order.COLAlloc}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem lines="none">
          <IonLabel>
            <h1>{order.Name}</h1>
          </IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonLabel>
            Дата поставки {order.LatestDesiredDeliveryDate}
          </IonLabel>
        </IonItem>
        <SupplyOrders supplyOrders={supplyOrders} />
      </IonContent>
    </IonPage>
  );
};

export default ClientOrderTab;
