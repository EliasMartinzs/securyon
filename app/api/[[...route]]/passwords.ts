import { db } from "@/db/db";
import { insertPasswordsSchema, passwords } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";

const app = new Hono()
  .get("/", clerkMiddleware(), async c => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Acesso não autorizado." }, 401);
    }

    const data = await db
      .select({
        id: passwords.id,
        accountEmail: passwords.accountEmail,
        accountName: passwords.accountName,
        accountPassword: passwords.accountPassword,
        companyName: passwords.companyName,
        notes: passwords.notes,
        siteUrl: passwords.siteUrl,
        authorId: passwords.authorId,
      })
      .from(passwords)
      .where(eq(passwords.authorId, auth.userId));

    return c.json({ data });
  })
  .get(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async c => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Id nao encontrado." }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: "Acesso não autorizado." }, 401);
      }

      const data = await db
        .select({
          id: passwords.id,
          accountEmail: passwords.accountEmail,
          accountName: passwords.accountName,
          accountPassword: passwords.accountPassword,
          companyName: passwords.companyName,
          notes: passwords.notes,
          siteUrl: passwords.siteUrl,
          authorId: passwords.authorId,
        })
        .from(passwords)
        .where(and(eq(passwords.authorId, auth.userId), eq(passwords.id, id)));

      return c.json({ data });
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertPasswordsSchema.pick({
        accountEmail: true,
        accountName: true,
        accountPassword: true,
        notes: true,
        siteUrl: true,
        companyName: true,
      })
    ),
    async c => {
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
  )
  .post(
    "/buld-delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async c => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Acesso não autorizado." }, 401);
      }

      const data = await db
        .delete(passwords)
        .where(
          and(
            eq(passwords.authorId, auth.userId),
            inArray(passwords.id, values.ids)
          )
        )
        .returning({
          id: passwords.id,
        });

      return c.json({ data });
    }
  )
  .patch(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    zValidator(
      "json",
      insertPasswordsSchema.pick({
        accountEmail: true,
        accountName: true,
        accountPassword: true,
        notes: true,
        siteUrl: true,
      })
    ),
    async c => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!id) {
        return c.json({ error: "Id nao encontrado." }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: "Acesso não autorizado." }, 401);
      }

      const [data] = await db
        .update(passwords)
        .set(values)
        .where(and(eq(passwords.authorId, auth.userId), eq(passwords.id, id)))
        .returning();

      return c.json({ data });
    }
  )
  .delete(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async c => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Id nao encontrado." }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: "Acesso não autorizado." }, 401);
      }

      const data = await db
        .delete(passwords)
        .where(and(eq(passwords.authorId, auth.userId), eq(passwords.id, id)))
        .returning({
          id: passwords.id,
        });

      return c.json({ data });
    }
  );

export default app;
