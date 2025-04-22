import Bookmark from "../models/bookmarkModel.js";


export const createBookmark = async (req, res) => {
  try {
    const { jobId } = req.body;
    console.log(`Received jobId: ${jobId}`);
    
    const userId = req.user._id;
    console.log(`User ID from token: ${userId}`);
    

    const newBookmark = await Bookmark.create({ userId, jobId });

    res.status(201).json({ success: true, bookmark: newBookmark });
  } catch (error) {
    console.error('Error saving bookmark:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
  };
  


  export const getBookmarks = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const bookmarks = await Bookmark.find({ user: userId })
        .populate('jobId') // if `jobId` is a reference in your model
        .exec();
  
      res.status(200).json({ success: true, bookmarks });
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
  export const removeBookmark = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookmarkId } = req.params;
        
        console.log(`Attempting to delete bookmark: ${bookmarkId} for user: ${userId}`);
        
        const result = await Bookmark.findOneAndDelete({ 
            _id: bookmarkId,
            user: userId 
        });
        
        if (!result) {
            console.log("Bookmark not found for deletion");
            return res.status(404).json({ success: false, message: "Bookmark not found" });
        }
        
        console.log("Bookmark deleted successfully:", result);
        res.status(200).json({ success: true, message: "Bookmark removed" });
    } catch (error) {
        console.error("Error removing bookmark:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};