# Gmeek TitleSwitch Plugin
console.log("GmeekTitleSwitch Plugin by blog.traveler.dpdns.org");
// 1. 定义配置变量（用英文逗号分隔不同标题）
var leaveTitleList = "别走呀,去哪了?,快回来"; 
# 上面的是离开的
var backTitleList = "你回来了,好久不见,欢迎归队";
# 上面的是回来的

// 保存网页原本的标题，用于后续恢复
var originalTitle = document.title;
var titleTimer; // 用于存储定时器，防止快速切换时冲突

// 辅助函数：将逗号分隔的字符串转为数组，并随机返回其中一项
function getRandomTitle(str) {
    var arr = str.split(','); // 按逗号分割
    var randomIndex = Math.floor(Math.random() * arr.length); // 生成随机索引
    return arr[randomIndex]; // 返回随机的一项
}

// 2. 核心监听代码
document.addEventListener('visibilitychange', function () {
    // 清除之前的定时器（防止用户手速太快，1秒内来回切，导致标题恢复逻辑混乱）
    if (titleTimer) clearTimeout(titleTimer);

    if (document.visibilityState === 'hidden') {
        // === 用户离开 ===
        // 随机选择一个离开时的标题
        document.title = getRandomTitle(leaveTitleList);
    } else {
        // === 用户回来 ===
        // 随机选择一个回来时的标题
        document.title = getRandomTitle(backTitleList);
        
        // 设置定时器，1秒（1000毫秒）后恢复原标题
        titleTimer = setTimeout(function() {
            document.title = originalTitle;
        }, 1000);
    }
});
