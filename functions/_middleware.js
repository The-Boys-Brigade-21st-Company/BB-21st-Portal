const SHUTDOWN_AT = Date.parse("2026-10-01T18:00:00+08:00");

export async function onRequest(context) {
    if (Date.now() < SHUTDOWN_AT) {
        return context.next();
    }

    return new Response(
        `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Website Closed</title>

        <style>
          body {
            min-height: 100vh;
            margin: 0;
            display: grid;
            place-items: center;
            font-family: system-ui, sans-serif;
            background: #f5f5f5;
            color: #171717;
          }

          main {
            max-width: 600px;
            padding: 32px;
            text-align: center;
          }
        </style>
      </head>

      <body>
        <main>
          <h1>We haved moved</h1>
          <p>Please go to <a href="https://portal.bb21coy.workers.dev">https://portal.bb21coy.workers.dev</a></p>
        </main>
      </body>
    </html>`,
        {
            status: 410,
            headers: {
                "Content-Type": "text/html; charset=UTF-8",
                "Cache-Control": "no-store",
            },
        },
    );
}