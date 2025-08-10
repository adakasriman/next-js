// src/app/users/page.tsx

import React from "react";
import BulkUploadModal from "@/components/properties/propertiesBulkUploadModal";
import { PropertiesList } from "@/components/properties/propertiesList";

export default function PropertiesPage() {
    return (
        <main style={{ padding: "2rem" }}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Properties List</h1>
                <BulkUploadModal />
            </div>
            <PropertiesList />
        </main>
    );
}
