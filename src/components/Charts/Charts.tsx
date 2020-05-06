import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { ICovidStatDaily, ICovidStatCountry, CountryCatStat } from "../../../types/common";

import { fetchDailyData } from '../../api/index';

import styles from './Charts.module.css';

type State = Array<ICovidStatDaily>;
interface Props { 
  data?: ICovidStatCountry;
  country?: string;
}

const Chart: React.FC<Props> = ({ data, country }) => { 
  const [dailyData, setDailyData]  = useState<State | undefined>([]);

  useEffect(() => {
    if (!country) {
      fetchDailyData().then(resp => setDailyData(resp)).catch(err => console.log(err));
    }
  });

  const barChart = (confirmed: CountryCatStat, recovered: CountryCatStat, deaths:CountryCatStat) => {
    return confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null
  };

  const lineChart = (dailyFeed?: State) => {
    if (dailyFeed && dailyFeed.length > 0) {
      return <Line
        data={{ 
          labels: dailyFeed.map(({ reportDate }) => reportDate),
          datasets: [{
            data: dailyFeed.map((data) => data.confirmed.total),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          }, {
            data: dailyFeed.map((data) => data.deaths.total),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
          ],
        }}
      />;
    }
    return null;
  };

  return (
    <div className={styles.container}>
      {country? barChart(data!.confirmed, data!.recovered, data!.deaths) : lineChart(dailyData)}
    </div>
  );
};

export default Chart;