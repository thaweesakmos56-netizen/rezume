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

// 3. Intro & Scene Elements
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

// 4. Timeline Configuration
const leavesEnd = 1500;
const zusStart = 600;
const zusTouch = 3500;
const hikariStart = 3200;
const jesusStart = 5000;    
const jesusMiddle = 7500;   
const fadeOutStart = 8500;  
const fadeOutEnd = 10000;   

// ==========================================
// 5. Portfolio Modal Logic
// ==========================================
const projectData = {
    'thaweesak-bot': {
        title: 'Thaweesak (LINE Scorpion Chatbot)',
        desc_th: 'แชทบอท LINE Messaging API ที่ให้ข้อมูลความรู้เกี่ยวกับ "แมงป่องช้าง" (Asian Forest Scorpion) พัฒนาขึ้นเพื่อให้ข้อมูลด้านชีววิทยา การเลี้ยงดู และข้อควรระวังสำหรับผู้ที่สนใจ',
        desc_en: 'A LINE Chatbot developed using LINE Messaging API that provides comprehensive information about Asian Forest Scorpions, including biology, care guides, and safety tips.',
        link: 'https://github.com/thaweesakmos56-netizen/Thaweesak'
    },
    'line-supplier': {
        title: 'LINE-Supplier-Quotation-System',
        desc_th: 'ระบบขอใบเสนอราคาผ่าน LINE Messaging API ช่วยให้ Supplier สามารถส่งข้อมูลราคาผ่านแอปพลิเคชัน LINE ได้ทันที พร้อมระบบจัดการหลังบ้านด้วย PHP',
        desc_en: 'A quotation system integrated with LINE Messaging API, allowing suppliers to submit price quotes directly via LINE with a PHP backend management system.',
        link: 'https://github.com/thaweesakmos56-netizen/LINE-Supplier-Quotation-System'
    },
    'smart-task': {
        title: 'smart-task-manager',
        desc_th: 'แอปพลิเคชันจัดการงานอัจฉริยะ พัฒนาด้วย PHP เพื่อช่วยจัดระเบียบงานในทีม ติดตามสถานะความคืบหน้า และแสดงผลผ่าน Dashboard ที่เข้าใจง่าย',
        desc_en: 'Smart Task Management application built with PHP for organizing team tasks, tracking progress, and visualizing data through an intuitive UI.',
        link: 'https://github.com/thaweesakmos56-netizen/smart-task-manager'
    },
    'sales-dash': {
        title: 'sales-dashboard',
        desc_th: 'ระบบวิเคราะห์ยอดขาย (Dashboard) ที่ดึงข้อมูลจากฐานข้อมูลมาแสดงผลเป็นกราฟและสถิติที่สำคัญ เพื่อช่วยสรุปภาพรวมทางธุรกิจ',
        desc_en: 'Sales Dashboard system that retrieves database info and displays it as key charts and statistics to provide business insights.',
        link: 'https://github.com/thaweesakmos56-netizen/sales-dashboard'
    },
    'shooting-game': {
        title: 'shooting-game (Arcade)',
        desc_th: 'โปรเจกต์เกมยิงแนวอาเขตที่พัฒนาด้วย JavaScript บริสุทธิ์ (Vanilla JS) เน้นการคำนวณระบบพิกัด การตรวจจับการชน (Collision Detection) และแอนิเมชัน',
        desc_en: 'An arcade shooting game developed with Vanilla JavaScript, focusing on coordinate calculations, collision detection, and smooth animations.',
        link: 'https://github.com/thaweesakmos56-netizen/shooting-game'
    },
    'realtime-chat': {
        title: 'Real-Time-Chat-Application',
        desc_th: 'แอปพลิเคชันแชทแบบเรียลไทม์ พัฒนาด้วย Node.js และ JavaScript รองรับการส่งข้อความโต้ตอบกันได้ทันทีแบบไม่มีดีเลย์',
        desc_en: 'A Real-Time Chat application built with Node.js and JavaScript, supporting instantaneous messaging between users without delay.',
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
        <h2 style="color: var(--accent-gold); margin-bottom: 1rem; font-family: 'Poppins', sans-serif;">${project.title}</h2>
        <p style="color: #fff; line-height: 1.8; font-size: 1.05rem;">${isThai ? project.desc_th : project.desc_en}</p>
        <a href="${project.link}" target="_blank" class="visit-btn">
            <i class="fa-brands fa-github"></i> ${isThai ? 'เข้าชมโปรเจกต์' : 'Visit Project'}
        </a>
    `;
    modal.style.display = 'flex';
};

window.closeProject = function() {
    const modal = document.getElementById('projectModal');
    if(modal) modal.style.display = 'none';
};

window.addEventListener('click', function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target == modal) closeProject();
});

// ==========================================
// 6. Scroll Animations Logic
// ==========================================
window.addEventListener('scroll', function() {
    const scrollValue = window.scrollY;

    // 6.1 Intro Fade
    if (introOverlay && contentWrapper) {
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
    }

    // 6.2 Leaf Parallax
    const s1 = scrollValue * 2.0;
    const s2 = scrollValue * 1.4;
    const s3 = scrollValue * 0.8;

    // 6.3 Zus Movement
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

    // 6.4 Hikari Rotation
    let hikariAlpha = 0;
    let hikariRotation = scrollValue * 0.15;
    if (scrollValue > hikariStart && scrollValue < jesusStart) {
        hikariAlpha = (scrollValue - hikariStart) / (zusTouch - hikariStart);
        if (hikariAlpha > 1) hikariAlpha = 1;
    } else if (scrollValue >= jesusStart) {
        hikariAlpha = 1 - ((scrollValue - jesusStart) / 500);
    }

    // 6.5 Jesus Logic
    let jesusAlpha = 0;
    let jesusProgress = 0;
    if (scrollValue > jesusStart) {
        jesusAlpha = (scrollValue - jesusStart) / 500; 
        if (jesusAlpha > 1) jesusAlpha = 1;
        jesusProgress = (scrollValue - jesusStart) / (jesusMiddle - jesusStart);
        if (jesusProgress > 1) jesusProgress = 1;
        if (scrollValue > fadeOutStart) {
            jesusAlpha = 1 - ((scrollValue - fadeOutStart) / (fadeOutEnd - fadeOutStart));
        }
    }

    const j1Pos = -100 + (jesusProgress * 150); 
    const j1Scale = 0.5 + (jesusProgress * 1.5); 
    const j2Pos = 200 - (jesusProgress * 150); 
    const j2Rotate = -180 + (jesusProgress * 180);

    // 6.6 Update UI
    requestAnimationFrame(() => {
        if (l1[0]) {
            l1[0].style.transform = `translateX(-${s1}px)`;
            l2[0].style.transform = `translateX(-${s2}px)`;
            l3[0].style.transform = `translateX(-${s3}px)`;
            l1[1].style.transform = `translateX(${s1}px)`;
            l2[1].style.transform = `translateX(${s2}px)`;
            l3[1].style.transform = `translateX(${s3}px)`;
        }

        if (galaxyScene) galaxyScene.style.opacity = galaxyAlpha;
        if (zusLeft) zusLeft.style.left = moveX + '%';
        if (zusRight) zusRight.style.right = moveX + '%';
        if (hikari) {
            hikari.style.opacity = hikariAlpha;
            hikari.style.transform = `translate(-50%, -50%) rotate(${hikariRotation}deg)`;
        }

        if (jesusScene) {
            jesusScene.style.opacity = jesusAlpha;
            if (jesus1) {
                jesus1.style.top = j1Pos + '%';
                jesus1.style.transform = `translate(-50%, -50%) scale(${j1Scale})`;
            }
            if (jesus2) {
                jesus2.style.top = j2Pos + '%';
                jesus2.style.transform = `translate(-50%, -50%) rotate(${j2Rotate}deg)`;
            }
        }

        // 6.7 Intro Hint Fade & Visibility
        if (introHint) {
            if (scrollValue > 50) {
                introHint.style.opacity = '0';
                introHint.style.visibility = 'hidden';
            } else {
                introHint.style.opacity = '1';
                introHint.style.visibility = 'visible';
            }
        }
    });
});
