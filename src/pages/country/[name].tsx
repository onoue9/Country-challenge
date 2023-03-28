import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import querystring from "querystring";

import Header from "@/components/Header";
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { getCountryByName } from "@/pages/api/getCountryByName"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components"
import Link from "next/link";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6rem 0 0 5rem;
  gap: 4rem;
  height: 100%;

  ${() => css`
  @media (max-width: 1023px) {
    width: 100%;
    gap: 1rem;
    padding: 2rem;
  }
`}
`

const BackForwardButton = styled.button`
  display:flex;
  align-items: center;
  justify-content: start;
  gap: 1rem;
  padding: 0 1rem;
  width: 173px;
  height: 54px;
  border: none;
  background: #FFFFFF;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  font-family: Nunito Sans, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #0C1013;
  cursor: pointer;
`

const CountryDiv = styled.div`
  display: flex;
  font-family: Nunito Sans, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  color: #0C1013;

  ${() => css`
  @media (max-width: 1023px) {
    flex-direction: column;
    width: 100%;
    padding: 2rem 0;
  }
`}
`

const CountryDescDiv = styled.div`
  width: 368px;
  height: 221px;
  padding: 1rem 0 0 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  ${() => css`
  @media (max-width: 1023px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
  }
`}
`

const DescDiv = styled.div`
  ${() => css`
  @media (max-width: 1023px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
  }
  `}
`

const CountryTitle = styled.span`
  padding: 0 0 0 2rem;
  font-family: Nunito Sans, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 49px;
  color: #0C1013;
`

const BorderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 30px;
  background: #FFFFFF;
  border: 1px solid #0C1013;
  border-radius: 4px;
  font-family: Nunito Sans, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  color: #0C1013;
  cursor: pointer;
`

const BorderSpan = styled.span`
  display: flex;
  gap: 1rem;
`

interface Country {
  name: { common: string; }
  population: number;
  flags: { svg: string; }
}

export default function Country() {
  const router = useRouter();
  const { name } = router.query;
  const nameString = querystring.stringify({ name }).replace('name=', '');
  const [country, setCountry] = useState();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const arrowLeftIcon: IconProp = faArrowLeft;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  

  useEffect(() => {
    getCountryByName(nameString)
      .then((response) => {
        setCountry(response[0])
      })
      .catch((error) => {
        console.log(error)
      })
  }, [nameString])

  return (
    <>
      <Header />
      <MainDiv>
        <div>
          <Link href={{ pathname: `/` }} style={{ textDecoration: 'none' }}>
            <BackForwardButton>
              <FontAwesomeIcon
                icon={arrowLeftIcon}
                style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  color: "#CCCCCC",
                }}
              />
              <span>Voltar</span>
            </BackForwardButton>
          </Link>
        </div>

        <CountryDiv>
          <div>
            <Image
              src={country?.flags.svg}
              alt={`'bandeira da' ${country?.name.common}`}
              width={windowWidth > 1023 ? 560 : 358}
              height={windowWidth > 1023 ? 401 : 220}
              style={{ borderRadius: '8px 8px 0px 0px'}}
              priority
            />
          </div>

          <DescDiv style={{ paddingTop: "3rem"}}>
            <CountryTitle>{country?.name.common}</CountryTitle>
            <CountryDescDiv>
              <span><strong>Nome Nativo:</strong> {country?.name.official}</span>
              <span><strong>População:</strong> {country?.population.toLocaleString('en-US').replace(/,/g, '.')}</span>
              <span><strong>Região:</strong> {country?.region}</span>
              <span><strong>Sub-região:</strong> {country?.subregion}</span>
              <span><strong>Capital:</strong> {country?.capital}</span>
              <span><strong>TLD:</strong> {country?.tld.map((tld: string) => tld)}</span>
              <span><strong>Moeda:</strong> {country && Object.values(country?.currencies).map((currency: string) => currency.name )}</span>
              <span><strong>Idiomas:</strong> {country && Object.values(country?.languages).map((language: string) => language )}</span>
            </CountryDescDiv>
            <BorderSpan style={{ paddingLeft: "2rem"}}><strong>Fronteira:</strong> {country?.borders ? country?.borders.map((border: string, index: number) => {
              return index <= 2
              ? <Link href={{ pathname: `/country/${border}` }} style={{ textDecoration: 'none' }}>
                <BorderButton>{border}</BorderButton>
                </Link> : null })
              : 'Não há' }
            </BorderSpan>
          </DescDiv>
        </CountryDiv>
      </MainDiv>
    </>
  )
}