import React, { useEffect, useState } from 'react';
import { FormControl, NativeSelect } from '@material-ui/core';
import Axios from 'axios';
import styles from './CountryPicker.module.css'

const CountryPicker = ({ handleCountryChange}) => {
    const [countries, setCountries] = useState([])
    useEffect(() => {
        Axios.get('https://covid19.mathdro.id/api/countries')
            .then(res => {
                const { data: { countries } } = res;
                const country = countries.map(country => country.name)
                setCountries(country)
            })
    }, [setCountries])
    return (
        <div style={{textAlign:'center'}}>
            <h5 style={{textAlign:'center'}}>Select Country</h5>
            <FormControl className={styles.formControl}>
                <NativeSelect className={styles.native} defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                    <option value="">Global</option>
                    {
                        countries.map((country, i) => <option key={i} value={country}>{country}</option> )
                    }
                </NativeSelect>
            </FormControl>
        </div>
    );
};

export default CountryPicker;