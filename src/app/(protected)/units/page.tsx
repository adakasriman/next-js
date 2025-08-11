// src/app/users/page.tsx
'use client';
import React from "react";
import { UnitsList } from "@/components/units/UnitsList";
import BulkUploadDialog from "@/components/BulkUploadDialog";
import { useCreateUnitMutation } from "@/features/units/unitsApi";

export default function UnitsPage() {
    const [createUnit] = useCreateUnitMutation();
    return (
        <main style={{ padding: "2rem" }}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Units List</h1>
                <BulkUploadDialog
                    title="Bulk Upload Units"
                    description="Upload an Excel (.xlsx, .xls) or CSV (.csv) file to bulk import units."
                    onUpload={createUnit}
                />
            </div>
            <UnitsList />
        </main>
    );
}
