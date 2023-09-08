import styled from "styled-components";

const Wrapper = styled.section`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: #6527be;
    }
    margin-bottom: 1.5rem;
  }
  p {
    line-height: 2;
    color: var(--text-secondary-color);
    margin-bottom: 1.5rem;
    max-width: 35em;
  }
  .register-link {
    margin-right: 1rem;
    background-color: #6527be;
  }
  .register-link:hover {
    background-color: blueviolet;
    box-shadow: var(--shadow-3);
  }
  .main-img {
    display: none;
  }
  .btn {
    padding: 0.75rem 1rem;
    background-color: #6527be;
  }
  .btn:hover {
    background-color: blueviolet;
    box-shadow: var(--shadow-3);
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  
      }
    }
  }
`;
export default Wrapper;
