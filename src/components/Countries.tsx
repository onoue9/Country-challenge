import { useEffect, useState } from "react"
import styled, { css } from "styled-components"
import { getAllCountries } from "@/pages/api/getAllCountries"
import { getCountryByName } from "@/pages/api/getCountryByName"
import { getCountryByRegion } from "@/pages/api/getCountryByRegion"

import ContryCard from './CountryCard'
import Country from "@/interfaces/CountryInterface"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const FilterDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5rem;

  ${() => css`
    @media (max-width: 1023px) {
      flex-direction: column;
      width: 100%;
      padding: 2rem;
      gap: 1rem;
      align-items: flex-start;
    }
  `}
`

const CardDiv = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  margin: 0 2rem;

  ${() => css`
    @media (max-width: 1023px) {
      width: 100%;
      grid-template-columns: repeat(1, 1fr);
      gap: 2rem;
      align-items: center;
      justify-content: center;
    }
  `}
`

const SearchInput = styled.input`
  width: 473px;
  height: 54px;
  padding: 0 0 0 3.5rem;
  background: #FFFFFF;
  box-shadow: 0px 0px 6px rgba(12, 16, 19, 0.5);
  border-radius: 8px;

  font-family: Nunito sans, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;

  ${() => css`
    @media (max-width: 1023px) {
      width: 273px;
    }
  `}
`

const RegionSelect = styled.select`
  padding: 0 0 0 1rem;
  width: 196px;
  height: 54px;
  background: #FFFFFF;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;

  font-family: Nunito sans, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;

  ${() => css`
    @media (max-width: 1023px) {
      margin: 0 0 0 1.2rem;
    }
  `}
`

export default function Countries() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [filterRegion, setFilterRegion] = useState('')
  const searchIcon: IconProp = faSearch;

  const getAndSetCountries = () => {
    getAllCountries()
      .then((response) => {
        setCountries(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getAndSetCountries();
  }, []);

  useEffect(() => {
    if (search.length > 3) {
      getCountryByName(search)
        .then((response) => {
          setCountries(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [search])

  useEffect(() => {
    getCountryByRegion(filterRegion)
      .then((response) => {
        setCountries(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [filterRegion])

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target
    name === 'search' ? setSearch(value) : setFilterRegion(value);
    name === 'search' && value === '' ? getAndSetCountries() : null;
  }

  return (
    <MainDiv>
      <FilterDiv>
        <label>
          <FontAwesomeIcon
            icon={searchIcon}
            style={{
              position: "relative",
              top: "0.3rem",
              left: "2.5rem",
              width: "1.2rem",
              height: "1.2rem",
              color: "#CCCCCC",
            }}
          />
          <SearchInput
            name="search"
            type={"text"}
            placeholder={`Pesquise um país`}
            onChange={handleChange}
          />
        </label>
        <RegionSelect name="filter-region" onChange={handleChange}>
          <option value="">Filtre pela região</option>  
          <option value="africa">África</option>
          <option value="americas">Américas</option>
          <option value="asia">Ásia</option>
          <option value="europe">Europa</option>
          <option value="oceania">Oceania</option>
        </RegionSelect>
      </FilterDiv>

      <CardDiv>
        {countries.map((country: Country) => (
          <ContryCard key={country.name.common} country={country} />
        ))}
      </CardDiv>
    </MainDiv>
  )
}
