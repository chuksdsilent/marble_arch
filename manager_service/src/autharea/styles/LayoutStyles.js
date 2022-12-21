import styled from "styled-components";

export const LayoutStyles = styled.div`
  .name-placer {
    // Small devices (landscape phones, 576px and up)
    @media (max-width: 576px) {
      display: none;
    }

    // Medium devices (tablets, 768px and up)
    @media (min-width: 768px) {
    }

    // Large devices (desktops, 992px and up)
    @media (min-width: 992px) {
    }

    // X-Large devices (large desktops, 1200px and up)
    @media (min-width: 1200px) {
    }

    // XX-Large devices (larger desktops, 1400px and up)
    @media (min-width: 1400px) {
    }
  }
  .ant-table-content {
    // Small devices (landscape phones, 576px and up)
    @media (max-width: 576px) {
      overflow-x: scroll;
    }

    // Medium devices (tablets, 768px and up)
    @media (min-width: 768px) {
    }

    // Large devices (desktops, 992px and up)
    @media (min-width: 992px) {
    }

    // X-Large devices (large desktops, 1200px and up)
    @media (min-width: 1200px) {
    }

    // XX-Large devices (larger desktops, 1400px and up)
    @media (min-width: 1400px) {
    }
  }

  .hide-side-bar {
    // Small devices (landscape phones, 576px and up)
    @media (max-width: 576px) {
      min-width: 0px !important;
      max-width: 0px !important;
      overflow: hidden;
    }
  }

  .cancel {
    // Small devices (landscape phones, 576px and up)
    @media (max-width: 576px) {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 35px;
      cursor: pointer;
    }
  }

  .show-side-bar {
    overflow: auto;
    height: 100vh;
    background-color: "#031737";
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    padding-top: 5rem;
    z-index: 1500;

    // Small devices (landscape phones, 576px and up)
    @media (max-width: 576px) {
      min-width: 70% !important;
      max-width: 70% !important;
    }

    // Medium devices (tablets, 768px and up)
    @media (min-width: 768px) {
    }

    // Large devices (desktops, 992px and up)
    @media (min-width: 992px) {
    }

    // X-Large devices (large desktops, 1200px and up)
    @media (min-width: 1200px) {
    }

    // XX-Large devices (larger desktops, 1400px and up)
    @media (min-width: 1400px) {
    }
  }
  .total-badge {
    // Small devices (landscape phones, 576px and up)
    @media (max-width: 576px) {
      display: flex;
      justify-content: end;
    }

    // Medium devices (tablets, 768px and up)
    @media (max-width: 768px) {
    }

    // Large devices (desktops, 992px and up)
    @media (min-width: 992px) {
    }

    // X-Large devices (large desktops, 1200px and up)
    @media (min-width: 1200px) {
    }

    // XX-Large devices (larger desktops, 1400px and up)
    @media (min-width: 1400px) {
    }
  }
  .layout-content {
    margin-left: 200px;
    padding-left: 30px;
    margin-top: 100px;
    // Small devices (landscape phones, 576px and up)
    @media (max-width: 576px) {
      margin-left: 0px;
      padding: 0px 20px;
    }

    // Medium devices (tablets, 768px and up)
    @media (max-width: 768px) {
    }

    // Large devices (desktops, 992px and up)
    @media (min-width: 992px) {
    }

    // X-Large devices (large desktops, 1200px and up)
    @media (min-width: 1200px) {
    }

    // XX-Large devices (larger desktops, 1400px and up)
    @media (min-width: 1400px) {
    }
  }
  .manager-header {
    box-shadow: 0px 4px 5px 0px rgba(148, 147, 147, 0.75);
    background-color: white;
    position: fixed;
    width: 100%;
    z-index: 1000;
    padding-left: 200px;
    color: black;

    // Small devices (landscape phones, 576px and up)
    @media (max-width: 576px) {
      padding-left: 0px;
    }

    // Medium devices (tablets, 768px and up)
    @media (max-width: 768px) {
    }

    // Large devices (desktops, 992px and up)
    @media (min-width: 992px) {
    }

    // X-Large devices (large desktops, 1200px and up)
    @media (min-width: 1200px) {
    }

    // XX-Large devices (larger desktops, 1400px and up)
    @media (min-width: 1400px) {
    }
  }
  .site-layout {
    padding-top: "5rem";
    height: "100vh";
  }
`;
