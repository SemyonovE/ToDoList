import React from "react";
import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(180deg);
  }
`;

const borderWidth = 20;

const Spinner = styled.div`
  height: 70px;
  width: 70px;
  border-top: ${borderWidth}px solid gray;
  border-right: ${borderWidth}px solid transparent;
  border-bottom: ${borderWidth}px solid gray;
  border-left: ${borderWidth}px solid transparent;
  border-radius: 50%;
  box-sizing: border-box;
  animation: ${rotate360} 0.5s linear infinite;
`;

const CenterDiv = styled.div`
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
`;

class LoadingSpinner extends React.Component {
  state = { count: 120, step: 15 };

  componentDidMount = () =>
    (this.timer = setInterval(
      () =>
        this.setState(pS => {
          const count = pS.count + pS.step;
          if (count <= 0 || count >= 255) return { step: -1 * pS.step, count };
          return { count };
        }),
      500
    ));

  componentWillUnmount = () => clearInterval(this.timer);

  render = ({ count } = this.state) => {
    const SpinnerSizer = styled(Spinner)`
      border-top-color: rgb(${count}, calc(255 - ${count}), 255);
      border-bottom-color: rgb(${count}, calc(255 - ${count}), 255);
    `;

    return (
      <CenterDiv>
        <SpinnerSizer />
      </CenterDiv>
    );
  };
}

export { LoadingSpinner };
