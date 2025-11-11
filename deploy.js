#!/usr/bin/env node

// Cloudflare Workers一键部署脚本
// 专为 dkfghrdso/gemini-proxy 仓库优化

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Gemini Proxy 部署脚本启动...\n');
console.log('📁 仓库: https://github.com/dkfghrdso/gemini-proxy\n');

// 检查Node.js版本
const nodeVersion = process.version;
console.log(`📊 Node.js 版本: ${nodeVersion}`);

// 检查package.json是否存在
if (!fs.existsSync('package.json')) {
  console.error('❌ 错误: package.json 文件不存在');
  console.log('💡 请确保在项目根目录运行此脚本');
  process.exit(1);
}

// 安装依赖
console.log('📦 安装项目依赖...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ 依赖安装完成');
} catch (error) {
  console.error('❌ 依赖安装失败:', error.message);
  process.exit(1);
}

// 检查wrangler是否安装
try {
  const wranglerVersion = execSync('npx wrangler --version', { encoding: 'utf8' }).trim();
  console.log(`🔧 Wrangler 版本: ${wranglerVersion}`);
} catch (error) {
  console.log('📦 安装wrangler...');
  try {
    execSync('npm install -g wrangler', { stdio: 'inherit' });
  } catch (installError) {
    console.error('❌ Wrangler 安装失败');
    process.exit(1);
  }
}

// 检查是否已登录
try {
  const whoami = execSync('npx wrangler whoami', { encoding: 'utf8' });
  console.log('✅ Cloudflare 登录状态: 已登录');
  console.log(`👤 账户信息: ${whoami.trim()}`);
} catch (error) {
  console.log('🔐 需要登录Cloudflare');
  console.log('💡 请运行: npx wrangler login');
  console.log('然后重新运行此脚本');
  process.exit(1);
}

// 部署到Cloudflare Workers
try {
  console.log('\n📤 开始部署到Cloudflare Workers...');
  
  // 验证配置文件
  if (!fs.existsSync('wrangler.toml')) {
    console.error('❌ 错误: wrangler.toml 配置文件不存在');
    process.exit(1);
  }
  
  console.log('✅ 配置文件验证通过');
  
  // 执行部署
  execSync('npx wrangler deploy', { stdio: 'inherit' });
  
  console.log('\n🎉 部署成功！');
  console.log('📋 后续步骤:');
  console.log('1. 在Cloudflare Dashboard中配置 CUSTOM_DOMAIN 环境变量');
  console.log('2. 测试代理功能是否正常工作');
  console.log('3. 如有需要，配置自定义域名路由');
  console.log('\n🔗 GitHub仓库: https://github.com/dkfghrdso/gemini-proxy');
  
} catch (error) {
  console.error('\n❌ 部署失败:', error.message);
  console.log('💡 可能的原因:');
  console.log('- Cloudflare API Token 权限不足');
  console.log('- 网络连接问题');
  console.log('- 配置文件错误');
  process.exit(1);
}