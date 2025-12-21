document.addEventListener('DOMContentLoaded', function() {
    
    const ORIGINAL_TITLE = document.title;
    const HIDDEN_TITLES = "等你回来哦~，等你回来,别走呀~,快回来看看！";
    
    const titleArray = HIDDEN_TITLES.split(',').map(title => title.trim());
    
    let isPageVisible = true;
    let isWindowFocused = true;
    
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
            document.title = ORIGINAL_TITLE;
        } else {
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
    
    let titleAnimationEnabled = true;
    
    if (titleAnimationEnabled) {
        
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                animateTitle();
            }
        });
        
        window.addEventListener('focus', function() {
            setTimeout(() => {
                animateTitle();
            }, 100);
        });
        
        function animateTitle() {
            const originalTitle = document.title;
            
            let flashCount = 0;
            const maxFlashes = 3;
            const flashInterval = 400;
            
            const flashIntervalId = setInterval(() => {
                if (flashCount % 2 === 0) {
                    document.title = originalTitle;
                } else {
                    document.title = originalTitle;
                }
                
                flashCount++;
                
                if (flashCount >= maxFlashes * 2) {
                    clearInterval(flashIntervalId);
                    document.title = originalTitle;
                }
            }, flashInterval);
        }
    }
    
});
