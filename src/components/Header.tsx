import styled, { css } from "styled-components"

const HeaderDiv = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  ${() => css`
    @media (max-width: 1205px) {
      width: 100%;
      padding: 0 5rem;
    }
  `}
`

const Title = styled.p`
  margin: 0;
  padding-left: 5rem;
  font-family: Nunito Sans, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 49px;
  color: #0C1013;

  ${() => css`
    @media (max-width: 1205px) {
      padding: 0;
    }
  `}
`

export default function Header() {
  return (
    <HeaderDiv>
      <Title>Países</Title>
    </HeaderDiv>
  )
}
