import React from "react";

import { useQuery } from "@tanstack/react-query";

import { Link } from "@/utils/models";

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

    return (
        <ul>
            {linkTable.map(function (ld: Link) {
                return (
                    <li key={ld.link_id}>
                        <a href={ld.url}>{ld.name}</a>
                    </li>
                );
            })}
        </ul>
    );
}
