// initialize env from .env file
import * as dotenv from "dotenv";
dotenv.config();

import serverInstance from "./boostrap";

serverInstance.listen(3000, () => {
  console.log("Server started on port 3000 :)");
});
