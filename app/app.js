const express = require('express');
const client = require('prom-client');
const app = express();

// Create a basic counter metric
const counter = new client.Counter({
    name: 'app_requests_total',
    help: 'Total number of requests',
    labelNames: ['status']
});

// Middleware to increment counter on each request
app.use((req, res, next) => {
    res.on('finish', () => {
        counter.labels(res.statusCode).inc();
    });
    next();
});

// Metrics endpoint for Prometheus scraping
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.send(await client.register.metrics());
});

app.listen(3001, () => {
    console.log('App listening on port 3001');
});
