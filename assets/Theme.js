const BLUR_INTENSITY = '8px'; // 高斯模糊程度，可修改这个值
const BUTTON_HOVER_COLOR = '#8A2BE2'; // 右上角按钮悬浮颜色，可修改这个值（支持 #000000, rgb(255,0,0), rgba(255,0,0,0.8) 等格式）
const BACKGROUND = "http://blog.traveler.dpdns.org/assets/image/background.png";
const ENABLE_RAIN_EFFECT = true; // 是否启用下雨效果，true为启用，false为关闭

document.addEventListener('DOMContentLoaded', function() {
    
    // 导入MDUI样式（如果尚未导入）
    const mduiCSS = 'https://cdn.jsdelivr.net/npm/mdui@1.0.2/dist/css/mdui.min.css';
    const mduiJS = 'https://cdn.jsdelivr.net/npm/mdui@1.0.2/dist/js/mdui.min.js';
    
    // 检查是否已加载MDUI CSS
    if (!document.querySelector(`link[href="${mduiCSS}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = mduiCSS;
        document.head.appendChild(link);
    }
    
    // 检查是否已加载MDUI JS
    if (!document.querySelector(`script[src="${mduiJS}"]`)) {
        const script = document.createElement('script');
        script.src = mduiJS;
        document.head.appendChild(script);
    }
    
    // 创建MDUI卡片容器并包装body内容
    const bodyContent = document.body.innerHTML;
    const cardContainer = document.createElement('div');
    cardContainer.className = 'mdui-card mdui-card-content';
    cardContainer.style.cssText = `
        backdrop-filter: blur(${BLUR_INTENSITY}) !important;
        -webkit-backdrop-filter: blur(${BLUR_INTENSITY}) !important;
        background: rgba(255, 255, 255, 0.15) !important;
        position: relative;
        z-index: 1;
    `;
    
    document.body.innerHTML = '';
    document.body.appendChild(cardContainer);
    cardContainer.innerHTML = bodyContent;
    
    // 如果启用了下雨效果，添加下雨效果
    if (ENABLE_RAIN_EFFECT) {
        console.log('MDGmeek : 启用下雨效果');
        
        // 创建下雨样式
        let rainstyle = document.createElement('style');
        rainstyle.type = 'text/css';
        rainstyle.innerHTML = `
            .raincontent {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                pointer-events: none;
                z-index: 0;
                overflow: hidden;
            }
            #rainBox {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            .rain {
                position: absolute;
                width: 2px;
                height: 50px;
                background: linear-gradient(rgba(255,255,255,.3), rgba(255,255,255,.6));
                border-radius: 1px;
            }
        `;
        document.head.appendChild(rainstyle);
        
        // 创建下雨容器
        let raincontent = document.createElement('div');
        raincontent.classList.add('raincontent');
        let rainBox = document.createElement('div');
        rainBox.id = 'rainBox';
        raincontent.appendChild(rainBox);
        
        // 将下雨容器插入到body的最前面
        document.body.insertBefore(raincontent, document.body.firstChild);
        
        // 初始化下雨效果
        function initRainEffect() {
            // 获取rainBox元素
            let box = document.getElementById('rainBox');
            
            // 定义box的高度和宽度
            let boxHeight = window.innerHeight;
            let boxWidth = window.innerWidth;
            
            // 存储所有活跃的雨滴
            let activeRaindrops = [];
            
            // 存储定时器ID
            let rainTimer = null;
            let rainInterval = null;
            
            // 创建单个雨滴
            function createRaindrop() {
                // 创建一个新的div元素表示雨点
                let rain = document.createElement('div');
                
                // 添加类名'rain'到雨点元素
                rain.classList.add('rain');
                
                // 设置雨点的初始位置
                rain.style.top = '-50px';
                rain.style.left = Math.random() * boxWidth + 'px';
                
                // 设置雨点的随机透明度
                rain.style.opacity = 0.3 + Math.random() * 0.5;
                
                // 设置雨点的随机长度
                let rainHeight = 30 + Math.random() * 40;
                rain.style.height = rainHeight + 'px';
                
                // 设置雨点的随机宽度
                let rainWidth = 1 + Math.random();
                rain.style.width = rainWidth + 'px';
                
                // 设置雨点的随机颜色
                let colorValue = 150 + Math.random() * 100;
                rain.style.background = `linear-gradient(rgba(${colorValue}, ${colorValue}, 255, .3), rgba(255, 255, 255, .6))`;
                
                // 将雨点元素添加到rainBox中
                box.appendChild(rain);
                
                // 雨滴数据对象
                const raindropData = {
                    element: rain,
                    position: -50,
                    speed: 2 + Math.random() * 3,
                    acceleration: 0.05,
                    width: boxWidth
                };
                
                // 添加到活跃雨滴数组
                activeRaindrops.push(raindropData);
                
                return raindropData;
            }
            
            // 更新所有雨滴位置
            function updateRaindrops() {
                // 使用requestAnimationFrame实现流畅动画
                rainTimer = requestAnimationFrame(updateRaindrops);
                
                // 更新每个活跃雨滴的位置
                for (let i = activeRaindrops.length - 1; i >= 0; i--) {
                    const raindrop = activeRaindrops[i];
                    
                    // 更新位置和速度
                    raindrop.position += raindrop.speed;
                    raindrop.speed += raindrop.acceleration;
                    raindrop.element.style.top = raindrop.position + 'px';
                    
                    // 如果雨滴超出屏幕底部，移除它
                    if (raindrop.position > boxHeight) {
                        if (raindrop.element.parentNode === box) {
                            box.removeChild(raindrop.element);
                        }
                        activeRaindrops.splice(i, 1);
                    }
                }
            }
            
            // 创建一批雨滴
            function createRaindropsBatch() {
                // 只在页面可见时创建雨滴
                if (document.hidden) return;
                
                // 根据屏幕宽度计算雨滴数量
                let rainCount = Math.floor(boxWidth / 30); // 减少密度，避免过多
                
                // 限制最大雨滴数量
                if (activeRaindrops.length > 200) {
                    return; // 如果已经有太多雨滴，不再创建
                }
                
                for (let i = 0; i < rainCount; i++) {
                    // 延迟创建雨滴，形成连续下雨效果
                    setTimeout(() => {
                        if (!document.hidden) { // 再次检查页面是否可见
                            createRaindrop();
                        }
                    }, Math.random() * 500); // 减小创建间隔
                }
            }
            
            // 清空所有雨滴
            function clearAllRaindrops() {
                // 取消动画帧
                if (rainTimer) {
                    cancelAnimationFrame(rainTimer);
                    rainTimer = null;
                }
                
                // 清除定时器
                if (rainInterval) {
                    clearInterval(rainInterval);
                    rainInterval = null;
                }
                
                // 移除所有雨滴元素
                box.innerHTML = '';
                
                // 清空雨滴数组
                activeRaindrops = [];
            }
            
            // 重新开始下雨
            function restartRain() {
                clearAllRaindrops();
                startRain();
            }
            
            // 开始下雨
            function startRain() {
                // 开始动画循环
                updateRaindrops();
                
                // 每2秒创建一批新的雨滴
                rainInterval = setInterval(createRaindropsBatch, 2000);
                
                // 立即创建第一批雨滴
                createRaindropsBatch();
            }
            
            // 页面可见性变化处理
            function handleVisibilityChange() {
                if (document.hidden) {
                    // 页面隐藏时，停止创建新雨滴并逐渐清除现有雨滴
                    if (rainInterval) {
                        clearInterval(rainInterval);
                        rainInterval = null;
                    }
                    
                    // 加快雨滴下落速度，快速清空
                    activeRaindrops.forEach(raindrop => {
                        raindrop.speed = 10; // 加快速度
                        raindrop.acceleration = 0.1; // 加快加速度
                    });
                    
                    // 设置超时，如果在隐藏期间没有返回，则完全清除
                    setTimeout(() => {
                        if (document.hidden) {
                            clearAllRaindrops();
                        }
                    }, 1000);
                } else {
                    // 页面显示时，重新开始下雨
                    restartRain();
                }
            }
            
            // 监听页面可见性变化
            document.addEventListener('visibilitychange', handleVisibilityChange);
            
            // 监听窗口大小变化
            let resizeTimeout;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(function() {
                    boxHeight = window.innerHeight;
                    boxWidth = window.innerWidth;
                    
                    // 重新计算现有雨滴的位置（确保不会超出新边界）
                    activeRaindrops.forEach(raindrop => {
                        // 如果雨滴超出新的屏幕宽度，移除它
                        const left = parseFloat(raindrop.element.style.left);
                        if (left > boxWidth) {
                            if (raindrop.element.parentNode === box) {
                                box.removeChild(raindrop.element);
                            }
                            activeRaindrops = activeRaindrops.filter(rd => rd !== raindrop);
                        }
                    });
                }, 250);
            });
            
            // 开始下雨效果
            startRain();
        }
        
        // 等待页面加载完成后初始化下雨效果
        window.addEventListener('load', function() {
            setTimeout(initRainEffect, 500);
        });
    } else {
        console.log('MDGmeek : 下雨效果已关闭');
    }
    
    // 美化 SideNav item 为 MDUI 卡片
    function beautifySideNavItems() {
        const sideNavItems = document.querySelectorAll('.SideNav-item');
        
        sideNavItems.forEach(item => {
            // 创建卡片包装器
            const cardWrapper = document.createElement('div');
            cardWrapper.className = 'mdui-card mdui-hoverable mdui-ripple side-nav-card';
            cardWrapper.style.cssText = `
                margin-bottom: 10px;
                border-radius: 12px;
                overflow: hidden;
                transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            `;
            
            // 创建卡片内容
            const cardContent = document.createElement('div');
            cardContent.className = 'mdui-card-primary';
            cardContent.style.cssText = `
                padding: 16px;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.75) 100%);
            `;
            
            // 获取原始链接内容
            const link = item.querySelector('a');
            if (link) {
                // 复制链接内容到卡片
                const linkClone = link.cloneNode(true);
                linkClone.style.cssText = `
                    display: block;
                    color: #333;
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 16px;
                    transition: color 0.3s ease;
                `;
                
                // 添加图标（可以根据需要自定义）
                const icon = document.createElement('i');
                icon.className = 'mdui-icon material-icons';
                icon.style.cssText = `
                    float: right;
                    color: #8A2BE2;
                    opacity: 0.7;
                    font-size: 20px;
                `;
                icon.textContent = 'chevron_right'; // MDUI 图标
                
                linkClone.appendChild(icon);
                cardContent.appendChild(linkClone);
            } else {
                // 如果没有链接，直接复制内容
                cardContent.innerHTML = item.innerHTML;
            }
            
            // 组装卡片
            cardWrapper.appendChild(cardContent);
            
            // 替换原始 item
            item.parentNode.replaceChild(cardWrapper, item);
        });
    }
    
    // 添加 SideNav 卡片样式
    const sideNavStyle = document.createElement('style');
    sideNavStyle.innerHTML = `
        .side-nav-card {
            border: 1px solid rgba(255, 255, 255, 0.5) !important;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        }
        
        .side-nav-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(138, 43, 226, 0.2) !important;
            border-color: rgba(138, 43, 226, 0.3) !important;
        }
        
        .side-nav-card .mdui-card-primary a:hover {
            color: ${BUTTON_HOVER_COLOR} !important;
        }
        
        .side-nav-card .mdui-card-primary a:hover .mdui-icon {
            opacity: 1;
            transform: translateX(2px);
        }
        
        .side-nav-card .mdui-icon {
            transition: all 0.3s ease;
        }
        
        /* 侧边导航容器样式 */
        .SideNav {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            padding: 10px 0;
        }
    `;
    document.head.appendChild(sideNavStyle);
    
    //判断url，添加主题------------------------------------------------------------------------
    let currentUrl = window.location.pathname;

    // 定义主页主题应用的路径规则
    const isHomePage = currentUrl.includes('/index.html') || currentUrl === "/";
    const isPageWithNumber = /\/page\d+\.html$/i.test(currentUrl); // 匹配 page数字.html

    if (isHomePage || isPageWithNumber) {
        console.log('MDGmeek : 应用主页主题（主页或分页）');

        //主页主题------------------------------------------------------------------------------
        let style = document.createElement("style");
        style.innerHTML = `
        
        /* header布局*/
        .blogTitle {
            display: unset;
        }
        
        #header {
            height: 340px;
        }
        
        #header h1 {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .title-right {
            margin: unset;
            margin-top: 295px;
            margin-left: 50%;
            transform: translateX(-50%);
        }
        
        .avatar {
            width: 200px;
            height: 200px;
        }
        
        #header h1 a {
            margin-top: 30px;
            font-family: fantasy;
            margin-left: unset;
        }
        
        /* 背景图片 */
        html {
            background: url('${BACKGROUND}') no-repeat center center fixed;
            background-size: cover;
            height: 100%;
        }
        
        body {
            margin: 30px auto;
            padding: 0;
            font-size: 16px;
            font-family: sans-serif;
            line-height: 1.25;
            background: transparent !important;
            border-radius: 0;
            box-shadow: none;
            overflow: auto;
        }
        
        /* MDUI卡片样式 */
        .mdui-card {
            margin: 0 auto;
            padding: 20px;
            border-radius: 16px !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
        }
        
        /* 增强 SideNav 卡片效果 */
        .SideNav {
            background: transparent !important;
            border-radius: 10px;
            min-width: unset;
            padding: 15px 0;
        }
        
        .side-nav-card {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%) !important;
            margin-bottom: 12px !important;
        }
        
        .side-nav-card:hover {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%) !important;
            transform: translateY(-3px) scale(1.02) !important;
            box-shadow: 0 8px 25px rgba(138, 43, 226, 0.25) !important;
        }
        
        /* 分页条 */
        .pagination a:hover, .pagination a:focus, .pagination span:hover, .pagination span:focus, .pagination em:hover, .pagination em:focus {
            border-color: rebeccapurple;
        }
        
        /* 右上角按钮 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: 0.3s;
        }
        
        div.title-right .btn:hover {
            width: auto;
            border-radius: 2em !important;
            background-color: ${BUTTON_HOVER_COLOR.startsWith('#') ? BUTTON_HOVER_COLOR + 'cc' : BUTTON_HOVER_COLOR} !important;
        }
        
        div.title-right .btn .btndescription {
            display: none;
            margin-left: 3px;
            white-space: nowrap;
            color: black;
            font-weight: bold;
        }
        
        div.title-right .btn:hover .btndescription {
            display: inline;
        }
        
        `;
        document.head.appendChild(style);
        
        //右上角按钮描述
        let topright_buttons = document.querySelectorAll(".title-right a.btn");
        
        topright_buttons.forEach(button => {
            var title = button.getAttribute('title');
            if (title) {
                var btndescription = document.createElement('span');
                btndescription.className = 'btndescription';
                btndescription.textContent = title;
                button.appendChild(btndescription);
            }
        });

    } else if (currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html')) {
        console.log('MDGmeek : 应用文章页主题');

        //文章页主题------------------------------------------------------------------------------
        let style = document.createElement("style");
        style.innerHTML = `

        /* 背景图片 */
        html {
            background: url('${BACKGROUND}') no-repeat center center fixed;
            background-size: cover;
            height: 100%;
        }

        body {
            min-width: 200px;
            max-width: 1100px;
            margin: 30px auto;
            font-size: 16px;
            font-family: sans-serif;
            line-height: 1.25;
            background: transparent !important;
            border-radius: 0;
            box-shadow: none;
            overflow: auto;
            padding: 0 !important;
        }

        /* MDUI卡片样式 */
        .mdui-card {
            width: 100%;
            border-radius: 16px !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
        }

        @media (min-width: 1001px) {
        .mdui-card {
            padding: 45px;
        }
        }

        @media (max-width: 1000px) {
        .mdui-card {
            padding: 20px;
        }
        }

        /* markdown内容 */
        .markdown-body img {
            border-radius: 10px;
            border: 2px solid #a3e0e4;
        }

        .markdown-alert {
            border-radius: 10px;
        }

        .markdown-body .highlight pre, .markdown-body pre {
            background: rgba(255, 255, 255, 0.85);
            border-radius: 10px;
        }

        .markdown-body code, .markdown-body tt {
            background-color: rgba(141, 150, 161, 0.2);
        }

        video {
            border-radius: 10px;
        }

        /* 右上角按钮 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: 0.3s;
        }

        div.title-right .btn:hover {
            width: auto;
            border-radius: 2em !important;
            background-color: ${BUTTON_HOVER_COLOR.startsWith('#') ? BUTTON_HOVER_COLOR + 'cc' : BUTTON_HOVER_COLOR} !important;
        }

        div.title-right .btn .btndescription {
            display: none;
            margin-left: 3px;
            white-space: nowrap;
            color: black;
            font-weight: bold;
        }

        div.title-right .btn:hover .btndescription {
            display: inline;
        }

        `;
        document.head.appendChild(style);

        //右上角按钮描述
        let topright_buttons = document.querySelectorAll(".title-right a.btn");

        topright_buttons.forEach(button => {
            var title = button.getAttribute('title');
            if (title) {
                var btndescription = document.createElement('span');
                btndescription.className = 'btndescription';
                btndescription.textContent = title;
                button.appendChild(btndescription);
            }
        });

    } else if (currentUrl.includes('/tag.html')) {
        console.log('MDGmeek : 应用搜索页主题');

        // 搜索页主题--------------------------------------------------------------------
        let style = document.createElement("style");
        style.innerHTML = `
        
        /* header布局*/
        
        .title-right {
            align-items: flex-end;
        }

        @media (max-width: 600px) {
            .tagTitle {
                display: unset;
                font-size: 14px;
                white-space: unset;
            }
        }
        
        /* 背景图片 */
        html {
            background: url('${BACKGROUND}') no-repeat center center fixed;
            background-size: cover;
            height: 100%;
        }
        
        body {
            margin: 30px auto;
            padding: 0;
            font-size: 16px;
            font-family: sans-serif;
            line-height: 1.25;
            background: transparent !important;
            border-radius: 0;
            box-shadow: none;
            overflow: auto;
        }
        
        /* MDUI卡片样式 */
        .mdui-card {
            margin: 0 auto;
            padding: 20px;
            border-radius: 16px !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
        }
        
        /* 增强 SideNav 卡片效果 */
        .SideNav {
            background: transparent !important;
            border-radius: 10px;
            min-width: unset;
            padding: 15px 0;
        }
        
        .side-nav-card {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%) !important;
            margin-bottom: 12px !important;
        }
        
        .side-nav-card:hover {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%) !important;
            transform: translateY(-3px) scale(1.02) !important;
            box-shadow: 0 8px 25px rgba(138, 43, 226, 0.25) !important;
        }
        
        /* 右上角按钮 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: 0.3s;
        }
        
        div.title-right .btn:hover {
            width: auto;
            border-radius: 2em !important;
            background-color: ${BUTTON_HOVER_COLOR.startsWith('#') ? BUTTON_HOVER_COLOR + 'cc' : BUTTON_HOVER_COLOR} !important;
        }
        
        div.title-right .btn .btndescription {
            display: none;
            margin-left: 3px;
            white-space: nowrap;
            color: black;
            font-weight: bold;
        }
        
        div.title-right .btn:hover .btndescription {
            display: inline;
        }
        
        .subnav-search-input {
            border-radius: 2em;
            float: unset !important;
        }
        
        .subnav-search-icon {
            top: 9px;
        }
        
        button.btn.float-left {
            display: none;
        }
        
        .subnav-search {
            width: unset; 
            height: 36px;
        }
        `;
        document.head.appendChild(style);
        
        //右上角按钮描述
        let topright_buttons = document.querySelectorAll(".title-right a.btn");
        
        topright_buttons.forEach(button => {
            var title = button.getAttribute('title');
            if (title) {
                var btndescription = document.createElement('span');
                btndescription.className = 'btndescription';
                btndescription.textContent = title;
                button.appendChild(btndescription);
            }
        });
        
        let input = document.getElementsByClassName("form-control subnav-search-input float-left")[0];
        let button = document.getElementsByClassName("btn float-left")[0];
        input.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                button.click();
            }
        });

    } else {
        console.log('MDGmeek : 未应用主题');
    }
    
    // 为 notranslate 类添加 MDUI Roboto 字体和高斯模糊
    const notranslateStyle = document.createElement("style");
    notranslateStyle.innerHTML = `
        /* 为所有 notranslate 类应用 MDUI Roboto 字体和高斯模糊 */
        .notranslate {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif !important;
            font-weight: 400;
            line-height: 1.5;
            letter-spacing: 0.00938em;
            backdrop-filter: blur(${BLUR_INTENSITY}) !important;
            -webkit-backdrop-filter: blur(${BLUR_INTENSITY}) !important;
            background: rgba(255, 255, 255, 0.15) !important;
            border-radius: 8px;
            padding: 10px;
            margin: 10px 0;
        }
        
        /* 为 notranslate 内的特定元素设置字体和模糊 */
        .notranslate h1,
        .notranslate h2,
        .notranslate h3,
        .notranslate h4,
        .notranslate h5,
        .notranslate h6 {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif !important;
            font-weight: 500;
            backdrop-filter: blur(${BLUR_INTENSITY}) !important;
            -webkit-backdrop-filter: blur(${BLUR_INTENSITY}) !important;
        }
        
        .notranslate code,
        .notranslate pre {
            font-family: 'Roboto Mono', 'Consolas', 'Monaco', 'Courier New', monospace !important;
            backdrop-filter: blur(4px) !important;
            -webkit-backdrop-filter: blur(4px) !important;
            background: rgba(255, 255, 255, 0.2) !important;
        }
        
        .notranslate blockquote {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif !important;
            font-style: italic;
            font-weight: 300;
            backdrop-filter: blur(6px) !important;
            -webkit-backdrop-filter: blur(6px) !important;
            background: rgba(255, 255, 255, 0.1) !important;
            border-left: 4px solid rgba(138, 43, 226, 0.5);
            padding-left: 15px;
            margin-left: 0;
        }
        
        /* 确保按钮也使用 Roboto 字体和模糊效果 */
        .notranslate button,
        .notranslate input,
        .notranslate select,
        .notranslate textarea {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif !important;
            backdrop-filter: blur(4px) !important;
            -webkit-backdrop-filter: blur(4px) !important;
            background: rgba(255, 255, 255, 0.2) !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
        }
        
        /* 表格中的文字也应用 Roboto 字体和模糊效果 */
        .notranslate table,
        .notranslate th,
        .notranslate td {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif !important;
            backdrop-filter: blur(4px) !important;
            -webkit-backdrop-filter: blur(4px) !important;
            background: rgba(255, 255, 255, 0.15) !important;
        }
        
        /* 列表项也应用 Roboto 字体和模糊效果 */
        .notranslate ul,
        .notranslate ol,
        .notranslate li {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif !important;
            backdrop-filter: blur(4px) !important;
            -webkit-backdrop-filter: blur(4px) !important;
        }
        
        /* 链接也应用 Roboto 字体 */
        .notranslate a {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif !important;
            backdrop-filter: blur(2px) !important;
            -webkit-backdrop-filter: blur(2px) !important;
        }
    `;
    document.head.appendChild(notranslateStyle);
    
    // 添加默认卡片样式（适用于所有页面）
    const defaultCardStyle = document.createElement("style");
    defaultCardStyle.innerHTML = `
        .mdui-card {
            transition: all 0.3s ease;
            min-height: 200px;
        }
        
        .mdui-card:hover {
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2) !important;
        }
        
        /* 等待页面加载完成后执行 SideNav 美化 */
        window.addEventListener('load', function() {
            setTimeout(beautifySideNavItems, 100);
        });
    `;
    document.head.appendChild(defaultCardStyle);
    
    // 导入 Roboto 字体（如果尚未导入）
    const loadRobotoFont = () => {
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Roboto+Mono&display=swap';
        fontLink.rel = 'stylesheet';
        fontLink.type = 'text/css';
        
        // 检查是否已加载 Roboto 字体
        const existingFonts = document.querySelectorAll('link[href*="fonts.googleapis.com/css2?family=Roboto"]');
        if (existingFonts.length === 0) {
            document.head.appendChild(fontLink);
            console.log('MDGmeek: Roboto 字体已加载');
        }
    };
    
    // 延迟加载字体，避免阻塞页面渲染
    setTimeout(loadRobotoFont, 500);
});
