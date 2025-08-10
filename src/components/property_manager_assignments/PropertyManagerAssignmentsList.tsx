'use client';
import React, { useState, useEffect } from "react";
import { DataTable } from "../data_table/DataTable";
import { propertyManagerAssignmentsHeaders, parsePropertyManagerAssignments } from "@/utils/propertyManagerAssignmentsList";
import { useGetPropertyManagerAssignmentsQuery } from "@/features/property-manager-assignments/propertyManagerAssignmentsApi";

export const PropertyManagerAssignmentsList = () => {
    const [currentPage, setPage] = useState(1);
    const [unitsList, setUnitsList] = React.useState<any>([]);
    const [paginationData, setPaginationData] = React.useState<any>({});
    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetPropertyManagerAssignmentsQuery(
        { page: currentPage, limit: 5 },
        { refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
        if (data) {
            const parsedData = parsePropertyManagerAssignments(data?.data || []);
            setUnitsList(parsedData);
            setPaginationData(data?.pagination || {});
        }
    }, [data]);

    if (isLoading) {
        return <div style={{ padding: '1rem' }}>Loading units...</div>;
    }

    if (isError) {
        return <div style={{ padding: '1rem', color: 'red' }}>{error?.data?.message || 'Failed to fetch units'}</div>;
    }

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= paginationData?.totalPages) {
            setPage(newPage);
        }
    };


    return (
        <DataTable
            headers={propertyManagerAssignmentsHeaders}
            items={unitsList}
            pageSize={paginationData?.limit || 5}
            currentPage={paginationData?.currentPage || currentPage}
            totalPages={paginationData?.totalPages || 1}
            totalCount={paginationData?.total || 0}
            onPageChange={handlePageChange}
        />
    );
};