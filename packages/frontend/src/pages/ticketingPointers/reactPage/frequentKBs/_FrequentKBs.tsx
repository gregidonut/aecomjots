import React from "react";

import type { UseQueryResult } from "@tanstack/react-query";

import { useTPointers } from "../_tPointersQueries";
import { FrequentKb } from "@/utils/models";
import Table from "./table/_Table";
import CreateForm from "./createForm/_CreateForm";

export default function FrequentKBs(): React.JSX.Element {
    const [, { data, isLoading }] = useTPointers() as [
        any,
        UseQueryResult<FrequentKb[]>,
    ];

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
                <Table />
            </main>
            <footer>
                <CreateForm />
            </footer>
        </section>
    );
}
