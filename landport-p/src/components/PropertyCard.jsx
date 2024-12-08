import React from "react";
import PropertyImageCarousel from "./PropertyImageCarousel";
import { MapPin, Ruler, User, FileText } from "lucide-react";

const PropertyCard = ({ property, buttonType }) => (
    <div className="flex flex-col overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
        <div className="h-64">
            <PropertyImageCarousel images={property.images} />
        </div>

        <div className="flex flex-col flex-grow p-6">
            <h2 className="mb-3 text-2xl font-bold text-gray-800">{property.name}</h2>

            <p className="text-gray-600 mb-4 flex-grow line-clamp-4 h-[125px]">{property.description}</p>

            <div className="mb-4">
                <div className="flex items-center mb-2 text-gray-700">
                    <Ruler className="mr-2 text-blue-500" size={20} />
                    <span>{property.size}</span>
                </div>

                <div className="flex items-center mb-2 text-gray-700">
                    <MapPin className="mr-2 text-red-500" size={20} />
                    <span>{property.location}</span>
                </div>

                <div className="flex items-center mb-2 text-gray-700">
                    <User className="mr-2 text-green-500" size={20} />
                    <span>{property.seller}</span>
                </div>
            </div>


            {property.file && (
                <a
                    href={property.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    <FileText className="mr-2" size={20} />
                    View Property Document
                </a>
            )}
            {buttonType === "makeEnquiry" && (
                <button
                    onClick={() => window.location.href = `mailto:support@example.com?subject=Enquiry about ${property.name}&body=I am interested in the property ${property.name} at ${property.location}.`}
                    className="flex items-center justify-center w-full px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                >
                    Make Enquiry
                </button>
            )}
        </div>
    </div>
);

export default PropertyCard;