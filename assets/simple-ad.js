const AD_CONFIGS = [
    {
        title: "欢迎访问我的博客",
        description: "欢迎来到我的博客，希望你能在这里找到你需要的东西",
        buttonLink: "#",
        position: "top-right",
        backgroundColor: "rgba(50, 50, 50, 0.9)",
        textColor: "#ffffff"
    },
    {
        title: "花雨庭停服",
        description: "花会凋零，雨终会停，庭中之人去往了新的世界<br>亲爱的冒险家：<br><br><br>由于网络游戏服务器《花雨庭端游Java版》《花雨庭基岩版》游戏缺乏后期维护和更新，无法达到网络游戏服务器品质要求，《花雨庭端游Java版》《花雨庭基岩版》网络游戏服务器将于2025年12月29日停止运营，对服务器进行下架。",
        buttonLink: "https://mc.163.com/news/20251210/29175_1275702.html",
        position: "top-left",
        backgroundColor: "rgba(25, 100, 200, 0.9)",
        textColor: "#ffffff"
    },
];

class SimpleAd extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      const configIndex = this.getAttribute('data-config') || 0;
      this.config = AD_CONFIGS[configIndex] || AD_CONFIGS[0];
      this.render();
      this.setupClickListener();
    }
  
    render() {
      const { title, description, position, backgroundColor, textColor } = this.config;
  
      this.shadowRoot.innerHTML = `
          <style>
            :host {
              display: block;
              position: fixed;
              z-index: 9999;
              cursor: pointer;
              transition: transform 0.3s ease, opacity 0.3s ease;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
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
              backdrop-filter: blur(5px);
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
  
            :host(.top-left) { top: 20px; left: 20px; bottom: auto; right: auto; }
            :host(.top-right) { top: 20px; right: 20px; bottom: auto; left: auto; }
            :host(.bottom-left) { bottom: 20px; left: 20px; top: auto; right: auto; }
            :host(.bottom-right) { bottom: 20px; right: 20px; top: auto; left: auto; }
            
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
        
        this.classList.add(position);
    }
  
    setupClickListener() {
      const { buttonLink } = this.config;
      const container = this.shadowRoot.querySelector('.ad-container');
      const closeBtn = this.shadowRoot.querySelector('.close-btn');

      closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.style.opacity = '0';
          setTimeout(() => {
              this.remove();
          }, 300);
      });

      if (buttonLink && buttonLink !== '#') {
          container.addEventListener('click', () => {
            window.open(buttonLink, '_blank');
          });
      } else {
          this.style.cursor = 'default';
      }
    }
}
  
if (!customElements.get('simple-ad')) {
    customElements.define('simple-ad', SimpleAd);
}

document.addEventListener('DOMContentLoaded', () => {
    AD_CONFIGS.forEach((config, index) => {
        const adElement = document.createElement('simple-ad');
        adElement.setAttribute('data-config', index);
        document.body.appendChild(adElement);
    });
});
