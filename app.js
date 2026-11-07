window.targetTabSetiapLogin = null;
    window.notifCallback = null;

    // Membaca daftar akun yang sudah didaftarkan
    window.getRegisteredUsers = function() {
      var users = localStorage.getItem('registeredUsers');
      return users ? JSON.parse(users) : {};
    };

    window.isLoggedIn = function() {
      return localStorage.getItem('isLoggedIn') === 'true';
    };

    window.updateUIByLoginStatus = function() {
      var loggedIn = window.isLoggedIn();
      var btnLogin = document.getElementById('btn-login-menu');
      var btnRegister = document.getElementById('btn-register-menu');
      var btnLogout = document.getElementById('btn-logout-menu');
      var ikonKunci = document.querySelectorAll('.icon-kunci');

      if (loggedIn) {
        if (btnLogin) btnLogin.classList.add('hidden');
        if (btnRegister) btnRegister.classList.add('hidden');
        if (btnLogout) btnLogout.classList.remove('hidden');
        ikonKunci.forEach(function(el) {
          el.classList.add('hidden');
        });
      } else {
        if (btnLogin) btnLogin.classList.remove('hidden');
        if (btnRegister) btnRegister.classList.remove('hidden');
        if (btnLogout) btnLogout.classList.add('hidden');
        ikonKunci.forEach(function(el) {
          el.classList.remove('hidden');
        });
      }
    };

    window.bukaModalNotifikasi = function(judul, pesan, tipe, callback) {
      var modal = document.getElementById('modal-notifikasi');
      var elJudul = document.getElementById('notif-judul');
      var elPesan = document.getElementById('notif-pesan');
      var iconBox = document.getElementById('notif-icon-box');
      var btnAksi = document.getElementById('notif-btn-aksi');

      if (!modal || !elJudul || !elPesan || !iconBox || !btnAksi) return;

      elJudul.textContent = judul;
      elPesan.textContent = pesan;
      window.notifCallback = callback || null;

      if (tipe === 'warning') {
        iconBox.textContent = '🔒';
        iconBox.className = 'w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 border text-2xl bg-amber-950/60 border-amber-700 text-amber-400';
        btnAksi.className = 'w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-amber-600/30';
      } else if (tipe === 'success') {
        iconBox.textContent = '🎉';
        iconBox.className = 'w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 border text-2xl bg-emerald-950/60 border-emerald-700 text-emerald-400';
        btnAksi.className = 'w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-emerald-600/30';
      } else {
        iconBox.textContent = 'ℹ️';
        iconBox.className = 'w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 border text-2xl bg-sky-950/60 border-sky-700 text-sky-400';
        btnAksi.className = 'w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-sky-600/30';
      }

      modal.classList.remove('hidden');
    };

    window.tutupModalNotifikasi = function() {
      var modal = document.getElementById('modal-notifikasi');
      if (modal) modal.classList.add('hidden');
      if (typeof window.notifCallback === 'function') {
        var cb = window.notifCallback;
        window.notifCallback = null;
        cb();
      }
    };

    window.bukaModalLogin = function(tabTujuan, presetUsername) {
      if (tabTujuan) window.targetTabSetiapLogin = tabTujuan;
      var modal = document.getElementById('modal-login');
      var err = document.getElementById('login-error');
      if (err) err.classList.add('hidden');
      
      if (presetUsername) {
        document.getElementById('login-username').value = presetUsername;
      }
      
      if (modal) modal.classList.remove('hidden');
    };

    window.tutupModalLogin = function() {
      var modal = document.getElementById('modal-login');
      if (modal) modal.classList.add('hidden');
      window.targetTabSetiapLogin = null;
    };

    window.bukaModalRegister = function() {
      var modal = document.getElementById('modal-register');
      var err = document.getElementById('register-error');
      if (err) err.classList.add('hidden');
      if (modal) modal.classList.remove('hidden');
    };

    window.tutupModalRegister = function() {
      var modal = document.getElementById('modal-register');
      if (modal) modal.classList.add('hidden');
    };

    window.pindahKeRegister = function() {
      tutupModalLogin();
      bukaModalRegister();
    };

    window.pindahKeLogin = function() {
      tutupModalRegister();
      bukaModalLogin();
    };

    // Fungsi Pendaftaran Akun Baru
    window.prosesRegister = function(e) {
      e.preventDefault();
      var user = document.getElementById('register-username').value.trim();
      var pass = document.getElementById('register-password').value;
      var err = document.getElementById('register-error');

      var registeredUsers = window.getRegisteredUsers();

      if (user.toLowerCase() === 'admin' || registeredUsers[user]) {
        if (err) {
          err.innerText = 'Username sudah terdaftar! Gunakan username lain.';
          err.classList.remove('hidden');
        }
        return;
      }

      // Simpan username & password baru
      registeredUsers[user] = pass;
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

      document.getElementById('register-username').value = '';
      document.getElementById('register-password').value = '';

      tutupModalRegister();

      // Buka modal notifikasi lalu arahkan otomatis ke Modal Login
      window.bukaModalNotifikasi(
        'Pendaftaran Berhasil!',
        'Akun Anda telah dibuat. Silakan login menggunakan username dan password baru Anda.',
        'success',
        function() {
          bukaModalLogin(null, user);
        }
      );
    };

    // Fungsi Login Akun
    window.prosesLogin = function(e) {
      e.preventDefault();
      var user = document.getElementById('login-username').value.trim();
      var pass = document.getElementById('login-password').value;
      var err = document.getElementById('login-error');

      var registeredUsers = window.getRegisteredUsers();

      if ((user === 'Admin' && pass === '123') || (registeredUsers[user] && registeredUsers[user] === pass)) {
        localStorage.setItem('isLoggedIn', 'true');
        window.updateUIByLoginStatus();
        tutupModalLogin();
        
        window.bukaModalNotifikasi('Login Berhasil!', 'Selamat datang kembali, ' + user + '! Sekarang Anda memiliki akses penuh.', 'success', function() {
          if (window.targetTabSetiapLogin) {
            window.bukaTab(window.targetTabSetiapLogin);
          }
        });
      } else {
        if (err) {
          err.innerText = 'Username atau Password salah!';
          err.classList.remove('hidden');
        }
      }
    };

    window.logout = function() {
      localStorage.removeItem('isLoggedIn');
      window.updateUIByLoginStatus();

      window.bukaModalNotifikasi('Logout Berhasil', 'Anda telah keluar dari akun.', 'info', function() {
        window.bukaTab('tab-home');
      });
    };

    window.toggleMenu = function() {
      var menu = document.getElementById('mobile-menu');
      if (menu) {
        menu.classList.toggle('hidden');
      }
    };

    window.bukaTab = function(tabId) {
      if ((tabId === 'tab-fundamental' || tabId === 'tab-subtes') && !window.isLoggedIn()) {
        window.bukaModalNotifikasi(
          'Akses Terbatas',
          'Silakan login terlebih dahulu untuk mengakses menu ini.',
          'warning',
          function() {
            window.bukaModalLogin(tabId);
          }
        );
        return;
      }

      var tabs = document.querySelectorAll('.tab-utama');
      if(tabs.length === 0) { window.location.href = 'index.html?tab=' + tabId; return; }
      for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.add('hidden');
      }
      var targetTab = document.getElementById(tabId);
      if (targetTab) {
        targetTab.classList.remove('hidden');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.bukaSubTab = function(subTabId) {
      var subTabs = document.querySelectorAll('.sub-tab');
      for (var i = 0; i < subTabs.length; i++) {
        subTabs[i].classList.add('hidden');
      }
      var target = document.getElementById(subTabId);
      if (target) {
        target.classList.remove('hidden');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    window.bukaSubtesContent = function(subtesId) {
      var items = document.querySelectorAll('.subtes-detail');
      for (var i = 0; i < items.length; i++) {
        items[i].classList.add('hidden');
      }
      var target = document.getElementById(subtesId);
      if (target) {
        target.classList.remove('hidden');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    window.cekJawaban = function(btn, isCorrect, message) {
      var parent = btn.closest('div.p-3') || btn.closest('div.p-4');
      if (!parent) return;
      var feedback = parent.querySelector('.feedback-text');
      var buttons = parent.querySelectorAll('button');
      
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('bg-green-600', 'bg-red-600', 'text-white');
        buttons[i].classList.add('bg-slate-800');
      }

      if (feedback) {
        feedback.classList.remove('hidden', 'text-green-400', 'text-red-400');
        if (isCorrect) {
          btn.classList.remove('bg-slate-800');
          btn.classList.add('bg-green-600', 'text-white');
          feedback.classList.add('text-green-400');
          feedback.innerText = "✅ " + message;
        } else {
          btn.classList.remove('bg-slate-800');
          btn.classList.add('bg-red-600', 'text-white');
          feedback.classList.add('text-red-400');
          feedback.innerText = "❌ " + message;
        }
      }
    };

    window.updateCountdown = function() {
      var targetUTBK = new Date('2027-04-26T07:00:00').getTime();
      var sekarang = new Date().getTime();
      var selisih = targetUTBK - sekarang;

      var elDays = document.getElementById('cd-days');
      var elHours = document.getElementById('cd-hours');
      var elMinutes = document.getElementById('cd-minutes');
      var elSeconds = document.getElementById('cd-seconds');

      if (!elDays || !elHours || !elMinutes || !elSeconds) return;

      if (selisih > 0) {
        var hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
        var jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
        var detik = Math.floor((selisih % (1000 * 60)) / 1000);

        elDays.textContent = hari;
        elHours.textContent = jam < 10 ? '0' + jam : jam;
        elMinutes.textContent = menit < 10 ? '0' + menit : menit;
        elSeconds.textContent = detik < 10 ? '0' + detik : detik;
      } else {
        elDays.textContent = '00';
        elHours.textContent = '00';
        elMinutes.textContent = '00';
        elSeconds.textContent = '00';
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        window.updateUIByLoginStatus();
        window.updateCountdown();
        setInterval(window.updateCountdown, 1000);
      });
    } else {
      window.updateUIByLoginStatus();
      window.updateCountdown();
      setInterval(window.updateCountdown, 1000);
    }
// Buka tab otomatis jika dari halaman luar (Fundamental)
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const tab = urlParams.get('tab');
  if (tab) {
      window.bukaTab(tab);
  }
});
