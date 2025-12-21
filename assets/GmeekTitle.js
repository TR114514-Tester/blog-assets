document.addEventListener('DOMContentLoaded', function() {
    
    const ORIGINAL_TITLE = document.title;
    const HIDDEN_TITLES = "等你回来哦~,再见，等你回来,别走呀~,快回来看看！";
    const RETURN_TITLE = "欢迎回来！"; // 回来时显示的文字
    const RETURN_DELAY = 1500; // 回来后延迟多少毫秒恢复原始标题（单位：毫秒）
    
    const titleArray = HIDDEN_TITLES.split(',').map(title => title.trim());
    
    let isPageVisible = true;
    let isWindowFocused = true;
    let returnTimer = null;
    
    let hidden, visibilityChange;
    
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }
    
    function getRandomTitle() {
        const randomIndex = Math.floor(Math.random() * titleArray.length);
        return titleArray[randomIndex];
    }
    
    function updateTitle(isVisible) {
        if (isVisible) {
            // 清除之前的定时器
            if (returnTimer) {
                clearTimeout(returnTimer);
                returnTimer = null;
            }
            
            // 先显示返回标题
            document.title = RETURN_TITLE;
            
            // 设置定时器，延迟后恢复原始标题
            returnTimer = setTimeout(() => {
                document.title = ORIGINAL_TITLE;
                returnTimer = null;
            }, RETURN_DELAY);
            
        } else {
            // 如果用户离开时，清除返回标题的定时器
            if (returnTimer) {
                clearTimeout(returnTimer);
                returnTimer = null;
            }
            
            const randomTitle = getRandomTitle();
            document.title = randomTitle;
        }
    }
    
    if (typeof document.addEventListener !== "undefined" && typeof document[hidden] !== "undefined") {
        
        document.addEventListener(visibilityChange, function() {
            if (document[hidden]) {
                isPageVisible = false;
                updateTitle(false);
            } else {
                isPageVisible = true;
                updateTitle(true);
            }
        }, false);
        
    } else {
        
        window.addEventListener('focus', function() {
            isWindowFocused = true;
            updateTitle(true);
        });
        
        window.addEventListener('blur', function() {
            isWindowFocused = false;
            updateTitle(false);
        });
        
        window.addEventListener('pageshow', function() {
            isWindowFocused = true;
            updateTitle(true);
        });
        
        window.addEventListener('pagehide', function() {
            isWindowFocused = false;
            updateTitle(false);
        });
    }
    
});
