'use client';
import React, { useEffect } from "react";
import { DataTable } from "../data_table/DataTable";
import { userHeaders } from "@/utils/userList";
import { useGetUsersQuery } from "@/features/users/usersApi";

export const UserList = () => {
    const [userList, setUserList] = React.useState<any>([]);
    const [paginationData, setPaginationData] = React.useState<any>({});
    const [currentPage, setPage] = React.useState(1);

    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetUsersQuery(
        { page: currentPage, limit: 5 },
        { refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
        if (data) {
            setUserList(data?.data || []);
            setPaginationData(data?.pagination || {});
        }
    }, [data]);

    if (isLoading) {
        return <div style={{ padding: '1rem' }}>Loading users...</div>;
    }

    if (isError) {
        return (
            <div style={{ padding: '1rem', color: 'red' }}>
                {error && 'status' in error
                    ? (error.data as string)
                    : 'Failed to fetch users'}
            </div>
        );
    }

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= paginationData?.totalPages) {
            setPage(newPage);
        }
    };

    return (
        <DataTable
            headers={userHeaders}
            items={userList}
            pageSize={paginationData?.limit || 5}
            currentPage={paginationData?.currentPage || currentPage}
            totalPages={paginationData?.totalPages || 1}
            totalCount={paginationData?.total || 0}
            onPageChange={handlePageChange}
        />
    );
};
