import React from "react";
import PropertyImageCarousel from "./PropertyImageCarousel";
import { MapPin, Ruler, User, FileText } from "lucide-react";

const PropertyCard = ({ property, buttonType }) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col">
        <div className="h-64">
            <PropertyImageCarousel images={property.images} />
        </div>

        <div className="p-6 flex flex-col flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{property.name}</h2>

            <p className="text-gray-600 mb-4 flex-grow line-clamp-4 h-[125px]">{property.description}</p>

            <div className="mb-4">
                <div className="flex items-center text-gray-700 mb-2">
                    <Ruler className="mr-2 text-blue-500" size={20} />
                    <span>{property.size}</span>
                </div>

                <div className="flex items-center text-gray-700 mb-2">
                    <MapPin className="mr-2 text-red-500" size={20} />
                    <span>{property.location}</span>
                </div>

                <div className="flex items-center text-gray-700 mb-2">
                    <User className="mr-2 text-green-500" size={20} />
                    <span>{property.seller}</span>
                </div>
            </div>


            {buttonType === "viewDocument" && (
                <a
                    href={property.documentUrl || "#"}
                    className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full"
                >
                    View Document
                </a>
            )}
            {buttonType === "makeEnquiry" && (
                <button
                    onClick={() => window.location.href = `mailto:support@example.com?subject=Enquiry about ${property.name}&body=I am interested in the property ${property.name} at ${property.location}.`}
                    className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full"
                >
                    Make Enquiry
                </button>
            )}
        </div>
    </div>
);

export default PropertyCard;