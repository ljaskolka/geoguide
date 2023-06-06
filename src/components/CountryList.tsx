import React from "react";
import { Country } from "../types/types";
import "../styles/CountryList/CountryList.css";

interface CountryListProps {
  countries: Country[];
  loading: boolean;
  loadedCount: number;
  onCountryClick: (country: Country) => void;
}

const CountryList: React.FC<CountryListProps> = ({
  countries,
  loading,
  loadedCount,
  onCountryClick,
}) => {
  const handleCountryClick = (country: Country) => {
    onCountryClick(country);
  };

  return (
    <aside>
      <div className="country-list-logo-container">
        <h1>GeoGuide</h1>
        <div className="country-logo-break"></div>
      </div>
      {loading ? (
        <div className="country-list-container">
          <p>Fetching data...</p>
          <p>{loadedCount}/250</p>
        </div>
      ) : (
        <>
          <div className="country-list-container">
            <div className="country-list-item-info">
              <p>Flag</p>
              <p>Country</p>
              <p>Capital</p>
              <p>Population</p>
              <p>Currency</p>
            </div>
            {countries.map((country) => (
              <div
                key={country.name.common}
                className="country-list-item"
                onClick={() => handleCountryClick(country)}
              >
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  className="country-list-item-image"
                />
                <h3>{country.name.common}</h3>
                <p>{country.capital}</p>
                <p>{country.population}</p>
                {country.currencies &&
                  typeof country.currencies === "object" && (
                    <p>{Object.values(country.currencies)[0].symbol}</p>
                  )}
              </div>
            ))}
          </div>
        </>
      )}
    </aside>
  );
};

export default CountryList;
