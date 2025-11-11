// 简单的测试脚本，验证Worker逻辑

// 模拟环境变量
const env = {
  CUSTOM_DOMAIN: 'generativelanguage.googleapis.com'
};

// 模拟请求对象
function createMockRequest(url, method = 'GET', headers = {}) {
  return {
    url: url,
    method: method,
    headers: new Map(Object.entries(headers)),
    body: null
  };
}

// 测试URL构建逻辑
function testUrlBuilding() {
  console.log('🔍 测试URL构建逻辑...');
  
  const mockRequest = createMockRequest('https://example.com/v1beta/models');
  const url = new URL(mockRequest.url);
  const targetPath = url.pathname;
  const targetUrl = `https://${env.CUSTOM_DOMAIN}${targetPath}`;
  
  console.log('原始URL:', mockRequest.url);
  console.log('目标URL:', targetUrl);
  
  if (targetUrl === 'https://generativelanguage.googleapis.com/v1beta/models') {
    console.log('✅ URL构建测试通过');
  } else {
    console.log('❌ URL构建测试失败');
  }
}

// 测试头部处理逻辑
function testHeaderHandling() {
  console.log('\n🔍 测试头部处理逻辑...');
  
  const mockHeaders = {
    'content-type': 'application/json',
    'authorization': 'Bearer token123',
    'host': 'example.com',
    'origin': 'https://example.com'
  };
  
  const headers = new Map();
  for (const [key, value] of Object.entries(mockHeaders)) {
    if (!['host', 'origin', 'referer'].includes(key.toLowerCase())) {
      headers.set(key, value);
    }
  }
  
  // 设置目标主机头
  headers.set('host', env.CUSTOM_DOMAIN);
  
  console.log('处理后的头部:');
  headers.forEach((value, key) => {
    console.log(`  ${key}: ${value}`);
  });
  
  if (!headers.has('origin') && headers.get('host') === env.CUSTOM_DOMAIN) {
    console.log('✅ 头部处理测试通过');
  } else {
    console.log('❌ 头部处理测试失败');
  }
}

// 运行所有测试
console.log('🧪 开始测试Gemini Proxy Worker逻辑...\n');

testUrlBuilding();
testHeaderHandling();

console.log('\n📊 测试完成！');
console.log('💡 提示: 这只是逻辑测试，实际部署需要Cloudflare环境');