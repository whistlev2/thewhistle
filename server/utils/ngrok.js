let data = {
    url: ''
};

async function connect() {
    let ngrok = require('ngrok');
    data.url = await ngrok.connect();
}

module.exports = {
    data: data,
    connect: connect,
};
