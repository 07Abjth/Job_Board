import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:5000"); // Use your server URL

export const Chat = () => {
  const [message, setMessage] = useState("");  // State to manage input message

  useEffect(() => {
    // Listen for incoming messages
    socket.on('chat message', (msg) => {
      console.log(msg); // Handle the message (show in UI, etc.)
    });

    return () => {
      socket.off('chat message'); // Clean up when the component unmounts
    };
  }, []);

  const sendMessage = () => {
    if (message) {
      socket.emit('chat message', message); // Send a message to the server
      setMessage(""); // Clear the input after sending
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Chat</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="p-2 w-full border border-gray-300 rounded-md mb-4"
        placeholder="Type a message"
      />
      <button
        onClick={sendMessage}
        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Send Message
      </button>
    </div>
  );
};

 