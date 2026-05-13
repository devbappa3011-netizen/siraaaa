// 1. Live Counter (Showing total time since the relationship started)
function updateTimer() {
    // The exact moment you two became a couple
    const start = new Date('May 30, 2025 22:57:32').getTime(); 
    const now = new Date().getTime();
    const diff = now - start; // (now - start) creates a counter that goes UP

    if (isNaN(diff) || diff < 0) {
        if (document.getElementById('timer')) {
            document.getElementById('timer').innerHTML = "The journey begins...";
        }
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    const timerEl = document.getElementById('timer');
    if (timerEl) {
        // Keeps your original formatting with the cute labels
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
    'letter': 'assets/emotional_song.mp3', // This will be paused by the silence logic
    'lyrics': 'assets/taylor_version.mp3'
};

let isMusicMuted = false;

// 2. Navigation Logic (Handles Silence, Voice Reset, and Scratch Init)
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
    const letterVoice = document.getElementById('letterVoice');

    if (audio && source) {
        // SPECIAL CASE: SILENCE FOR LETTER
        if (sectionId === 'letter') {
            audio.pause();
            if (icon) icon.innerText = '🔇';
        } 
        // VIDEO EXCEPTION
        else if (sectionId === 'video') {
            audio.pause();
            if (icon) icon.innerText = '🔇';
        }
        // OTHER SECTIONS: Swap and play background music
        else if (songMap[sectionId]) {
            // Stop voice note if she leaves the letter
            if (letterVoice) {
                letterVoice.pause();
                letterVoice.currentTime = 0;
                const vBtn = document.getElementById('voicePlayBtn');
                if (vBtn) vBtn.innerHTML = "▶️";
            }

            source.src = songMap[sectionId];
            audio.load();
            if (!isMusicMuted) {
                audio.play().catch(e => console.log("Music ready after interaction"));
                if (icon) icon.innerText = '🎵';
            }
        }
    }

    // Re-initialize scratch card if entering that section
   if (sectionId === 'scratch') initScratch();
}

// 3. Manual Toggle Button
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

// 4. Voice Note Toggle (For the play button in your letter)
function toggleVoiceNote() {
    const letterVoice = document.getElementById('letterVoice');
    const voiceBtn = document.getElementById('voicePlayBtn');

    if (letterVoice.paused) {
        letterVoice.play();
        voiceBtn.innerHTML = "⏸️";
    } else {
        letterVoice.pause();
        voiceBtn.innerHTML = "▶️";
    }
}


const reasons = [
    "Staying there even after saying bye(your multiple byeee texts)",
    "The beauty you carry with youu!!",
    "You’ree gorgeous smileee which never lets me down!!",
    "Yourr rolling eyess ufff",
    "Yourr Beautifull voicee when you singg",
    "Your yappppinggg",
    "Your willingness to explore new things with me",
    "The trust you have when I’m around youu",
    "Yourr prettyyy hairsssss",
    "Youu acting like a cildd when you’re with me",
    "Youu in Traditionalssss",
    "Your angry and stubborn sidee",
    "Gifts you gave me knowing i really needed(like lipbalm)",
    "Yourr huggss & kissesss",
    "Yourr phone callss",
    "Video callsss pr hamara bolnaaa"

];

function newReason() {
    const text = reasons[Math.floor(Math.random() * reasons.length)];
    const display = document.getElementById('reasonBox');
    if (display) {
        display.innerText = text;
    }
}
// 6. Scratch Card Logic
function initScratch() {
    const canvas = document.getElementById('scratchCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Set internal resolution to match display size
    canvas.width = 300;
    canvas.height = 300;

    // 1. Paint the gray layer (Normal mode)
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#C0C0C0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Set to eraser mode
    ctx.globalCompositeOperation = 'destination-out';

    function scratch(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 35, 0, Math.PI * 2);
        ctx.fill();
    }

    // Event Handlers for Mobile and Desktop
    function getCoords(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const pos = getCoords(e);
        scratch(pos.x, pos.y);
    }, { passive: false });

    canvas.addEventListener('mousemove', (e) => {
        if (e.buttons === 1) { // Left click held down
            const pos = getCoords(e);
            scratch(pos.x, pos.y);
        }
    });
}