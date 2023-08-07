import { StyleSheet } from "react-native";
import { fontSize, themeColors } from "./base";
export const styles = StyleSheet.create({
  topBottomFlex: {
    flex: 1,
  },
  containerFlex: {
    flex: 1,
  },
  header: {
    height: "100%",
  },
  headerView: {
    marginTop: 40,
    marginLeft: "40%",
  },
  headerText: {
    fontSize: 30,
    color: "white",
  },
  body: {
    flex: 9,
    backgroundColor: "white",
  },
  footer: {
    backgroundColor: themeColors.peimarynext,
    flexDirection: "row",
    height: 100,
    flexGrow: 0,
    flexShrink: 0,
  },
  footerSub: {
    width: "25%",
  },
  input: {
    height: 40,
    width: "70%",
    marginLeft: "3%",
    padding: 10,
    borderWidth: 2,
    borderColor: themeColors.primary,
  },
  homeSearch: {
    flexDirection: "row",
    padding: 5,
  },
  searchIcon: {
    height: "100%",
    width: "10%",
    padding: 2,
    backgroundColor: themeColors.primary,
  },
  FilterIcon: {
    height: "100%",
    width: "10%",
    padding: 2,
    marginLeft: "5%",
  },

  //listings
  bodyView: { flexDirection: "row", flexWrap: "wrap", padding: 5 },
  bodyViewHome: {},
  eachViewItem: {
    height: 200,
    width: 100,
    flex: 1,
    marginTop: 1,
    borderWidth: 0,
    borderColor: "black",
  },
  itemImage: {
    height: "77%",
  },
  itemText: {
    textAlign: "center",
  },
  itemTextAddress: {
    textAlign: "center",
  },
  infoImage: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },

  //models
  centeredView: {
    flex: 3,
    alignItems: "center",
    marginTop: 2,
  },
  modalView: {
    margin: 30,
    width: "100%",
    height: 600,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViewSmall: {
    margin: 30,
    width: "100%",
    height: 200,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  //listItems
  mainItemView: {
    margin: 0,
  },
  itemViewImageContainer: {
    height: 330,
  },
  itemViewImage: { height: 280 },
  imageMainFooter: { height: 60, flexDirection: "row" },
  imageSubFooter1: { width: "50%", flexDirection: "row" },
  imageFooterIcon1: {
    width: "50%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  imageFooterIcon2: {
    padding: 5,
    marginLeft: "60%",
    justifyContent: "right",
    alignItems: "right",
  },
  itemViewGeneralInfo: {
    backgroundColor: "white",
    marginTop: 10,
    height: 200,
    padding: 15,
  },
  itemViewGeneralInfoDesc: {
    marginTop: 10,
    padding: 15,
  },
  viewItemName: {
    fontSize: fontSize.md,
    fontWeight: 700,
  },
  viewItemDetails: {
    marginTop: 10,
  },
  viewItemDetailLabel: {
    fontSize: 15,
    fontWeight: 700,
  },
  timeAndLocation: {
    marginTop: 10,
    fontWeight: 600,
  },
  homeMainText: {
    flexDirection: "row",
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "space-between",
    height: 40,
  },
  addItem: {
    padding: 20,
  },
  addItemTitleInput: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderColor: themeColors.primary,
  },
  addItemTitle: {
    height: 40,
    borderColor: "black",
    borderWidth: 2,
  },
  addItemTitleTextInput: {
    height: 200,
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    borderColor: themeColors.primary,
  },
  addItemTitleIndividualTextInput: {
    height: 150,
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    borderColor: themeColors.primary,
  },
  individaulItems: {
    marginTop: 30,
  },
  individaulItemsTextLabel: {
    marginTop: 10,
  },
  eachItem: {
    borderWidth: 1,
    padding: 5,
    borderColor: themeColors.primary,
    overflow: "hidden",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    marginRight: "10%",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginTop: 5,
    backgroundColor: themeColors.primary,
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginTop: 15,
    backgroundColor: themeColors.primary,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  imagePicked: {
    width: "46%",
    height: 130,
    margin: 5,
    borderWidth: 2,
    borderRadius: 5,
    overflow: "hidden",
    borderColor: themeColors.primary,
  },
  eachImagePicked: {
    width: "100%",
    height: "80%",
  },
  removelinkOnImgae: {
    height: "20%",
    alignItems: "center",
    padding: 2,
  },

  //login
  loginContainer: {
    width: "90%",
    height: 300,
    backgroundColor: "red",
    marginLeft: "5%",
    alignItems: "center",
    backgroundColor: themeColors.peimarynext,
  },
  loginIcon: {
    width: "15%",
    height: 50,
    margin: 5,
    borderRadius: 999,
    overflow: "hidden",
    alignItems: "center",
  },
  loginTextInput: {
    width: "100%",
    height: 150,
    alignItems: "center",
  },
  loginTextInputBox: {
    width: "90%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    overflow: "hidden",
    borderBottomWidth: 2,
    borderBottomColor: themeColors.primary,
  },
  loginTextInputIcon: {
    width: "15%",
    height: "100%",
    paddingTop: 10,
    alignItems: "center",
  },
  LoginInputValue: {
    width: "100%",
    overflow: "hidden",
  },

  //signUp
  signUpContainer: {
    width: "90%",
    height: 430,
    backgroundColor: "red",
    marginLeft: "5%",
    alignItems: "center",
    backgroundColor: themeColors.peimarynext,
  },
  signUpHeaderText: {
    fontSize: 30,
    marginTop: 20,
    color: themeColors.primary,
  },

  //toggle
  toggleSwitchContainer: {
    marginTop: 130,
  },
  toggleSwitch: {
    width: "90%",
    marginLeft: "5%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: themeColors.peimarynext,
  },
  loginToggle: {
    width: "50%",
    borderBottomWidth: 3,
    alignItems: "center",
    backgroundColor: themeColors.peimarynext,
    padding: 5,
  },
  toggleText: {
    fontSize: 30,
    color: themeColors.primary,
  },
  toastBanner: {
    display: "flex",
    height: 100,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  mainToastBanner: {
    marginTop: 300,
    zIndex: 100,
    marginLeft: "5%",
    position: "absolute",
    width: "90%",
    alignItems: "center",
  },
  successToastButton: {
    width: "20%",
    alignItems: "center",
    backgroundColor: themeColors.success,
    padding: 5,
  },
  toggleTextSuccessOk: {
    fontSize: 30,
    color: themeColors.peimarynext,
  },

  imageChangerLeftButton: {
    position: "absolute",
    width: "25%",
    height: "100%",
    zIndex: 10,
    opacity: 0.2,
  },
  currentImageHighlighter: {
    position: "absolute",
    bottom: 5,
    height: "8%",
    width: "40%",
    overflow: "hidden",
    alignItems: "center",
    marginLeft: "25%",
    zIndex: 10,
    opacity: 0.8,
    backgroundColor: "black",
    borderRadius: 15,
  },
  currentImageInnerView: { flexDirection: "row", display: "flex", flexWrap: "nowrap", marginTop: 3 },

  imageChangerRightButton: { position: "absolute", right: 0, width: "25%", height: "100%", zIndex: 10, opacity: 0.2 },

  iconContainer: {
    height: 70,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  savedInterestedView: {
    width: "90%",
    flexDirection: "row",
    display: "flex",
    flexWrap: "wrap",
    marginLeft: "5%",
  },
  savedInterestedViewItem: {
    width: "100%",
    marginTop: 15,
    height: 100,
    flexDirection: "row",
    display: "flex",
  },
  savedInterestedViewItemImage: {
    width: "40%",
    height: 100,
    overflow: "hidden",
  },
  savedInterestedViewItemText: {
    overflow: "hidden",
    width: "60%",
    padding: 5,
  },
  addressFlexItem: {
    flexGrow: 1,
    flexDirection: "row",
    marginTop: 5,
  },
  addGeneralMain: {
    flexDirection: "row",
    height: 200,
    position: "relative",
    marginBottom: 20,
  },
  addGeneralDisplay: {
    flex: 1,
  },

  container: {
    padding: 8,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    margin: 5,
    height: 220,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  adContainer: {
    flex: 1,
    backgroundColor: "gray", // Example background color for ads
    margin: 4,
    height: 200, // Adjust the height as needed for a complete row ad
  },
  itemText: {
    fontSize: 16,
  },
  itemImage: {
    width: "100%",
    height: 130,
    marginBottom: 8,
  },

  message: {
    fontSize: 16,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderColor: "gray",
    borderWidth: 1,
  },
});
