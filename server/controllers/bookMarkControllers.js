import Bookmark from "../models/bookMarkModel.js";


export const createBookmark = async (req, res) => {
  try {
    const { jobId } = req.body;
    
    if (!req.user) {
      return res.status(400).json({ message: 'User not authenticated' });
    }
    
    // Change req.user._id to req.user.id to match your token structure
    const bookmark = new Bookmark({
      jobId: jobId,
      user: req.user.id
    });

    await bookmark.save();
    res.status(201).json({ message: 'Bookmark saved successfully', bookmark });
  } catch (error) {
    console.error('Error saving bookmark:', error);
    res.status(500).json({ message: 'Error saving bookmark' });
  }
};
  


export const getBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookmarks = await Bookmark.find({ user: userId })
      .populate('jobId') // Make sure 'jobId' matches your model field name
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