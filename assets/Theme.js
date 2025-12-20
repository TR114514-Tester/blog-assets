// Theme.js - 背景图片修改器
document.addEventListener('DOMContentLoaded', function() {
    // 背景图片URL
    const BACKGROUND_IMAGE = 'https://blog-assets.traveler.dpdns.org/assets/image/background.png';
    
    // 获取html元素
    const htmlElement = document.documentElement;
    
    // 设置背景图片
    htmlElement.style.backgroundImage = `url('${BACKGROUND_IMAGE}')`;
});
