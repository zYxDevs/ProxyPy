addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const { pathname, searchParams } = new URL(request.url);

  if (pathname === '/') {
    return new Response('Go Away Human!');
  }

  if (pathname === '/proxy') {
    const url = searchParams.get('url');

    if (!url) {
      return new Response(
        JSON.stringify({
          message: 'url parameter is not found.',
          success: false,
          creator: 'https://github.com/zYxDevs',
        }),
        { status: 422, headers: { 'Content-Type': 'application/json' } }
      );
    }

    try {
      const response = await fetch(url);

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          'Content-Type': response.headers.get('Content-Type'),
        },
      });
    } catch (e) {
      return new Response(e.toString(), { status: 500 });
    }
  }

  return new Response('Not Found', { status: 404 });
}
