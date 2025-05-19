import user from "../models/userModel.js";
import Message from "../models/messageModel.js";


export const getUsersForChat = async (req, res) => {
  try {
    const loggedInUser = req.user.id;
    const filteredUsers = await user.find({ _id: { $ne: loggedInUser } }).select("-password");
    // const users = await User.find({ _id: { $ne: req.user.id } }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
}


export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const loggedInUserId = req.user.id;

    if (!userToChatId) {
      return res.status(400).json({ message: "User ID to chat with is required." });
    }

    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: loggedInUserId }
      ]
    }).sort({ createdAt: 1 }); // ascending time

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Error fetching messages", error });
  }
};


export const sendMessages = async (req, res) => {
  try {
    const { text } = req.body;
    const {id:receiverId} = req.params;
    const senderId = req.user.id;

    if (!message || !receiverId) {
      return res.status(400).json({ message: "Message and receiver ID are required." });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message: text,
     });

    await newMessage.save();
    //realtime functionality goes here=socket.io

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Error sending message", error });
  }
}