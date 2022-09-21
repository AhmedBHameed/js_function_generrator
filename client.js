import axios from 'axios';

const myDB = async () =>
    Array.from(
        {
            length: 10
        },
        (v, index) => `${index}-file-data`
    );

const SERVER_UPLOAD_URL = `http://localhost:9000/upload`;

async function processDBData() {
    const products = await myDB();
    const responses = [];
    for (const product of products) {
        const response = await axios.post(SERVER_UPLOAD_URL, { chunk: product });
        responses.push(response.data);
    }

    return responses;
}

async function* processDBDataGen() {
    const products = await myDB();
    for (const product of products) {
        const response = await axios.post(SERVER_UPLOAD_URL, { chunk: product });
        yield response.data;
    }
}

async function run() {
    // console.table(await processDBData());

    for await (const data of processDBDataGen()) {
        console.table(data);
    }
}

run();
