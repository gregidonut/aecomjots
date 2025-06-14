import React, { useState, useEffect } from "react";
import type { UseQueryResult } from "@tanstack/react-query";

import { useTPointers } from "./_tPointersQueries";
import styles from "./_reactPage.module.css";

import Templates from "@/pages/ticketingPointers/reactPage/ticketingTemplates/_Templates";
import { Template, NoteTop } from "@/utils/models";

import NoteContext from "./utils/_context";
import NoteForm from "./mainEditor/_MainEditor";
import FrequentKBs from "./frequentKBs/_FrequentKBs";

export default function ReactPageWrapper(): React.JSX.Element {
    const [mainEditorVal, setMainEditorVal] = useState<string>("");
    const [templates, setTemplates] = useState<Template[]>([]);
    const [currentNoteTop, setCurrentNoteTop] = useState<NoteTop | null>(null);
    const [{ data, isLoading }] = useTPointers() as [
        UseQueryResult<Template[]>,
        any,
    ];

    useEffect(
        function (): void {
            if (data && data.length > 0) {
                setTemplates(data!);
                const fNote: string = data!.find(
                    (d) => d.template_id === 9,
                )!.value;
                setMainEditorVal(fNote);
            }
        },
        [data],
    );

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <NoteContext.Provider
            value={{
                mainEditorVal,
                setMainEditorVal,
                currentNoteTop,
                setCurrentNoteTop,
                templates,
                setTemplates,
            }}
        >
            <section className={styles.topSection}>
                <NoteForm />
                <FrequentKBs />
            </section>
            <Templates />
        </NoteContext.Provider>
    );
}
