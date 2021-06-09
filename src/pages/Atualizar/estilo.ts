import styled from 'styled-components'

export const PrincipalContainer = styled.div`
  width: 100%;
  min-height: 100vh;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 600px;
    margin: 0 auto;
    margin-top: 100px;

    input {
      margin: 3px 0;
      padding: 4px;
    }

    button {
      padding: 4px;
      background: lightblue;
      color: #000000;
      border: none;
      cursor: pointer;
    }

    button + button {
      margin-top: 8px;
    }

    input, button {
      border-radius: 6px;
      font-size: 24px;
    }

    button:hover {
      transform: scale(1.1);
    }
  }
`
