

// 1. הגדרת משתנים ובחירת אלמנטים מתוך העמוד
const allAnimalItems = document.querySelectorAll('.item');
const allAudios = document.querySelectorAll('audio');
const bgMusic = document.getElementById('bg-music');

// 2. הפעלת מוזיקת הרקעך
if (bgMusic) {
    document.addEventListener('click', function enableAudio() {
        if (bgMusic.paused) {
            bgMusic.loop = true; // מוודא שהרקע יתנגן ברצף 
            bgMusic.volume = 0.2; // הנמכת הרקע כדי שקולות החיות יבלטו
            bgMusic.play().catch(err => console.log('הסאונד מחכה לאינטראקציה מהמשתמש'));
            document.removeEventListener('click', enableAudio);
        }
    }, { once: true });
} else {
    console.error('לא מצא את אלמנט bg-music ב-HTML');
}

// 3. הוספת אירוע לחיצה לכל אחת מקוביות החיות
allAnimalItems.forEach(item => {
    item.addEventListener('click', function() {
        
        // א. עצירת כל הצלילים שפועלים כרגע (כדי למנוע חפיפה)
        allAudios.forEach(audio => {
            if (audio.id !== 'bg-music') {
                audio.pause();
                audio.currentTime = 0;
            }
        });

        // ב. שליפת ה-ID של הסאונד מתוך המאפיין data-sound ב-HTML והפעלתו
        const soundId = this.getAttribute('data-sound');
        const soundToPlay = document.getElementById(soundId);
        
        if (soundToPlay) {
            soundToPlay.play().catch(err => console.error('שגיאה בהפעלת הסאונד של החיה:', err));
        } else {
            console.error('לא מצא סאונד עם ID:', soundId);
        }

        // --- מענה לסעיף 8: אלמנט שלא נלמד בכיתה ---
        // בחרתי להשתמש ב- Web Animations API (הפונקציה animate)
        // פונקציה זו מאפשרת ליצור ולהפעיל אנימציות מורכבות על אלמנטים ב-DOM ישירות מתוך ה-JavaScript, ללא צורך בהגדרת keyframes ב-CSS.
        // כאן אני משתמשת בה כדי ליצור אפקט של "רעידה" מצד לצד שנמשך 300 אלפיות השנייה כשהמשתמש לוחץ על קוביית החיה.
        this.animate([
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(8deg)' },
            { transform: 'rotate(-8deg)' },
            { transform: 'rotate(0deg)' }
        ], {
            duration: 300,
            iterations: 1
        });
        // ----------------------------------------
    });
});
