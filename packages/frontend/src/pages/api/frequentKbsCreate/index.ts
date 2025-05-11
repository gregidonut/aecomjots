import type { APIRoute } from "astro";
export const POST: APIRoute = async function ({ request, locals }) {
    const formData = await request.formData();
    const { getToken } = locals.auth();
    const token = await getToken();
    const ASTRO_API_URL = import.meta.env.ASTRO_API_URL as string;
    const resp = await fetch(`${ASTRO_API_URL}/frequentKbs`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: formData.get("name"),
            kb_num: formData.get("kb_num"),
            url: formData.get("url") ?? "",
        }),
    });

    const data = await resp.json();

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
};
