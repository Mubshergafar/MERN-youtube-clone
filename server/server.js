import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
