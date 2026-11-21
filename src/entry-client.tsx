import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { findRoute } from './routes';
import './index.css';

// Each page arrives as finished HTML (scripts/prerender.ts); React takes it over so menus and demos work.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const path = window.location.pathname.slice(base.length) || '/';
const route = findRoute(path.replace(/index\.html$/, ''));
const root = document.getElementById('root')!;
const app = <App route={route} />;
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app); // `npm run dev`: no prerendered HTML
