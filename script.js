// FUNGSI UTAMA PINDAH TAB DENGAN ANIMASI TRANSISI HALUS (FADE & SCALE)
function switchTab(tabId) {
    const activeTab = document.getElementById(tabId);
    if (!activeTab || activeTab.classList.contains('block')) return; // Jika sudah aktif, kunci klik.

    const allTabs = document.querySelectorAll('.tab-section');
    
    // 1. Jalankan animasi "Out" (menghilang halus) untuk tab lama yang sedang terbuka
    allTabs.forEach(tab => {
        if (tab.classList.contains('block')) {
            tab.classList.remove('active-tab-anim');
            tab.classList.add('exit-tab-anim');
            
            // Tunggu transisi keluar selesai (250ms), lalu tukar isinya
            setTimeout(() => {
                tab.classList.remove('block', 'exit-tab-anim');
                tab.classList.add('hidden');
                
                // Munculkan tab baru dengan animasi "In"
                activeTab.classList.remove('hidden');
                activeTab.classList.add('block', 'active-tab-anim');
            }, 250);
        }
    });

    // 2. Perbarui Warna & Desain Teks Link Navigasi
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('text-brand-blue', 'font-bold');
        link.classList.add('text-slate-500');
    });

    const activeLink = document.getElementById('nav-' + tabId);
    if (activeLink) {
        activeLink.classList.remove('text-slate-500');
        activeLink.classList.add('text-brand-blue', 'font-bold');
    }

    // 3. Geser Latar Belakang Garis Indicator Menu
    moveIndicator(tabId);
}

// FUNGSI DINAMIS UNTUK MENGGESER MENUBAR INDICATOR
function moveIndicator(tabId) {
    const indicator = document.getElementById('nav-indicator');
    const activeLink = document.getElementById('nav-' + tabId);
    
    if (indicator && activeLink && window.innerWidth >= 768) { // Aktif pada resolusi md ke atas
        indicator.style.width = `${activeLink.offsetWidth}px`;
        indicator.style.left = `${activeLink.offsetLeft}px`;
        indicator.style.opacity = '1';
    } else if (indicator) {
        // Hilangkan indicator jika dibuka dari HP (Responsif biasa)
        indicator.style.opacity = '0';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. Jalankan Penempatan Indikator Awal (Menuju menu 'about')
    setTimeout(() => {
        moveIndicator('about');
    }, 300);

    // 2. Pasang Listener Jika Ukuran Browser Diubah Pengguna
    window.addEventListener('resize', () => {
        const currentActiveTab = document.querySelector('.tab-section.block').id;
        moveIndicator(currentActiveTab);
    });
});