import React, { useEffect, useState } from 'react';
import './App.css';

import { ICovidStatCountry as State } from "../types/common";
import {Charts, Cards, CountryPicker} from './components';

import {fetchData} from './api/index';

import CoronaImage from './images/image.png';

const App: React.FC = () => {

  const [Data, setData] = useState<State | undefined>(undefined);
  const [country, setCountry] = useState<string | undefined>("");

  useEffect((): any => {
    fetchData().then(setData);
  }, []);

  const handleCountryChange = (country: string) => {
    setCountry(country);
    return fetchData(country).then(setData);
  }

  return (
    <div className="container">
      <img className="image" src={CoronaImage} alt="CORONA 19" />
      <Cards data={Data}  />
      <CountryPicker countryChanger={handleCountryChange} />
      <Charts data={Data} country={country}/>
    </div>
  );
}

export default App;
