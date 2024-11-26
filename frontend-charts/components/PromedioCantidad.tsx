'use client'

import { getPromedioCantidad } from '@/service/Api';
import React, { useEffect, useState } from 'react'
import { Doughnut, Bar, Pie } from 'react-chartjs-2';
//import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

//ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.register(ArcElement, Tooltip, Legend);


export default function PromedioCantidad() {

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
    getPromedioCantidad().then(data=>{
        const  codigo = data.map((item:any) => item.Valor_Promedio);
        const cantidad= data.map((item:any) => item.Cantidad);
        
        setChartData({
            labels:codigo,
            datasets:[{
                label: 'cantidad',
                data:cantidad,
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
                    <h3>Valor Promedio y la cantidad de productos por cada lineCode</h3>

                    
                    <Doughnut data={chartData}></Doughnut>
                    
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