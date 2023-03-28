import axios from "axios"

export const getCountryByName = async (name: string) => {
  const nameToLowerCase = name?.toLowerCase();
  let response;
  nameToLowerCase.length > 3 ? response = await axios.get(`https://restcountries.com/v3.1/name/${nameToLowerCase}?fullText=true`)
  : response = await axios.get(`https://restcountries.com/v3.1/alpha/${nameToLowerCase}`)
  return response.data;
}
