import React, { useState, useEffect, type ChangeEvent } from "react";

import { useQuery } from "@tanstack/react-query";

import styles from "./templates.module.css";

import { Template } from "@/utils/models";

export default function Links(): React.JSX.Element {
    const [templates, setTemplates] = useState<Template[]>([]);

    const { data, isLoading } = useQuery<Template[]>({
        queryKey: ["templates"],
        queryFn: async function () {
            const resp = await fetch("/api/templates");
            const data = await resp.json();
            return data;
        },
    });

    useEffect(
        function (): void {
            setTemplates(data!);
        },
        [data],
    );

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!templates) {
        return <p>no templates found</p>;
    }

    function onChangeHandlerFac(t: Template) {
        return function onChangeHandler(
            e: ChangeEvent<HTMLTextAreaElement>,
        ): void {
            setTemplates(function (prev): Template[] {
                return prev.map(function (templ): Template {
                    if (templ.template_id === t.template_id) {
                        return {
                            ...templ,
                            value: e.target.value,
                        };
                    }
                    return templ;
                });
            });
        };
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
                                    <p>
                                        <textarea
                                            rows={4}
                                            cols={40}
                                            value={t.value}
                                            onChange={onChangeHandlerFac(t)}
                                        />
                                    </p>
                                </main>
                            </article>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
