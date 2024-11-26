'use client'

import { getValorPromedio } from '@/service/Api';
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


export default function ValorPromedio() {

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
    getValorPromedio().then(data=>{
        const  productos = data.map((item:any) => item.categoryCode);
        const promedio= data.map((item:any) => item.Valor_Promedio);
        
        setChartData({
            labels:productos,
            datasets:[{
                label: 'Promedio',
                data:promedio,
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
                    <h3>Valor Promedio de productos por código de categoría</h3>

                    <Bar data={chartData}></Bar>
                    
                </div>
            ) :(
                <div> loading..</div>
            )
        }
    </div>
        
    </>
  )
}
