// 全局变量
const danmakuContainer = document.querySelector('.danmaku-container');
const messageInput = document.getElementById('messageInput');
const addMessageBtn = document.getElementById('addMessageBtn');

// 弹幕轨道高度
const trackHeight = 40;
// 弹幕数量计数器
let danmakuCount = 0;

// 初始化
function init() {
    // 绑定添加留言按钮事件
    addMessageBtn.addEventListener('click', addMessage);
    
    // 绑定回车键事件
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addMessage();
        }
    });
}

// 添加留言
function addMessage() {
    const message = messageInput.value.trim();
    if (message) {
        createDanmaku(message);
        messageInput.value = '';
    }
}

// 创建弹幕
function createDanmaku(text) {
    // 创建弹幕元素
    const danmaku = document.createElement('div');
    danmaku.className = 'danmaku';
    danmaku.textContent = text;
    
    // 计算弹幕位置和动画时间
    const containerWidth = danmakuContainer.offsetWidth;
    const containerHeight = danmakuContainer.offsetHeight;
    
    // 计算弹幕轨道
    const trackIndex = danmakuCount % Math.floor(containerHeight / trackHeight);
    const top = trackIndex * trackHeight + 10;
    
    // 设置弹幕样式
    danmaku.style.top = `${top}px`;
    
    // 固定动画时间，确保所有弹幕速度一致
    const animationDuration = 20; // 增加动画时间，减慢弹幕速度
    danmaku.style.animationDuration = `${animationDuration}s`;
    
    // 添加鼠标悬浮事件
    danmaku.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    // 添加鼠标离开事件
    danmaku.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
    
    // 添加动画结束事件，确保弹幕完全滑出后再移除
    danmaku.addEventListener('animationend', function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    });
    
    // 添加到容器
    danmakuContainer.appendChild(danmaku);
    
    // 增加计数器
    danmakuCount++;
}

// 页面加载完成后初始化
window.onload = init;