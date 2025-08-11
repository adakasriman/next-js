// src/app/users/page.tsx
'use client';
import React from "react";
import { PropertyManagerAssignmentsList } from "@/components/property_manager_assignments/PropertyManagerAssignmentsList";
import BulkUploadDialog from "@/components/BulkUploadDialog";
import { useCreatePropertyManagerAssignmentsMutation } from "@/features/property-manager-assignments/propertyManagerAssignmentsApi";

export default function PropertyManagerAssignmentsPage() {
    const [createPropertyManagerAssignments] = useCreatePropertyManagerAssignmentsMutation();
    return (
        <main style={{ padding: "2rem" }}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Property Manager Assignments</h1>
                <BulkUploadDialog
                    title="Bulk Upload Property Manager Assignments"
                    description="Upload an Excel (.xlsx, .xls) or CSV (.csv) file to bulk import property manager assignments."
                    onUpload={createPropertyManagerAssignments}
                />
            </div>
            <PropertyManagerAssignmentsList />
        </main>
    );
}
