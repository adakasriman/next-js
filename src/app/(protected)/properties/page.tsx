// src/app/users/page.tsx
'use client';
import React from "react";
import BulkUploadDialog from "@/components/BulkUploadDialog";
import { PropertiesList } from "@/components/properties/propertiesList";
import { useCreatePropertyMutation } from "@/features/properties/propertiesApi";

export default function PropertiesPage() {
    const [createProperty] = useCreatePropertyMutation();
    return (    
        <main style={{ padding: "2rem" }}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Properties List</h1>
                <BulkUploadDialog
                    title="Bulk Upload Properties"
                    description="Upload an Excel (.xlsx, .xls) or CSV (.csv) file to bulk import properties."
                    onUpload={createProperty}
                />
            </div>
            <PropertiesList />
        </main>
    );
}
