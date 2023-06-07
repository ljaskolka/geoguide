import React, { useState } from "react";
import { Country } from "../types/types";
import "../styles/CountryList/CountryList.css";
import { FaBars } from "react-icons/fa";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCountryClick = (country: Country) => {
    onCountryClick(country);
  };

  const handleSearch = () => {
    const filtered = countries.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      const countryCapital =
        Array.isArray(country.capital) && country.capital.length > 0
          ? country.capital[0].toLowerCase()
          : country.capital && typeof country.capital === "string"
          ? country.capital.toLowerCase()
          : "";
      return (
        countryName.includes(searchTerm.toLowerCase()) ||
        countryCapital.includes(searchTerm.toLowerCase())
      );
    });
    setFilteredCountries(filtered);
  };

  const handleClear = () => {
    setFilteredCountries([]);
    setSearchTerm("");
  };

  const displayedCountries =
    filteredCountries.length > 0 ? filteredCountries : countries;

  return (
    <>
      <aside className={`country-list-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="country-list-logo-container">
          <h1>GeoGuide</h1>
          <div className="country-logo-break"></div>
        </div>
        <div className="country-list-search-container">
          <input
            type="text"
            placeholder="Country / Capital"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <button id="clean-search" onClick={handleClear}>
            X
          </button>
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
              {displayedCountries.map((country) => (
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
      <div
        className={`mobile-menu-icon ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <FaBars style={{ color: "#666666", fontSize: "2rem" }} />
      </div>
    </>
  );
};

export default CountryList;
