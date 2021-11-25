import React, { useState } from "react";
import SatelliteData from "../components/SatelliteData.component";
import SatellitesList from "../components/SatellitesList.component";
import SearchForm from "../components/SearchForm.component";
import API from "../utils/API";

export default function SearchPage() {
  const [inputSearchState, setInputSearchState] = useState("");
  const [satelliteListState, setSatelliteListState] = useState<Array<any>>(
    []
  );

  const [allData, setAllData] = useState(['']);

  const [error, setError] = useState(Boolean);
  const [errorMessange, setErrorMessange] = useState('');

  let errors = {
    '1': 'Enter a number in the range from 10000 to 46669',
    '2': 'No GP data found try anoter number'
  }

  const searchSatellite = (query: string) => {
    API.getSatellite(query)
      .then((res) => {
        if(parseInt(query) < 10000 || parseInt(query) > 46669){
          setError(true)
          setErrorMessange(errors['1']);
        } else {
          setError(false)
          if(res.data === 'No GP data found'){ 
            setError(true)
            setErrorMessange(errors['2'])
          } else {
            setError(false)
            if(satelliteListState.includes(query) === false) {
              setSatelliteListState(satelliteListState => [...satelliteListState, query])
            }
          }
        }
        setInputSearchState('');
      })
      .catch((err) => console.error(err));
  };

  const handleInputChange = (event: any) => {
    setInputSearchState(event.target.value);
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    searchSatellite(inputSearchState);
  };
    
  const getData = (satelliteId: string) => {
        API.getSatellite(satelliteId)
            .then(response => {
            setAllData(response.data[0]);
        })
    }

  return (
    <main className="SearchPage">
      <SearchForm
        value={inputSearchState}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        placeholder="Number of Satellite..."
        error={error}
        errorMessange={errorMessange}
      />
      <SatellitesList 
        satelliteList={satelliteListState}
        getData={getData}
      />
      <SatelliteData allData={allData}/> 
    </main>
  );
}