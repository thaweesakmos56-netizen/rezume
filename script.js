// 1. Initialize Animations
AOS.init({ duration: 1000, once: false, mirror: true });

// 2. Language Toggle
const langBtn = document.getElementById('langToggle');
if(langBtn) {
    langBtn.addEventListener('click', () => {
        document.body.classList.toggle('lang-th-active');
        document.body.classList.toggle('lang-en-active');
    });
}

// 3. Intro Elements
const introOverlay = document.getElementById('introOverlay');
const introHint = document.getElementById('introHint');
const contentWrapper = document.getElementById('mainContentWrapper');
const galaxyScene = document.getElementById('galaxyScene');
const jesusScene = document.getElementById('jesusScene');
const zusLeft = document.getElementById('zusLeft');
const zusRight = document.getElementById('zusRight');
const hikari = document.getElementById('hikari');
const jesus1 = document.getElementById('jesus1');
const jesus2 = document.getElementById('jesus2');

const l1 = [document.getElementById('leftL1'), document.getElementById('rightL1')];
const l2 = [document.getElementById('leftL2'), document.getElementById('rightL2')];
const l3 = [document.getElementById('leftL3'), document.getElementById('rightL3')];

// 4. Timeline
const leavesEnd = 1500;
const zusStart = 600;
const zusTouch = 3500;
const hikariStart = 3200;
const jesusStart = 5000;    
const jesusMiddle = 7500;   
const fadeOutStart = 8500;  
const fadeOutEnd = 10000;   

// 5. Portfolio Modal Logic
const projectData = {
    'thaweesak-bot': {
        title: 'Thaweesak (LINE Scorpion Chatbot)',
        desc_th: 'แชทบอท LINE Messaging API ที่ให้ข้อมูลความรู้เกี่ยวกับ "แมงป่องช้าง" พัฒนาขึ้นเพื่อให้ข้อมูลด้านชีววิทยา การเลี้ยงดู และข้อควรระวัง',
        desc_en: 'A LINE Chatbot developed using LINE Messaging API that provides information about Asian Forest Scorpions.',
        link: 'https://github.com/thaweesakmos56-netizen/Thaweesak'
    },
    'line-supplier': {
        title: 'LINE-Supplier-Quotation-System',
        desc_th: 'ระบบขอใบเสนอราคาผ่าน LINE Messaging API ช่วยให้ Supplier สามารถส่งข้อมูลราคาผ่านแอปพลิเคชัน LINE ได้ทันที',
        desc_en: 'A quotation system integrated with LINE Messaging API for suppliers.',
        link: 'https://github.com/thaweesakmos56-netizen/LINE-Supplier-Quotation-System'
    },
    'smart-task': {
        title: 'smart-task-manager',
        desc_th: 'แอปพลิเคชันจัดการงานอัจฉริยะ พัฒนาด้วย PHP ติดตามสถานะความคืบหน้า และแสดงผลผ่าน Dashboard',
        desc_en: 'Smart Task Management application built with PHP.',
        link: 'https://github.com/thaweesakmos56-netizen/smart-task-manager'
    },
    'sales-dash': {
        title: 'sales-dashboard',
        desc_th: 'ระบบวิเคราะห์ยอดขาย (Dashboard) ที่ดึงข้อมูลจากฐานข้อมูลมาแสดงผลเป็นกราฟ เพื่อช่วยสรุปภาพรวมทางธุรกิจ',
        desc_en: 'Sales Dashboard system providing business insights through charts.',
        link: 'https://github.com/thaweesakmos56-netizen/sales-dashboard'
    },
    'shooting-game': {
        title: 'shooting-game (Arcade)',
        desc_th: 'โปรเจกต์เกมยิงแนวอาเขตที่พัฒนาด้วย JavaScript บริสุทธิ์ เน้นระบบพิกัด และการตรวจจับการชน',
        desc_en: 'An arcade shooting game developed with Vanilla JavaScript.',
        link: 'https://github.com/thaweesakmos56-netizen/shooting-game'
    },
    'realtime-chat': {
        title: 'Real-Time-Chat-Application',
        desc_th: 'แอปพลิเคชันแชทแบบเรียลไทม์ พัฒนาด้วย Node.js รองรับการส่งข้อความโต้ตอบกันได้ทันที',
        desc_en: 'A Real-Time Chat application built with Node.js.',
        link: 'https://github.com/thaweesakmos56-netizen/Real-Time-Chat-Application'
    }
};

window.openProject = function(id) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const project = projectData[id];
    if(!modal || !modalBody || !project) return;
    const isThai = document.body.classList.contains('lang-th-active');
    modalBody.innerHTML = `
        <h2 style="color: var(--accent-gold); margin-bottom: 1rem;">${project.title}</h2>
        <p style="color: #fff; line-height: 1.8;">${isThai ? project.desc_th : project.desc_en}</p>
        <a href="${project.link}" target="_blank" class="visit-btn" style="display:inline-block; margin-top:20px; padding:10px 20px; background:var(--accent-gold); color:#000; text-decoration:none; border-radius:5px; font-weight:bold;">
            Visit GitHub
        </a>
    `;
    modal.style.display = 'flex';
};

window.closeProject = function() {
    const modal = document.getElementById('projectModal');
    if(modal) modal.style.display = 'none';
};

window.addEventListener('click', (e) => {
    const modal = document.getElementById('projectModal');
    if (e.target == modal) closeProject();
});

// 6. Scroll Animations
window.addEventListener('scroll', function() {
    const scrollValue = window.scrollY;

    // Fade Intro
    if (scrollValue < fadeOutEnd) {
        let progress = (scrollValue - fadeOutStart) / (fadeOutEnd - fadeOutStart);
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;
        introOverlay.style.opacity = 1 - progress;
        introOverlay.style.display = 'flex';
        contentWrapper.style.opacity = progress;
        introOverlay.style.pointerEvents = progress > 0.8 ? 'none' : 'auto';
    } else {
        introOverlay.style.opacity = 0;
        contentWrapper.style.opacity = 1;
        introOverlay.style.display = 'none'; 
    }

    // Parallax
    const s1 = scrollValue * 2.0;
    const s2 = scrollValue * 1.4;
    const s3 = scrollValue * 0.8;

    // Zus & Galaxy
    let galaxyAlpha = 0;
    let zusProgress = 0;
    if (scrollValue > zusStart && scrollValue < jesusStart) {
        galaxyAlpha = (scrollValue - zusStart) / (leavesEnd - zusStart);
        if (galaxyAlpha > 1) galaxyAlpha = 1;
        zusProgress = (scrollValue - zusStart) / (zusTouch - zusStart);
        if (zusProgress > 1) zusProgress = 1;
    } else if (scrollValue >= jesusStart) {
        galaxyAlpha = 1 - ((scrollValue - jesusStart) / 500);
    }
    const moveX = -45 + (zusProgress * 67);

    // Jesus
    let jesusAlpha = 0;
    let jesusProgress = 0;
    if (scrollValue > jesusStart) {
        jesusAlpha = (scrollValue - jesusStart) / 500; 
        if (jesusAlpha > 1) jesusAlpha = 1;
        jesusProgress = (scrollValue - jesusStart) / (jesusMiddle - jesusStart);
        if (jesusProgress > 1) jesusProgress = 1;
        if (scrollValue > fadeOutStart) jesusAlpha = 1 - ((scrollValue - fadeOutStart) / (fadeOutEnd - fadeOutStart));
    }

    const j1Pos = -100 + (jesusProgress * 150); 
    const j1Scale = 0.5 + (jesusProgress * 1.5); 
    const j2Pos = 200 - (jesusProgress * 150); 
    const j2Rotate = -180 + (jesusProgress * 180);

    requestAnimationFrame(() => {
        if(l1[0]) {
            l1[0].style.transform = `translateX(-${s1}px)`;
            l2[0].style.transform = `translateX(-${s2}px)`;
            l3[0].style.transform = `translateX(-${s3}px)`;
            l1[1].style.transform = `translateX(${s1}px)`;
            l2[1].style.transform = `translateX(${s2}px)`;
            l3[1].style.transform = `translateX(${s3}px)`;
        }
        galaxyScene.style.opacity = galaxyAlpha;
        zusLeft.style.left = moveX + '%';
        zusRight.style.right = moveX + '%';
        hikari.style.opacity = (scrollValue > hikariStart && scrollValue < jesusStart) ? 1 : 0;
        hikari.style.transform = `translate(-50%, -50%) rotate(${scrollValue * 0.15}deg)`;

        jesusScene.style.opacity = jesusAlpha;
        jesus1.style.top = j1Pos + '%';
        jesus1.style.transform = `translate(-50%, -50%) scale(${j1Scale})`;
        jesus2.style.top = j2Pos + '%';
        jesus2.style.transform = `translate(-50%, -50%) rotate(${j2Rotate}deg)`;

        // Intro Hint Hide
        if (scrollValue > 50) {
            introHint.style.opacity = '0';
            introHint.style.visibility = 'hidden';
        } else {
            introHint.style.opacity = '1';
            introHint.style.visibility = 'visible';
        }
    });
});
