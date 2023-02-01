import styled from "styled-components";

export const FooterStyle = styled.section`
  background-color: ${(props) => `${props.theme.colors.primary}`};
  width: 100% !important;
  padding: 5rem 0rem;
  color: #fff;
  font-size: 16px;
  margin-top: 3rem;

  h4 {
    color: #ffffff;
    font-family: "Lato", Sans-serif;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 0px;
  }
  .logo {
    padding: 3rem;
  }

  .social {
    padding: 0px 0px 0rem 1rem;
    .img-social {
      display: flex;
      div {
        background-color: #131381;
        margin-top: 50px;
        border-radius: 2px;
        padding: 0.5rem;
        margin-right: 0.5rem;
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
  hr {
    width: 10%;
    position: absolute;
    left: 1rem;
    top: 1rem;

    color: #fff;
    background-color: #fff;
    border: 0.1rem #fff solid;
  }

  .logo {
    display: flex;
    justify-content: end;
  }
  @media (max-width: 400px) {
    .logo {
      justify-content: start !important;
    }
  }
`;
