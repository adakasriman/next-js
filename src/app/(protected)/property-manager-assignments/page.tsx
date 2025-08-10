// src/app/users/page.tsx
'use client';
import React from "react";
import { PropertyManagerAssignmentsList } from "@/components/property_manager_assignments/PropertyManagerAssignmentsList";
import PropertyManagerAssignmentsBulkUploadModal from "@/components/property_manager_assignments/PropertyManagerAssignmentsModel";

export default function UnitsPage() {
    return (
        <main style={{ padding: "2rem" }}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Property Manager Assignments</h1>
                <PropertyManagerAssignmentsBulkUploadModal />
            </div>
            <PropertyManagerAssignmentsList />
        </main>
    );
}
