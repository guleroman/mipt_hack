import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonLabel, IonItem, IonItemGroup, IonItemDivider } from '@ionic/react';

import axios from 'axios'

import Operations from '../components/client_order/Operations'

interface CP {
  orderId: any;
  supplyOrderId: string;
}

const SupplyOrderTab: React.FC<CP> = ({ orderId, supplyOrderId }) => {
  const [supplyOrder, setSupplyOrder] = useState(null)
  const [operations, setOperations] = useState([])
  const [routing, setRouting] = useState(null)

  useEffect(() => {
    axios.post('http://194.67.112.246/api/v1/', {
      "table": "02.Supply Orders.xlsx",
      "filters": {
        'ID план. зак.': supplyOrderId
      }
    }).then(function (response) {
      console.log(response.data);
      setSupplyOrder(response.data[0])
    })
  }, [])

  useEffect(() => {
    axios.post('http://194.67.112.246/api/v1/', {
      "table": "03.Operations.xlsx",
      "filters": {
        Id: supplyOrderId
      }
    }).then(function (response) {
      setOperations(response.data)
    })
  }, [])

  useEffect(() => {
    if (supplyOrder) {
      axios.post('http://194.67.112.246/api/v1/', {
        "table": "05.Routrings.xlsx",
        "filters": {
          RoutingId: (supplyOrder as any).RoutingId
        }
      }).then(function (response) {
        setRouting(response.data[0])
      })
    }

  }, [supplyOrder])
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Назад" defaultHref="/orders" />
          </IonButtons>
          <IonTitle>Плановый заказ</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Плановый заказ</IonTitle>
          </IonToolbar>
        </IonHeader>
        {
          supplyOrder &&
          <>
            <IonItem lines="none">
              <IonLabel className="ion-text-wrap">
                <h1>{supplyOrder!['Название продукта']}</h1>
              </IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel>
                Начало {(supplyOrder!['Начало'] as any).split(' ')[0]}
              </IonLabel>
            </IonItem>
            <IonItem lines="full">
              <IonLabel>
                Окончание {(supplyOrder!['Окончание'] as any).split(' ')[0]}
              </IonLabel>
            </IonItem>
          </>
        }

        {
          routing &&
          <>
            <IonItemGroup >
              <IonItemDivider color="primary">
                <IonLabel>Данные маршрута</IonLabel>
              </IonItemDivider>

              <IonItem lines="none">
                <IonLabel>Входной продукт {(routing as any).InputProductId}</IonLabel>
              </IonItem>
              <IonItem lines="none">
                <IonLabel>Выходной продукт {(routing as any).OutputProductId}</IonLabel>
              </IonItem>
            </IonItemGroup>
          </>
        }

        {supplyOrder && <Operations orderId={orderId} operations={operations} supplyOrder={supplyOrder} />}
      </IonContent>
    </IonPage>
  );
};

export default SupplyOrderTab;
