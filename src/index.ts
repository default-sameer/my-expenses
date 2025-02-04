import { Hono } from "hono";
import { expensesRoute } from "./routes/expenses";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/", (c) => {
  return c.json({
    message: "API is Deployed",
  });
});

app.route("/expenses", expensesRoute);

export default app;
