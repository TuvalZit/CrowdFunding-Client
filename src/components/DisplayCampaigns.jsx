//External Imports
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//Internal Imports
import FundCard from "./FundCard";
import { loader } from "../assets";
import { Flex, Image, Text } from "theme-ui";
import ScrollToTopButton from "./ScrollToTopButton";
import {
  setCampaigns,
  setFilteredCampaigns,
  setFilteredUserCampaigns,
  setUserCampaigns,
} from "../redux/slices/campaignSlice";
import { useStateContext } from "../context";
import { sortCampaigns } from "../utils";
const DisplayCampaigns = ({ title, profilePage = false }) => {
  //Context
  const { address, contract, getCampaigns, getUserCampaigns } =
    useStateContext();
  //Redux
  const dispatch = useDispatch();
  const {
    campaigns,
    isFiltering,
    filteredCampaigns,
    userCampaigns,
    filteredUserCampaigns,
  } = useSelector((state) => state.campaign);
  //States
  const [isLoading, setIsLoading] = useState(false);
  //const [campaigns, setCampaignsState] = useState([]);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  //Constants
  const itemsPerPage = 20;
  //Use Refs
  const observer = useRef();
  const tempRef = useRef();
  //Router
  const navigate = useNavigate();
  //Function
  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    let sortedArray = sortCampaigns(data);
    dispatch(setCampaigns([...sortedArray]));
    dispatch(setFilteredCampaigns([...sortedArray]));
    setIsLoading(false);
  };
  const fetchUserCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    let sortedArray = sortCampaigns(data);
    dispatch(setUserCampaigns([...sortedArray]));
    dispatch(setFilteredUserCampaigns([...sortedArray]));
    setIsLoading(false);
  };
  //------------------------------------------------------------
  //UseEffects - To fetch campaigns
  useEffect(() => {
    if (profilePage === false && !campaigns) {
      fetchCampaigns();
    } else if (address && profilePage === true && !userCampaigns) {
      fetchUserCampaigns();
    } else if (!address) {
      dispatch(setUserCampaigns(null));
    }
  }, [address, contract]);
  //------------------------------------------------------------
  //Use Effects - To initialize campaigns
  useEffect(() => {
    setPage(0);
    if (profilePage === false) {
      if (filteredCampaigns) {
        setItems(filteredCampaigns?.slice(0, itemsPerPage));
      } else {
        setItems(campaigns?.slice(0, itemsPerPage));
      }
    } else {
      console.log(filteredUserCampaigns?.slice(0, itemsPerPage));
      if (filteredUserCampaigns) {
        setItems(filteredUserCampaigns?.slice(0, itemsPerPage));
      } else setItems(userCampaigns?.slice(0, itemsPerPage));
    }
  }, [address, filteredCampaigns, filteredUserCampaigns]);
  //------------------------------------------------------------
  //Use Effect - To Inifinity scroll and show more campaigns on screen
  useEffect(() => {
    let totalCampaigns =
      profilePage === false
        ? filteredCampaigns?.length
        : filteredUserCampaigns?.length;
    let tempArr = [];
    console.log("total campaings", totalCampaigns);
    if (totalCampaigns > 0 && totalCampaigns > itemsPerPage) {
      let end = page * itemsPerPage + itemsPerPage;
      if (!isFiltering) {
        if (profilePage === false) tempArr.push(...campaigns?.slice(0, end));
        else tempArr.push(...userCampaigns?.slice(0, end));
      } else {
        if (profilePage === false)
          tempArr.push(...filteredCampaigns?.slice(0, end));
        else tempArr.push(...filteredUserCampaigns?.slice(0, end));
      }
      setItems([...tempArr]);
      setHasMore(tempArr.length < totalCampaigns);
    }
  }, [page]);
  //------------------------------------------------------------
  //Functions
  /**
   * Handle Navigate from specific campaign
   */
  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };
  //------------------------------------------------------------
  //Set next page when the last campaign is shown on screen
  const lastCampaignRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((campignEntries) => {
        if (campignEntries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );
  //------------------------------------------------------------
  return (
    <Flex sx={{ flexDirection: "column" }}>
      <Text
        sx={{
          fontFamily: "sans-serif",
          fontWeight: "semiBold",
          fontSize: "18px",
          color: "white",
          textAlign: "left",
        }}
      >
        {title} (
        {profilePage === false
          ? filteredCampaigns?.length
          : filteredUserCampaigns?.length}
        )
      </Text>

      <Flex
        sx={{
          flexWrap: "wrap",
          mt: "20px",
          gap: "26px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          position: "relative",
        }}
      >
        {isLoading && (
          <Image
            src={loader}
            alt="loader"
            sx={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
            }}
          />
        )}

        {!isLoading && profilePage === true && items && items.length === 0 && (
          <Text
            sx={{
              fontFamily: "sans-serif",
              fontWeight: "semiBold",
              fontSize: "14px",
              lineHeight: "30px",
              color: "#818183",
            }}
          >
            You have not created any campigns yet
          </Text>
        )}

        {!isLoading &&
          items &&
          items.length > 0 &&
          items.map((campaign, index) => {
            if (items.length === index + 1) {
              return (
                <FundCard
                  _ref={lastCampaignRef}
                  key={campaign.id}
                  {...campaign}
                  handleClick={() => handleNavigate(campaign)}
                />
              );
            } else {
              return (
                <FundCard
                  _ref={tempRef}
                  key={campaign.id}
                  {...campaign}
                  handleClick={() => handleNavigate(campaign)}
                />
              );
            }
          })}
        <Flex
          sx={{
            position: "fixed",
            bottom: "0px",
            height: "50px",
            maxWidth: "1280px",
            width: "1280px",
          }}
        >
          <Flex sx={{ position: "relative", width: "100%" }}>
            <ScrollToTopButton />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default DisplayCampaigns;
