import { db } from "@/db/db";
import { creditCard, insertCreditCards, passwords } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { and, eq, inArray } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Acesso não autorizado." }, 401);
    }

    const data = await db
      .select({
        id: creditCard.id,
        authorId: creditCard.authorId,
        cardNumber: creditCard.cardNumber,
        cardHolderName: creditCard.cardHolderName,
        expirationDate: creditCard.expirationDate,
        cvv: creditCard.cvv,
        cardType: creditCard.cardType,
        cardColor: creditCard.cardColor,
        notes: creditCard.notes,
        createdAt: creditCard.createdAt,
      })
      .from(creditCard)
      .where(eq(creditCard.authorId, auth.userId));

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
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "nenhum id encontrado" }, 404);
      }

      if (!auth?.userId) {
        return c.json({ error: "Acesso não autorizado." }, 401);
      }

      const data = await db
        .select({
          id: creditCard.id,
          authorId: creditCard.authorId,
          cardNumber: creditCard.cardNumber,
          cardHolderName: creditCard.cardHolderName,
          expirationDate: creditCard.expirationDate,
          cvv: creditCard.cvv,
          cardType: creditCard.cardType,
          cardColor: creditCard.cardColor,
          notes: creditCard.notes,
          createdAt: creditCard.createdAt,
        })
        .from(creditCard)
        .where(
          and(eq(creditCard.authorId, auth.userId), eq(creditCard.id, id))
        );

      return c.json({ data });
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertCreditCards.pick({
        cardNumber: true,
        cardHolderName: true,
        expirationDate: true,
        cvv: true,
        cardType: true,
        cardColor: true,
        notes: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Acesso não autorizado." }, 401);
      }

      const data = await db
        .insert(creditCard)
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
    "/bulk-delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Acesso não autorizado." }, 401);
      }

      const data = await db
        .delete(creditCard)
        .where(
          and(
            eq(creditCard.authorId, auth.userId),
            inArray(creditCard.id, values.ids)
          )
        )
        .returning({
          id: creditCard.id,
        });

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
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Nenhum id encontrado!" }, 404);
      }

      if (!auth?.userId) {
        return c.json({ error: "Acesso não autorizado." }, 401);
      }

      const data = await db
        .delete(creditCard)
        .where(and(eq(creditCard.authorId, auth.userId), eq(creditCard.id, id)))
        .returning({
          id: creditCard.id,
        });

      return c.json({ data });
    }
  );

export default app;
