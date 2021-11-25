import React from "react";
import "../styles/SearchForm.css";
import { Input, Button, Alert } from '@mui/material';

interface SearchFormProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
  placeholder: string;
  error: boolean;
  errorMessange: string;
}

function SearchForm(props: SearchFormProps) {
  return (
    <form className="SearchForm">
      <div style={{ margin: '0 auto', marginTop: '10%' }}>
        <Input
          onChange={props.handleInputChange}
          value={props.value}
          name="search"
          type="text"
          placeholder={props.placeholder}
          color="primary"
        />
      <Button onClick={props.handleFormSubmit} variant="contained" color="primary" style={{ margin: '7px' }}>
        Search
      </ Button>
      {props.error && <Alert severity="error">{props.errorMessange}</Alert>} 
      </div>
    </form>
  );
}

export default SearchForm;