// Interactive JavaScript for Anniversary Website

document.addEventListener('DOMContentLoaded', () => {
    initFloatingHearts();
    initAudioPlayer();
});

// Floating Hearts Effect
function initFloatingHearts() {
    const container = document.getElementById('heart-container');
    if (!container) return;

    const hearts = ['❤️', '💖', '💕', '💗', '🌸', '✨', '🌹'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Random horizontal position and size
        const startLeft = Math.random() * 100;
        const duration = 6 + Math.random() * 6; // 6s - 12s
        const size = 1 + Math.random() * 1.2; // 1rem - 2.2rem

        heart.style.left = `${startLeft}vw`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.fontSize = `${size}rem`;

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Generate hearts periodically
    setInterval(createHeart, 800);
    for (let i = 0; i < 8; i++) {
        setTimeout(createHeart, i * 300);
    }
}

// Background Music Toggle (Optional Audio)
function initAudioPlayer() {
    const musicBtn = document.getElementById('music-toggle-btn');
    const audio = document.getElementById('bg-music');

    if (!musicBtn || !audio) return;

    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.innerHTML = '🎵 Play Music';
            isPlaying = false;
        } else {
            audio.play().then(() => {
                musicBtn.innerHTML = '⏸️ Pause Music';
                isPlaying = true;
            }).catch(err => {
                console.log('Audio playback prevented or missing file', err);
                alert('Add your favorite romantic song file to public/audio/song.mp3 to enable music!');
            });
        }
    });
}
