import React from "react";
import styled from "styled-components";

const Text2 = (props) => {
  const {children, lineHeight, fontWeight, color, fontSize, margin, display, alignItems, fontFamily,padding} = props;
  const styles = {  
    fontWeight:fontWeight,
    fontSize:fontSize,
    color:color,
    margin:margin,
    lineHeight:lineHeight,
    display:display,
    alignItems:alignItems,
    fontFamily:fontFamily,
    padding:padding,
  }
  return <P {...styles}>{children}</P>;
};
Text2.defaultProps = {
  color: "black",
  children: null,
  fontWeight: "500",
  fontSize: "16px",
  margin: "0px",
  lineHeight: "1.5em",
  alignItems: "normal",
  display: "unset",
}
const P = styled.p`
font-weight: ${(props) => props.fontWeight};
color:  ${(props) => props.color};
font-size:  ${(props) => props.fontSize};
margin:  ${(props) => props.margin};
line-height:  ${(props) => props.lineHeight};
align-items: ${(props) => props.alignItems};
display:${(props) => props.display};
font-family: ${(props) => props.fontFamily};
padding: ${(props) => props.padding};
`
export default Text2;
