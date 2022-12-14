import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`🚀 Magic is happening on port ${PORT} 🚀`);
});
