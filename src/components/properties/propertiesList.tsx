'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGetPropertiesQuery } from "@/features/properties/propertiesApi";
import { DataTable } from "../data_table/DataTable";
import { propertyHeaders } from "@/utils/propertyList";

export const PropertiesList = () => {
   const [currentPage, setPage] = useState(0);
    const { data: { data: properties } = { data: [] }, isLoading, isError, error } = useGetPropertiesQuery();

    if (isLoading) {
        return <div style={{ padding: '1rem' }}>Loading properties...</div>;
    }

    if (isError) {
        return <div style={{ padding: '1rem', color: 'red' }}>{error?.data?.message || 'Failed to fetch properties'}</div>;
    }

    return (
        <DataTable
            headers={propertyHeaders}
            items={properties}
            pageSize={10}
            currentPage={currentPage}
            onPageChange={setPage}
        />
    );
};