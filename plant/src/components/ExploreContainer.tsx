import React, { useEffect, useState } from 'react';

import axios from 'axios'
import { IonList, IonListHeader, IonItem, IonLabel, IonBadge, IonPopover, IonSearchbar, IonModal, IonButton, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonHeader } from '@ionic/react';
import { toggle } from 'ionicons/icons';
import { format } from 'date-fns'

import GroupLoadModal from './GroupLoadModal'

import CehHeatMap from './CehHeatMap'

interface ContainerProps {
}

const ExploreContainer: React.FC<ContainerProps> = ({ }) => {
  const [resourceGroups, setResourceGroups] = useState({})
  const [cehs, setCehs] = useState([])
  const [query, setQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [currentCeh, setCurrentCeh] = useState(null)
  const [showGroupLoadModal, setShowGroupLoadModal] = useState(false)
  const [currentGroupId, setCurrentGroupId] = useState(null)
  useEffect(() => {
    axios.post('http://194.67.112.246/api/v2/', {
      "data": '2020-05-05'//format(new Date(), 'yyyy-MM-ii')
    }).then(function (response) {
      setCehs(response.data['cehs'])
    })
  }, [])

  const items = cehs.map((ceh: any) => {
    const val = ceh.t_proc
    var color = ''
    if (val > 60) {
      color = 'success'
    } else if (val <= 60 && val != -1) {
      color = 'warning'
    } else if (val === -1) {
      color = 'danger'
    }
    return <IonItem color={color} onClick={() => {
      setShowModal(true)
      setCurrentCeh(ceh)
    }}>
      <IonLabel>{ceh.ceh_name}</IonLabel>
      <IonBadge color="light">{val != -1 ? `${val}%` : ''}</IonBadge>
    </IonItem>
  })

  var resourceGroupsInCehItems: any = []
  if (currentCeh) {
    resourceGroupsInCehItems = (currentCeh as any).r_groupe.map((ceh: any) => {
      const val = parseInt(ceh.t_proc, 10)
      var color = ''
      if (val > 60) {
        color = 'success'
      } else if (val <= 60 && val != -1) {
        color = 'warning'
      } else if (val === -1) {
        color = 'danger'
      }

      const groupNameData = (window as any).groupNames[ceh.g_name]
      const groupName = groupNameData ? groupNameData[1] : ceh.g_name
      return <IonItem color={color} onClick={() => { setCurrentGroupId(ceh.g_name); setShowGroupLoadModal(true) }}>
        <IonLabel>{groupName}</IonLabel>
        <IonBadge color="light">{val != -1 ? `${val}%` : ''}</IonBadge>
      </IonItem>
    })
  }
  return (

    <>
      <IonList>
        {items}
      </IonList>

      <CehHeatMap />
      <IonModal isOpen={showModal}>
        <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButtons slot="secondary">
              <IonButton onClick={() => setShowModal(false)}>
                Закрыть
              </IonButton>
            </IonButtons>
          </IonButtons>
          <IonTitle>Загрузка цеха {currentCeh ? (currentCeh as any).ceh_name : ''}</IonTitle>
        </IonToolbar>
        </IonHeader>

        {
          currentCeh &&
          <IonContent>
          <IonList>
            {resourceGroupsInCehItems}
          </IonList>
          </IonContent>
        }
      </IonModal>
      <GroupLoadModal groupId={currentGroupId} onCloseClick={() => setShowGroupLoadModal(false)} showModal={showGroupLoadModal} />
    </>

  );
};

export default ExploreContainer;
