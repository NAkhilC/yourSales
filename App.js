import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import { useEffect, useState } from "react";
import Login from "./screens/Login";
import { themeColors } from "./styles/base";
import ViewItem from "./screens/ViewItem";
import AddItem from "./screens/AddItems/addItem";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Saved from "./screens/Saved";
import ShowItemsOnMap from "./screens/ShowItemsOnMap";
import Chat from "./screens/Chats";
import { socket } from "./socketService";
import ChatUser from "./screens/ChatUser";
const Root = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const navTheme = DefaultTheme;
navTheme.colors.background = "#7a9e9f";
export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  return (
    <Provider store={store}>
      <NavigationContainer theme={navTheme}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: themeColors.primary,
            tabBarInactiveTintColor: "black",
            size: 30,
            tabBarStyle: {
              height: 85,
            },
          }}
        >
          {isSignedIn ? (
            <>
              <Tab.Screen
                options={{
                  tabBarIcon: ({ color, size }) => {
                    return color === themeColors.primary ? (
                      <Ionicons name="md-home" size={size} color={color} />
                    ) : (
                      <Ionicons name="md-home-outline" size={size} color={color} />
                    );
                  },
                }}
                name="Home"
                component={HomeStackScreen}
              />
              <Tab.Screen
                options={{
                  tabBarIcon: ({ color, size }) => {
                    return color === themeColors.primary ? (
                      <Ionicons name="map" size={size} color={color} />
                    ) : (
                      <Ionicons name="map-outline" size={size} color={color} />
                    );
                  },
                }}
                name="Map"
                component={ShowItemsOnMap}
              />
              <Tab.Screen
                options={{
                  tabBarIcon: ({ color, size }) => {
                    return color === themeColors.primary ? (
                      <Ionicons name="chatbubble" size={size} color={color} />
                    ) : (
                      <Ionicons name="chatbubble-outline" size={size} color={color} />
                    );
                  },
                }}
                name="ChatScreens"
                component={ChatScreens}
              />
              <Tab.Screen
                options={{
                  tabBarIcon: ({ color, size }) => {
                    return color === themeColors.primary ? (
                      <Ionicons name="heart" size={size} color={color} />
                    ) : (
                      <Ionicons name="heart-outline" size={size} color={color} />
                    );
                  },
                }}
                name="Saved"
                component={SavedScreen}
              />
              <Tab.Screen
                options={{
                  tabBarIcon: ({ color, size }) => {
                    return color === themeColors.primary ? (
                      <Ionicons name="person" size={size} color={color} />
                    ) : (
                      <Ionicons name="person-outline" size={size} color={color} />
                    );
                  },
                }}
                name="Profile"
                component={Profile}
              />
            </>
          ) : (
            <>
              <Tab.Screen
                options={{ tabBarStyle: { display: "none" } }}
                name="Login"
                children={() => <Login isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />}
              />
            </>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const HomeStack = createStackNavigator();
const SavedStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomePage" key="home" component={Home} />
      <HomeStack.Screen name="ViewItem" key="viewItem" component={ViewItem} />
      <HomeStack.Screen name="addItem" key="addItem" component={AddItem} />
    </HomeStack.Navigator>
  );
}
function SavedScreen() {
  return (
    <SavedStack.Navigator screenOptions={{ headerShown: false }}>
      <SavedStack.Screen name="SavedPage" component={Saved} />
      <SavedStack.Screen name="ViewItemSaved" component={ViewItem} />
    </SavedStack.Navigator>
  );
}

function ChatScreens() {
  return (
    <SavedStack.Navigator screenOptions={{ headerShown: false }}>
      <SavedStack.Screen name="Chats" component={Chat} />
      <SavedStack.Screen name="ChatUser" component={ChatUser} />
    </SavedStack.Navigator>
  );
}

const styles = StyleSheet.create({});
