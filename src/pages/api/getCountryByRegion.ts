import axios from "axios"

export const getCountryByRegion = async (region: string) => {
  const regionToLowerCase = region.toLowerCase();
  const response = await axios.get(`https://restcountries.com/v3.1/region/${regionToLowerCase}`)
  return response.data;
}
