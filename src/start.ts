import "reflect-metadata"; // must come first!

declare function require(name: string): any;
require("source-map-support").install();

// initialize env from .env file
import * as dotenv from "dotenv";
dotenv.config();

import serverInstance from "./boostrap";

serverInstance.listen(3000, () => {
  console.log("Server started on port 3000 :)");
});
