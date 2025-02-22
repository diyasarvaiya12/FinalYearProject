import {v2 as cloudinary } from "cloudinary"

const connectCloudinary = async () => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME ||"dkofrrztr",
        api_key:process.env.CLOUDINARY_API_KEY || "358538845983824",
        api_secret:process.env.CLOUDINARY_SECRET_KEY || "pve4BNWFpkYaZK6_tSos4qpDauE"
    })


}

export default connectCloudinary;