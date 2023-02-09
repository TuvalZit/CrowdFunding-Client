import { createSlice } from "@reduxjs/toolkit";

const campaignSlice = createSlice({
  name: "campaign",
  initialState: {
    campaigns: null,
    userCampaigns: null,
    filteredCampaigns: null,
    filteredUserCampaigns: null,
    isFiltering: false,
    loading: false,
    error: null,
  },
  reducers: {
    setCampaigns: (state, action) => {
      state.campaigns = action.payload;
    },
    setUserCampaigns: (state, action) => {
      state.userCampaigns = action.payload;
    },
    setFilteredCampaigns: (state, action) => {
      state.filteredCampaigns = action.payload;
    },
    setFiltering: (state, action) => {
      state.isFiltering = action.payload;
    },
    setFilteredUserCampaigns: (state, action) => {
      state.filteredUserCampaigns = action.payload;
    },
  },
  extraReducers: {},
});
export const {
  setCampaigns,
  setFilteredCampaigns,
  setFiltering,
  setUserCampaigns,
  setFilteredUserCampaigns,
} = campaignSlice.actions;
export default campaignSlice.reducer;
