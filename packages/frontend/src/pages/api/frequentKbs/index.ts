import type { APIRoute } from "astro";
export const GET: APIRoute = async function ({ locals }) {
    const { getToken } = locals.auth();
    const token = await getToken();
    const ASTRO_API_URL = import.meta.env.ASTRO_API_URL as string;
    const resp = await fetch(`${ASTRO_API_URL}/frequentKbs`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await resp.json();

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
};
