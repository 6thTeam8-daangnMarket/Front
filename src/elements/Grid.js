import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    children,
    width,
    height,
    shadow,
    border_top,
    border_bottom,
    bg,
    margin,
    padding,
    is_flex,
    space_between,
    center,
    _onClick,
  } = props;

  const styles = {
    width,
    height,
    shadow,
    border_top,
    border_bottom,
    bg,
    margin,
    padding,
    is_flex,
    space_between,
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
  children: null,
  width: "100%",
  height: "100%",
  border_top: false,
  border_bottom: false,
  bg: false,
  padding: false,
  margin: false,
  is_flex: false,
  space_between: false,
  center: false,
  _onClick: () => {},
};

const GridBox = styled.div`
  // min-width: 300px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  box-shadow: ${(props) => props.shadow};
  border-top: ${(props) => (props.border_top ? `${props.border_top};` : "")};
  border-bottom: ${(props) =>
    props.border_bottom ? `${props.border_bottom};` : ""};
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
    ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: center;`
      : ""};
  ${(props) =>
    props.space_between
      ? `display: flex; align-items: center; justify-content: space-between;`
      : ""};
  ${(props) => (props.center ? `text-align: center;` : "")};
`;

export default Grid;
