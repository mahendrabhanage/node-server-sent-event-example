const axios = require('axios');

const url = "https://dev-api.copilot.urder.com/stream_text_message";
const user_id = 14989
const user_access_token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyY2YyNDM2YS1iYzgzLTRlMzAtOTJlYi00OTlkNDFiZTc4NDIiLCJleHAiOjE3NTgwOTMzNjUsInN1YiI6IjE0OTg5Iiwic2NwIjoiYXBpX3YxX2F1dGhvcml6YXRpb25zX3VzZXIiLCJhdWQiOnsiYXVkIjoiVXNlciJ9LCJpYXQiOjE3MjY1NTczNjV9.gIuB8ugmQBzx2CTwd2bZ2nTzVIKAL7-frKCwqwuVJs0"
const thread_id = "thread_U14989_KEJsfwU39WhMGP4C"


const payload = {
    user_id: user_id,
    user_access_token: user_access_token,
    user_message: "suggest me breakfast options",
    thread_id: thread_id,
};

const fetchStreamData = async () => {
    try {
        const response = await axios({
            method: 'post',
            url: url,
            data: payload,
            timeout: 80000,
            responseType: 'stream',
        });

        // Handle the incoming stream data
        response.data.on('data', (chunk) => {
            const data = chunk.toString();
            if (data) {
                console.log(data); // Process and log the received chunk
            }
        });

        response.data.on('end', () => {
            console.log('Stream ended.');
        });

        response.data.on('error', (err) => {
            console.error('Stream error:', err);
        });
    } catch (error) {
        console.error('Request failed:', error.message);
    }
};

// Execute the function
fetchStreamData();