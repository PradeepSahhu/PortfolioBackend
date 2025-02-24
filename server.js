import DatabaseConnection from "./src/utility/DatabaseConnection.js";

import { app } from "./app.js";

const Main = async () => {
  await DatabaseConnection().then(() => {
    app.listen(8000, () => {
      console.log(`The server is running on http://localhost:${8000}`);
    });
  });
};

Main();
