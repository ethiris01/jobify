import styled from "styled-components";

const Wrapper = styled.main`
  min-height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 450px;
    display: block;
    margin-top: -3rem;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
  a {
    color: #6527be;
    text-transform: capitalize;
  }
`;

export default Wrapper;
