import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

// export const socket = io(URL, {
//   autoConnect: false,
// });

// let socket = null;

// const getSocket = (username, userID) => {
//   if (!socket) {
//     socket = io(URL, {
//       auth: { username, userID },
//       autoConnect: false,
//     });
//   } else {
//     socket.auth = { username, userID };
//     socket.disconnect();
//     socket.connect();
//   }
//   return socket;
// };

const initSocket = (username, userID) => {
  return new Promise((resolve, reject) => {
    try {
      let socket = io(URL, {
        auth: { username, userID },
        autoConnect: false,
      });
      resolve(socket);
    } catch (error) {
      reject(error.message);
    }
  });
};

export default initSocket;
