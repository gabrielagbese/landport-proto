import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { firestore, storage } from "../../firebase/firebase";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const SellerPage = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [pdf, setPdf] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const docRef = await addDoc(collection(firestore, "properties"), {
            name,
            description,
            status: "pending",
        });

        const propertyId = docRef.id;

        if (image) {
            const imageRef = ref(storage, `properties/${propertyId}/image`);
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);
            await updateDoc(docRef, { imageUrl });
        }

        if (pdf) {
            const pdfRef = ref(storage, `properties/${propertyId}/pdf`);
            await uploadBytes(pdfRef, pdf);
            const pdfUrl = await getDownloadURL(pdfRef);
            await updateDoc(docRef, { pdfUrl });
        }

        alert("Property submitted for review.");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <Input
                placeholder="Property Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                placeholder="Property Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <Input type="file" onChange={(e) => setPdf(e.target.files[0])} />
            <Button type="submit">Submit</Button>
        </form>
    );
};
