import React from "react";

import { useQuery } from "@tanstack/react-query";

import styles from "./templates.module.css";

import { Template } from "@/utils/models";

export default function Links(): React.JSX.Element {
    const { data: templates, isLoading } = useQuery<Template[]>({
        queryKey: ["templates"],
        queryFn: async function () {
            const resp = await fetch("/api/templates");
            const data = await resp.json();
            return data;
        },
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!templates) {
        return <p>no templates found</p>;
    }

    return (
        <>
            <h3>templates</h3>
            <ul className={styles.templatesList}>
                {templates.map(function (t) {
                    return (
                        <li key={t.template_id}>
                            <article className={styles.tListItem}>
                                <header>
                                    <h4>{t.name}</h4> <p>count: {t.cc}</p>
                                </header>
                                <main>
                                    <pre>{t.value}</pre>
                                </main>
                            </article>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
