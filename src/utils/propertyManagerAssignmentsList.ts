export const propertyManagerAssignmentsHeaders = [
    { header: "Assignment ID", accessorKey: "assignment_id" },
    { header: "Property ID", accessorKey: "property_id" },
    { header: "User", accessorKey: "user" },
    { header: "Is Deleted", accessorKey: "is_deleted" },
    { header: "Created At", accessorKey: "created_at" },
    { header: "Updated At", accessorKey: "updated_at" },
]


export const parsePropertyManagerAssignments = (data: any) => {
    return data.map((item: any) => ({
        assignment_id: item.assignment_id,
        property_id: item.property_id,
        user: `${item.user?.first_name} ${item.user?.last_name}`,
        is_deleted: item.is_deleted ? "Yes" : "No",
        created_at: item.created_at,
        updated_at: item.updated_at,
    }))
}   