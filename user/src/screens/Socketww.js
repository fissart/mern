
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:2000";

export const socket = socketIOClient(ENDPOINT);
