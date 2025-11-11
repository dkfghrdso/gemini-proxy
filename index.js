// Cloudflare Workers代理Google Gemini API
// 支持自定义域名配置

export default {
  async fetch(request, env, ctx) {
    // 设置CORS头
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // 处理OPTIONS请求（预检请求）
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    try {
      // 获取自定义域名配置
      const customDomain = env.CUSTOM_DOMAIN || 'generativelanguage.googleapis.com';
      
      // 构建目标URL
      const url = new URL(request.url);
      const targetPath = url.pathname;
      const targetUrl = `https://${customDomain}${targetPath}`;
      
      // 复制请求头，移除不需要的头部
      const headers = new Headers();
      for (const [key, value] of request.headers.entries()) {
        if (!['host', 'origin', 'referer'].includes(key.toLowerCase())) {
          headers.set(key, value);
        }
      }
      
      // 设置目标主机头
      headers.set('host', customDomain);
      
      // 构建转发请求
      const forwardRequest = new Request(targetUrl, {
        method: request.method,
        headers: headers,
        body: request.body,
      });
      
      // 发送请求到Google Gemini API
      const response = await fetch(forwardRequest);
      
      // 复制响应头并添加CORS头
      const responseHeaders = new Headers(response.headers);
      for (const [key, value] of Object.entries(corsHeaders)) {
        responseHeaders.set(key, value);
      }
      
      // 返回响应
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
      
    } catch (error) {
      // 错误处理
      console.error('Proxy error:', error);
      
      return new Response(JSON.stringify({
        error: 'Proxy failed',
        message: error.message
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }
  },
};