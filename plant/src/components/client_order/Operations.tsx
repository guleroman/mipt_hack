import React, { useState, useEffect } from 'react';
import { IonList, IonListHeader, IonTitle, IonLabel, IonItem, IonAvatar, IonChip, IonBadge, IonSearchbar, IonItemGroup, IonItemDivider } from '@ionic/react';

import axios from 'axios'

interface CP {
  operations: any;
  orderId: string;
  supplyOrder: any;
}


const Operations: React.FC<CP> = ({ orderId, operations, supplyOrder }) => {
  const [routingSteps, setRoutingSteps] = useState([])
  useEffect(() => {
    axios.post('http://194.67.112.246/api/v1/', {
      "table": "06.RoutringSteps.xlsx",
      "filters": {
        RoutingId: supplyOrder.RoutingId
      }
    }).then(function (response) {
      setRoutingSteps(response.data)
    })
  }, [])

  const operationItems = operations.map((co: any) => {
    const routingStep = routingSteps.find((rs: any) => rs.RoutringStepId === co.RoutringStepId)
    return <IonItem key={co.Id} routerLink={`/orders/${orderId.replace('/', '_')}/supply_orders/${supplyOrder['ID план. зак.']}/operations/${co.Id}`} button>
      <IonLabel className="ion-text-wrap">
        <h2>{co.OperationDescription}</h2>
        <p>Начало {co.Start}</p>
        <p>Окончание {co.End}</p>
        <p>Группа ресурсов {routingStep && (routingStep as any).ResourceGroupId}</p>
        {/* <p>{routingStep && (routingStep as any).SequenceNr}</p> */}
      </IonLabel>
    </IonItem>
  })

  return (
    <IonItemGroup >
      <IonItemDivider color="primary">
        <IonLabel>Плановые операции</IonLabel>
        <IonBadge color="warning" slot="end">{operations.length}</IonBadge>
      </IonItemDivider>

      {operationItems}
    </IonItemGroup>
  );
};

export default Operations;
