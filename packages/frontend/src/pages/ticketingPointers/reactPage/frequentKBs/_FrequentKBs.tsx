import React from "react";

import { useQuery } from "@tanstack/react-query";
import { FrequentKb } from "@/utils/models";
import Table from "./table/Table";

export default function FrequentKBs(): React.JSX.Element {
    const { data, isLoading } = useQuery<FrequentKb[]>({
        queryKey: ["frequentKbs"],
        queryFn: async function () {
            const resp = await fetch("/api/frequentKbs");
            const data = await resp.json();
            return data;
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
                <form method="POST" action="/frequentKbs">
                    {["name", "kb_num", "url"].map(function (
                        e: string,
                        i: number,
                    ): React.JSX.Element {
                        return (
                            <p key={i}>
                                <label htmlFor={e}>{e}:</label>
                                <input type="text" name={e} id={e} />
                            </p>
                        );
                    })}
                </form>
            </footer>
        </section>
    );
}
