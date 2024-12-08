import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { uploadImages, uploadFile } from "../../firebase/storageUtils";
import { firestore } from "../../firebase/firebase";
import { propertyModel } from "../../models/propertyModel";
import { Header } from "../Header";
import { Upload, FileText, Home, MapPin, Ruler, Send } from "lucide-react";

export const SellerPage = () => {
    const [propertyData, setPropertyData] = useState(propertyModel);
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPropertyData({ ...propertyData, [name]: value });
    };

    const handleImageUpload = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const validateForm = () => {
        if (!propertyData.name || !propertyData.size || !propertyData.location) {
            alert("Please fill out all required fields.");
            return false;
        }
        if (images.length < 3) {
            alert("Please upload at least 3 images.");
            return false;
        }
        if (!file) {
            alert("Please upload a property document.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const uploadedImages = await uploadImages(images);
            const uploadedFile = await uploadFile(file);

            const newProperty = {
                ...propertyData,
                images: uploadedImages,
                file: uploadedFile,
                createdAt: new Date().toISOString(),
                isApproved: false, // Default to not approved
            };

            await addDoc(collection(firestore, "properties"), newProperty);
            alert("Property listed successfully!");
            setPropertyData(propertyModel);
            setImages([]);
            setFile(null);
        } catch (error) {
            console.error("Error listing property:", error);
            alert("Failed to list property. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-full bg-gray-50 mt-12 w-[100vw] ">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white shadow-lg rounded-lg max-w-2xl mx-auto p-8 ">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">

                        List a New Property
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 text-gray-700 flex items-center">
                                    <Home className="mr-2 text-blue-500" size={20} />
                                    Property Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter property name"
                                    value={propertyData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-gray-700 flex items-center">
                                    <Ruler className="mr-2 text-green-500" size={20} />
                                    Property Size
                                </label>
                                <input
                                    type="text"
                                    name="size"
                                    placeholder="Enter property size (e.g., 2000 sqft)"
                                    value={propertyData.size}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>

                            <label className="block mb-2 text-gray-700 flex items-center">
                                <MapPin className="mr-2 text-red-500" size={20} />
                                Property Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                placeholder="Enter property location"
                                value={propertyData.location}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-gray-700">
                                Property Description
                            </label>
                            <textarea
                                name="description"
                                placeholder="Describe your property"
                                value={propertyData.description}
                                onChange={handleInputChange}
                                className="w-full p-3 border rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 text-gray-700 flex items-center">
                                    <Upload className="mr-2 text-purple-500" size={20} />
                                    Upload Images (minimum 3)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="w-full p-3 border rounded-md file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {images.length > 0 && (
                                    <p className="text-sm text-gray-600 mt-2">
                                        {images.length} image(s) selected
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block mb-2 text-gray-700 flex items-center">
                                    <FileText className="mr-2 text-orange-500" size={20} />
                                    Property Document (PDF)
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileUpload}
                                    className="w-full p-3 border rounded-md file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {file && (
                                    <p className="text-sm text-gray-600 mt-2">
                                        {file.name}
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
                        >
                            {isSubmitting ? (
                                <>
                                    <Send className="mr-2 animate-pulse" size={20} />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2" size={20} />
                                    Submit Property
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SellerPage;