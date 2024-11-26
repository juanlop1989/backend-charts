'use client'

import { getSumaProducto } from '@/service/Api';
import React, { useEffect, useState } from 'react'
import { Doughnut, Bar, Pie } from 'react-chartjs-2';
//import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
//ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.register(ArcElement, Tooltip, Legend);


export default function SumaProducto() {

  const [chartData, setChartData] = useState({
    labels:[],
    datasets:[
        {
            label:'',
            data:[],
            backgroundColor:[] as string[]
        }
    ]
  })

  //Para solucionar bloqueo https://expressjs.com/en/resources/middleware/cors.html

  useEffect(()=>{
    getSumaProducto().then(data=>{
        const  producto = data.map((item:any) => item.productType);
        const total= data.map((item:any) => item.Valor_Total);
        
        setChartData({
            labels:producto,
            datasets:[{
                label: 'total',
                data:total,
                backgroundColor:['rgb(255, 99, 132)','rgb(230, 193, 132)','rgb(150, 25, 141)' ]
            }
            ]
        })

    })
    .catch((error)=>{console.log('ocurrio un error',error)})
  },[]);

  return (
    <>

    <div>
        {
            chartData ? (
                <div>
                    <h3>Valor total de los producto por productType</h3>

                    
                    <Pie data={chartData}></Pie>
                    
                </div>
            ) :(
                <div> loading..</div>
            )
        }
    </div>
        
    </>
  )
}
/*<Doughnut data={chartData}></Doughnut>*/