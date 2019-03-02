
import {IncomingMessage, Server, ServerResponse} from 'http';
import { AuthFunction } from "fastify-auth";
import fastify from 'fastify';

declare module 'fastify' {
  export interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse,
  > {
    verifyJWTandLevel: AuthFunction,
    verifyUserAndPassword: AuthFunction
  }
}