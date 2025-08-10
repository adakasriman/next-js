// src/app/users/page.tsx
'use client';
import React from "react";
import UnitBulkUploadModal from "@/components/units/UnitBulkUploadModal";
import { UnitsList } from "@/components/units/UnitsList";

export default function UnitsPage() {
    return (
        <main style={{ padding: "2rem" }}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Units List</h1>
                <UnitBulkUploadModal />
            </div>
            <UnitsList />
        </main>
    );
}
