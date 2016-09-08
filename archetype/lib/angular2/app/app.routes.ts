import { provideRouter, RouterConfig } from '@angular/router';
import { isoRoutes } from './routes';

const buildedRoutes = [].concat(isoRoutes);

export const routes: RouterConfig = buildedRoutes;

export const appRouterProviders = [
  provideRouter(routes)
];
