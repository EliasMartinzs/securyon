import { Hono } from "hono";
import { handle } from "hono/vercel";

import passwords from "./passwords";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app.route("/passwords", passwords);

export const GET = handle(app);
export const POST = handle(app);
export type AppType = typeof routes;
