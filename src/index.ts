import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
app.use(cors())
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/api/search", async (req: Request, res: Response) => {
  console.log(req.query.search);
  const response = await fetch(
    `https://api.scryfall.com/cards/search?q=${req.query.search}`
  );
  const json = await response.json();
  if (!json.data) {
    res.send([])
    return;
  }
  const results = json.data.map((card:any) => {
    return { card };
  });
  res.send(results);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
