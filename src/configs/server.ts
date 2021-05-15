import express, { Application } from "express";
import cors from 'cors'
import mainRouter from "../routes/main";
import mongoose from 'mongoose'
import authRouter from "../routes/auth";
import usersRouter from "../routes/users";

export default class ServerConfigs {
    // express app
    private app: Application;
    // constructor method
    constructor(app: Application){
        this.app = app
    }
    // config middleware
    configMidlleware(){
        // make routes accesable for every origin
        this.app.use(cors())
        this.app.use(express.json())
    }
    // config routes
    configRoutes(){
        this.app.use('/', mainRouter)
        this.app.use('/auth', authRouter)
        this.app.use('/users', usersRouter)
    }
    // config database
    async configDataBase(){
        const db = await mongoose.connect('mongodb+srv://sam98j:sam98j@cluster0.whpnc.mongodb.net/chat?retryWrites=true&w=majority', {
            useNewUrlParser: true, useUnifiedTopology: true
        }, () => console.log('database connected'));
    }
}