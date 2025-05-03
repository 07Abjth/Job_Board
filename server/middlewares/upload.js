import multer from 'multer';

// 1. Configure disk storage (local)
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    console.log(file, "=====file");
    cb(null, file.originalname); // Or use uuid/Date.now() for uniqueness
  }
});

// 2. Create the multer instance with extended file types
export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png'
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, JPG, and PNG are allowed.'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
