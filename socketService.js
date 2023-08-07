import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";
export const socket = io(SOCKET_URL);

// class WSService {
//   initializeSocket = async () => {
//     try {
//       this.socket = io(["http://localhost:3000", "http://127.0.0.1:3000"], {
//         reconnect: true,
//         transports: ["websocket"],
//       });
//       console.log("initializing socket", this.socket);

//       this.socket.on("connect", (data) => {
//         console.log("=== socket connected ====");
//       });

//       this.socket.on("disconnect", (data) => {
//         console.log("=== socket disconnected ====");
//       });

//       this.socket.on("error", (data) => {
//         console.log("socekt error", data);
//       });
//     } catch (error) {
//       console.log("scoket is not inialized", error);
//     }
//   };

//   emit(event, data = {}) {
//     this.socket.emit(event, data);
//   }

//   on(event, cb) {
//     this.socket.on(event, cb);
//   }

//   removeListener(listenerName) {
//     this.socket.removeListener(listenerName);
//   }
// }

// const socketServcies = new WSService();

// export default socketServcies;
