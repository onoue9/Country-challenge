import Image from "next/image";
import Link from "next/link";
import styled, { css } from "styled-components"

export default function ContryCard({ country }) {

  const CardDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 270px;
    height: 339px;
    background: #FFFFFF;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
    border-radius: 8px;

    ${() => css`
    @media (max-width: 1205px) {
      widht: 100%;
      justify-content: center;
      alitn-items: center;
    }
  `}
  `

  const DescDiv = styled.div`
    display: flex;
    gap: 1rem;
    padding: 1rem;
    flex-direction: column;
    justify-content: center;
  `

  const TitleSpan = styled.span`
    font-family: Nunito Sans, sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
    color: #0C1013;
  `

  const DescSpan = styled.span`
    font-family: Nunito Sans, sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #0C1013;
  `

  return (
    <Link href={{ pathname: `/country/${country.name.common}` }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
      <CardDiv>
        <Image
          src={country.flags.svg}
          alt={`'bandeira da' ${country.name.common}`}
          width={270}
          height={180}
          style={{borderRadius: '8px 8px 0px 0px'}}
          priority
        />
        <DescDiv>
          <TitleSpan>
            {country.name.common}
          </TitleSpan>
          <DescSpan>
            <strong>População:</strong> {country.population.toLocaleString('en-US').replace(/,/g, '.')}
          </DescSpan>
          <DescSpan>
            <strong>Região:</strong> {country.region}
          </DescSpan>
          <DescSpan>
            <strong>Capital:</strong> {country.capital}
          </DescSpan>
        </DescDiv>
      </CardDiv>
    </Link>
  )
}
