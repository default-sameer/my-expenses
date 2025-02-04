import { Hono } from "hono";

export const expensesRoute = new Hono<{ Bindings: CloudflareBindings }>()
  .get("/", (c) => {
    return c.json({ expenses: [] });
  })
  .post("/", async (c) => {
    const data = await c.req.json();
    return c.json(data);
  });
