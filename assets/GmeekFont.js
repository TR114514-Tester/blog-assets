
// 定义TTF字体文件地址（请修改为您需要的地址）
const FONT_URL = 'https://blog-assets.traveler.dpdns.org/assets/font/font.ttf';
const FONT_FAMILY = 'Font';

// 加载并应用字体
const loadCustomFont = () => {
  // 创建字体定义
  const fontFace = new FontFace(
    FONT_FAMILY,
    `url(${FONT_URL}) format('truetype')`,
    { style: 'normal', weight: '400' }
  );
  
  // 加载字体
  fontFace.load()
    .then(loadedFont => {
      // 添加到文档字体集
      document.fonts.add(loadedFont);
      
      // 创建样式应用到所有元素
      const style = document.createElement('style');
      style.textContent = `
        * {
          font-family: '${FONT_FAMILY}', sans-serif !important;
        }
      `;
      
      // 添加到文档头部
      document.head.appendChild(style);
      
      console.log('自定义字体加载成功');
    })
    .catch(error => {
      console.error('字体加载失败:', error);
    });
};

// 页面加载完成后自动执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadCustomFont);
} else {
  loadCustomFont();
}
