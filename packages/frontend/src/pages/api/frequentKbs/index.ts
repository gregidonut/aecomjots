import type { APIRoute } from "astro";
import axios from "axios";
export const GET: APIRoute = async function ({ locals }) {
    const { getToken } = locals.auth();
    const token = await getToken();
    const ASTRO_API_URL = import.meta.env.ASTRO_API_URL as string;
    const resp = await axios({
        method: "GET",
        url: `${ASTRO_API_URL}/frequentKbs`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return new Response(JSON.stringify(resp.data), {
        status: resp.status,
        headers: { "Content-Type": "application/json" },
    });
};

export const POST: APIRoute = async function ({ request, locals }) {
    const formData = await request.json();
    const { getToken } = locals.auth();
    const token = await getToken();
    const ASTRO_API_URL = import.meta.env.ASTRO_API_URL as string;
    console.log("kinginamo");
    const resp = await axios.post(
        `${ASTRO_API_URL}/frequentKbs`,
        {
            name: formData.name,
            kb_num: formData.kb_num,
            url: formData.url ?? "",
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    return new Response(JSON.stringify(resp.data), {
        status: resp.status,
        headers: { "Content-Type": "application/json" },
    });
};
