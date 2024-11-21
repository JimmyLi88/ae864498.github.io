document.addEventListener('DOMContentLoaded', function() {
    // 初始化設置
    initializeWebsite();
});

// 網站初始化函數
function initializeWebsite() {
    // 預加載圖片
    preloadImages(['main.png', 'Hearts-bg.png']);
    
    // 添加點擊事件監聽器
    const button = document.querySelector('button');
    if (button) {
        button.addEventListener('click', showMessage);
    }
}

// 預加載圖片函數
function preloadImages(sources) {
    sources.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// 顯示消息的函數
function showMessage() {
    const specialMessage = document.getElementById('special-message');
    if (specialMessage) {
        // 移除 hidden class 而不是直接設置 display
        specialMessage.classList.remove('hidden');
        
        // 添加打字機效果
        const messages = specialMessage.querySelectorAll('p');
        messages.forEach((message, index) => {
            message.style.opacity = '0'; // 確保初始狀態是隱藏的
            const text = message.textContent;
            message.textContent = '';
            typeWriter(message, text, 0, 100 * (index + 1));
        });

        // 觸發彩帶效果
        createHeartShapedConfetti();
    }
}

// 修改打字機效果函數
function typeWriter(element, text, index, delay) {
    setTimeout(() => {
        if (index === 0) {
            element.style.opacity = '1'; // 開始打字時顯示元素
        }
        if (index < text.length) {
            element.textContent += text.charAt(index);
            typeWriter(element, text, index + 1, 50);
        }
    }, delay);
}

// 心形彩帶效果
function createHeartShapedConfetti() {
    const colors = ['#ff4d6d', '#ff85a1', '#ffc2d1', '#ffffff'];
    
    // 創建心形彩帶圖案
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            confetti({
                particleCount: 30,
                spread: 60,
                origin: { y: 0.6 },
                colors: colors,
                shapes: ['heart'],
                ticks: 200
            });
        }, i * 300);
    }
}

// 音樂控制函數
function toggleBackgroundMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const musicButton = document.getElementById('musicToggle');
    
    if (!bgMusic) {
        console.error('找不到音頻元素');
        return;
    }

    try {
        if (bgMusic.paused) {
            // 添加播放承諾
            const playPromise = bgMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // 播放成功
                    musicButton.textContent = '🔊';
                    console.log('音樂開始播放');
                }).catch(error => {
                    // 播放失敗
                    console.error('播放失敗:', error);
                    musicButton.textContent = '🎵';
                });
            }
        } else {
            bgMusic.pause();
            musicButton.textContent = '🎵';
            console.log('音樂已暫停');
        }
    } catch (error) {
        console.error('音樂控制出錯:', error);
    }
}

// 頁面加載完成後檢查音頻元素
document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    
    // 檢查音頻是否正確加載
    if (bgMusic) {
        bgMusic.addEventListener('error', function(e) {
            console.error('音頻加載錯誤:', e);
        });

        bgMusic.addEventListener('loadeddata', function() {
            console.log('音頻已加載完成');
        });
    }
});

// 頁面加載完成後立即播放
document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    
    // 設置音量
    bgMusic.volume = 0.5;
    
    // 強制播放
    function forcePlay() {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('音樂開始播放');
                // 更新按鈕狀態
                const musicButton = document.getElementById('musicToggle');
                if (musicButton) {
                    musicButton.textContent = '🔊';
                }
            }).catch(error => {
                console.error('播放失敗，1秒後重試:', error);
                // 如果失敗，1秒後重試
                setTimeout(forcePlay, 1000);
            });
        }
    }

    // 立即嘗試播放
    forcePlay();
});

// 確保音頻持續播放
setInterval(() => {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic && bgMusic.paused) {
        bgMusic.play();
    }
}, 1000);

// 添加滾動動畫效果
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
});

function unmute() {
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.muted = false;
}

document.addEventListener('click', unmute, { once: true });

// 添加照片輪播功能
let currentPhotoIndex = 0;
const photos = document.querySelectorAll('.photo-item');

function showNextPhoto() {
    const iframe = document.querySelector('#messageContent iframe');
    if (!iframe || !iframe.contentDocument) {
        console.log('找不到 iframe 或未加載完成');
        return;
    }

    const photoItems = iframe.contentDocument.querySelectorAll('.photo-item');
    if (!photoItems || photoItems.length === 0) {
        console.log('找不到照片元素');
        return;
    }

    let currentIndex = -1;
    photoItems.forEach((item, index) => {
        if (item.classList.contains('active')) {
            currentIndex = index;
        }
    });

    // 隱藏當前照片
    if (currentIndex >= 0) {
        photoItems[currentIndex].classList.remove('active');
        photoItems[currentIndex].style.display = 'none';
    }

    // 顯示下一張照片
    const nextIndex = (currentIndex + 1) % photoItems.length;
    photoItems[nextIndex].classList.add('active');
    photoItems[nextIndex].style.display = 'block';

    console.log(`切換照片：${currentIndex + 1} -> ${nextIndex + 1}`);
}

function showPreviousPhoto() {
    // 隱藏當前照片
    photos[currentPhotoIndex].style.display = 'none';
    
    // 更新索引到上一張照片
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    
    // 顯示上一張照片
    photos[currentPhotoIndex].style.display = 'block';
}

// 初始化照片顯示
initializePhotos();

// 修改點擊事件處理
function navigateToMessage() {
    loadMessageContent().catch(error => {
        console.error('導航失敗:', error);
        window.location.href = 'message.html';
    });
}

async function loadMessageContent() {
    try {
        // 保存當前音樂狀態和時間
        const bgMusic = document.getElementById('bgMusic');
        const currentTime = bgMusic.currentTime;
        const wasPlaying = !bgMusic.paused;
        
        // 加載 message.html 的內容
        const response = await fetch('message.html');
        const html = await response.text();
        
        // 創建一個臨時的 div 來解析 HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // 獲取 head 中的樣式
        const styles = doc.head.querySelectorAll('style');
        styles.forEach(style => {
            document.head.appendChild(style.cloneNode(true));
        });
        
        // 清空並設置新的 body 內容
        document.body.innerHTML = doc.body.innerHTML;
        
        // 恢復音樂元素和控制按鈕
        const newBgMusic = document.getElementById('bgMusic');
        if (newBgMusic) {
            newBgMusic.currentTime = currentTime;
            if (wasPlaying) {
                newBgMusic.play().then(() => {
                    const musicButton = document.getElementById('musicToggle');
                    if (musicButton) {
                        musicButton.textContent = '🔊';
                    }
                }).catch(error => console.error('恢復播放失敗:', error));
            }
        }

        // 更新 URL
        history.pushState({}, '', 'message.html');
        
        // 重新初始化照片輪播功能
        initializePhotos();
        
    } catch (error) {
        console.error('切換頁面失敗:', error);
        // 如果動態加載失敗，使用傳統跳轉
        window.location.href = 'message.html';
    }
}

// 初始化照片顯示函數
function initializePhotos() {
    const photos = document.querySelectorAll('.photo-item');
    if (photos.length > 0) {
        photos.forEach((photo, index) => {
            if (index === 0) {
                photo.classList.add('active');
            } else {
                photo.classList.remove('active');
            }
        });
    }
}

// 在 DOMContentLoaded 事件中添加音樂狀態恢復邏輯
document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    const musicWasPlaying = localStorage.getItem('musicPlaying') === 'true';
    const musicTime = parseFloat(localStorage.getItem('musicCurrentTime') || 0);
    
    if (bgMusic && musicWasPlaying) {
        bgMusic.currentTime = musicTime;
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                const musicButton = document.getElementById('musicToggle');
                if (musicButton) {
                    musicButton.textContent = '🔊';
                }
            }).catch(error => console.error('播放失敗:', error));
        }
    }
});

function showMessagePage() {
    const mainContent = document.getElementById('mainContent');
    const messageContent = document.getElementById('messageContent');
    const bgMusic = document.getElementById('bgMusic');
    
    // 創建 iframe
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    
    // 添加加載完成事件
    iframe.onload = function() {
        // iframe 加載完後初始化照片
        initializePhotos(iframe);
    };
    
    iframe.src = 'message.html';
    
    // 隱藏主內容，顯示新內容
    mainContent.style.display = 'none';
    messageContent.style.display = 'block';
    messageContent.appendChild(iframe);
    
    // 更新 URL（可選）
    history.pushState({}, '', 'message.html');
    
    // 確保音樂繼續播放
    if (!bgMusic.paused) {
        const currentTime = bgMusic.currentTime;
        bgMusic.play().then(() => {
            bgMusic.currentTime = currentTime;
        }).catch(error => console.error('音樂播放失敗:', error));
    }
}

// 處理瀏覽器的後退按鈕
window.addEventListener('popstate', function(event) {
    const mainContent = document.getElementById('mainContent');
    const messageContent = document.getElementById('messageContent');
    
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        messageContent.style.display = 'none';
        mainContent.style.display = 'block';
    }
});

// 修改初始化照片函數
function initializePhotos(iframe) {
    if (iframe && iframe.contentDocument) {
        const photos = iframe.contentDocument.querySelectorAll('.photo-item');
        photos.forEach((photo, index) => {
            if (index === 0) {
                photo.classList.add('active');
            } else {
                photo.classList.remove('active');
            }
        });
    }
}