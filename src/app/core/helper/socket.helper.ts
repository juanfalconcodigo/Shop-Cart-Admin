
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';


export class SocketClient {
    private static _instace: SocketClient;
    socket = io(environment.socket);
    private constructor() {
    }

    public static get instance() {
        return this._instace || (this._instace = new this());
    }

}