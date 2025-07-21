export const environment = {
    apiUrl: 'http://localhost:3000/api',
    mqtt: {
        host: 'localhost', // o la IP de tu broker MQTT
        port: 3322,
        protocol: 'ws', // o 'wss' si usas SSL
        path: '/' // cambiar si usas otro path
    }
};