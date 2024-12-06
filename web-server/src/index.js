import express from "express";
import FireStoreService from "../firebase/firestore-service.js";
import cors from "cors";

const app = express();
const port = 8383;

app.use(
  cors({
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

const fireStoreService = new FireStoreService();
app.post("/createPoll", (req, res) => {
  fireStoreService.addDataToCollection("createdPolls", req.body);
  res.sendStatus(200);
});

app.get("/getSubmittedPolls", async (req, res) => {
  await fireStoreService
    .fetchCollectionData("createdPolls")
    .then((response) => res.json(response))
    .catch((e) => console.error(e));
  res.sendStatus(200).send(response.body);
});

app.listen(port, () => console.log(`Server has started on port: ${port}`));
