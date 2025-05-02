import { defineMiddleware } from "astro:middleware";
import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";
import { sequence } from "astro:middleware";

const preauth = defineMiddleware(async function (_, next) {
    const response = await next();
    return response;
});

const postauth = defineMiddleware(async function (_, next) {
    const response = await next();
    return response;
});

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export const onRequest = sequence(
    preauth,
    clerkMiddleware(
        // @ts-ignore
        async function (auth, context) {
            const { userId } = auth();

            if (!isPublicRoute(context.request) && !userId) {
                return context.redirect("/sign-in");
            }
        },
    ),
    postauth,
);
