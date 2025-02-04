import { Hono } from "hono";
import { sign, jwt } from "hono/jwt";
import { expensesRoute } from "./routes/expenses";
import type { JwtVariables } from "hono/jwt";

const JWT_SECRET = "it-is-very-secret";

export type AppType = {
  Bindings: CloudflareBindings;
  Variables: JwtVariables;
};

const app = new Hono<AppType>();

app.use(
  "/auth/*",
  jwt({
    secret: JWT_SECRET,
  })
);

app.post("/login", async (c) => {
  const { username, password } = await c.req.json();
  if (username === "user" && password === "password") {
    const payload = {
      username,
      password,
    };
    const token = await sign(payload, JWT_SECRET);
    return c.json({ token });
  }
  return c.json({ message: "Invalid credentials" }, 401);
});

app.get("/auth/page", (c) => {
  const payload = c.get("jwtPayload");
  return c.json(payload); // eg: { "sub": "1234567890", "name": "John Doe", "iat": 1516239022 }
});

app.get("/", (c) => {
  return c.json({
    message: "API is Deployed",
  });
});

app.route("/expenses", expensesRoute);

export default app;
