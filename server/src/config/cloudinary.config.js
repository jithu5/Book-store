import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImageToCloudinary(filePath) {
    try {
        if (!filePath) {
            return null;
        }
        const response = await cloudinary.uploader.upload(filePath,{
            folder: 'book_images',
            resource_type:'image'
        });
        console.log("Image uploaded successfully to cloud",response.secure_url)
        return response;
    } catch (err) {
        console.error("Failed to upload image to cloud",err);
        return null;
    } finally {
         try {
             if (fs.existsSync(filePath)) {
                 fs.unlinkSync(filePath); // Delete the file locally after upload
                 console.log('Local file deleted:', filePath);
             }
         } catch (unlinkErr) {
             console.error('Failed to delete local file:', unlinkErr);
         }
    }
}

export async function deleteImageCloudinary(filePath) {
  try {
    const result = await cloudinary.uploader.destroy(filePath);
    console.log("Image deleted successfully from cloud",result);
    return result;
  } catch (error) {
    console.log("Failed to delete image from cloud",error)
    return null;

  }  
}