import React, { type ChangeEvent, useEffect } from "react";

import { useNote } from "../utils/_context";

import styles from "./_mainEditor.module.css";
import { NoteTop, Template } from "@/utils/models";

export default function NoteForm(): React.JSX.Element {
    const {
        mainEditorVal,
        setMainEditorVal,
        currentNoteTop,
        setCurrentNoteTop,
        setTemplates,
    } = useNote()!;

    useEffect(
        function (): void {
            if (mainEditorVal === "") {
                return;
            }
            if (!currentNoteTop) {
                const noteTop = noteTopParser(mainEditorVal);
                setCurrentNoteTop(noteTop);
            }
        },
        [currentNoteTop, mainEditorVal],
    );

    function onChangeHandler(e: ChangeEvent<HTMLTextAreaElement>): void {
        const noteTop = noteTopParser(e.target.value);
        setCurrentNoteTop(noteTop);
        setTemplates(function (prev: Template[]): Template[] {
            return prev.map(function (t: Template): Template {
                const valLines = t.value.split("\n");
                let noteBottomLines: string[] = [];
                let sentry = false;
                for (const line of valLines) {
                    if (line.startsWith("Actions")) {
                        sentry = true;
                    }
                    if (!sentry) {
                        continue;
                    }
                    noteBottomLines.push(line);
                }

                return {
                    ...t,
                    value:
                        noteTopToText(noteTop!) +
                        "\n" +
                        noteBottomLines.join("\n"),
                };
            });
        });
        setMainEditorVal(e.target.value);
    }

    return (
        <>
            <h3>main editor</h3>
            <p>
                <textarea
                    className={styles.textarea}
                    rows={4}
                    cols={40}
                    value={mainEditorVal}
                    onChange={onChangeHandler}
                />
            </p>
        </>
    );
}

function noteTopParser(mainEditorVal: string): NoteTop | null {
    const lines = mainEditorVal.split("\n");
    const noteTop: NoteTop = {
        name: "",
        callback_n: "",
        best_contact_time: "",
        location: "",
        affected_user_count: 1,
        issue: "",
    };

    let issue = "";

    (Object.keys(noteTop) as (keyof NoteTop)[]).map(function (
        k: string,
        i: number,
    ) {
        if (i >= 6) {
            return;
        }
        const [_, value] = lines[i]!.split(":");
        if (i === 4) {
            noteTop.affected_user_count = parseInt(value!)
                ? parseInt(value!)
                : 1;
            return;
        }

        if (i === 5) {
            if (value) {
                issue = value;
            }

            for (let j = i + 1; j < lines.length; j++) {
                const [que, _] = lines[j]!.split(":");
                if (que !== "Actions Taken") {
                    issue += "\n" + lines[j];
                    continue;
                }
                break;
            }

            noteTop.issue = issue.trim();
        }

        if (value) {
            // @ts-ignore
            noteTop[k] = value.trim();
        }
    });

    return noteTop;
}

function noteTopToText(noteTop: NoteTop): string {
    let payload = `Name: ${noteTop.name}
Callback#: ${noteTop.callback_n}
Best time to contact and timezone: ${noteTop.best_contact_time}
Location: ${noteTop.location}
# of users affected: ${noteTop.affected_user_count}
Issue:
${noteTop.issue}
`;
    return payload;
}
