// 只挂在 /en/* 下的中间件：让英文路径的 404 服务端直接返回英文页面，
// 不再依赖客户端 JS 改写（JS 不执行时英文访客会看到一屏中文）。
// 其他路径不经过这里，静态站其余部分行为不变。
export async function onRequest(context) {
  const response = await context.next();
  if (response.status !== 404) return response;

  const url = new URL(context.request.url);
  if (!url.pathname.startsWith('/en/')) return response;

  try {
    const asset = await context.env.ASSETS.fetch(
      new Request(new URL('/en/404/', url.origin).toString(), {
        method: 'GET',
        headers: context.request.headers,
      })
    );
    if (!asset.ok) return response;

    const headers = new Headers(asset.headers);
    headers.set('content-type', 'text/html; charset=utf-8');
    headers.set('cache-control', 'no-store');
    headers.delete('content-length');

    return new Response(asset.body, { status: 404, headers });
  } catch {
    // 取不到英文页就退回原来的 404，不要让中间件把错误放大
    return response;
  }
}
