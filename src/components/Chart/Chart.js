import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Line, Bar } from 'react-chartjs-2'

import styles from "./Chart.module.css";

const Chart = ({data, country}) => {
    const [dailyData, setDailyData] = useState([])
    useEffect(() => {
        Axios.get('https://covid19.mathdro.id/api/daily')
            .then(res => {
                const modifiedData = res.data.map( (dailyData) => ({
                    confirmed: dailyData.confirmed.total,
                    deaths: dailyData.deaths.total,
                    date: dailyData.reportDate
                }))

                setDailyData(modifiedData)
            })
    }, [])
    const lineChart = (
        dailyData.length
            ? (<Line data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor:'rgba(255, 0, 0, 0.5)',
                    fill: true
                }]
            }}

            />) : null
    )
    const barChart = (
        data.confirmed
        ? (
            <Bar
              data = {{
                  labels: ['Infected', 'Recovered', 'Deaths'],
                  datasets: [{
                      label: 'People',
                      backgroundColor: ['rgb(81, 81, 214)','rgba(2, 162, 2,0.8)', 'red'],
                      data:[data.confirmed.value, data.recovered.value, data.deaths.value],
                      
                  }]
              }}
              options = {{
                  legend: {display: false},
                  title: {display: true, text: `Current state in ${country}`}
              }}
            />
        ): null
    )
    return (

        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    );
};

export default Chart;