# Cloudflare Workers Google Gemini 代理

这是一个Cloudflare Workers代理，用于代理Google Gemini API请求，支持自定义域名配置。

## 🚀 一键部署到Cloudflare Workers

您可以通过以下方式快速部署到Cloudflare Workers：

### 方法一：GitHub Deployments（推荐）

1. **Fork此仓库**到您的GitHub账户
2. **在Cloudflare Dashboard获取API Token**:
   - 进入Cloudflare Dashboard → 个人资料 → API Tokens
   - 点击"Create Token" → 使用"Edit Cloudflare Workers"模板
   - 保存生成的Token
3. **在GitHub仓库设置Secrets**:
   - 进入您的GitHub仓库 → Settings → Secrets and variables → Actions
   - 点击"New repository secret"
   - 添加以下Secret：
     - `CF_API_TOKEN`: 您的Cloudflare API Token
     - `CF_ACCOUNT_ID`: 您的Cloudflare Account ID
4. **一键部署**:
   - 在GitHub仓库页面，点击"⚡ Deploy to Cloudflare Workers"按钮
   - 或访问: https://deploy.workers.cloudflare.com/?url=https://github.com/您的用户名/仓库名

### 方法二：本地部署

```bash
# 安装依赖
npm install

# 登录Cloudflare
npx wrangler login

# 部署
npm run deploy
```

### 方法三：使用部署脚本

```bash
# 直接运行部署脚本
npm run deploy:github
```

## 功能特性

- ✅ 代理Google Gemini API请求
- ✅ 支持自定义域名配置（不在代码中写死）
- ✅ CORS跨域支持
- ✅ 错误处理和日志记录
- ✅ 环境变量配置

## 文件结构

```
├── index.js          # 主要的Worker代码
├── wrangler.toml     # Cloudflare Workers配置
├── package.json      # 项目依赖配置
└── README.md         # 说明文档
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置自定义域名

在Cloudflare Dashboard中设置环境变量：

- `CUSTOM_DOMAIN`: 自定义的Gemini API域名（默认为`generativelanguage.googleapis.com`）

### 3. 本地开发

```bash
npm run dev
```

### 4. 部署

```bash
npm run deploy
```

## 配置说明

### 环境变量

- `CUSTOM_DOMAIN`: 目标Gemini API域名，默认为Google官方域名

### 自定义域名设置

1. 在Cloudflare Dashboard中进入您的Worker
2. 转到"设置" -> "变量"
3. 添加环境变量：
   - 变量名: `CUSTOM_DOMAIN`
   - 值: 您的自定义域名（例如：`api.your-domain.com`）

## API使用示例

### 基本请求

```javascript
// 使用您的Worker域名
const response = await fetch('https://your-worker.your-account.workers.dev/v1beta/models', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_GEMINI_API_KEY'
  }
});
```

### 生成内容

```javascript
const response = await fetch('https://your-worker.your-account.workers.dev/v1beta/models/gemini-pro:generateContent', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_GEMINI_API_KEY'
  },
  body: JSON.stringify({
    contents: [{
      parts: [{
        text: "Hello, how are you?"
      }]
    }]
  })
});
```

## 注意事项

1. **API密钥安全**: 请确保在前端代码中不要硬编码API密钥，建议使用后端服务管理密钥
2. **域名配置**: 自定义域名需要在您的DNS提供商处正确配置CNAME记录
3. **速率限制**: 注意Cloudflare Workers的请求限制和Gemini API的速率限制
4. **错误处理**: Worker包含基本的错误处理，建议在客户端也实现错误处理逻辑

## 故障排除

### 常见问题

1. **CORS错误**: 确保请求头包含正确的CORS设置
2. **域名解析失败**: 检查自定义域名是否正确配置
3. **认证失败**: 验证Gemini API密钥是否正确

### 日志查看

在Cloudflare Dashboard的"日志"部分查看Worker的执行日志。

## 🎯 快速部署按钮

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/YOUR_USERNAME/YOUR_REPO_NAME)

将上面的链接中的`YOUR_USERNAME`和`YOUR_REPO_NAME`替换为您的GitHub用户名和仓库名。

## 🔧 手动部署步骤

如果您想手动部署，可以按照以下步骤：

### 1. 准备环境

```bash
# 克隆仓库
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME
cd YOUR_REPO_NAME

# 安装依赖
npm install
```

### 2. 配置Cloudflare

```bash
# 登录Cloudflare
npx wrangler login

# 配置环境变量（可选）
# 在Cloudflare Dashboard中设置CUSTOM_DOMAIN环境变量
```

### 3. 部署

```bash
# 部署到生产环境
npm run deploy

# 或者使用GitHub部署脚本
npm run deploy:github
```

## 📞 获取帮助

如果部署过程中遇到问题：

1. 检查Cloudflare API Token是否正确配置
2. 确认您的Cloudflare账户有Workers权限
3. 查看Cloudflare Dashboard中的错误日志
4. 在GitHub Issues中提出问题

## 许可证

MIT License