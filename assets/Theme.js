document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== 背景设置 ====================
    // 在这里设置你的背景图片地址
    const BACKGROUND_IMAGE_URL = 'https://blog-assets.traveler.dpdns.org/assets/image/background.png';
    
    // 可选：设置背景透明度（0-1之间）
    const BODY_BG_OPACITY = 0.8;
    const SIDENAV_BG_OPACITY = 0.6;
    
    // 创建背景样式
    let backgroundStyle = document.createElement('style');
    backgroundStyle.type = 'text/css';
    backgroundStyle.innerHTML = `
        /* 背景图片 */
        html {
            background: url('${BACKGROUND_IMAGE_URL}') no-repeat center center fixed;
            background-size: cover;
            background-attachment: fixed;
        }
        
        /* 主体布局 */
        body {
            margin: 30px auto;
            padding: 20px;
            font-size: 16px;
            font-family: sans-serif;
            line-height: 1.25;
            background: rgba(255, 255, 255, ${BODY_BG_OPACITY});
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            overflow: auto;
            min-width: 200px;
            max-width: 1100px;
        }
        
        /* 响应式布局 */
        @media (min-width: 1001px) {
            body {
                padding: 45px;
            }
        }
        
        @media (max-width: 1000px) {
            body {
                padding: 20px;
            }
        }
        
        /* 侧边栏背景 */
        .SideNav {
            background: rgba(255, 255, 255, ${SIDENAV_BG_OPACITY});
            border-radius: 10px;
        }
    `;
    document.head.appendChild(backgroundStyle);
});
