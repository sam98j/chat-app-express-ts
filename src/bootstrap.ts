import Server from "./server";
// port
const port = 5000;
// app instance
const app = new Server(port);
// run the appm
app.run()