# 房屋租赁信息展示系统

一个现代化的房屋租赁信息展示网站，支持360度全景展示和精美图片画廊。

## 功能特点

- 🎥 **360度全景展示** - 使用Pannellum库实现沉浸式全景看房体验
- 🖼️ **精美图片画廊** - 使用Lightbox2实现优雅的图片展示效果
- 📱 **响应式设计** - 完美适配桌面端和移动端设备
- 🎨 **现代化UI** - 使用Element Plus风格设计，界面美观大方
- ⚡ **流畅交互** - 平滑的动画效果和用户交互体验

## 技术栈

- **全景库**: Pannellum 2.5.6
- **图片库**: Lightbox2 2.11.4
- **UI框架**: 自定义CSS + Font Awesome 6.4.0
- **字体**: Google Fonts - Noto Sans SC
- **动画**: CSS3 + Vanilla JavaScript

## 项目结构

```
house-rental-demo/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # JavaScript逻辑
├── README.md           # 项目说明
└── assets/
    ├── panoramas/      # 全景图片（360度）
    │   ├── living-room.jpg
    │   ├── bedroom.jpg
    │   ├── kitchen.jpg
    │   └── bathroom.jpg
    ├── images/         # 高清大图
    │   ├── living-room-1.jpg
    │   ├── living-room-2.jpg
    │   ├── bedroom-1.jpg
    │   └── ...
    └── thumbs/         # 缩略图
        ├── living-room-1.jpg
        └── ...
```

## 快速开始

### 1. 下载项目

```bash
git clone <your-repo-url>
cd house-rental-demo
```

### 2. 添加图片资源

#### 全景图片要求

- **格式**: JPEG 或 PNG
- **分辨率**: 建议 4096x2048 像素（等距圆柱投影格式）
- **数量**: 每个房间1-2张
- **命名**: 使用英文名称，如 `living-room.jpg`

#### 普通图片要求

- **格式**: JPEG 或 PNG
- **分辨率**: 建议 1920x1080 或更高
- **数量**: 每个房间2-3张
- **命名**: 使用英文名称，如 `living-room-1.jpg`

### 3. 启动本地服务器

由于使用了ES6模块和某些浏览器安全限制，建议使用本地服务器：

```bash
# 使用Python
python -m http.server 8000

# 或使用Node.js
npx serve .

# 或使用VS Code的Live Server扩展
```

然后在浏览器中访问: http://localhost:8000

## 图片资源配置

### 修改图片路径

编辑 `script.js` 文件中的配置：

```javascript
// 全景图配置
const panoramaConfig = {
    'living-room': {
        title: '客厅',
        image: 'assets/panoramas/living-room.jpg',  // 修改这里
        description: '宽敞明亮的客厅空间'
    },
    // ... 其他配置
};

// 图片画廊数据
const galleryImages = [
    {
        id: 1,
        src: 'assets/images/living-room-1.jpg',  // 修改这里
        thumb: 'assets/images/thumbs/living-room-1.jpg',  // 修改这里
        // ... 其他配置
    },
    // ... 其他图片
];
```

### 创建必要的目录

```bash
mkdir -p assets/panoramas
mkdir -p assets/images
mkdir -p assets/thumbs
```

## 修改房屋信息

编辑 `index.html` 中的对应元素：

```html
<p id="info-location">示例地址：北京市朝阳区某某路123号</p>
<p id="info-area">90平方米</p>
<p id="info-layout">2室1厅1卫</p>
<!-- 等等... -->
```

或者修改联系方式：

```html
<p id="contact-name">张先生</p>
<p id="contact-phone">138-0013-8000</p>
<p id="contact-email">zhangsan@example.com</p>
```

## 部署到GitHub Pages

### 1. 创建GitHub仓库

1. 登录GitHub
2. 点击右上角的 "+" → "New repository"
3. 填写仓库名称（如：`house-rental-demo`）
4. 选择 "Public"
5. 点击 "Create repository"

### 2. 上传文件

```bash
# 初始化git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 添加远程仓库（替换为你的仓库URL）
git remote add origin https://github.com/你的用户名/house-rental-demo.git

# 推送
git push -u origin main
```

### 3. 启用GitHub Pages

1. 进入你的仓库
2. 点击 "Settings"
3. 滚动到 "GitHub Pages" 部分
4. 在 "Source" 下拉菜单中选择 "main" 分支
5. 点击 "Save"
6. 等待几秒钟，你会看到提示：`Your site is published at https://你的用户名.github.io/house-rental-demo/`

## 功能使用

### 全景展示

- **拖动**: 鼠标拖动或手指滑动查看不同角度
- **缩放**: 使用鼠标滚轮或双指捏合缩放
- **全屏**: 点击全屏按钮进入全屏模式
- **自动旋转**: 点击自动旋转按钮开启/关闭自动旋转

### 图片画廊

- **浏览**: 点击分类按钮筛选不同房间的图片
- **查看大图**: 点击任意图片查看高清大图
- **导航**: 在大图模式下，左右箭头切换图片

### 在线预约

1. 填写姓名和联系电话
2. 选择预约看房日期
3. 可选的邮箱和留言
4. 点击提交预约

## 浏览器兼容性

- ✅ Chrome (推荐)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ IE 11 (不支持全景功能)

## 注意事项

1. **全景图片**: 必须使用等距圆柱投影格式的全景图，普通照片无法正常显示
2. **图片尺寸**: 全景图建议较大尺寸以保证清晰度，但也不要过大（建议不超过20MB）
3. **跨域问题**: 如果图片存放在其他域名下，可能会有跨域限制

## 常见问题

### Q: 全景图显示为黑色或无法加载？

A: 请检查：
1. 图片格式是否为等距圆柱投影
2. 图片路径是否正确
3. 浏览器控制台是否有跨域错误

### Q: 图片画廊无法打开大图？

A: 请检查：
1. 确认 `assets/images/` 目录下的图片文件存在
2. 检查文件命名是否与 `script.js` 中的配置一致

### Q: 如何修改页面主题颜色？

A: 编辑 `styles.css` 文件顶部的 `:root` 变量：

```css
:root {
    --primary-color: #2563eb;  /* 主色调 */
    --secondary-color: #1e40af;  /* 次要色调 */
    --accent-color: #f59e0b;  /* 强调色 */
    /* ... 其他变量 */
}
```

## 贡献

欢迎提交Issue和Pull Request！

## 许可证

MIT License

## 联系方式

- GitHub: https://github.com/你的用户名
- Email: your.email@example.com

---

**祝你使用愉快！🏠**
