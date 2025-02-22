import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

// function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, bestseller } = req.body;

        // Input validation
        if (!name || !description || !price || !category || !subCategory) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required" 
            });
        }

        // Price validation
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid price value"
            });
        }

        // Category validation
        const validCategories = ['Nail_art', 'Nail_care'];
        if (!validCategories.includes(category)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category"
            });
        }

        // Image validation
        const images = [
            req.files.image1?.[0],
            req.files.image2?.[0],
            req.files.image3?.[0],
            req.files.image4?.[0]
        ].filter(Boolean);

        if (images.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one image is required"
            });
        }

        // Upload images to Cloudinary
        try {
            const imagesUrl = await Promise.all(
                images.map(async (item) => {
                    const result = await cloudinary.uploader.upload(item.path, {
                        resource_type: 'image',
                        allowed_formats: ['jpg', 'png', 'jpeg'],
                        max_bytes: 5000000 // 5MB limit
                    });
                    return result.secure_url;
                })
            );

            const productData = {
                name,
                description,
                category,
                price: Number(price),
                subCategory,
                bestseller: bestseller === "true",
                image: imagesUrl,
                date: Date.now()
            };

            const product = new productModel(productData);
            await product.save();

            res.status(201).json({ 
                success: true, 
                message: "Product added successfully" 
            });

        } catch (uploadError) {
            // Handle image upload errors
            return res.status(400).json({
                success: false,
                message: "Error uploading images. Please try again."
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};

// function for list product
const listProducts = async (req, res) => {
    try {
        
        const products = await productModel.find({});
        res.json({success:true,products})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { listProducts, addProduct, removeProduct, singleProduct }