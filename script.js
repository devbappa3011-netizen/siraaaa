// 1. Live Counter (Moved to top to ensure it runs first)
function updateTimer() {
    const start = new Date('May 30, 2025 22:57:32').getTime();
    const now = new Date().getTime();
    const diff = now - start;

    if (isNaN(diff)) return; 

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    const timerEl = document.getElementById('timer');
    if (timerEl) {
        timerEl.innerHTML = `${d} Beautiful Daysss, ${h} Happy Hours, ${m} Cute Minute(s), ${s} Precious Secondsss`;
    }
}
updateTimer();
setInterval(updateTimer, 1000);

// --- MUSIC CONFIGURATION ---
const songMap = {
    'hub': 'assets/main_theme.mp3',
    'scratch': 'assets/surprise_song.mp3',
    'gallery': 'assets/memory_song.mp3',
    'reasons': 'assets/cute_song.mp3',
    'letter': 'assets/emotional_song.mp3',
    'lyrics': 'assets/taylor_version.mp3'
};

let isMusicMuted = false;

// 2. Navigation Logic (Updated for Music Mapping)
function openSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => s.classList.remove('active'));

    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
    }

    // Music Elements
    const audio = document.getElementById('sectionMusic');
    const source = document.getElementById('musicSource');
    const icon = document.getElementById('music-icon');

    if (audio && source) {
        // VIDEO EXCEPTION: Pause everything
        if (sectionId === 'video') {
            audio.pause();
            if (icon) icon.innerText = '🔇';
        } 
        // OTHER SECTIONS: Swap and play
        else if (songMap[sectionId]) {
            source.src = songMap[sectionId];
            audio.load();
            if (!isMusicMuted) {
                audio.play().catch(e => console.log("Interaction needed"));
                if (icon) icon.innerText = '🎵';
            }
        }
    }

    if (sectionId === 'scratch') initScratch();
}

// 4. MANUAL TOGGLE BUTTON
function toggleMusicManual() {
    const audio = document.getElementById('sectionMusic');
    const icon = document.getElementById('music-icon');

    if (audio.paused) {
        audio.play();
        if (icon) icon.innerText = '🎵';
        isMusicMuted = false;
    } else {
        audio.pause();
        if (icon) icon.innerText = '🔇';
        isMusicMuted = true;
    }
}

// 3. Reasons Generator
const reasons = [
    "Your smile makes everything better.",
    "The way you listen to me talk about coding.",
    "Your kindness is literally unmatched.",
    "I love how we can talk for hours without getting bored."
];

function newReason() {
    const text = reasons[Math.floor(Math.random() * reasons.length)];
    const display = document.getElementById('reasonBox'); 
    if (display) {
        display.innerText = text;
    }
}

// 4. Scratch Card Logic
function initScratch() {
    const canvas = document.getElementById('scratchCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.globalCompositeOperation = 'source-over'; 
    ctx.fillStyle = '#C0C0C0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'destination-out';

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.arc(touch.clientX - rect.left, touch.clientY - rect.top, 30, 0, Math.PI * 2);
        ctx.fill();
    }, {passive: false});
}