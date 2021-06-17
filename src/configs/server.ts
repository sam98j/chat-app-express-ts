import express, { Application } from "express";
import cors from 'cors'
import mainRouter from "../routes/main";
import mongoose from 'mongoose'
import authRouter from "../routes/auth";
import usersRouter from "../routes/users";
import dataRouter from "../routes/data";
import dotenv from 'dotenv'

export default class ServerConfigs {
    // express app
    private app: Application;
    // constructor method
    constructor(app: Application){
        this.app = app
    }
    // config middleware
    configMidlleware(){
        dotenv.config()
        // make routes accesable for every origin
        this.app.use(cors())
        this.app.use(express.json())
    }
    // config routes
    configRoutes(){
        this.app.use('/', mainRouter)
        this.app.use('/auth', authRouter)
        this.app.use('/users', usersRouter)
        this.app.use('/data', dataRouter)
    }
    // config database
    async configDataBase(){
        const db = await mongoose.connect('mongodb://localhost/chat', {
            useNewUrlParser: true, useUnifiedTopology: true
        }, () => console.log('database connected'));
    }
}