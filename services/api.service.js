import axios from "axios";
import { API_URL, API_TOKEN, MAPS_KEY } from "@env";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { store } from "../store/store";
import { resetState, userPreferences, userState } from "../store/actions/user.action";


//const dispatch = useDispatch();
const storeData = store;
const ERROR_MESSAGES = [{
    data: "NO_USER_FOUND",
    message: "User doesn't exist, Please sign up"
}, {
    data: "USER_EXIST",
    message: "User exists"
}, {
    data: "INVALID_SESSION",
    message: "Invalid session"
}, {
    data: "SOMETHING_WRONG",
    message: "Error occured, please sign in again"
}]

const axiosInstance = axios.create({
    baseURL: API_URL, // Replace with your API base URL
});

async function setInterested(listingId) {
    return await axiosInstance.post(`/items/interested`, JSON.stringify({ listingId: listingId }), { headers: { "Content-Type": "application/json" } })
        .then((res) => {
            if (res) {
                return res;
            } else {
                alert("Action cannot be performed!");
            }
        });
}

axiosInstance.interceptors.response.use((response) => {
    if (response.data && response.data.status === 200) {
        return response.data.data;

    } else if (response.data && response.data.status === 401) {
        alert("Invalid session");
        store.dispatch(resetState());
    } else if (response.data && response.data.status === 404 || 500) {
        const errorMessage = ERROR_MESSAGES.find(errorMessages => {
            return errorMessages.data === response.data.data;
        })
        if (errorMessage) {
            alert(errorMessage.message)
        } else {
            alert("Something went wrong")
        }
    } else {
        alert("Something went wrong");
        return;
    }
}, (error) => {
    alert("Something went wrong");
    return;
})

const userLogin = async (loginForm) => {
    return await axiosInstance
        .post(`/login`, JSON.stringify(loginForm), {
            headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
            store.dispatch(
                userState({
                    userid: response.email,
                    email: response.email,
                    token: response.token,
                    signedIn: true,
                    name: response.name,
                    interested: response.interested,
                    notifications: response.notifications,
                    addressText: response.userPreference?.address?.addressText,
                    placeId: response.userPreference?.address?.placeId,
                    latitude: response.userPreference?.address?.latitude,
                    longitude: response.userPreference?.address?.longitude,
                    range: response.userPreference?.range
                })
            );
            return true;
        })
        .catch((error) => console.log(error));
}

const userSignUp = async (signUp) => {
    await axiosInstance
        .post(`/signUp`, JSON.stringify(signUp), {
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            if (res) {
                return true;
            };
        });
}

const updateNotifications = async (notificationInfo) => {
    await axiosInstance.post(`/pushNotifications`, JSON.stringify(notificationInfo), {
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => {
            if (res) {
                console.log(res);
            }
        });
}

const getItem = async (data) => {
    return await axiosInstance.get(`/item/${data}`).then(item => {
        return item;
    })

}

const getItemsForUser = async () => {
    return await axiosInstance.get(`/items`).then((response) => {
        if (response) {
            return response;
        }
    });
}

module.exports = {
    updateNotifications,
    getItemsForUser,
    setInterested,
    userSignUp,
    userLogin,
    getItem
}