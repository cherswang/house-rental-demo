// ==================== 图片画廊数据 ====================

const galleryImages = [
    // ==================== 客厅区域 ====================
    {
        id: 1,
        src: 'assets/images/living-room-1.jpg',
        thumb: 'assets/images/thumbs/living-room-1.jpg',
        category: 'living-room',
        title: '客厅全景',
        description: '宽敞明亮的客厅，与餐厅阳台连厅'
    },
    {
        id: 2,
        src: 'assets/images/living-room-2.jpg',
        thumb: 'assets/images/thumbs/living-room-2.jpg',
        category: 'living-room',
        title: '客厅沙发区',
        description: '舒适的沙发组合，采光充足'
    },
    
    // ==================== 餐厅区域 ====================
    {
        id: 3,
        src: 'assets/images/dining-room-1.jpg',
        thumb: 'assets/images/thumbs/dining-room-1.jpg',
        category: 'dining-room',
        title: '餐厅全景',
        description: '现代简约餐厅，与客厅连厅'
    },
    {
        id: 4,
        src: 'assets/images/dining-room-2.jpg',
        thumb: 'assets/images/thumbs/dining-room-2.jpg',
        category: 'dining-room',
        title: '餐厅细节',
        description: '精致的餐桌布置'
    },
    
    // ==================== 卧室区域 ====================
    {
        id: 5,
        src: 'assets/images/bedroom-1.jpg',
        thumb: 'assets/images/thumbs/bedroom-1.jpg',
        category: 'bedroom',
        title: '主卧室',
        description: '温馨舒适的主卧室'
    },
    {
        id: 6,
        src: 'assets/images/bedroom-2.jpg',
        thumb: 'assets/images/thumbs/bedroom-2.jpg',
        category: 'bedroom',
        title: '主卧室视角2',
        description: '主卧室另一角度'
    },
    {
        id: 7,
        src: 'assets/images/bedroom-3.jpg',
        thumb: 'assets/images/thumbs/bedroom-3.jpg',
        category: 'bedroom',
        title: '次卧室1',
        description: '简约明亮的次卧室'
    },
    {
        id: 8,
        src: 'assets/images/bedroom-4.jpg',
        thumb: 'assets/images/thumbs/bedroom-4.jpg',
        category: 'bedroom',
        title: '次卧室1视角2',
        description: '次卧室另一角度'
    },
    {
        id: 9,
        src: 'assets/images/bedroom-5.jpg',
        thumb: 'assets/images/thumbs/bedroom-5.jpg',
        category: 'bedroom',
        title: '次卧室2',
        description: '整洁舒适的次卧室'
    },
    {
        id: 10,
        src: 'assets/images/bedroom-6.jpg',
        thumb: 'assets/images/thumbs/bedroom-6.jpg',
        category: 'bedroom',
        title: '次卧室2视角2',
        description: '次卧室另一角度'
    },
    
    // ==================== 厨房区域 ====================
    {
        id: 11,
        src: 'assets/images/kitchen-1.jpg',
        thumb: 'assets/images/thumbs/kitchen-1.jpg',
        category: 'kitchen',
        title: '厨房全景',
        description: '现代化开放式厨房'
    },
    {
        id: 12,
        src: 'assets/images/kitchen-2.jpg',
        thumb: 'assets/images/thumbs/kitchen-2.jpg',
        category: 'kitchen',
        title: '厨房细节',
        description: '整洁的厨房台面'
    },
    
    // ==================== 卫生间区域 ====================
    {
        id: 13,
        src: 'assets/images/bathroom-1.jpg',
        thumb: 'assets/images/thumbs/bathroom-1.jpg',
        category: 'bathroom',
        title: '卫生间',
        description: '干湿分离卫生间'
    }
];

// ==================== 全景展示功能 ====================

let viewer = null;
let currentPanorama = 'living-room';
let isAutoRotating = false;

const panoramaConfig = {
    'living-room': {
        title: '客厅全景',
        image: 'assets/panoramas/living-room.jpg'
    },
    'bedroom': {
        title: '卧室全景',
        image: 'assets/panoramas/bedroom.jpg'
    },
    'kitchen': {
        title: '厨房全景',
        image: 'assets/panoramas/kitchen.jpg'
    },
    'bathroom': {
        title: '卫生间全景',
        image: 'assets/panoramas/bathroom.jpg'
    }
};

function initializePanorama(imageUrl) {
    const viewerElement = document.getElementById('panorama-viewer');
    const placeholder = document.getElementById('panorama-placeholder');
    
    if (viewer) {
        viewer.destroy();
    }
    
    if (placeholder) {
        placeholder.style.display = 'flex';
    }
    
    viewer = pannellum.viewer('panorama-viewer', {
        type: 'equirectangular',
        panorama: imageUrl,
        autoLoad: true,
        compass: true,
        showControls: true,
        mouseZoom: true,
        keyboardZoom: true,
        draggable: true,
        friction: 0.15,
        yaw: 0,
        pitch: 0,
        hfov: 100,
        minHfov: 50,
        maxHfov: 120,
        autoRotate: false,
        autoRotateInactivityDelay: 3000,
        strings: {
            "loadingLabel": "加载中..."
        }
    });
    
    viewer.on('load', function() {
        if (placeholder) {
            placeholder.style.display = 'none';
        }
        console.log('全景图加载完成');
    });
    
    viewer.on('error', function(err) {
        console.error('全景图加载失败:', err);
        if (placeholder) {
            placeholder.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <p>全景图加载失败</p>
                <small>请检查图片路径是否正确</small>
            `;
        }
    });
}

function changePanorama(panoramaKey) {
    if (!panoramaConfig[panoramaKey]) {
        console.error('不存在的全景配置:', panoramaKey);
        return;
    }
    
    currentPanorama = panoramaKey;
    
    document.querySelectorAll('.panorama-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-panorama="${panoramaKey}"]`).classList.add('active');
    
    document.getElementById('panorama-title').textContent = panoramaConfig[panoramaKey].title;
    
    initializePanorama(panoramaConfig[panoramaKey].image);
}

function toggleAutoRotate() {
    if (!viewer) return;
    
    isAutoRotating = !isAutoRotating;
    
    const btn = document.getElementById('auto-rotate-btn');
    if (isAutoRotating) {
        viewer.setAutoRotate(true);
        btn.classList.add('active');
        btn.innerHTML = '<i class="fas fa-pause"></i> 停止旋转';
    } else {
        viewer.setAutoRotate(false);
        btn.classList.remove('active');
        btn.innerHTML = '<i class="fas fa-play"></i> 自动旋转';
    }
}

// ==================== 图片画廊功能 ====================

function getCategoryIcon(category) {
    const icons = {
        'living-room': 'fas fa-couch',
        'dining-room': 'fas fa-utensils',
        'bedroom': 'fas fa-bed',
        'kitchen': 'fas fa-coffee',
        'bathroom': 'fas fa-bath',
        'closet': 'fas fa-door-closed',
        'balcony': 'fas fa-leaf',
        'exterior': 'fas fa-tree'
    };
    return icons[category] || 'fas fa-image';
}

function getCategoryColor(category) {
    const colors = {
        'living-room': '#2563eb',
        'dining-room': '#059669',
        'bedroom': '#7c3aed',
        'kitchen': '#d97706',
        'bathroom': '#0891b2',
        'closet': '#8b5cf6',
        'balcony': '#10b981',
        'exterior': '#ea580c'
    };
    return colors[category] || '#6b7280';
}

function renderGallery(filter = 'all') {
    const galleryContainer = document.getElementById('gallery-grid');
    const placeholder = document.getElementById('gallery-placeholder');
    if (!galleryContainer) return;
    
    // 隐藏占位符
    if (placeholder) {
        placeholder.style.display = 'none';
    }
    
    const filteredImages = filter === 'all' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === filter);
    
    if (filteredImages.length === 0) {
        galleryContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-image"></i>
                <p>该分类暂无图片</p>
            </div>
        `;
        return;
    }
    
    galleryContainer.innerHTML = filteredImages.map(img => `
        <div class="gallery-item" data-id="${img.id}" data-category="${img.category}">
            <div class="gallery-item-inner">
                <img src="${img.thumb}" alt="${img.title}" class="gallery-thumb">
                <div class="gallery-overlay">
                    <h4>${img.title}</h4>
                    <p>${img.description}</p>
                    <span class="category-badge" style="background-color: ${getCategoryColor(img.category)}">
                        <i class="${getCategoryIcon(img.category)}"></i>
                    </span>
                </div>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            openLightbox(id);
        });
    });
}

function setActiveFilter(filter) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    renderGallery(filter);
}

// ==================== 灯箱功能 ====================

function openLightbox(startId) {
    const lightbox = document.getElementById('lightbox');
    const img = lightbox.querySelector('img');
    const title = lightbox.querySelector('.lightbox-title');
    const desc = lightbox.querySelector('.lightbox-desc');
    
    const currentImage = galleryImages.find(img => img.id === startId);
    if (!currentImage) return;
    
    img.src = currentImage.src;
    img.alt = currentImage.title;
    title.textContent = currentImage.title;
    desc.textContent = currentImage.description;
    
    lightbox.classList.add('visible');
    document.body.style.overflow = 'hidden';
    
    currentLightboxIndex = galleryImages.findIndex(img => img.id === startId);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('visible');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    if (direction === 'prev') {
        currentLightboxIndex = currentLightboxIndex > 0 
            ? currentLightboxIndex - 1 
            : galleryImages.length - 1;
    } else {
        currentLightboxIndex = currentLightboxIndex < galleryImages.length - 1 
            ? currentLightboxIndex + 1 
            : 0;
    }
    
    const currentImage = galleryImages[currentLightboxIndex];
    const lightbox = document.getElementById('lightbox');
    const img = lightbox.querySelector('img');
    const title = lightbox.querySelector('.lightbox-title');
    const desc = lightbox.querySelector('.lightbox-desc');
    
    img.src = currentImage.src;
    img.alt = currentImage.title;
    title.textContent = currentImage.title;
    desc.textContent = currentImage.description;
}

let currentLightboxIndex = 0;

// ==================== 表单提交功能 ====================

function submitForm() {
    const form = document.getElementById('appointment-form');
    if (!form) return;
    const formData = new FormData(form);
    
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        date: formData.get('date'),
        message: formData.get('message')
    };
    
    console.log('预约信息:', data);
    
    const successModal = document.getElementById('success-modal');
    successModal.classList.add('visible');
    
    form.reset();
    
    setTimeout(() => {
        successModal.classList.remove('visible');
    }, 3000);
}

// ==================== 初始化 ====================

document.addEventListener('DOMContentLoaded', function() {
    renderGallery('all');
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            setActiveFilter(this.dataset.filter);
        });
    });
    
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', () => navigateLightbox('prev'));
    document.getElementById('lightbox-next').addEventListener('click', () => navigateLightbox('next'));
    
    document.getElementById('lightbox').addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
    
    const form = document.getElementById('appointment-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitForm();
        });
    }
    
    document.getElementById('success-modal').addEventListener('click', function() {
        this.classList.remove('visible');
    });
    
    document.addEventListener('keydown', function(e) {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox.classList.contains('visible')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox('prev');
        if (e.key === 'ArrowRight') navigateLightbox('next');
    });
});
