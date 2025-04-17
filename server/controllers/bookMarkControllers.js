import Bookmark from "../models/bookmarkModel.js";


export const createBookmark = async (req, res) => {
    try {
      const { jobId } = req.body;
      const userId = req.user.id; // Make sure req.user is set from your auth middleware
  
      const bookmark = new Bookmark({
        user: userId,
        jobId,
      });
  
      await bookmark.save();
  
      res.status(201).json({ success: true, bookmark });
    } catch (error) {
      console.error("Error creating bookmark:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  


  export const getBookmarks = async (req, res) => {
    try {
        const userId = req.user.id;
      const { bookmarkId } = req.params;

  
      const bookmarks = await Bookmark.find({ _id: bookmarkId,
        user: userId  })
        .populate('job') // Populate the 'job' field to get job details
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