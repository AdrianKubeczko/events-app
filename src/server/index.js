import createApp from "./app.js";
import apiMapping from "./api/apiMapping.js";

const app = createApp(apiMapping);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
