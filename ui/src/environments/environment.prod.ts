import { TablatureEnvironment } from './environment';

const environment = new TablatureEnvironment();
environment.production = true;
environment.debug.tab = false;
export { environment };
