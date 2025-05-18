import axios from "axios";
import type { APIRoute } from "astro";
export const GET: APIRoute = async function ({ locals }) {
    const { getToken } = locals.auth();
    const token = await getToken();
    const ASTRO_API_URL = import.meta.env.ASTRO_API_URL as string;
    const resp = await axios({
        method: "GET",
        url: `${ASTRO_API_URL}/links`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return new Response(JSON.stringify(resp.data), {
        status: resp.status,
        headers: { "Content-Type": "application/json" },
    });
};
