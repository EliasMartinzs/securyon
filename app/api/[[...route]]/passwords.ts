import { db } from "@/db/db";
import { insertPasswordsSchema, passwords } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Acesso não autorizado." }, 401);
    }

    const data = await db
      .select({
        id: passwords.id,
        authorId: passwords.authorId,
      })
      .from(passwords)
      .where(eq(passwords.authorId, auth.userId));

    return c.json({ data });
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertPasswordsSchema.pick({
        accountEmail: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Acesso não autorizado." }, 401);
      }

      const [data] = await db
        .insert(passwords)
        .values({
          id: createId(),
          authorId: auth.userId,
          ...values,
        })
        .returning();

      return c.json({ data });
    }
  );

export default app;
