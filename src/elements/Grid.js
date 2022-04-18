import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    children,
    width,
    height,
    shadow,
    bg,
    margin,
    padding,
    is_flex,
    center,
    _onClick,
  } = props;

  const styles = {
    width,
    height,
    shadow,
    bg,
    margin,
    padding,
    is_flex,
    center,
  };
  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  chidren: null,
  width: "100vw",
  height: "100vh",
  // shadow: "1px 4px 4px 4px rgba(0, 0, 0, 0.15)",
  bg: false,
  padding: false,
  margin: false,
  is_flex: false,
  center: "center",
  _onClick: () => {},
};

const GridBox = styled.div`
  // min-width: 300px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  box-shadow: ${(props) => props.shadow};
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
    ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: center;`
      : ""};
  ${(props) => (props.center ? `text-align: center;` : "")};
`;

export default Grid;
