import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import PropertyCard from "../PropertyCard";
import { Header } from "../Header";
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react";

export const AdminPage = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, "properties"));
                const propertiesList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProperties(propertiesList);
            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const handleApproval = async (id, isApproved) => {
        try {
            const propertyRef = doc(firestore, "properties", id);

            if (isApproved) {
                // Approve the property
                await updateDoc(propertyRef, { isApproved });
                setProperties((prevProperties) =>
                    prevProperties.map((property) =>
                        property.id === id ? { ...property, isApproved } : property
                    )
                );
                alert("Property approved!");
            } else {
                // Reject and remove the property
                await deleteDoc(propertyRef); // Removes it from Firestore
                setProperties((prevProperties) =>
                    prevProperties.filter((property) => property.id !== id)
                );
                alert("Property rejected and removed.");
            }
        } catch (error) {
            console.error("Error updating property status:", error);
        }
    };


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex items-center space-x-3 text-xl text-gray-600">
                    <RefreshCw className="animate-spin" size={24} />
                    <span>Loading properties...</span>
                </div>
            </div>
        );
    }

    // Filter properties into approved and pending
    const approvedProperties = properties.filter((property) => property.isApproved);
    const pendingProperties = properties.filter((property) => !property.isApproved);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="container px-4 py-8 mx-auto">
                <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
                    Admin Dashboard
                </h1>

                {/* Pending Properties Section */}
                <div>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-700">Pending Properties:</h2>
                    {pendingProperties.length === 0 ? (
                        <div className="text-center text-gray-500">No pending properties</div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {pendingProperties.map((property) => (
                                <div key={property.id} className="overflow-hidden bg-white rounded-lg shadow-lg">
                                    <PropertyCard property={property} />
                                    <div className="p-4 bg-gray-100 border-t">
                                        <div className="flex justify-between">
                                            <button
                                                className="flex items-center px-4 py-2 text-white transition-colors bg-green-500 rounded hover:bg-green-600"
                                                onClick={() => handleApproval(property.id, true)}
                                            >
                                                <CheckCircle2 className="mr-2" size={20} />
                                                Approve
                                            </button>
                                            <button
                                                className="flex items-center px-4 py-2 text-white transition-colors bg-red-500 rounded hover:bg-red-600"
                                                onClick={() => handleApproval(property.id, false)}
                                            >
                                                <XCircle className="mr-2" size={20} />
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Approved Properties Section */}
                <div className="mb-8">
                    <h2 className="mb-4 text-2xl font-semibold text-gray-700">Approved Properties:</h2>
                    {approvedProperties.length === 0 ? (
                        <div className="text-center text-gray-500">No approved properties</div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {approvedProperties.map((property) => (
                                <div key={property.id} className="overflow-hidden bg-white rounded-lg shadow-lg">
                                    <PropertyCard property={property} buttonType="viewDocument" />
                                    <div className="p-4 bg-gray-100 border-t">
                                        <div className="flex items-center justify-center font-bold text-green-600">
                                            <CheckCircle2 className="mr-2" size={20} />
                                            Approved
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>


            </div>
        </div>
    );
};

export default AdminPage;
