//External Imports
import React from "react";
import { Flex, Text } from "theme-ui";
//===================================================================================
/*
 *  CountBox - Container for Campaign-Deatils page.
 *  There are 3 types of CountBox: days left, raised, backers
 */
const CountBox = ({ title, value }) => {
  return (
    <Flex
      id="CountBox-Container"
      sx={{
        flexDirection: "column",
        alignItems: "center",
        width: "150px",
      }}
    >
      <Flex
        id="CountBox-Header-Container"
        sx={{
          padding: "3px",
          bg: "#1c1c24",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          width: "100%",
          height: "60px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          id="CountBox-Header-Text"
          sx={{
            fontFamily: "sans-serif",
            fontWeight: "bold",
            fontSize: "30px",
            color: "white",
            width: "100%",
            textAlign: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </Text>
      </Flex>
      <Flex
        id="CountBox-Footer-Container"
        sx={{
          px: "3px",
          py: "2px",
          bg: "#28282e",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          id="CountBox-Footer-Text"
          sx={{
            fontFamily: "sans-serif",
            fontWeight: "normal",
            fontSize: "16px",
            color: "#808191",
            width: "100%",
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      </Flex>
    </Flex>
  );
};
//===================================================================================
export default CountBox;
