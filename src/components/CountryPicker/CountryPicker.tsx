import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchCountries } from '../../api/index';
import styles from './CountryPicker.module.css';

interface Props {
  countryChanger: (country: string) => Promise<void>
}

const Countries: React.FC<Props> = ({ countryChanger }) => {     
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => countryChanger(e.target.value)}>  
        <option value="">Global</option>
        {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl>
  );
};

export default Countries;