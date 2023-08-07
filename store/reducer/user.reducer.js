const initialState = {
  userid: "",
  email: "",
  token: "",
  name: "",
  listings: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "APPUSER":
      return {
        userid: action.payload.userid,
        email: action.payload.email,
        token: action.payload.token,
        name: action.payload.name,
        listings: [action.payload.listings],
      };
    case "LISTINGS":
      return {
        listings: action.payload.listings.data,
      };
    case "USERPREFERENCES":
      return {
        currentLocation: action.payload.currentLocation,
        currentPlaceId: action.payload.currentPlaceId,
        typeOfSerach: "TBI",
        range: action.payload.range,
      };
    default:
      return state;
  }
};
