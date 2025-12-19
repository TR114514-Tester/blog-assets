// =================================================================
// 🟢 广告配置区域 (请在这里修改)
// =================================================================
const AD_CONFIG = {
    // 广告标题
    title: "欢迎访问我的博客", 
    
    // 广告描述文字
    description: "这里记录技术与生活，点击查看更多精彩内容！", 
    
    // 点击跳转链接 (设为 '#' 则不可点击)
    buttonLink: "https://github.com/Meekdai/Gmeek", 
    
    // 显示位置: 'bottom-right' (右下), 'bottom-left' (左下), 'top-right' (右上), 'top-left' (左上)
    position: "bottom-right",

    // 主题背景色 (支持 hex, rgb, rgba)
    backgroundColor: "rgba(50, 50, 50, 0.9)",

    // 文字颜色
    textColor: "#ffffff"
};
// =================================================================


class SimpleAd extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
      this.setupClickListener();
    }
  
    render() {
      // 直接读取顶部的 AD_CONFIG 配置
      const { title, description, position, backgroundColor, textColor } = AD_CONFIG;
  
      this.shadowRoot.innerHTML = `
          <style>
            :host {
              display: block;
              position: fixed;
              z-index: 9999; /* 确保层级足够高 */
              cursor: pointer;
              transition: transform 0.3s ease, opacity 0.3s ease;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              
              /* 默认位置 */
              bottom: 20px;
              right: 20px;
            }
  
            :host(:hover) {
              transform: scale(1.02) translateY(-2px);
            }
  
            .ad-container {
              background-color: ${backgroundColor};
              color: ${textColor};
              padding: 16px 22px;
              border-radius: 12px;
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
              max-width: 300px;
              backdrop-filter: blur(5px); /* 毛玻璃效果 */
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
  
            .title {
              font-size: 16px;
              font-weight: 700;
              margin-bottom: 6px;
              line-height: 1.4;
            }
  
            .description {
              font-size: 14px;
              line-height: 1.5;
              opacity: 0.9;
              margin: 0;
            }

            /* 关闭按钮样式 */
            .close-btn {
                position: absolute;
                top: 5px;
                right: 8px;
                font-size: 18px;
                opacity: 0.6;
                transition: opacity 0.2s;
                padding: 2px;
            }
            .close-btn:hover {
                opacity: 1;
            }
  
            /* 位置样式逻辑 */
            :host(.top-left) { top: 20px; left: 20px; bottom: auto; right: auto; }
            :host(.top-right) { top: 20px; right: 20px; bottom: auto; left: auto; }
            :host(.bottom-left) { bottom: 20px; left: 20px; top: auto; right: auto; }
            :host(.bottom-right) { bottom: 20px; right: 20px; top: auto; left: auto; }
            
            /* 移动端适配：屏幕小于600px时，居中显示在底部 */
            @media (max-width: 600px) {
                :host, :host(.top-left), :host(.top-right), :host(.bottom-left), :host(.bottom-right) {
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: 20px;
                    top: auto;
                    right: auto;
                    width: 90%;
                    max-width: 90%;
                }
                :host(:hover) {
                     transform: translateX(-50%) scale(1.02);
                }
            }
          </style>

          <div class="ad-container">
            <div class="close-btn" title="关闭">×</div>
            <div class="title">${title}</div>
            <div class="description">${description}</div>
          </div>
        `;
        
        // 根据配置添加位置 class
        this.classList.add(position);
    }
  
    setupClickListener() {
      const { buttonLink } = AD_CONFIG;
      const container = this.shadowRoot.querySelector('.ad-container');
      const closeBtn = this.shadowRoot.querySelector('.close-btn');

      // 关闭按钮逻辑（点击关闭移除元素，阻止冒泡）
      closeBtn.addEventListener('click', (e) => {
          e.stopPropagation(); // 防止触发跳转
          this.style.opacity = '0'; // 淡出动画
          setTimeout(() => {
              this.remove(); // 从 DOM 中移除
          }, 300);
      });

      // 跳转逻辑
      if (buttonLink && buttonLink !== '#') {
          container.addEventListener('click', () => {
            window.open(buttonLink, '_blank');
          });
      } else {
          this.style.cursor = 'default';
      }
    }
}
  
// 注册组件
if (!customElements.get('simple-ad')) {
    customElements.define('simple-ad', SimpleAd);
}

// 🚀 自动执行：等待页面加载完成后，自动插入广告
document.addEventListener('DOMContentLoaded', () => {
    // 防止重复添加
    if (!document.querySelector('simple-ad')) {
        const adElement = document.createElement('simple-ad');
        document.body.appendChild(adElement);
        console.log('SimpleAd: 广告组件已自动加载');
    }
});
