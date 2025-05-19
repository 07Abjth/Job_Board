// src/utils/socket.js
import io from "socket.io-client";
import { getUserToken } from "../../utils/authUtils";

const socket = io("[http://localhost:5000/api/v1])", {
auth: {
token: getUserToken(),
},
withCredentials: true,
});

export default socket;

 