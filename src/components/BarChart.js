import Chart from 'chart.js'
import {useEffect} from 'react'

const BarChart = ()=>{
// we dont need an array bc were not changing the request or using state

    useEffect(()=>{
        getAppData()
    })

    function getAppData(){
        fetch('/locations/1')
        .then(response => response.json())
        .then(data => prepareData(data))
        .then(preparedData => createChart(preparedData))
        .catch(err => console.log(err))
    }

    function prepareData(data){
        const chartData={
            labels:[],
            datasets:[{
                label: 'Avg high temps',
                data:[]
            }, {
                label: 'Avg low temps',
                data:[]
            }]
        }
        data.temperatures.forEach(temperature =>{
            chartData.labels.push(temperature.month)
            chartData.datasets[0].data.push(temperature.average_high_f)
            chartData.datasets[1].data.push(temperature.average_low_f)
        })
        return chartData
    }

    function createChart(data){
        const ctx = document.querySelector('#temperatures')
        new Chart(ctx, {
            type: 'line',
            data: data
        })
    }

    return(
        <>
            <h1>Temperatures (NYC)</h1>
            <canvas id="temperatures" width="300" height="100"></canvas>
        </>
    )
}

export default BarChart