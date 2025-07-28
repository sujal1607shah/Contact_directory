import {v2 as cloudinary} from "cloudinary"
import fs from "fs"             //! inbuilt package che jema file structure maate hoy

 // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY , 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const uploadOnColudinary= async (loacalFilePath)=>{
        try {
            if(!loacalFilePath) return null
            // * Upload the file on cloudinary
            const response=await cloudinary.uploader.upload(loacalFilePath,{
                resource_type:"auto"
            })
            // * File has been uploaded
            // console.log("File has been uploaded",response.url);
            fs.unlinkSync(loacalFilePath);
            return response
            
        } catch (error) {
            fs.unlinkSync(loacalFilePath)
            // & remove the loaccaly saved temperory file as the upload operation got failed
            return null;
        }
    }

export {uploadOnColudinary}