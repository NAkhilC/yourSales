export const userState = (appState) => {
  return {
    type: "APPUSER",
    payload: appState,
  };
};

export const userListings = (listings) => {
  return {
    type: "LISTINGS",
    payload: listings,
  };
};

export const userPreferences = (listings) => {
  return {
    type: "USERPREFERENCES",
    payload: userPreferences,
  };
};
