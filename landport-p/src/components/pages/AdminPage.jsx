import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "../../components/ui/card";
import { firestore } from "../../firebase/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export const AdminPage = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            const querySnapshot = await getDocs(collection(firestore, "properties"));
            const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setProperties(data);
        };

        fetchProperties();
    }, []);

    const handleApprove = async (id) => {
        await updateDoc(doc(firestore, "properties", id), { status: "approved" });
        setProperties((prev) => prev.filter((prop) => prop.id !== id));
    };

    const handleReject = async (id) => {
        await updateDoc(doc(firestore, "properties", id), { status: "rejected" });
        setProperties((prev) => prev.filter((prop) => prop.id !== id));
    };

    return (
        <div className="p-4">
            {properties.map((property) => (
                <Card key={property.id} className="mb-4">
                    <CardHeader>
                        <CardTitle>{property.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{property.description}</p>
                        <Button className="mr-2" onClick={() => handleApprove(property.id)}>
                            Approve
                        </Button>
                        <Button variant="destructive" onClick={() => handleReject(property.id)}>
                            Reject
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
