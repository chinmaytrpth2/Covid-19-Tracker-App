import axios from 'axios';
import { ICovidStatCountry, ICovidStatDaily } from "../../types/common";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country?: string) => {
    let changeableUrl = url;

    if (country) {
      changeableUrl = `${url}/countries/${country}`;
    }

    const { data } = await axios.get<ICovidStatCountry>(changeableUrl);
    return data;
 };
export const fetchDailyData = async () => {
      const { data } = await axios.get<Array<ICovidStatDaily>>(`${url}/daily`);
    //   console.log(data);
    return data;
}
  export const fetchCountries = async () => {
    
      const { data: { countries } } = await axios.get(`${url}/countries`);
  
      return countries.map((country: { name: string }) => country.name);
    
  };

//   const DetailData = data.map((dailyData) => ({
//     confirmed: dailyData.confirmed.total,
//     pdate: dailyData.reportDate,
//     deaths: dailyData.deaths.total
//   }));
//   return DetailData;
// };
