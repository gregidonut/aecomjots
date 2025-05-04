import React from "react";

import { useQuery } from "@tanstack/react-query";

import { Link } from "@/utils/models";
import Table from "./table/Table.tsx";

export default function Links(): React.JSX.Element {
    const { data: linkTable, isLoading } = useQuery<Link[]>({
        queryKey: ["getLinks"],
        queryFn: async function () {
            const resp = await fetch("/api/getLinks");
            return await resp.json();
        },
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!linkTable) {
        return <p>no links found</p>;
    }

    return <Table d={linkTable} />;
}
