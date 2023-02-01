import styled from "styled-components";

export const FormStyles = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @media (max-width: 525px) {
    display: block;
  }
  .form-card {
    width: 40rem;
    @media (max-width: 525px) {
      width: 100%;
      margin-left: 0rem;
    }
  }
`;
