import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { src, width, height, margin, padding, size, half } = props;

  const styles = {
    src,
    width,
    height,
    margin,
    padding,
    size,
    half: half,
  };

  return <ImageBox {...styles} src={src}></ImageBox>;
};

Image.defaultProps = {
  width: "75%",
  height: "75%",
  src: false,
  // size: "80%",
  half: false,
};

const ImageBox = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 10%;
  box-sizing: border-box;

  background-image: url("${(props) => props.src}");
  background-size: auto;
  margin: 0px;
`;

export default Image;
