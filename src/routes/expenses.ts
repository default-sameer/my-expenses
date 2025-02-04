import { Hono } from "hono";
import { AppType } from "..";

export const expensesRoute = new Hono<AppType>()
  .get("/", (c) => {
    return c.json({ expenses: [] });
  })
  .post("/", async (c) => {
    const data = await c.req.json();
    return c.json(data);
  });
