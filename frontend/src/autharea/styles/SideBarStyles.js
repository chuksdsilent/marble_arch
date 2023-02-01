import styled from "styled-components";

export const SideBarStyles = styled.div`
  ul {
    list-style-type: none;
    padding-top: 2rem;
    li {
      display: block;
      .nav-items {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #d2cdcd;
        padding: 0.8rem 1.5rem 0.8rem 0.6rem;
        font-family: "Roboto", sans-serif;
        .bi-badge-vr {
          display: inline-block;
          width: 1.5em;
        }
        a {
          color: white;
          display: block;
          /* padding: 0.8rem 1.5rem 0.8rem 0.6rem; */
        }
        i {
          margin-right: 0.5rem;
        }
      }

      &:hover {
        background-color: rgb(20 55 110);
        cursor: pointer;
        color: white;
        display: block;
      }
      &-open {
        background-color: #e76f51;
        .bi-chevron-down {
          transform: rotate(180deg);
        }
      }
    }
  }
  .sub-menu {
    height: 0px;
    overflow: hidden;
    a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      padding: 0.5rem 1rem;

      .bi-badge-vr {
        display: inline-block;
        width: 2em;
      }

      &:hover {
        background-color: rgb(255, 255, 255, 0.2);
      }
      i {
        margin-right: 0.5rem;
      }
    }
    &-open {
      height: auto !important;
      transition: height 1s ease-in-out;
    }
  }
`;
