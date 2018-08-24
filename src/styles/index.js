import styled, { css } from "styled-components";

export const SpanRight = styled.span`
  float: right;
`;

export const ClearStyle = css`
  ::after {
    content: "";
    display: block;
    clear: both;
  }
`;
