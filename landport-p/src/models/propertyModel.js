// src/models/propertyModel.js

// Standardized Property Model Structure
export const propertyModel = {
    name: "", // Property name
    description: "", // Property description
    size: "", // Property size (e.g., square footage)
    location: "", // Property location (e.g., address or latitude/longitude)
    images: [], // Array of image URLs (to store multiple images)
    file: "", // Property document (PDF URL)
    seller: "", // Seller username or ID
    isApproved: false, // Whether the property is approved by the admin
    createdAt: "", // Timestamp of when the property was listed
};
