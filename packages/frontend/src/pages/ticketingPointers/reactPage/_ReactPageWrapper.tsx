import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ReactPage from "./_ReactPage";

const queryClient = new QueryClient();
export default function LinksWrapper(): React.JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactPage />
        </QueryClientProvider>
    );
}
