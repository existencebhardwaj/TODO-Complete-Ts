import express, { Request, Response } from "express";
import collection from "./mongo";
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req: Request, res: Response) => {
});

app.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const check = await collection.findOne({ email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const data = {
    email,
    password,
  };

  try {
    const check = await collection.findOne({ email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.create(data);
    }
  } catch (e) {
    res.json("fail");
  }
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
