import React from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

export default function CreateForm(): React.JSX.Element {
    const form = useForm({
        defaultValues: {
            name: "",
            kb_num: "",
            url: "",
        },
        onSubmit: function ({ value }): void {
            console.log(value);
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
