import { createCampaign, dashboard, logout, profile } from "../assets";

export const navlinks = [
  {
    name: "",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "create-campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/profile",
  },
  {
    name: "logout",
    imgUrl: logout,
    link: "/",
  },
];
