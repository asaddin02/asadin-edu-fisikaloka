// Phsyco · Path-Based SPA Router (History API)
// URLs are real paths ("/entity/gravity", "/lesson/sd-motion?level=sd"); the static host serves the
// prerendered page or the app shell for them. Legacy "#/..." links are rewritten so old bookmarks keep working.

let current = null;
export const navigate = url => current?.navigate(url);

export class PhysicsRouter {
  constructor(routes, notFoundHandler) {
    this.routes = routes;
    this.notFoundHandler = notFoundHandler;
    this.currentRoute = null;
    current = this;

    window.addEventListener('popstate', () => this.handleRoute());
    window.addEventListener('hashchange', () => this.migrateLegacyHash() && this.handleRoute());
    document.addEventListener('click', event => this.interceptLink(event));
  }

  init() {
    this.migrateLegacyHash();
    this.handleRoute();
  }

  // "#/learn?level=sd" → "/learn?level=sd" without a reload or a history entry.
  migrateLegacyHash() {
    if (!window.location.hash.startsWith('#/')) return false;
    window.history.replaceState(null, '', window.location.hash.slice(1));
    return true;
  }

  navigate(url) {
    const target = url.startsWith('#/') ? url.slice(1) : url;
    if (target !== window.location.pathname + window.location.search + window.location.hash) {
      window.history.pushState(null, '', target);
    }
    this.handleRoute();
  }

  interceptLink(event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href]');
    if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download') || link.getAttribute('rel')?.includes('external')) return;
    const href = link.getAttribute('href');
    if (href.startsWith('#') && !href.startsWith('#/')) return; // in-page fragment, handled by the page
    if (link.origin !== window.location.origin) return;
    event.preventDefault();
    this.navigate(href.startsWith('#/') ? href.slice(1) : link.pathname + link.search + link.hash);
  }

  handleRoute() {
    const rawPath = window.location.pathname.replace(/\.html$/, '').replace(/\/+$/, '') || '/';
    try { decodeURIComponent(rawPath); } catch { this.notFoundHandler?.('URL tidak valid'); return; }
    const path = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;

    const params = {};
    for (const [key, value] of new URLSearchParams(window.location.search).entries()) {
      params[key] = value;
    }

    // Match route pattern
    let matched = null;
    let pathParams = {};

    for (const route of this.routes) {
      const paramNames = [];
      const regexPath = route.path.replace(/:([a-zA-Z0-9_]+)/g, (_, name) => {
        paramNames.push(name);
        return '([^/]+)';
      });

      const regex = new RegExp(`^${regexPath}$`);
      const match = path.match(regex);

      if (match) {
        matched = route;
        paramNames.forEach((name, idx) => {
          pathParams[name] = decodeURIComponent(match[idx + 1]);
        });
        break;
      }
    }

    if (matched) {
      this.currentRoute = {
        path,
        params: { ...params, ...pathParams },
        handler: matched.handler
      };
      matched.handler(this.currentRoute.params);
    } else if (this.notFoundHandler) {
      this.notFoundHandler(path);
    }

    // Scroll to top on navigation unless specifically suppressed
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}
