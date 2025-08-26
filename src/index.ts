import express from "express";
import client from "prom-client"
import { Counter } from "prom-client";

const app = express();
app.use(express.json());

let users_route_req_counter = new Counter({
    name : "http_number_of_request_for_users_route",
    help : "Counts no of requests in users route"
})

app.get("/users",(req,res)=>{
    users_route_req_counter.inc();
    res.send({
        "username" : "Himanshu",
        "age":25
    })
})

app.get("/metrics", async (req,res)=>{
    const metrics = await client.register.metrics();
    res.set("Content-Type",client.register.contentType);
    res.end(metrics);
})

app.listen(8000,()=>{
    console.log("Server listening at Port 8000");
})