import React, { type ChangeEvent, type FocusEvent } from "react";

import styles from "./_templates.module.css";

import { Template } from "@/utils/models";
import { useNote } from "../utils/_context";

export default function Links(): React.JSX.Element {
    const { setMainEditorVal, templates, setTemplates } = useNote()!;

    function onChangeHandlerFac(t: Template) {
        return function onChangeHandler(
            e:
                | ChangeEvent<HTMLTextAreaElement>
                | FocusEvent<HTMLTextAreaElement>,
        ): void {
            setTemplates(function (prev): Template[] {
                return prev.map(function (templ): Template {
                    if (templ.template_id === t.template_id) {
                        setMainEditorVal(e.target.value);
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
                                            onFocus={onChangeHandlerFac(t)}
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
