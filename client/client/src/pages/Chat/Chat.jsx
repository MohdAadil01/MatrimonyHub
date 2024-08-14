import React, { useEffect, useRef, useState } from 'react';
import './Chat.css';
import Recipient from '../../components/Chat/Recipient';
import MessageBody from '../../components/Chat/MessageBody';
import initSocket from '../../socket';

function Chat() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userID, setUserID] = useState('');
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);


  function start() {
    const userID = prompt('Enter userID').toString();
    setUserID(userID);
  }

  function handlePrivateMessage({ content, from }) {
    console.log(`New message:`, content);

    // Use functional state update to ensure the latest state
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) => {
        if (user.userId.toString() === from.toString()) {
          // Create a copy of the user object with updated messages
          return {
            ...user,
            hasNewMessages: true,
            messages: [
              ...user.messages,
              {
                content: content,
                fromSelf: false,
              },
            ],
          };
        }
        return user;
      });
      console.log(`Updated UsersData:`, updatedUsers);
      return updatedUsers; // Return the new array to update the state
    });
  }

  function handleUserConnect(id) {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.userId == id ? { ...user, isConnected: true } : user
      )
    );
    console.log(`A user came online:`,id)
  }

  function handleUserDisconnect(id) {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.userId == id ? { ...user, isConnected: false } : user
      )
    );
    console.log(`A user got offline:`,id)
  }

  useEffect(() => {
    const setupSocket = async () => {
      try {
        // Example users data setup
        const usersData = [
          {
            userId: '1',
            username: 'john_doe',
            connected: true,
            lastSeen: '2024-08-06T12:34:56Z',
            hasNewMessages: true,
            messages: [
              { content: 'Hey, how are you?', fromSelf: true },
              { content: "I'm good, thanks! What about you?", fromSelf: false },
              { content: 'Doing well, just working on a project.', fromSelf: true },
              { content: 'Sounds interesting. Need any help?', fromSelf: false },
            ],
          },
          {
            userId: '2',
            username: 'jane_smith',
            connected: false,
            lastSeen: '2024-08-06T11:20:45Z',
            hasNewMessages: false,
            messages: [
              { content: 'Hi John, did you finish the task?', fromSelf: false },
              { content: "Yes, I did. I'll send it over soon.", fromSelf: true },
              { content: 'Great, thanks!', fromSelf: false },
              { content: "No problem. Let me know if there's anything else.", fromSelf: true },
            ],
          },
        ];
        setUsers(usersData);

        if (userID) {
          // Initialize and set the socket connection
          const username='default';
          const newSocket = await initSocket(username, userID);
          setSocket(newSocket);

          newSocket.on('connect', () => {
            setIsConnected(true);
            console.log('Socket Connected:');
          });

          newSocket.on('disconnect', () => {
            setIsConnected(false);
            console.log('Socket Disconnected');
          });

          newSocket.on('connect_error', (err) => {
            if (err.message === 'invalid username') {
              alert(`Socket Error: ${err.message}`);
            }
          });

          newSocket.on('users', (users) => {
            console.log('Users', users);
            setUsers(users);
          });

          newSocket.on('private message', handlePrivateMessage);

          newSocket.on('user connected',handleUserConnect)

          newSocket.on('user disconnected',handleUserDisconnect)

          // Explicitly connect the socket
          newSocket.connect();

          // Cleanup function
          return () => {
            newSocket.off('connect');
            newSocket.off('disconnect');
            newSocket.off('connect_error');
            newSocket.off('users');
            newSocket.off('users');
            newSocket.off('user connected');
            newSocket.off('user disconnected');
            newSocket.disconnect();
          };
        } else {
          start();
        }
      } catch (error) {
        console.error('Error setting up socket:', error);
      }
    };

    setupSocket();
  }, [userID]); // Add username to the dependency array

  return (
    <div className="main-body">
      <Recipient
        users={users}
        setUsers={setUsers}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        socket={socket}
      />
      <MessageBody
        users={users}
        setUsers={setUsers}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        socket={socket}
      />
    </div>
  );
}

export default Chat;
