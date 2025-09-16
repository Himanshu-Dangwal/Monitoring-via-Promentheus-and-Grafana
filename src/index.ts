import express from "express";
import client from "prom-client"
import { Counter, Gauge } from "prom-client";

const app = express();
app.use(express.json());

let activeUsersGauge = new Gauge({
    name : "http_requests_for_actie_users_requests",
    help : "Counting number of active requests at the moment"
})

let users_route_req_counter = new Counter({
    name : "http_number_of_request_for_users_route",
    help : "Counts no of requests in users route",
    labelNames : ["route"]
})

app.get("/active",async (req,res)=>{
    activeUsersGauge.inc()

        //Creating a delay to see the changes
    await new Promise(resolve => setTimeout(resolve,10000));

    res.status(301).send({
        name : "himanshudangwal",
        age : "25"
    })

    activeUsersGauge.dec()
})

app.get("/users", (req,res)=>{
    users_route_req_counter.inc({
        route : "/user"
    });

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