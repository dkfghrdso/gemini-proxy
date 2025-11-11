#!/usr/bin/env node

// Cloudflare Workers一键部署脚本
// 这个脚本可以通过GitHub的Deployments功能直接部署

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始部署到Cloudflare Workers...\n');

// 检查wrangler是否安装
try {
  execSync('npx wrangler --version', { stdio: 'inherit' });
} catch (error) {
  console.log('📦 安装wrangler...');
  execSync('npm install -g wrangler', { stdio: 'inherit' });
}

// 检查是否已登录
try {
  execSync('npx wrangler whoami', { stdio: 'pipe' });
  console.log('✅ 已登录Cloudflare');
} catch (error) {
  console.log('🔐 请先运行: npx wrangler login');
  console.log('然后重新运行此脚本');
  process.exit(1);
}

// 部署到Cloudflare Workers
try {
  console.log('\n📤 部署Worker...');
  execSync('npx wrangler deploy', { stdio: 'inherit' });
  
  console.log('\n✅ 部署成功！');
  console.log('📋 下一步：');
  console.log('1. 在Cloudflare Dashboard中配置CUSTOM_DOMAIN环境变量');
  console.log('2. 如果需要自定义域名，配置路由规则');
  
} catch (error) {
  console.error('❌ 部署失败:', error.message);
  process.exit(1);
}