import { renderToString } from 'react-dom/server';
import App from './App';
import { ROUTES, NOT_FOUND, type Route } from './routes';

export { ROUTES, NOT_FOUND };
export { PRICING_FAQ } from './pages/Pricing';
export { RIVALS } from './pages/Compare';
export { CATALOG_SOURCE, CATALOG_DATE } from './lib/catalog';

export const render = (route: Route) => renderToString(<App route={route} />);
