import * as Server from './server';
import * as Client from './client';

const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

export const Fintava = isBrowser ? Client : Server;

export { Server, Client }