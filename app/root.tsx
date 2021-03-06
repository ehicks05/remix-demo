import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import type { LinksFunction, MetaFunction } from "remix";

import styles from "./styles/app.css";
import Footer from "./components/Footer";
import Nav from "./components/Navbar/Nav";

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "RecipeBook",
    description: "Welcome to RecipeBook!",
  };
};

// https://remix.run/api/app#links
export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "icon", href: "/favicon/favicon.png" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Ubuntu&display=swap",
    },
  ];
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div className="h-full flex flex-col items-center justify-center bg-red-900 text-white">
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <div className="h-full flex flex-col items-center justify-center bg-red-900 text-white">
          <h1 className="text-3xl">
            {caught.status}: {caught.statusText}
          </h1>
          {message}
        </div>
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body className="h-screen dark:bg-neutral-900">
        <div className="h-screen">{children}</div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
