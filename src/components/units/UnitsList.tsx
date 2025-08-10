'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "../data_table/DataTable";
import { unitHeaders } from "@/utils/unitList";
import { useGetUnitsQuery } from "@/features/units/unitsApi";

export const UnitsList = () => {
    const [currentPage, setPage] = useState(1);
    const [unitsList, setUnitsList] = React.useState<any>([]);
    const [paginationData, setPaginationData] = React.useState<any>({});
    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetUnitsQuery(
        { page: currentPage, limit: 5 },
        { refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
        if (data) {
            setUnitsList(data?.data || []);
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
            headers={unitHeaders}
            items={unitsList}
            pageSize={paginationData?.limit || 5}
            currentPage={paginationData?.currentPage || currentPage}
            totalPages={paginationData?.totalPages || 1}
            totalCount={paginationData?.total || 0}
            onPageChange={handlePageChange}
        />
    );
};