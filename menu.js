
const headerHTML = `<header class="sticky top-0 z-50 w-full backdrop-blur border-b border-slate-800 bg-slate-900/90">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
      
      <!-- Logo BimbelKu -->
      <button onclick="bukaTab('tab-home')" class="flex items-center gap-2 font-bold text-xl text-sky-500 focus:outline-none">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
          <path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
        <span>Bimbel<span class="text-white">Ku</span></span>
      </button>

      <!-- Tombol Garis Tiga / Hamburger Menu -->
      <button id="btn-hamburger" onclick="toggleMenu()" class="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg focus:outline-none transition">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <div id="mobile-menu" class="hidden absolute top-16 right-4 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-2 flex flex-col gap-1 z-50">
        <button onclick="bukaTab('tab-home'); toggleMenu();" class="w-full text-left px-4 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-sky-600 hover:text-white transition flex items-center gap-2">
          🏠 Beranda
        </button>
        <button onclick="bukaTab('tab-fundamental'); toggleMenu();" class="w-full text-left px-4 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-sky-600 hover:text-white transition flex items-center gap-2">
          📚 Fundamental <span class="icon-kunci">🔒</span>
        </button>
        <button onclick="bukaTab('tab-subtes'); toggleMenu();" class="w-full text-left px-4 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-sky-600 hover:text-white transition flex items-center gap-2">
          🎯 Subtes UTBK <span class="icon-kunci">🔒</span>
        </button>
        <button onclick="bukaTab('tab-tryout'); toggleMenu();" class="w-full text-left px-4 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-sky-600 hover:text-white transition flex items-center gap-2">
          📝 Tryout
        </button>
        <div class="border-t border-slate-700 my-1"></div>
        <button id="btn-login-menu" onclick="bukaModalLogin(); toggleMenu();" class="w-full text-left px-4 py-2.5 rounded-lg text-sm text-sky-400 font-semibold hover:bg-sky-600 hover:text-white transition flex items-center gap-2">
          🔑 Login
        </button>
        <button id="btn-register-menu" onclick="bukaModalRegister(); toggleMenu();" class="w-full text-left px-4 py-2.5 rounded-lg text-sm text-emerald-400 font-semibold hover:bg-emerald-600 hover:text-white transition flex items-center gap-2">
          📝 Daftar
        </button>
        <button id="btn-logout-menu" onclick="logout(); toggleMenu();" class="hidden w-full text-left px-4 py-2.5 rounded-lg text-sm text-rose-400 font-semibold hover:bg-rose-600 hover:text-white transition flex items-center gap-2">
          🚪 Logout
        </button>
      </div>

    </div>
  </header>`;
const modalsHTML = `<!-- MODAL NOTIFIKASI KUSTOM -->
  <div id="modal-notifikasi" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm hidden p-4">
    <div class="bg-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8 w-full max-w-sm shadow-2xl text-center relative transform transition-all">
      <div id="notif-icon-box" class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 border text-2xl">
        🔑
      </div>
      <h3 id="notif-judul" class="text-xl font-bold text-white mb-2">Pemberitahuan</h3>
      <p id="notif-pesan" class="text-sm text-slate-300 mb-6 leading-relaxed"></p>
      <button id="notif-btn-aksi" onclick="tutupModalNotifikasi()" class="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-sky-600/30">
        Mengerti
      </button>
    </div>
  </div>

  <!-- MODAL LOGIN -->
  <div id="modal-login" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm hidden p-4">
    <div class="bg-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
      <button onclick="tutupModalLogin()" class="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold">&times;</button>
      
      <div class="text-center mb-6">
        <h3 class="text-2xl font-bold text-white">Login BimbelKu</h3>
        <p class="text-xs text-slate-400 mt-1">Silakan masuk untuk mengakses materi terproteksi</p>
      </div>

      <form onsubmit="prosesLogin(event)" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Username</label>
          <input type="text" id="login-username" required placeholder="Masukkan username" class="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500 transition" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Password</label>
          <input type="password" id="login-password" required placeholder="Masukkan password" class="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-sky-500 transition" />
        </div>

        <p id="login-error" class="text-xs text-rose-500 font-medium hidden text-center mt-2"></p>

        <button type="submit" class="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl transition text-sm shadow-lg shadow-sky-600/30">
          Masuk
        </button>
      </form>

      <!-- MENU DAFTAR / PENGALIHAN KE REGISTER -->
      <div class="text-center mt-4 border-t border-slate-700/60 pt-4">
        <p class="text-xs text-slate-400">
          Belum punya akun? 
          <button onclick="pindahKeRegister()" class="text-sky-400 font-semibold hover:underline">Daftar sekarang</button>
        </p>
      </div>
    </div>
  </div>

  <!-- MODAL REGISTER / DAFTAR AKUN -->
  <div id="modal-register" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm hidden p-4">
    <div class="bg-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
      <button onclick="tutupModalRegister()" class="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold">&times;</button>
      
      <div class="text-center mb-6">
        <h3 class="text-2xl font-bold text-white">Daftar Akun BimbelKu</h3>
        <p class="text-xs text-slate-400 mt-1">Buat username dan password baru kamu</p>
      </div>

      <form onsubmit="prosesRegister(event)" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Username Baru</label>
          <input type="text" id="register-username" required placeholder="Buat username" class="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Password</label>
          <input type="password" id="register-password" required placeholder="Buat password" class="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition" />
        </div>

        <p id="register-error" class="text-xs text-rose-500 font-medium hidden text-center mt-2"></p>

        <button type="submit" class="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition text-sm shadow-lg shadow-emerald-600/30">
          Daftar Sekarang
        </button>
      </form>

      <div class="text-center mt-4 border-t border-slate-700/60 pt-4">
        <p class="text-xs text-slate-400">
          Sudah punya akun? 
          <button onclick="pindahKeLogin()" class="text-emerald-400 font-semibold hover:underline">Login di sini</button>
        </p>
      </div>
    </div>
  </div>

  `;

const wadahMenu = document.getElementById("wadah-menu");
if (wadahMenu) wadahMenu.innerHTML = headerHTML;

const wadahModals = document.getElementById("wadah-modals");
if (wadahModals) wadahModals.innerHTML = modalsHTML;
