import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonLabel, IonItem, IonList, IonListHeader } from '@ionic/react';

import axios from 'axios'

interface CP {
  orderId: string;
  supplyOrderId: string;
  operationId: string;
}

const OperationTab: React.FC<CP> = ({ orderId, supplyOrderId, operationId }) => {
  // const operation = {
  //   Id: 'Flexi-451198.0.0',
  //   OperationDescription: 'Транспортировка',
  //   SequenceNr: 0,
  //   allowMethods: 'Крановая операция',
  //   StartAt: 'Apr-27-2020 05:59:59.999',
  //   EndAt: '27.04.2020  10:04:00',
  //   ProductionTime: '0:02:11.568',
  //   InputQuantity: 27.41,
  //   OutputQuantity: 27.41,
  //   SchedulingSpace: '05:00:00',
  //   ResourceGroupId: 'G_RTRAIN11',
  //   OperationCode: 101,
  //   RoutingStepId: '1330440002|S_RTRAIN11|01|9985T'
  // }

  const [resourceGroupPeriods, setResourceGroupPeriods] = useState([])
  const [operation, setOperation] = useState(null)

  useEffect(() => {
    axios.post('http://194.67.112.246/api/v1/', {
      "table": "03.Operations.xlsx",
      "filters": {
        Id: operationId
      }
    }).then(function (response) {
      setOperation(response.data[0])
    })
  }, [])


  useEffect(() => {
    if (!operation) {
      return
    }
    axios.post('http://194.67.112.246/api/v1/', {
      "table": "04.ResourceGroupPeriod.xlsx",
      "filters": {
        ResourceGroupID: operation!['ResourceGroupId']
      }
    }).then(function (response) {
      setResourceGroupPeriods(response.data)
    })
  }, [operation])


  const resourceGroupPeriodsItems = resourceGroupPeriods.map((co: any) => {
    return <IonItem key={co.Id}>
      <IonLabel className="ion-text-wrap">
        <h2>{co['Id']}</h2>
        <p>День планирования {co['Start'].split(' ')[0]}</p>
      </IonLabel>
    </IonItem>
  })

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Назад" defaultHref="/orders" />
          </IonButtons>
          <IonTitle>Плановая операция</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Плановая операция</IonTitle>
          </IonToolbar>
        </IonHeader>
        {
          operation &&
          <>
            <IonItem>
              <IonLabel>
                Номер: {operation!['Id']}
              </IonLabel>
            </IonItem>
            <IonList>
              <IonListHeader lines="none">
                <IonLabel>
                  <h1>Периоды ресурсных групп</h1>
                </IonLabel>
              </IonListHeader>
              {resourceGroupPeriodsItems}
            </IonList>
          </>

        }
      </IonContent>
    </IonPage>
  );
};

export default OperationTab;
