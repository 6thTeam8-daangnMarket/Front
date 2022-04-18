import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { shape, src, width, height, margin, padding, size, half } = props;

  const styles = {
    src: src,
    width,
    height,
    margin,
    padding,
    size,
    half: half,
  };

  return <ImageCircle {...styles} src={src}></ImageCircle>;
};

Image.defaultProps = {
  width: "100%",
  height: "100%",
  shape: "circle",
  src: false,
  size: "80%",
  half: false,
};

const ImageCircle = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
  box-sizing: border-box;

  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 0px;
`;

export default Image;
