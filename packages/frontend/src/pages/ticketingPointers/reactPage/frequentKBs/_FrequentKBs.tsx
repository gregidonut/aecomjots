import React from "react";

import { useQuery } from "@tanstack/react-query";
import { FrequentKb } from "@/utils/models";
import Table from "./table/Table";
import axios from "axios";
import CreateForm from "./createForm/_CreateForm";

export default function FrequentKBs(): React.JSX.Element {
    const { data, isLoading, refetch } = useQuery<FrequentKb[]>({
        queryKey: ["frequentKbs"],
        queryFn: async function () {
            const resp = await axios({
                method: "get",
                url: " /api/frequentKbs",
            });
            return resp.data;
        },
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!data || data.length === 0) {
        return <p>no data for frequent kbs</p>;
    }
    return (
        <section>
            <header>
                <h3>frequent Kbs</h3>
            </header>
            <main>
                <Table d={data} />
            </main>
            <footer>
                <CreateForm refetch={refetch} />
            </footer>
        </section>
    );
}
