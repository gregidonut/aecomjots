import React from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Link } from "@/utils/models";
import Table from "./table/Table.tsx";

export default function Links(): React.JSX.Element {
    const { data: linkTable, isLoading } = useQuery<Link[]>({
        queryKey: ["links"],
        queryFn: async function () {
            const resp = await axios({ method: "get", url: "/api/links" });
            return resp.data;
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
