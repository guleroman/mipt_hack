import React, { useState, useEffect } from 'react';
import { IonList, IonListHeader, IonTitle, IonLabel, IonItem, IonAvatar, IonChip, IonBadge, IonSearchbar } from '@ionic/react';


interface ContainerProps {
  orders: any;
  onQueryChange: any;
}

const ClientOrders: React.FC<ContainerProps> = ({ orders, onQueryChange }) => {
  const [query, setQuery] = useState('')

  useEffect(() => {
    onQueryChange(query)
  }, [query])
  const orderItems = orders.map((co:any) => {
    return <IonItem key={co.COLAlloc} routerLink={`/orders/${co.COLAlloc.replace("/", "_")}`} button>
      <IonLabel className="ion-text-wrap">
        <h2>{co.Name}</h2>
        <h3>{co.ProductName}</h3>
        <p>Дата поставки {co.LatestDesiredDeliveryDate}</p>
      </IonLabel>
      {co.ImgPlannedStatus === 'ImgPlannedStatusUpstreamNotPlanned' ? null :  <IonBadge slot="end">В плане</IonBadge> }

    </IonItem>
  })

  return (
    <IonList>
      <IonSearchbar placeholder='Поиск по ID заказа' inputmode="search" value={query} onIonChange={e => setQuery(e.detail.value!)}></IonSearchbar>
      {orderItems}
    </IonList>
  );
};

export default ClientOrders;
