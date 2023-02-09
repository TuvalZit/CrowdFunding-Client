//External Imports
import React, { useState } from "react";
import { Flex, Image } from "theme-ui";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//=================================================================
//Internal Imports
import { logo, logout } from "../assets";
import { navlinks } from "../contants/index.js";
import { setFiltering } from "../redux/slices/campaignSlice";
import { useStateContext } from "../context";
//=================================================================
const Icon = ({
  name,
  key,
  imgUrl,
  isActive = true,
  disabled = false,
  handleClick,
  ...props
}) => {
  return (
    <Flex
      onClick={handleClick}
      {...props}
      sx={{
        width: "48px",
        height: "48px",
        borderRadius: "10px",
        bg: location.pathname.split("/")[1] === name && "#2c2f32",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        filter: location.pathname.split("/")[1] !== name && "grayscale(100%)",
        "&:hover": { filter: "none" },
        ...props.sx,
      }}
    >
      <Image
        src={imgUrl}
        alt="fund_logo"
        sx={{ width: "50%", height: "50%" }}
      />
    </Flex>
  );
};
const SideBar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("");
  const dispatch = useDispatch();
  const { address, disconnect } = useStateContext();
  const handleClick = (link) => {
    if (link.name === "create-campaign" && address) {
      setIsActive(link.name);
      dispatch(setFiltering(false));
      navigate(link.link);
    }
    if (link.name !== "create-campaign") {
      setIsActive(link.name);
      dispatch(setFiltering(false));
      navigate(link.link);
    }
  };
  return (
    <Flex
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        position: "fixed",
        top: "5px",
        alignSelf: "flex-start",
        zIndex: "20",
      }}
    >
      <Link to="/">
        <Icon
          sx={{ width: "52px", height: "52px", bg: "#2c2f32" }}
          imgUrl={logo}
        />
      </Link>

      <Flex
        sx={{
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          bg: "#1c1c24",
          borderRadius: "20px",
          width: "76px",
          mt: "40px",
          py: "25px",
          height: "90vh",
        }}
      >
        <Flex
          sx={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "3px",
          }}
        >
          {navlinks.map((link, index) => {
            if (link.name !== "logout") {
              return (
                <Icon
                  key={link.name}
                  name={link.name}
                  {...link}
                  isActive={isActive}
                  handleClick={() => handleClick(link)}
                />
              );
            }
          })}
        </Flex>
        <Flex>
          <Icon
            imgUrl={logout}
            handleClick={() => {
              disconnect();
              setIsActive("dashboard");
              navigate("/");
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideBar;
