import React from "react";

import axios from "axios";
import { useForm } from "@tanstack/react-form";
import { useMutation, type UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useTPointers } from "../../_tPointersQueries";
import { FrequentKb } from "@/utils/models";

export default function CreateForm(): React.JSX.Element {
    const [, { refetch }] = useTPointers() as [
        any,
        UseQueryResult<FrequentKb[]>,
    ];

    const mutation = useMutation({
        mutationFn: function (kb: {
            name: string;
            kb_num: string;
            url: string;
        }) {
            return axios.post("/api/frequentKbsCreate", kb);
        },
    });

    const form = useForm({
        defaultValues: {
            name: "",
            kb_num: "",
            url: "",
        },
        onSubmit: async function ({ formApi, value }) {
            await mutation.mutateAsync({
                ...value,
                kb_num: `KB${value.kb_num}`,
            });

            await refetch();

            formApi.reset();
        },
        validators: {
            onBlurAsyncDebounceMs: 250,
        },
    });

    return (
        <form
            onSubmit={function (e): void {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <form.Field
                name="name"
                validators={{
                    onChangeAsync: function ({ value }): string | void {
                        if (value.length < 5) {
                            return "name needs to be atleast 5 chars";
                        }
                    },
                }}
                children={function (field): React.JSX.Element {
                    return (
                        <p>
                            <label htmlFor={field.name}>{field.name}:</label>
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                value={field.state.value}
                                onChange={function (e): void {
                                    field.handleChange(e.target.value);
                                }}
                                required
                            />
                            {field.state.meta.errors &&
                                field.state.meta.errors.map(
                                    function (err, i): React.JSX.Element {
                                        return (
                                            <span key={i}>{err as string}</span>
                                        );
                                    },
                                )}
                        </p>
                    );
                }}
            />
            <form.Field
                name="kb_num"
                validators={{
                    onChangeAsync: function ({ value }): string | void {
                        if (!/^\d{7}$/i.test(value)) {
                            return "must be 7 digits";
                        }
                    },
                }}
                children={function (field): React.JSX.Element {
                    return (
                        <p>
                            <label htmlFor={field.name}>
                                {field.name}: <code>KB</code>
                            </label>
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                value={field.state.value}
                                onChange={function (e): void {
                                    field.handleChange(e.target.value);
                                }}
                                required
                            />
                            {field.state.meta.errors &&
                                field.state.meta.errors.map(
                                    function (err, i): React.JSX.Element {
                                        return (
                                            <span key={i}>{err as string}</span>
                                        );
                                    },
                                )}
                        </p>
                    );
                }}
            />
            <form.Field
                name="url"
                validators={{
                    onChangeAsync: z
                        .string()
                        .url({ message: "must be url format" })
                        .or(z.literal("")),
                }}
                children={function (field): React.JSX.Element {
                    return (
                        <p>
                            <label htmlFor={field.name}>{field.name}:</label>
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                value={field.state.value}
                                onChange={function (e): void {
                                    field.handleChange(e.target.value);
                                }}
                            />
                            {field.state.meta.errors &&
                                field.state.meta.errors.map(
                                    function (
                                        err,
                                        i,
                                    ): React.JSX.Element | null {
                                        if (!err) {
                                            return null;
                                        }
                                        return (
                                            <span key={i}>{err.message}</span>
                                        );
                                    },
                                )}
                        </p>
                    );
                }}
            />
            <button onClick={form.handleSubmit}>submit</button>
        </form>
    );
}
