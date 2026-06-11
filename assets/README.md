# 图片资源说明

## 需要上传的图片

### 1. 全景图片 (assets/panoramas/)

全景图片必须使用**等距圆柱投影格式**（Equirectangular Projection），这种格式是标准的360度全景图格式。

**必需的全景图片：**
- `living-room.jpg` - 客厅全景
- `bedroom.jpg` - 卧室全景
- `kitchen.jpg` - 厨房全景
- `bathroom.jpg` - 卫生间全景

**全景图片规格：**
- 格式：JPEG 或 PNG
- 推荐分辨率：4096x2048 像素（或更高）
- 宽高比：2:1
- 文件大小：建议不超过 20MB

**如何获取全景图：**
1. 使用360度相机拍摄（如RICOH THETA, Insta360等）
2. 使用全景云台 + 普通相机拍摄多张照片，然后拼接
3. 从专业全景图库购买或下载（需授权）
4. 使用在线工具将普通照片转换为简易全景图（效果较差）

### 2. 高清大图 (assets/images/)

这些是用于在画廊中点击后查看的高清图片。

**建议的图片数量：**
- 客厅：2-3张
- 卧室：2-3张
- 厨房：1-2张
- 卫生间：1-2张
- 外景/阳台：2-3张

**图片规格：**
- 格式：JPEG 或 PNG
- 推荐分辨率：1920x1080 像素（或更高）
- 宽高比：建议 4:3 或 16:9

**命名规范：**
```
living-room-1.jpg
living-room-2.jpg
bedroom-1.jpg
bedroom-2.jpg
kitchen-1.jpg
bathroom-1.jpg
exterior-1.jpg
exterior-2.jpg
```

### 3. 缩略图 (assets/thumbs/)

缩略图用于画廊网格显示，可以比大图小很多以提高加载速度。

**图片规格：**
- 格式：JPEG 或 PNG
- 推荐分辨率：400x300 像素
- 宽高比：4:3

**命名规范：**
```
living-room-1.jpg  (对应 images/living-room-1.jpg)
living-room-2.jpg  (对应 images/living-room-2.jpg)
```

## 图片上传步骤

1. **准备图片**
   - 调整图片大小到合适分辨率
   - 优化文件大小（可使用 TinyPNG 等工具）
   - 统一命名规范

2. **上传到GitHub**
   ```bash
   # 将图片放入对应目录
   mv your-image.jpg assets/panoramas/living-room.jpg
   mv your-image.jpg assets/images/living-room-1.jpg
   mv your-image.jpg assets/thumbs/living-room-1.jpg
   
   # 提交到GitHub
   git add .
   git commit -m "Add image assets"
   git push origin main
   ```

3. **等待部署**
   - GitHub Pages 自动构建通常需要1-2分钟
   - 刷新页面查看效果

## 示例

如果你的图片文件名不同，需要在 `script.js` 中更新配置：

```javascript
const panoramaConfig = {
    'living-room': {
        title: '客厅',
        image: 'assets/panoramas/你的文件名.jpg',  // 修改这里
        description: '宽敞明亮的客厅空间'
    }
};

const galleryImages = [
    {
        id: 1,
        src: 'assets/images/你的文件名.jpg',  // 修改这里
        thumb: 'assets/thumbs/你的文件名.jpg',  // 修改这里
        category: 'living-room',
        title: '客厅全景',
        description: '宽敞明亮的客厅'
    }
];
```

## 提示

- ✅ 使用真实的高质量图片效果最佳
- ✅ 全景图片一定要是正确的360度格式
- ✅ 保持一致的命名规范便于管理
- ⚠️ 不要上传过大的图片，会影响加载速度
- ⚠️ 确保图片版权合法（使用自己拍摄或获得授权的图片）

---

**上传完图片后，你的房屋租赁展示网站就完成了！** 🎉
