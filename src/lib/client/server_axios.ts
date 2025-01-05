import axios from 'axios';

export const server_axios = axios.create({
    transformRequest() {
        this.url = '/api/proxy?url=' + this.url?.toString();
    }
});