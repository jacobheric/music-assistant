import { type PageProps } from "fresh";
import { define, type State } from "@/lib/state.ts";

function App({ Component, state }: PageProps<never, State>) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Luther{state.title ? ` - ${state.title}` : ""}</title>
        <meta
          name="description"
          content={state.description || "Your interactive AI DJ"}
        />

        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}

export default define.page(App);
