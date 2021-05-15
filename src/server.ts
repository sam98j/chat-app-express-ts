import express, { Application } from 'express';
import ServerConfigs from './configs/server';
import io, {Server as SocketServer, Socket} from 'socket.io';
import http, {Server as httpServer} from 'http'
import { Socket_IO } from './services/socket';

export default class Server {
    // express app
    private app: Application;
    // application port
    private port: number;
    // app configrations
    private configs: ServerConfigs;
    // server
    private server: httpServer;
    // socket io
    public io: SocketServer;
    // constructor method
    constructor(port: number){
        // initlize app
        this.app = express();
        // initlze app port
        this.port = port;
        // initlize app configs
        this.configs = new ServerConfigs(this.app);
        // server
        this.server = http.createServer(this.app);
        // socket 
        this.io = new SocketServer(this.server)
    }
    // application run method
    run(){
        // config middleware
        this.configs.configMidlleware();
        // config database
        this.configs.configDataBase()
        // config routes
        this.configs.configRoutes()
        Socket_IO(this.io)
        // app is listening
        this.server.listen(this.port, () => console.log(`app is running on port ${this.port}`))
    }
}