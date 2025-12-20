document.addEventListener('DOMContentLoaded', function() {
    // 默认背景图片URL（可以修改为您想要的图片地址）
    const DEFAULT_BACKGROUND = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
    
    // 获取要修改背景的元素（这里按照要求选择html元素）
    const htmlElement = document.documentElement;
    
    // 设置背景图片
    htmlElement.style.backgroundImage = `url('${DEFAULT_BACKGROUND}')`;
    
    // 设置背景属性以获得更好的显示效果
    htmlElement.style.backgroundSize = 'cover';      // 背景图片覆盖整个元素
    htmlElement.style.backgroundPosition = 'center'; // 背景图片居中
    htmlElement.style.backgroundRepeat = 'no-repeat'; // 不重复背景
    htmlElement.style.backgroundAttachment = 'fixed'; // 背景固定，不随滚动条滚动
    htmlElement.style.minHeight = '100vh';           // 确保高度至少为视口高度
    htmlElement.style.backgroundBlendMode = 'overlay'; // 背景混合模式
    
    // 添加一个半透明遮罩层，提高文字可读性（可选）
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'; // 半透明黑色遮罩
    overlay.style.zIndex = '-1'; // 确保在内容之下
    overlay.style.pointerEvents = 'none'; // 不阻止鼠标事件
    document.body.appendChild(overlay);
    
    // 控制台输出信息
    console.log('Theme.js: 背景图片已应用到html元素');
    console.log('背景图片URL:', DEFAULT_BACKGROUND);
    
    // 添加一个函数用于动态更改背景图片
    window.changeBackground = function(imageUrl) {
        htmlElement.style.backgroundImage = `url('${imageUrl}')`;
        console.log('Theme.js: 背景图片已更改为:', imageUrl);
        return true;
    };
    
    // 添加一个函数用于获取当前背景图片URL
    window.getCurrentBackground = function() {
        const bgImage = htmlElement.style.backgroundImage;
        // 从url('...')中提取URL
        const match = bgImage.match(/url\(["']?(.*?)["']?\)/);
        return match ? match[1] : null;
    };
    
    // 添加一个函数用于重置为默认背景
    window.resetBackground = function() {
        htmlElement.style.backgroundImage = `url('${DEFAULT_BACKGROUND}')`;
        console.log('Theme.js: 背景图片已重置为默认');
        return true;
    };
});
