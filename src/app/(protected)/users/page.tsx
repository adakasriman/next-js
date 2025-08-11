'use client';
import React from "react";
import { UserList } from "@/components/user/UserList";
import BulkUploadDialog from "@/components/BulkUploadDialog";
import { useCreateUserMutation } from "@/features/users/usersApi";

export default function UsersPage() {
    const [createUser] = useCreateUserMutation();
    return (
        <main style={{ padding: "2rem" }}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Users List</h1>
                <BulkUploadDialog
                    title="Bulk Upload Users"
                    description="Upload an Excel (.xlsx, .xls) or CSV (.csv) file to bulk import users."
                    onUpload={createUser}
                />
            </div>
            <UserList />
        </main>
    );
}
