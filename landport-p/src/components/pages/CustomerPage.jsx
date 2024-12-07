import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "../../components/ui/card";
import { firestore } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export const CustomerPage = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            const querySnapshot = await getDocs(collection(firestore, "properties"));
            const data = querySnapshot.docs
                .map((doc) => doc.data())
                .filter((property) => property.status === "approved");
            setProperties(data);
        };

        fetchProperties();
    }, []);

    return (
        <div className="p-4">
            {properties.map((property, index) => (
                <Card key={index} className="mb-4">
                    <CardHeader>
                        <CardTitle>{property.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{property.description}</p>
                        {property.imageUrl && <img src={property.imageUrl} alt={property.name} />}
                        {property.pdfUrl && (
                            <a href={property.pdfUrl} target="_blank" rel="noopener noreferrer">
                                View Documents
                            </a>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
