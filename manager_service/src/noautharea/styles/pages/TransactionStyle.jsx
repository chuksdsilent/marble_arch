import styled from "styled-components";

export const TransactionStyle = styled.div`
  .__transaction-content {
    margin: 5rem 0rem 5rem 0rem;
    .date-picker {
      width: 100% !important;
      height: 40px;
    }
    .ant-calendar-picker-input.ant-input {
      border-radius: 0px;
      height: 53px;
    }

    .milestones {
      margin-left: 3rem;
    }

    button.btn {
      width: 150px !important;
      font-size: 12px;
      padding: 5px;
      margin-left: 3rem;
    }
    h3,
    h5 {
      color: #150f50;
      font-family: "Ubuntu", Sans-serif;
      font-size: 1.3em;
      font-weight: 700;
      font-style: normal;
      text-decoration: none;
      line-height: 1.4em;
    }
    h5 {
      margin-bottom: 3rem;
      font-size: 0.8em;
    }
    h6 {
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
    }
  }
  .select-role {
    .label-style {
      white-space: nowrap;
    }

    .label-style:before,
    .label-style:after {
      top: calc((100% - 1rem) / 2) !important;
    }

    .font-size30 {
      font-size: 30px;
    }

    .font-size50 {
      font-size: 50px;
    }

    .font-size62 {
      font-size: 62px;
    }
  }
  .row {
    margin-bottom: 2rem;
  }
  .__transaction-content {
    .the-form {
      background-color: #dddce3;
      padding: 2rem;
    }
  }
`;
