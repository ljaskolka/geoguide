export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  capital: string;
  population: number;
  flags: {
    png: string;
  };
}

export interface LatLng {
  lat: number;
  lng: number;
}
