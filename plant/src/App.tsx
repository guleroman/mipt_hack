import React, {useEffect, useState} from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import OrdersTab from './pages/OrdersTab';
import Tab3 from './pages/Tab3';
import ClientOrderTab from './pages/ClientOrderTab'
import SupplyOrderTab from './pages/SupplyOrderTab'
import OperationTab from './pages/OperationTab'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import groupNames from  './components/groupNames.json'

const App: React.FC = () => {

  const [orders, setOrders] = useState([])

  const onOrdersFetch = (o:any) => {
    setOrders(o)
  }

  (window as any).groupNames = groupNames

  return <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/orders" render={(props) => { return <OrdersTab onOrdersFetch={onOrdersFetch} /> }} exact={true} />
          <Route path="/tab3" component={Tab3} />
          <Route path="/orders/:id" render={(props) => {
            const clientOrderId = props.match.params.id.replace("_", "/")
            const order = orders.find((p:any) => p.COLAlloc === clientOrderId)
            return <ClientOrderTab {...props} order={order} />
          }} exact />
          <Route path="/orders/:clientOrderId/supply_orders/:supplyOrderId" render={(props) => {
            const clientOrderId = props.match.params.clientOrderId.replace("_", "/")
            return <SupplyOrderTab {...props} orderId={clientOrderId} supplyOrderId={props.match.params.supplyOrderId} />
          }} exact/>
          <Route path="/orders/:clientOrderId/supply_orders/:supplyOrderId/operations/:operationId" render={(props) => {
            const clientOrderId = props.match.params.clientOrderId.replace("_", "/")
            const supplyOrderId = props.match.params.supplyOrderId
            const operationId = props.match.params.operationId
            return <OperationTab {...props} orderId={clientOrderId} supplyOrderId={supplyOrderId} operationId={operationId} />
          }} exact/>
          <Route path="/" render={() => <Redirect to="/orders" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/orders">
            <IonIcon icon={triangle} />
            <IonLabel>Заказы</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={square} />
            <IonLabel>Статус</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
}

export default App;
