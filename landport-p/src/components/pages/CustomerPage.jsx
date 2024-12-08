import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import PropertyCard from "../PropertyCard";
import { Header } from "../Header";

export const CustomerPage = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            const querySnapshot = await getDocs(collection(firestore, "properties"));
            const approvedProperties = querySnapshot.docs
                .map((doc) => doc.data())
                .filter((property) => property.isApproved);
            setProperties(approvedProperties);
        };
        fetchProperties();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Available Properties
                </h1>
                {properties.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No properties available at the moment.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map((property, index) => (
                            <PropertyCard key={index} property={property} buttonType="makeEnquiry" />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};