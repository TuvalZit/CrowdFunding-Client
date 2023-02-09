//External Imports
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Flex, Image, Input } from "theme-ui";
import { useDispatch, useSelector } from "react-redux";
//==========================================================================
//Internal Imports
import {
  setFilteredCampaigns,
  setFilteredUserCampaigns,
  setFiltering,
} from "../redux/slices/campaignSlice";
import { profile, search, thirdweb } from "../assets";
import { useStateContext } from "../context";
import CustomButton from "./CustomButton";
//==========================================================================
const NavBar = () => {
  //Router
  const navigate = useNavigate();
  const location = useLocation();
  //States
  const [searchText, setSearchText] = useState("");
  //Context
  const { connect, address } = useStateContext();
  //Redux
  const { campaigns, userCampaigns } = useSelector((state) => state.campaign);
  const dispatch = useDispatch();
  //==========================================================================
  //Functions
  /*
  * Method to handle any change in the search input. 
    In every character written down, a filter will be applied to the campaign list.
  */
  const handleSearch = (e) => {
    let originCampaigns;
    if (location.pathname.split("/")[1] === "")
      originCampaigns = [...campaigns];
    else if (location.pathname.split("/")[1] === "profile") {
      originCampaigns = [...userCampaigns];
    }
    if (
      (campaigns && location.pathname.split("/")[1] === "") ||
      (userCampaigns && location.pathname.split("/")[1] === "profile")
    ) {
      setSearchText(e.target.value);
      if (e.target.value.length == 0) {
        if (location.pathname.split("/")[1] === "")
          dispatch(setFilteredCampaigns(originCampaigns));
        else if (location.pathname.split("/")[1] === "profile")
          dispatch(setFilteredUserCampaigns(originCampaigns));
        dispatch(setFiltering(false));
      } else {
        dispatch(setFiltering(true));
        let filteredCampagins = [...originCampaigns];
        filteredCampagins = filteredCampagins.filter((campaign) =>
          campaign.title.toLowerCase().includes(e.target.value)
        );
        if (location.pathname.split("/")[1] === "")
          dispatch(setFilteredCampaigns(filteredCampagins));
        if (location.pathname.split("/")[1] === "profile")
          dispatch(setFilteredUserCampaigns(filteredCampagins));
      }
    }
  };
  /*
    Clear The Search Input
  */
  useEffect(() => {
    setSearchText("");
    dispatch(setFilteredCampaigns(campaigns));
    dispatch(setFilteredUserCampaigns(userCampaigns));
  }, [location]);

  return (
    <Flex
      id="NavBar-Container"
      sx={{
        width: "100%",
        mx: "auto",
        maxHeight: "70px",
        justifyContent: "space-between",
        mb: "35px",
      }}
    >
      <Flex
        id="search-container"
        sx={{
          flex: 1,
          maxWidth: "458px",
          py: "2px",
          pl: "4px",
          height: "52px",
          bg: "#1c1c24",
          borderRadius: "100px",
        }}
      >
        <Input
          type="text"
          placeholder="Search for campaigns"
          onChange={handleSearch}
          value={searchText}
          sx={{
            width: "100%",
            fontFamily: "Epilogue",
            display: "flex",
            fontWeight: "400",
            fontSize: "18px",
            "::placeholder": { color: "#b3b3b3" },
            color: "white",
            bg: "transparent",
            outline: "none",
            border: "none",
          }}
        />
        <Flex
          sx={{
            width: "72px",
            height: "100%",
            borderRadius: "100px",
            bg: "#00b9bc",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            border: "none",
          }}
        >
          <Image
            src={search}
            alt="search"
            sx={{ width: "15px", height: "15px", objectFit: "contain" }}
          />
        </Flex>
      </Flex>
      <Flex
        sx={{
          justifyContent: "flex-end",
          gap: "4px",
        }}
      >
        <CustomButton
          btnType="button"
          title={address ? "Create a campaign" : "Connect"}
          sx={{
            bg: address ? "#00b9bc" : "#FF8848",
            width: "100%",
            ":hover": {
              boxShadow: address
                ? " 0 0 2pt 2pt #FF8848"
                : " 0 0 2pt 2pt #00b9bc",
            },
          }}
          handleClick={() => {
            if (address) navigate("/create-campaign");
            else connect();
          }}
        />

        <Link to="/profile">
          <Flex
            sx={{
              width: "52px",
              height: "52px",
              borderRadius: "9999px",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              maxHeight: "52px",
              maxWidth: "52px",
              ":hover": { bg: "#2c2f32 " },
            }}
          >
            <Image
              src={profile}
              alt="user"
              width={"100%"}
              height={"100%"}
              sx={{
                objectFit: "contain",
              }}
            />
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
};

export default NavBar;
