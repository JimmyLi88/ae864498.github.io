document.addEventListener('DOMContentLoaded', function() {
    // 初始化設置
    initializeWebsite();
});

// 網站初始化函數
function initializeWebsite() {
    // 預加載圖片
    preloadImages(['Photo1.png', 'Hearts-bg.png']);
    
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
    const photos = document.querySelectorAll('.photo-item');
    let currentPhoto = document.querySelector('.photo-item.active');
    let currentIndex = Array.from(photos).indexOf(currentPhoto);
    
    // 移除當前照片的 active 類
    currentPhoto.classList.remove('active');
    
    // 計算下一張照片的索引
    let nextIndex = (currentIndex + 1) % photos.length;
    
    // 添加 active 類到下一張照片
    photos[nextIndex].classList.add('active');
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