// socketHandlers.js

const { Server } = require("socket.io");
const { Message, User } = require("./src/models");

const setupSocketHandlers = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
    connectionStateRecovery: {},
  });

  // io.on("connection", async (socket) => {
  //   console.log(`a user connected with ID: ${socket.handshake.auth.userID}`);
  //   socket.userID = socket.handshake.auth.userID;
  //   socket.username = socket.handshake.auth.username;

  //   // Example: Fetch existing messages
  //   const users = [];
  //   const messages = await Message.find({
  //     $or: [{ to: socket.userID }, { from: socket.userID }],
  //   });

  //   // Example: Populate users
  //   messages.forEach(async (message) => {
  //     // Determine if the message was sent by the user
  //     const isFromSelf = message.from == socket.userID;

  //     // Determine the recipient user ID
  //     const recipientUserId = isFromSelf ? message.to : message.from;
  //     console.log(recipientUserId);
  //     // Find the recipient in the users array
  //     let recipient = users.find((user) => user.userId === recipientUserId);

  //     // If recipient not found, create and add a new user object
  //     if (!recipient) {
  //       const user = await User.findById(recipientUserId);
  //       recipient = {
  //         userId: recipientUserId,
  //         username: user.name,
  //         connected: false,
  //         lastSeen: new Date().toISOString(),
  //         hasNewMessages: false,
  //         messages: [],
  //       };
  //       users.push(recipient);
  //     }

  //     // Add the message to the recipient's messages array
  //     recipient.messages.push({
  //       content: message.content,
  //       fromSelf: isFromSelf,
  //     });

  //     // Update recipient's status
  //     //   recipient.hasNewMessages = true;
  //   });
  //   console.log(`USers:`, users);
  //   socket.emit("users", users);
  // });
  io.on("connection", async (socket) => {
    console.log(`a user connected with ID: ${socket.handshake.auth.userID}`);
    socket.userID = socket.handshake.auth.userID;
    socket.username = socket.handshake.auth.username;

    socket.join(socket.userID.toString());
    //inform other connected users
    socket.broadcast.emit("user connected", socket.userID);
    const connectedUsers = [];
    io.sockets.sockets.forEach((socket) => {
      console.log("Already Connected socket:", socket.userID);
      connectedUsers.push(socket.userID);
    });

    try {
      // Fetch existing messages
      const messages = await Message.find({
        $or: [{ to: socket.userID }, { from: socket.userID }],
      }).sort({ timestamp: 1 }); // Sort messages by timestamp

      // Create a map to hold user data
      const userMap = new Map();

      // Iterate over messages to populate the userMap
      for (const message of messages) {
        const otherUserID =
          message.to.toString() === socket.userID.toString()
            ? message.from.toString()
            : message.to.toString();
        if (!userMap.has(otherUserID)) {
          // Fetch user details
          const user = await User.findById(otherUserID); // Adjust field as needed

          userMap.set(otherUserID, {
            userId: user._id.toString(),
            username: user.name,
            lastSeen: new Date(),
            isConnected: false,
            hasNewMessages: false,
            lastMessage: "Last Message...",
            messages: [],
          });
        }

        // Add message to the appropriate user's message array
        userMap.get(otherUserID).messages.push({
          content: message.content,
          fromSelf: message.from.toString() === socket.userID.toString(),
        });
        //update Last Message
        if (!(message.from.toString() == socket.userID.toString()))
          userMap.get(otherUserID).lastMessage = message.content;

        //CHeck if any unseen message is present and handle it
        if (
          !message.seen &&
          message.to.toString() == socket.userID.toString()
        ) {
          const recipient = message.from.toString();
          //add unseen indicator
          userMap.get(recipient).hasNewMessages = true;
          const changeStatus = await Message.findByIdAndUpdate(message._id, {
            seen: true,
          });
        }

        if (userMap.get(otherUserID)) {
          if (connectedUsers.includes(userMap.get(otherUserID).userId)) {
            userMap.get(otherUserID).isConnected = true;
          }
        }
      }

      // Convert userMap to an array
      const users = Array.from(userMap.values());

      // Send users data to the client
      socket.emit("users", users);
    } catch (error) {
      console.error("Error fetching messages or users:", error);
    }

    socket.on("private message", async ({ content, to }) => {
      const message = {
        content,
        to,
        from: socket.userID,
      };
      const result = new Message(message);
      await result.save();

      socket.to(to).emit("private message", { content, from: socket.userID });
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("user disconnected", socket.userID);
    });

    socket.onAny((Anyevent, ...args) => {
      console.log(`Event Recieved:`, Anyevent);
      console.log(`Args Recieved:`, args);
    });
  });
};

module.exports = setupSocketHandlers;
