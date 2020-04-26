import React from 'react';
import { IonList, IonListHeader, IonTitle, IonLabel, IonItem, IonAvatar, IonChip, IonBadge, IonSearchbar } from '@ionic/react';

interface CP {
  supplyOrders: any
}

const SupplyOrders: React.FC<CP> = ({supplyOrders }) => {
  const supplyOrderItems = supplyOrders.map((co:any) => {
    return <IonItem key={co['#']} routerLink={`/orders/${co.DownstreamCustomerOrders.replace('/', '_')}/supply_orders/${co['ID план. зак.']}`} button>
      <IonLabel className="ion-text-wrap">
        <h2>{co['Название продукта']}</h2>
        <p>Начало {co['Начало'].split(' ')[0]}</p>
        <p>Окончание {co['Окончание'].split(' ')[0]}</p>
      </IonLabel>
    </IonItem>
  })

  return (
    <IonList>
      <IonListHeader lines="none">
        <IonLabel>
          <h1>Плановые заказы</h1>
        </IonLabel>
      </IonListHeader>
      {supplyOrderItems}
    </IonList>
  );
};

export default SupplyOrders;
