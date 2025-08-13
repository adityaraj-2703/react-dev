# React Router:

## Single Page Application (SPA)

A Single Page Application is a web app that loads a single HTML page and dynamically updates the content without fully refreshing the page. This makes navigation feel fast and smooth because only the parts that change are updated, not the whole page.

## Client-Side Rendering (CSR) vs Server-Side Rendering (SSR)

#### CSR: The browser downloads a minimal HTML page and a bundle of JavaScript, which then renders the UI.
Pros: Faster navigation after first load, good for highly interactive apps.
Cons: Slower first load, SEO can be tricky.

#### SSR: The server sends a fully rendered HTML page for each request.
Pros: Faster initial load, better for SEO.
Cons: More load on server, slower navigation between pages.

## Routing & Why We Need It
Routing decides which page or component to show based on the URL. Without routing, all users would see the same content regardless of what link they visit. In SPAs, routing is handled in JavaScript so it feels instant without page reloads.

## History vs Location Objects
#### History: 
Keeps track of the URLs the user has visited; lets you go forward/back or push new URLs.

#### Location: 
Represents the current URL’s details (path, query, hash). It’s basically “where you are now.”

## Mechanism of React Router
React Router listens for changes in the browser’s URL (using the History API). When the URL changes, it matches it to a route you’ve defined and renders the corresponding component without refreshing the page. This creates smooth, app-like navigation in the browser.
