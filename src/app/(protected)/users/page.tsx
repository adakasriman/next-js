'use client';
import React from "react";
import BulkUploadModal from "@/components/user/UserBulkUploadModal";
import { UserList } from "@/components/user/UserList";

export default function UsersPage() {
    return (
        <main style={{ padding: "2rem" }}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Users List</h1>
                <BulkUploadModal />
            </div>
            <UserList />
        </main>
    );
}
