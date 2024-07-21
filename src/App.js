import React, { useState, useEffect } from 'react';
import './App.css'; // Ensure you have the styles defined here

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    }

    fetchCountries();
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, countries]);

  return (
    <div id="app">
      <input
        type="text"
        id="search"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div id="countryContainer">
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.cca3}
            name={country.name.common}
            flag={country.flags.png}
          />
        ))}
      </div>
    </div>
  );
};

const CountryCard = ({ name, flag }) => {
  return (
    <div className="countryCard">
      <img src={flag} alt={`${name} flag`} />
      <p>{name}</p>
    </div>
  );
};

export default App;
