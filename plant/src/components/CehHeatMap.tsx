import React, { useEffect, useState } from 'react';

import axios from 'axios'
import Chart from 'react-apexcharts'
import { IonCard, IonCardHeader, IonCardContent } from '@ionic/react';

interface ContainerProps {
  showModal: boolean;
  onCloseClick: any;
  groupId: any
}

const GroupLoadModal: React.FC = ({ }) => {

  const [data, setData] = useState(null)
  const [options, setOptions] = useState(null)
  useEffect(() => {
    axios.post('http://194.67.112.246/api/v4/', {
      "data": '2020-05-04'//format(new Date(), 'yyyy-MM-ii')
    }).then(function (response) {
      setData(response.data)
    })
  }, [])

  useEffect(() => {
    if(!data) return
    const _data = (data as any)
    var series = Object.keys(_data[0]).slice(2, -1).map((s) => { return {name: s, data: []} })

    _data.forEach((d:any) => {
      const values = Object.keys(_data[0]).slice(2, -1)
      values.forEach((v) => {
        var item:any = (series.find((s) => { return s.name === v }) as any)
        item.data.push({
          x: d['time'],
          y: d[v]
        })
        // console.log(item, d[v], d['time'])

      })

    })
    // console.log('serial', series)

    const options = {
      options: {
        chart: {
          toolbar: {
            show: false,
            tools: {
              download: false
            }
          }
        }
  
      },
      series: series
    }

    setOptions(options as any)
  }, [data])




  return <IonCard>
    <IonCardHeader></IonCardHeader>
    <IonCardContent>
      {options && <Chart type="heatmap" options={(options as any).options} series={(options as any).series} height={350} />}
    </IonCardContent>
  </IonCard >
};

export default GroupLoadModal;
