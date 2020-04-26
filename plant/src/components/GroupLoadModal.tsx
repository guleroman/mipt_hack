import React, { useEffect, useState } from 'react';

import axios from 'axios'
import { IonList, IonListHeader, IonItem, IonLabel, IonBadge, IonPopover, IonSearchbar, IonModal, IonButton, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonHeader, IonCard, IonCardHeader, IonCardContent } from '@ionic/react';
// import Chart from 'react-apexcharts'

import { Chart } from 'chart.js';

interface ContainerProps {
  showModal: boolean;
  onCloseClick: any;
  groupId: any
}

const GroupLoadModal: React.FC<ContainerProps> = ({ showModal, onCloseClick, groupId }) => {

  const [state, setState] = useState(null)

  useEffect(() => {
    if (showModal) {

      setTimeout(() => {
        var ctx = (document as any).getElementById('barCanvas').getContext('2d');
        var myChart = new Chart(ctx, (state as any))
      }, 0)

    }

  }, [state])

  useEffect(() => {
    if (!groupId) return
    axios.post('http://194.67.112.246/api/v3/', {
      "group": groupId//format(new Date(), 'yyyy-MM-ii')
    }).then(function (response) {
      const x = response.data.slice(0, 7).map((day:any) => { return Object.keys(day)[0] })
      const y = response.data.slice(0, 7).map((day:any) => { return Object.values(day)[0] })
      const chartData = {
        type: 'bar',
        data: {
          labels: x,
          datasets: [{
            label: 'Уровень загрузки',
            data: y,
            borderWidth: 1,
            backgroundColor: 'rgba(9, 21, 215, 0.7)'
          }]
        },
        options: {
          aspectRatio: 1,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      }
      setState(chartData as any)
    })
  }, [groupId])
  console.log(state)
  return <IonModal isOpen={showModal}>
    <IonHeader translucent>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButtons slot="secondary">
            <IonButton onClick={onCloseClick}>
              Закрыть
            </IonButton>
          </IonButtons>
        </IonButtons>
        <IonTitle>Планируемая загрузка</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      {/* <Chart options={state.options} series={state.series} type="bar" height={350} /> */}
      <IonCard>
        <IonCardHeader></IonCardHeader>
        <IonCardContent>
          <canvas id="barCanvas"></canvas>
        </IonCardContent>
      </IonCard>
    </IonContent>

  </IonModal>
};

export default GroupLoadModal;
