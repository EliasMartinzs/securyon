import { Hono } from "hono";
import { handle } from "hono/vercel";

import passwords from "./passwords";
import creditCards from "./credit-cards";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app
  .route("/passwords", passwords)
  .route("/creditCards", creditCards);

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);

export type AppType = typeof routes;
