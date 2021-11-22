import { useState } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import { List, Button, ListItem, InputBase } from '@mui/material';


const Search = (): JSX.Element => {
  const [allExist, setAllExist] = useState(['']);
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(Boolean);
  const [errorMessange, setErrorMessange] = useState('');
  const [allData, setAllData] = useState(['']);
  const [isPushed, setIsPushed] = useState(Boolean);
  let errors = {
    '1': 'Enter a number in the range from 10000 to 46669',
    '2': 'No GP data found try anoter number'
  }
  const handleClick  = debounce((searchInput: string) => {
    axios.get('https://celestrak.com/NORAD/elements/gp.php?FORMAT=json&CATNR=' + searchInput)
        .then(response => {
          setIsPushed(false)
          if(parseInt(searchInput) < 10000 || parseInt(searchInput) > 46669){ 
            setError(true)
            setErrorMessange(errors['1']);
          } else {
            setError(false)
            if(response.data === 'No GP data found'){ 
              setError(true)
              setErrorMessange(errors['2'])
            } else {
              setError(false)
              if(allExist.includes(searchInput) === false) {
                setAllExist(allExist => [...allExist, searchInput])
              }
            }
          }
        })
      }, 300);
  
  const handleQuery = (allExist: string) => {
    axios.get('https://celestrak.com/NORAD/elements/gp.php?FORMAT=json&CATNR=' + allExist)
      .then(response => {
        setAllData(response.data[0])
        setIsPushed(true)
      })
    }

  return (
    <div className="Search">
      <div style={{ margin: '0 auto', marginTop: '10%' }}>
        <InputBase 
          onChange={e => setSearchInput(e.target.value)} value={searchInput}
          type='text' 
          placeholder='Satellite number...'
        />
      <Button variant="contained" color="primary" onClick={() => {handleClick(searchInput)}}>
        Search
      </Button>
      {error && <div style={{ color: 'red' }}>{errorMessange}</div>}
      </div>
      <div style={{width: '20%', float:'left', marginTop: '1%'}}>
      <List component="nav" aria-label="main mailbox folders">
      {allExist.map(allExist => (
        <ListItem button onClick={() => handleQuery(allExist)}>
          {allExist}
        </ListItem>
      ))}
      </ List>
      </div>
      <div style={{width: '80%', float:'right', marginTop: '1%'}}>
        {isPushed &&
        <List>
          {Object.entries(allData)
          .map( ([key, value]) => 
          <ListItem button>
            <div style={{ marginRight: '1%'}}>{key}</div>
            <div style={{ marginLeft: '5%'}}>{value}</div>
          </ListItem>
        )}
        </List>
      }
      </div>
    </div>

  )
}
export default Search