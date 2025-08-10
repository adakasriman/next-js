'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "../data_table/DataTable";
import { unitHeaders } from "@/utils/unitList";
import { useGetUnitsQuery } from "@/features/units/unitsApi";

export const UnitsList = () => {
    const [currentPage, setPage] = useState(0);
    const { data: { data: units } = { data: [] }, isLoading, isError, error } = useGetUnitsQuery();

    if (isLoading) {
        return <div style={{ padding: '1rem' }}>Loading units...</div>;
    }

    if (isError) {
        return <div style={{ padding: '1rem', color: 'red' }}>{error?.data?.message || 'Failed to fetch units'}</div>;
    }

    return (
        <DataTable
            headers={unitHeaders}
            items={units}
            pageSize={10}
            currentPage={currentPage}
            onPageChange={setPage}
        />
    );
};