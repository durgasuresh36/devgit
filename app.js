'use strict';

// [START gae_node_request_example]
const express = require('express');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')

const app = express();
const client = new SecretManagerServiceClient();

const name = 'projects/[project-id]/secrets/my-secret/versions/1';

app.get('/', (req, res) => {
    async function accessSecretVersion() {
        const [version] = await client.accessSecretVersion({
            name: name,
        });

        // Extract the payload as a string.
        const payload = version.payload.data.toString();

        // WARNING: Do not print the secret in a production environment - this
        // snippet is showing how to access the secret material.
        console.info(payload)
        return payload;
    }

    const payload = accessSecretVersion();
    if(payload)
        res.status(200).send(`Payload: ${payload}`).end();
    else
        res.status(200).send('Hello World').end();
});

// Start the server
const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;