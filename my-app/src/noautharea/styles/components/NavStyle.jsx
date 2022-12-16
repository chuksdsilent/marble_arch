import styled from "styled-components";

export const NavStyle = styled.header`
  .__no-auth-desktop {
    height: 74px;
    background: ${(props) => `${props.theme.colors.primary}`};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 4.7rem;

    a {
      color: white;
      margin-right: 1.7rem;
      text-decoration: none;
      font-size: 14px;

      &:hover {
        color: blue;
      }

      img {
        align-items: center;
        margin-top: 0.5rem;
      }
    }
  }

  .__no-auth-mobile {
    display: none;
  }
  @media (max-width: 500px) {
    .__no-auth-desktop {
      display: none;
    }
    .__no-auth-mobile {
      background: ${(props) => `${props.theme.colors.primary}`};
      padding: 0.5rem 2rem;
      display: block;
      a {
        color: white;
        display: block !important;
        text-align: center;
        font-size: 20px;
        margin-bottom: 20px;
      }
      .nav-links {
        height: 500px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .display-links {
        display: block;
        /* animation: openMenu 1s; */

        @keyframes openMenu {
          from {
            height: 0px;
          }
          to {
            height: 500px;
          }
        }
      }
      .no-display-links {
        /* animation: closeMenu 1s; */
        @keyframes closeMenu {
          from {
            height: 500px;
          }
          to {
            height: 0px;
          }
        }
      }
    }
  }
`;
