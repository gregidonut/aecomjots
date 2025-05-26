import axios from "axios";
import { useQueries } from "@tanstack/react-query";
import { Template, FrequentKb } from "@/utils/models";

export function useTPointers() {
    return useQueries<[Template[], FrequentKb[]]>({
        queries: [
            {
                queryKey: ["templates"],
                queryFn: async function (): Promise<Template[]> {
                    const resp = await axios({
                        method: "get",
                        url: "/api/templates",
                    });
                    return resp.data;
                },
            },
            {
                queryKey: ["frequentKbs"],
                queryFn: async function (): Promise<FrequentKb[]> {
                    const resp = await axios({
                        method: "get",
                        url: " /api/frequentKbs",
                    });
                    return resp.data;
                },
            },
        ],
    });
}
