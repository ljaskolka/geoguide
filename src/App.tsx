import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Country } from "./types/types";
import CountryList from "./components/CountryList";
import Map from "./components/Map";

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching countries: ", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    setLoadedCount(countries.length);
  }, [countries]);

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
    console.log(country);
  };

  return (
    <div className="app">
      <CountryList
        countries={countries}
        loading={loading}
        loadedCount={loadedCount}
        onCountryClick={handleCountryClick}
      />
      <Map country={selectedCountry} />
    </div>
  );
};

export default App;
