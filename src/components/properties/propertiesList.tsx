'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGetPropertiesQuery } from "@/features/properties/propertiesApi";
import { DataTable } from "../data_table/DataTable";
import { propertyHeaders } from "@/utils/propertyList";

export const PropertiesList = () => {
    const [currentPage, setPage] = useState(1);
    const [propertiesList, setPropertiesList] = React.useState<any>([]);
    const [paginationData, setPaginationData] = React.useState<any>({});
    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetPropertiesQuery(
        { page: currentPage, limit: 5 },
        { refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
        if (data) {
            setPropertiesList(data?.data || []);
            setPaginationData(data?.pagination || {});
        }
    }, [data]);


    if (isLoading) {
        return <div style={{ padding: '1rem' }}>Loading properties...</div>;
    }

    if (isError) {
        return <div style={{ padding: '1rem', color: 'red' }}>{error?.data?.message || 'Failed to fetch properties'}</div>;
    }

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= paginationData?.totalPages) {
            setPage(newPage);
        }
    };

    return (
        <DataTable
            headers={propertyHeaders}
            items={propertiesList}
            pageSize={paginationData?.limit || 5}
            currentPage={paginationData?.currentPage || currentPage}
            totalPages={paginationData?.totalPages || 1}
            totalCount={paginationData?.total || 0}
            onPageChange={handlePageChange}
        />
    );
};