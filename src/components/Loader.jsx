import React from "react";
import { Flex, Image, Text } from "theme-ui";

import { loader } from "../assets";

const Loader = () => {
  return (
    <Flex
      sx={{
        position: "fixed",
        backgroundAttachment: "fixed",
        top: "50%",
        left: "50%",
        zIndex: "10",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "200px",
        width: "200px",
        textAlign: "left",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Image
        src={loader}
        alt="loader"
        sx={{
          height: "100px",
          width: "100px",
          objectFit: "contain",
        }}
      />
      <Text
        sx={{
          mt: "20px",
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fontSize: "20px",
          color: "white",
          textAlign: "center",
        }}
      >
        Transaction is in progress <br /> Please wait...
      </Text>
    </Flex>
  );
};

export default Loader;
