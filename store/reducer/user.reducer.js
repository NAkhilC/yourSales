const initialState = {
  userid: null,
  isSignedIn: false,
  email: null,
  token: null,
  name: null,
  interested: [],
  addressText: '',
  placeId: '',
  latitude: '',
  longitude: '',
  range: '',
  notifications: {
    phoneNotifications: false,
    appNotifications: false,
    token: null
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "APPUSER":
      return {
        userid: action.payload.userid,
        email: action.payload.email,
        token: action.payload.token,
        name: action.payload.name,
        isSignedIn: action.payload.signedIn,
        interested: action.payload.interested,
        notificationsStatus: action.payload.finalStatus,
        addressText: action.payload.addressText,
        placeId: action.payload.placeId,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        range: action.payload.range,
        notifications: {
          phoneNotifications: action.payload.notifications?.phoneNotifications,
          appNotifications: action.payload.notifications?.appNotifications,
          token: action.payload.notifications?.token
        },
      };

    case "INTERESTED":
      return {
        ...state,
        interested: action.payload.interested,
      };

    case "RESETSTATE":
      return {
        userid: null,
        isSignedIn: false,
        email: null,
        token: null,
        name: null,
        interested: [],
        addressText: '',
        placeId: '',
        latitude: '',
        longitude: '',
        range: '',
        notifications: {
          phoneNotifications: false,
          appNotifications: false,
          token: null
        },
      };

    case "USERPREFERENCES":
      return {
        ...state,
        addressText: action.payload.addressText,
        placeId: action.payload.placeId,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        range: action.payload.range,
      };

    default:
      return state;
  }
};
