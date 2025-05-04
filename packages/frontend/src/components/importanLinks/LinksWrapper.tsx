import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Links from "./Links";

const queryClient = new QueryClient();

export default function LinksWrapper(): React.JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <Links />
        </QueryClientProvider>
    );
}
