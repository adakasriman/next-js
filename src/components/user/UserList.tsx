'use client';
import React from "react";
import { DataTable } from "../data_table/DataTable";
import { userHeaders } from "@/utils/userList";
import { useGetUsersQuery } from "@/features/users/usersApi"; // Adjust import path as needed

export const UserList = () => {
    const [currentPage, setPage] = React.useState(0);
    const { data: { data: users } = { data: [] }, isLoading, isError, error } = useGetUsersQuery();

    if (isLoading) {
        return <div style={{ padding: '1rem' }}>Loading users...</div>;
    }

    if (isError) {
        return (
            <div style={{ padding: '1rem', color: 'red' }}>
                {error ? 
                    ('status' in error ? error.data as string : 'Failed to fetch users') 
                    : 'Failed to fetch users'
                }
            </div>
        );
    }

    return (
        <DataTable
            headers={userHeaders}
            items={users || []}
            pageSize={10}
            currentPage={currentPage}
            onPageChange={setPage}
        />
    );
};