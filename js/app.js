/* Vedantify - Complete Interactive Platform Controller */
window.VedantifyState = {
  activeModule: 'home',
  sectTheme: 'advaita',
  darkMode: false,
  audioMuted: false,
  punyaXP: 240,
  metacognitionScore: 84,
  japaCount: 0,
  japaMalasCompleted: 1,
  selectedMantraId: 'm1',
  selectedEpicId: 'gita',
  selectedEpicPageIdx: 0,
  storyFilter: 'All',
  useCaseFilter: 'All',
  activeDilemmaIdx: 0,
  dilemmaResult: null,
  preacherFilter: 'All',
  kidsStars: 85,
  kidsBadges: ['🛡️ Satya Shield', '🙏 Matru-Pitru Bhakta'],
  activeKidsQuestIdx: 0,
  kidsQuestFeedback: null,
  pranayamaRunning: false,
  pranayamaPhase: 'Ready to Begin',
  pranayamaCycles: 0,
  pranayamaPattern: '4-4-6',
  koshaScores: { annamaya: 80, pranamaya: 75, manomaya: 70, vijnanamaya: 85, anandamaya: 78 },
  journalEntries: [
    {
      id: 'je1',
      date: 'Today, 06:30 AM',
      thought: 'Felt anxious about completing all sprint deliverables on time.',
      klesha: 'Abhinivesha (Fear / Clinging to Outcome)',
      reframe: 'Applied Gita 2.47 (Nishkama Karma): My jurisdiction is solely this hour’s focused craftsmanship. I release outcome anxiety as the detached Sakshi.'
    }
  ],
  quizMode: 'shastra', // 'shastra' or 'wisdom'
  quizIndex: 0,
  quizScore: 0,
  quizAnswered: null,
  wisdomAnswers: {},
  wisdomResult: null,
  blogCategory: 'All',
  newsCategory: 'All',
  sevaRegion: 'All',
  enrolledSevaIds: ['sv1'],
  selectedFestivalId: 'f9',
  festivalChecklists: {
    'f9': [true, false, false]
  },
  customPlannerTasks: [
    { id: 'cpt1', festivalName: 'Deepavali (Diwali)', task: 'Buy handmade clay diyas from local potter families', due: '3 Days Before', done: true }
  ],
  bookmarks: ['Chapter 2, Verse 47 (Sankhya Yoga)', 'Mandala 1, Sukta 164, Mantra 46'],
  currentUser: {
    name: 'Aarav Vedantin',
    email: 'aarav@vedantify.org',
    role: 'Sadhaka (Seeker)',
    isAdmin: true,
    joined: 'Kartika 2026'
  }
};

/* Safe LocalStorage Persistence */
function loadSavedState() {
  try {
    var raw = localStorage.getItem('vedantify_state_v1');
    if (raw) {
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        if (parsed.sectTheme) window.VedantifyState.sectTheme = parsed.sectTheme;
        if (typeof parsed.darkMode === 'boolean') window.VedantifyState.darkMode = parsed.darkMode;
        if (typeof parsed.punyaXP === 'number') window.VedantifyState.punyaXP = parsed.punyaXP;
        if (typeof parsed.kidsStars === 'number') window.VedantifyState.kidsStars = parsed.kidsStars;
        if (Array.isArray(parsed.bookmarks)) window.VedantifyState.bookmarks = parsed.bookmarks;
        if (Array.isArray(parsed.enrolledSevaIds)) window.VedantifyState.enrolledSevaIds = parsed.enrolledSevaIds;
        if (Array.isArray(parsed.journalEntries)) window.VedantifyState.journalEntries = parsed.journalEntries;
        if (parsed.currentUser) window.VedantifyState.currentUser = parsed.currentUser;
      }
    }
  } catch (err) {
    // Sandboxed iframe safe fallback
  }
}

function saveState() {
  try {
    localStorage.setItem('vedantify_state_v1', JSON.stringify({
      sectTheme: window.VedantifyState.sectTheme,
      darkMode: window.VedantifyState.darkMode,
      punyaXP: window.VedantifyState.punyaXP,
      kidsStars: window.VedantifyState.kidsStars,
      bookmarks: window.VedantifyState.bookmarks,
      enrolledSevaIds: window.VedantifyState.enrolledSevaIds,
      journalEntries: window.VedantifyState.journalEntries,
      currentUser: window.VedantifyState.currentUser
    }));
  } catch (err) {
    // Ignore storage restriction
  }
}

/* Synthesized Sacred Web Audio Engine (Zero external MP3 dependency) */
var _audioCtx = null;
function getAudioContext() {
  if (window.VedantifyState.audioMuted) return null;
  try {
    var AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!_audioCtx) _audioCtx = new AudioContextClass();
    if (_audioCtx.state === 'suspended') _audioCtx.resume();
    return _audioCtx;
  } catch (e) {
    return null;
  }
}

function playSacredTone(freq, durationSec, type) {
  var ctx = getAudioContext();
  if (!ctx) return;
  try {
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq || 432, ctx.currentTime);
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (durationSec || 1.2));
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + (durationSec || 1.2));
  } catch (e) {}
}

function playPageFlipSound() {
  playSacredTone(320, 0.14, 'triangle');
}

function playTempleBell() {
  playSacredTone(528, 1.8, 'sine');
  setTimeout(function() { playSacredTone(1056, 1.2, 'sine'); }, 60);
}

function speakShlokaText(textToSpeak) {
  playTempleBell();
  try {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      var utter = new SpeechSynthesisUtterance(textToSpeak);
      utter.rate = 0.88;
      utter.pitch = 1.0;
      window.speechSynthesis.speak(utter);
      showToast('🔊 Chanting & Reciting Shloka Meaning...', 'info');
    } else {
      showToast('🔔 Temple Resonance Chime Played (432 Hz)', 'info');
    }
  } catch (e) {
    showToast('🔔 Sacred Resonance Chime Played', 'info');
  }
}

/* Toast Notification System */
function showToast(message, kind) {
  var container = document.getElementById('toast-container');
  if (!container) return;
  var toast = document.createElement('div');
  var borderCol = kind === 'warn' ? 'border-amber-500' : 'border-emerald-500';
  toast.className = 'v-card px-4 py-3 border-l-4 ' + borderCol + ' shadow-xl flex items-center gap-3 text-sm font-medium transition-all duration-300';
  toast.innerHTML = '<span>' + message + '</span>';
  container.appendChild(toast);
  setTimeout(function() {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 3600);
}

/* Universal Modal System */
function openUniversalModal(titleHtml, bodyHtml) {
  var backdrop = document.getElementById('universal-modal-backdrop');
  var titleEl = document.getElementById('universal-modal-title');
  var bodyEl = document.getElementById('universal-modal-body');
  if (!backdrop || !titleEl || !bodyEl) return;
  titleEl.innerHTML = titleHtml;
  bodyEl.innerHTML = bodyHtml;
  backdrop.classList.remove('hidden');
  backdrop.classList.add('flex');
}

function closeUniversalModal() {
  var backdrop = document.getElementById('universal-modal-backdrop');
  if (!backdrop) return;
  backdrop.classList.add('hidden');
  backdrop.classList.remove('flex');
}

/* Theme & Sect Controller */
function setSectTheme(sectId) {
  window.VedantifyState.sectTheme = sectId;
  document.documentElement.setAttribute('data-sect', sectId);
  var sel = document.getElementById('sect-theme-select');
  if (sel && sel.value !== sectId) sel.value = sectId;
  saveState();
  playSacredTone(432, 0.4, 'sine');
  var sectObj = window.VEDANTIFY_DATA.sects.find(function(s) { return s.id === sectId; });
  if (sectObj) {
    showToast(sectObj.icon + ' Theme switched to ' + sectObj.name + ' (' + sectObj.badge + ')', 'info');
  }
  renderActiveModule();
}

function toggleDarkMode() {
  window.VedantifyState.darkMode = !window.VedantifyState.darkMode;
  if (window.VedantifyState.darkMode) {
    document.documentElement.classList.add('dark-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
  }
  var btn = document.getElementById('dark-mode-btn');
  if (btn) {
    btn.innerHTML = window.VedantifyState.darkMode ? '☀️ Day' : '🌙 Night';
  }
  saveState();
}

function toggleAudioMute() {
  window.VedantifyState.audioMuted = !window.VedantifyState.audioMuted;
  var btn = document.getElementById('audio-mute-btn');
  if (btn) {
    btn.innerHTML = window.VedantifyState.audioMuted ? '🔇 Muted' : '🔔 Audio';
  }
  showToast(window.VedantifyState.audioMuted ? '🔇 Sacred audio muted' : '🔔 Sacred audio enabled', 'info');
}

/* Mobile & Side Drawers */
function toggleLeftSidebar() {
  var sb = document.getElementById('left-sidebar');
  var bd = document.getElementById('mobile-sidebar-backdrop');
  if (!sb) return;
  var isHidden = sb.classList.contains('-translate-x-full');
  if (isHidden) {
    sb.classList.remove('-translate-x-full');
    if (bd) bd.classList.remove('hidden');
  } else {
    sb.classList.add('-translate-x-full');
    if (bd) bd.classList.add('hidden');
  }
}

function toggleRightSidepanel() {
  var rp = document.getElementById('right-sidepanel');
  if (!rp) return;
  rp.classList.toggle('hidden');
  renderSidepanelWidgets();
}

/* Award XP & Update Header */
function addPunyaXP(amount, reason) {
  window.VedantifyState.punyaXP += amount;
  window.VedantifyState.metacognitionScore = Math.min(100, window.VedantifyState.metacognitionScore + 1);
  var badge = document.getElementById('header-xp-badge');
  if (badge) {
    badge.innerHTML = '✨ ' + window.VedantifyState.punyaXP + ' Punya XP';
  }
  saveState();
  if (reason) {
    showToast('✨ +' + amount + ' Punya XP • ' + reason, 'info');
  }
}

/* Navigation Controller */
function navigateModule(moduleId) {
  if (_pranayamaTimer && moduleId !== 'spirituality') {
    clearInterval(_pranayamaTimer);
    _pranayamaTimer = null;
    window.VedantifyState.pranayamaRunning = false;
  }
  window.VedantifyState.activeModule = moduleId;
  // Update sidebar active button states
  var navButtons = document.querySelectorAll('[data-nav-module]');
  for (var i = 0; i < navButtons.length; i++) {
    var btn = navButtons[i];
    if (btn.getAttribute('data-nav-module') === moduleId) {
      btn.className = 'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold v-btn-primary shadow-sm text-left';
    } else {
      btn.className = 'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium hover:bg-amber-500/10 transition text-left';
    }
  }
  // Close mobile sidebar if open
  var sb = document.getElementById('left-sidebar');
  var bd = document.getElementById('mobile-sidebar-backdrop');
  if (sb && window.innerWidth < 1024) {
    sb.classList.add('-translate-x-full');
    if (bd) bd.classList.add('hidden');
  }
  renderActiveModule();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Global Search Engine Across All 12+ Modules */
function handleGlobalSearch(query) {
  var dd = document.getElementById('global-search-dropdown');
  if (!dd) return;
  var q = (query || '').trim().toLowerCase();
  if (!q) {
    dd.classList.add('hidden');
    dd.innerHTML = '';
    return;
  }
  var results = [];
  // 1. Epics & Shlokas
  window.VEDANTIFY_DATA.epics.forEach(function(epic) {
    epic.pages.forEach(function(p, idx) {
      if (epic.title.toLowerCase().includes(q) || p.ref.toLowerCase().includes(q) || p.english.toLowerCase().includes(q) || p.transliteration.toLowerCase().includes(q)) {
        results.push({
          badge: 'Epics & Shlokas',
          title: epic.title + ' — ' + p.ref,
          snippet: p.english.slice(0, 95) + '...',
          action: "jumpToEpicPage('" + epic.id + "', " + idx + ")"
        });
      }
    });
  });
  // 2. Stories
  window.VEDANTIFY_DATA.stories.forEach(function(st) {
    if (st.title.toLowerCase().includes(q) || st.value.toLowerCase().includes(q) || st.summary.toLowerCase().includes(q)) {
      results.push({
        badge: 'Vedic Story',
        title: st.title,
        snippet: st.value + ' • ' + st.summary.slice(0, 80) + '...',
        action: "openStoryModal('" + st.id + "')"
      });
    }
  });
  // 3. Use Cases
  window.VEDANTIFY_DATA.useCases.forEach(function(uc) {
    if (uc.problem.toLowerCase().includes(q) || uc.vedicConcept.toLowerCase().includes(q) || uc.domain.toLowerCase().includes(q)) {
      results.push({
        badge: 'Real-World Use Case',
        title: uc.problem,
        snippet: uc.vedicConcept,
        action: "navigateModule('usecases')"
      });
    }
  });
  // 4. Preachers
  window.VEDANTIFY_DATA.preachers.forEach(function(pr) {
    if (pr.name.toLowerCase().includes(q) || pr.tradition.toLowerCase().includes(q) || pr.bio.toLowerCase().includes(q)) {
      results.push({
        badge: 'Preacher / Sage',
        title: pr.name + ' (' + pr.dates + ')',
        snippet: pr.tradition + ' — ' + pr.title,
        action: "openPreacherModal('" + pr.id + "')"
      });
    }
  });
  // 5. News & Blogs
  window.VEDANTIFY_DATA.news.forEach(function(n) {
    if (n.title.toLowerCase().includes(q) || n.category.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q)) {
      results.push({
        badge: 'Sanatana News',
        title: n.title,
        snippet: n.category + ' • ' + n.location,
        action: "navigateModule('news')"
      });
    }
  });
  window.VEDANTIFY_DATA.blogs.forEach(function(b) {
    if (b.title.toLowerCase().includes(q) || b.category.toLowerCase().includes(q) || b.summary.toLowerCase().includes(q)) {
      results.push({
        badge: 'Vedic Blog',
        title: b.title,
        snippet: b.author,
        action: "openBlogReaderModal('" + b.id + "')"
      });
    }
  });
  // 6. Seva & Festivals
  window.VEDANTIFY_DATA.sevaCampaigns.forEach(function(sv) {
    if (sv.title.toLowerCase().includes(q) || sv.location.toLowerCase().includes(q) || sv.category.toLowerCase().includes(q)) {
      results.push({
        badge: 'Community Seva',
        title: sv.title,
        snippet: sv.location + ' • ' + sv.category,
        action: "navigateModule('seva')"
      });
    }
  });
  window.VEDANTIFY_DATA.festivals.forEach(function(f) {
    if (f.name.toLowerCase().includes(q) || f.month.toLowerCase().includes(q) || f.significance.toLowerCase().includes(q)) {
      results.push({
        badge: 'Festival Calendar',
        title: f.name,
        snippet: f.month + ' • ' + f.deity,
        action: "selectFestivalPlanner('" + f.id + "')"
      });
    }
  });

  if (results.length === 0) {
    dd.innerHTML = '<div class="p-4 text-sm text-stone-500">No direct match found for "' + query.replace(/</g, '&lt;') + '". Try searching "Gita", "Vivekananda", "Kumbh", "Diwali", "Nachiketa", or "Seva".</div>';
  } else {
    dd.innerHTML = results.slice(0, 8).map(function(r) {
      return '<button type="button" onclick="closeSearchDropdown(); ' + r.action + '" class="w-full text-left px-4 py-3 hover:bg-amber-500/10 border-b border-stone-200/50 flex flex-col gap-0.5 transition">' +
        '<div class="flex items-center justify-between gap-2">' +
          '<span class="font-semibold text-sm">' + r.title + '</span>' +
          '<span class="text-xs px-2 py-0.5 rounded-full v-badge">' + r.badge + '</span>' +
        '</div>' +
        '<p class="text-xs opacity-75 truncate">' + r.snippet + '</p>' +
      '</button>';
    }).join('');
  }
  dd.classList.remove('hidden');
}

function closeSearchDropdown() {
  var dd = document.getElementById('global-search-dropdown');
  if (dd) dd.classList.add('hidden');
}

function jumpToEpicPage(epicId, pageIdx) {
  window.VedantifyState.selectedEpicId = epicId;
  window.VedantifyState.selectedEpicPageIdx = pageIdx;
  navigateModule('epics');
}

/* Sidepanel & API Telemetry Renderer */
function renderSidepanelWidgets() {
  var tasksEl = document.getElementById('sidepanel-tasks-list');
  if (tasksEl) {
    tasksEl.innerHTML = window.VEDANTIFY_DATA.dailyTasks.map(function(t) {
      return '<div class="p-2.5 rounded-xl border border-stone-200/60 flex items-start gap-2.5 text-xs">' +
        '<input type="checkbox" ' + (t.done ? 'checked' : '') + ' onchange="toggleDailyTask(\'' + t.id + '\')" class="mt-0.5 h-4 w-4 rounded accent-amber-600 cursor-pointer" />' +
        '<div class="flex-1">' +
          '<div class="font-semibold ' + (t.done ? 'line-through opacity-60' : '') + '">' + t.title + '</div>' +
          '<div class="opacity-70 mt-0.5">+' + t.xp + ' XP • ' + t.category + '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }
  var bmEl = document.getElementById('sidepanel-bookmarks-list');
  if (bmEl) {
    if (window.VedantifyState.bookmarks.length === 0) {
      bmEl.innerHTML = '<p class="text-xs opacity-70">No shlokas bookmarked yet.</p>';
    } else {
      bmEl.innerHTML = window.VedantifyState.bookmarks.map(function(b, i) {
        return '<div class="flex items-center justify-between gap-2 text-xs py-1.5 border-b border-stone-200/40">' +
          '<span class="font-medium truncate">🔖 ' + b + '</span>' +
          '<button type="button" onclick="removeBookmark(' + i + ')" class="text-rose-500 hover:underline">Remove</button>' +
        '</div>';
      }).join('');
    }
  }
  renderAPITelemetryWidgets();
}

window.renderAPITelemetryWidgets = function() {
  var pill = document.getElementById('api-status-pill');
  if (pill) {
    var isOutage = window.VedantifyAPICluster.simulatePrimaryOutage;
    pill.innerHTML = isOutage
      ? '⚡ HA Failover: Tier-2/3 Active'
      : '🟢 Multi-API HA: Online (' + window.VedantifyAPICluster.metrics.avgLatencyMs + 'ms)';
  }
  var logsEl = document.getElementById('sidepanel-api-logs');
  if (logsEl) {
    if (window.VedantifyAPICluster.logs.length === 0) {
      logsEl.innerHTML = '<div class="text-xs opacity-75">Multi-API cluster initialized. Click "Sync Live APIs" to test failover & live telemetry.</div>';
    } else {
      logsEl.innerHTML = window.VedantifyAPICluster.logs.slice(0, 6).map(function(l) {
        var badgeCol = l.status.includes('OK') ? 'text-emerald-600' : 'text-amber-600';
        return '<div class="text-[11px] py-1.5 border-b border-stone-200/40">' +
          '<div class="flex justify-between font-semibold"><span class="' + badgeCol + '">[' + l.status + '] ' + l.domain + '</span><span>' + l.latency + 'ms</span></div>' +
          '<div class="opacity-80">' + l.tier + ': ' + l.msg + '</div>' +
        '</div>';
      }).join('');
    }
  }
};

function toggleDailyTask(taskId) {
  var task = window.VEDANTIFY_DATA.dailyTasks.find(function(t) { return t.id === taskId; });
  if (!task) return;
  task.done = !task.done;
  if (task.done) {
    playSacredTone(528, 0.5, 'sine');
    addPunyaXP(task.xp, 'Completed Daily Vedic Sankalpa: ' + task.title);
  }
  renderSidepanelWidgets();
  if (window.VedantifyState.activeModule === 'home') renderActiveModule();
}

function toggleSimulatePrimaryOutage() {
  window.VedantifyAPICluster.simulatePrimaryOutage = !window.VedantifyAPICluster.simulatePrimaryOutage;
  var active = window.VedantifyAPICluster.simulatePrimaryOutage;
  window.VedantifyAPICluster.logEvent(
    active ? 'Circuit Breaker' : 'Primary Cluster',
    'System',
    active ? 'FAILOVER' : 'OK',
    active ? 'Simulated Tier-1 Primary API outage enabled -> Automatic failover to Tier-2 Mirror & Tier-3 Edge Cache' : 'Tier-1 Primary API restored to normal operation',
    3
  );
  showToast(active ? '⚡ Simulated Tier-1 API Outage: Failover to Tier-2 Mirror Active!' : '🟢 Tier-1 Primary API Cluster Restored!', active ? 'warn' : 'info');
  renderSidepanelWidgets();
  if (window.VedantifyState.activeModule === 'admin' || window.VedantifyState.activeModule === 'home') {
    renderActiveModule();
  }
}

async function triggerGlobalAPISync() {
  showToast('🔄 Synchronizing Multi-API Cluster (Wikipedia REST, MediaWiki Mirror, Shastra Quiz Bank)...', 'info');
  await window.VedantifyAPICluster.fetchTopicEnrichment('Vedanta', 'Philosophy Core', 'Vedanta is one of the world’s most ancient spiritual philosophies based on the Upanishads.');
  await window.VedantifyAPICluster.syncDynamicQuizQuestions();
  renderSidepanelWidgets();
  if (window.VedantifyState.activeModule === 'admin' || window.VedantifyState.activeModule === 'home') {
    renderActiveModule();
  }
  showToast('✅ Multi-API High-Availability Sync Complete!', 'info');
}

function removeBookmark(idx) {
  window.VedantifyState.bookmarks.splice(idx, 1);
  saveState();
  renderSidepanelWidgets();
}

/* ============================================================================
   MODULE RENDERERS (ALL 13 MODULES)
   ============================================================================ */
function renderActiveModule() {
  var container = document.getElementById('main-module-container');
  if (!container) return;
  var mod = window.VedantifyState.activeModule;
  if (mod === 'home') container.innerHTML = renderHomeModule();
  else if (mod === 'epics') container.innerHTML = renderEpicsModule();
  else if (mod === 'stories') container.innerHTML = renderStoriesModule();
  else if (mod === 'usecases') container.innerHTML = renderUseCasesModule();
  else if (mod === 'preachers') container.innerHTML = renderPreachersModule();
  else if (mod === 'kids') container.innerHTML = renderKidsModule();
  else if (mod === 'spirituality') container.innerHTML = renderSpiritualityModule();
  else if (mod === 'quizzes') container.innerHTML = renderQuizzesModule();
  else if (mod === 'blogs') container.innerHTML = renderBlogsModule();
  else if (mod === 'news') container.innerHTML = renderNewsModule();
  else if (mod === 'seva') container.innerHTML = renderSevaModule();
  else if (mod === 'calendar') container.innerHTML = renderCalendarModule();
  else if (mod === 'admin') container.innerHTML = renderAdminModule();
  else container.innerHTML = renderHomeModule();
}

/* 1. HOME DASHBOARD MODULE */
function renderHomeModule() {
  var doneCount = window.VEDANTIFY_DATA.dailyTasks.filter(function(t) { return t.done; }).length;
  var totalTasks = window.VEDANTIFY_DATA.dailyTasks.length;
  var pct = Math.round((doneCount / totalTasks) * 100);
  var curSect = window.VEDANTIFY_DATA.sects.find(function(s) { return s.id === window.VedantifyState.sectTheme; }) || window.VEDANTIFY_DATA.sects[0];

  return '<div class="space-y-8">' +
    /* Hero Banner */
    '<div class="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">' +
      '<img src="' + window.VEDANTIFY_HERO_IMG + '" alt="Vedantify Himalayan Vedic Ashram" class="w-full h-72 sm:h-96 object-cover" />' +
      '<div class="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/70 to-stone-900/30 flex flex-col justify-end p-6 sm:p-10 text-white">' +
        '<div class="flex flex-wrap items-center gap-2 mb-3">' +
          '<span class="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/30 border border-amber-400/50 text-amber-200">' + curSect.icon + ' ' + curSect.name + ' Theme Active</span>' +
          '<span class="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/30 border border-emerald-400/50 text-emerald-200">⚡ Multi-API Fault-Tolerant Architecture</span>' +
        '</div>' +
        '<h1 class="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif-vedic tracking-tight leading-tight max-w-3xl">' +
          'Re-Dive Into the Forgotten Wisdom of the Vedas & Awaken Higher Metacognition' +
        '</h1>' +
        '<p class="mt-2 sm:mt-3 text-sm sm:text-base text-stone-200 max-w-2xl leading-relaxed">' +
          'Inculcate timeless Sanatana Dharma values through everyday tasks, 3D animated scriptures, real-world ethical dilemmas, gamified child sanskars, and global community seva.' +
        '</p>' +
        '<div class="mt-5 flex flex-wrap gap-3">' +
          '<button type="button" onclick="navigateModule(\'epics\')" class="v-btn-primary px-5 py-2.5 text-sm shadow-lg">📖 Open 3D Epics & Shlokas</button>' +
          '<button type="button" onclick="navigateModule(\'spirituality\')" class="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur border border-white/30 text-white text-sm font-semibold transition">🧘 Metacognition & Breath Lab</button>' +
          '<button type="button" onclick="playTempleBell()" class="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-300/40 text-amber-200 text-sm font-semibold transition">🔔 Ring Sacred Ashram Bell (528 Hz)</button>' +
        '</div>' +
      '</div>' +
    '</div>' +

    /* Quick Sect Theme Switcher Strip */
    '<div class="v-card p-4 sm:p-5">' +
      '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">' +
        '<div>' +
          '<h2 class="text-sm font-bold uppercase tracking-wider opacity-80">🎨 Dynamic Darshana & Sect Theme Engine</h2>' +
          '<p class="text-xs opacity-70">Experience Vedantify through the aesthetic palette and philosophical lens of five classical traditions:</p>' +
        '</div>' +
        '<span class="text-xs font-semibold px-3 py-1 rounded-full v-badge">' + curSect.motto + '</span>' +
      '</div>' +
      '<div class="grid grid-cols-2 sm:grid-cols-5 gap-2.5">' +
        window.VEDANTIFY_DATA.sects.map(function(s) {
          var active = s.id === window.VedantifyState.sectTheme;
          return '<button type="button" onclick="setSectTheme(\'' + s.id + '\')" class="p-3 rounded-xl border text-left transition flex flex-col justify-between ' +
            (active ? 'v-btn-primary shadow-md' : 'v-btn-outline') + '">' +
            '<div class="text-lg">' + s.icon + ' <span class="text-xs font-bold">' + s.name + '</span></div>' +
            '<div class="text-[11px] opacity-85 mt-1">' + s.badge + '</div>' +
          '</button>';
        }).join('') +
      '</div>' +
    '</div>' +

    /* Daily Shloka + Everyday Vedic Value Tasks */
    '<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">' +
      /* Daily Subhashita Card */
      '<div class="lg:col-span-5 v-card p-6 flex flex-col justify-between relative overflow-hidden">' +
        '<div>' +
          '<div class="flex items-center justify-between gap-2 mb-3">' +
            '<span class="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full v-badge">🕉️ Daily Subhashita & Metacognition</span>' +
            '<span class="text-xs opacity-70">Bhagavad Gita 6.5</span>' +
          '</div>' +
          '<p class="text-lg sm:text-xl font-bold font-sanskrit leading-relaxed py-2">' +
            'उद्धरेदात्मनात्मानं नात्मानमवसादयेत् ।<br/>आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ॥' +
          '</p>' +
          '<p class="text-xs italic opacity-75 mb-3">uddhared ātmanātmānaṁ nātmānam avasādayet | ātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ ||</p>' +
          '<p class="text-sm leading-relaxed mb-4">' +
            '<strong>English Meaning:</strong> Elevate yourself through your own higher discerning mind (Buddhi) and never degrade yourself. For the mind alone is the noblest friend of the self, and the unmastered mind is its own adversary.' +
          '</p>' +
          '<div class="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs leading-relaxed">' +
            '<strong>🧠 Today’s Metacognitive Prompt:</strong> Observe your inner dialogue today as the detached Witness (Sakshi). Whenever self-doubt arises, consciously speak to yourself as a wise ally (Bandhu).' +
          '</div>' +
        '</div>' +
        '<div class="mt-5 flex flex-wrap gap-2 pt-3 border-t border-stone-200/50">' +
          '<button type="button" onclick="speakShlokaText(\'Uddhared atmanatmanam natmanam avasadayet. Elevate yourself through your own higher discerning mind and never degrade yourself.\')" class="v-btn-primary px-4 py-2 text-xs">🔊 Listen & Chant</button>' +
          '<button type="button" onclick="navigateModule(\'epics\')" class="v-btn-outline px-4 py-2 text-xs">📖 Open 3D Book Reader</button>' +
        '</div>' +
      '</div>' +

      /* Everyday Vedic Tasks & Dinacharya Tracker */
      '<div class="lg:col-span-7 v-card p-6">' +
        '<div class="flex flex-wrap items-center justify-between gap-2 mb-4">' +
          '<div>' +
            '<h2 class="text-lg font-bold font-serif-vedic">☀️ Everyday Vedic Tasks (Dinacharya & Sadhana)</h2>' +
            '<p class="text-xs opacity-75">Inculcate Vedic values through concrete daily habits to elevate your Sattva & Metacognition Quotient.</p>' +
          '</div>' +
          '<div class="text-right">' +
            '<span class="text-sm font-bold text-amber-600">' + doneCount + ' / ' + totalTasks + ' Completed (' + pct + '%)</span>' +
            '<div class="w-36 h-2 bg-stone-200 rounded-full overflow-hidden mt-1">' +
              '<div class="h-full bg-amber-600 transition-all duration-300" style="width:' + pct + '%"></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">' +
          window.VEDANTIFY_DATA.dailyTasks.map(function(t) {
            return '<div onclick="toggleDailyTask(\'' + t.id + '\')" class="p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 ' +
              (t.done ? 'bg-emerald-500/10 border-emerald-500/40' : 'hover:border-amber-500/60 border-stone-200/70') + '">' +
              '<input type="checkbox" ' + (t.done ? 'checked' : '') + ' onchange="event.stopPropagation(); toggleDailyTask(\'' + t.id + '\')" class="mt-1 h-4 w-4 rounded accent-amber-600" />' +
              '<div class="flex-1 min-w-0">' +
                '<div class="flex items-center justify-between gap-1">' +
                  '<span class="text-xs font-bold ' + (t.done ? 'line-through opacity-65' : '') + '">' + t.title + '</span>' +
                  '<span class="text-[11px] font-semibold px-2 py-0.5 rounded-full v-badge shrink-0">+' + t.xp + ' XP</span>' +
                '</div>' +
                '<p class="text-xs opacity-75 mt-1 leading-snug">' + t.desc + '</p>' +
              '</div>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>' +
    '</div>' +

    /* All-Module Explorer Grid */
    '<div>' +
      '<div class="flex items-center justify-between mb-4">' +
        '<h2 class="text-xl font-bold font-serif-vedic">🏛️ Explore All 12 Sanctuaries of Vedantify</h2>' +
        '<span class="text-xs opacity-70">Click any module card for deep interactive tools</span>' +
      '</div>' +
      '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">' +
        [
          { id: 'epics', icon: '📜', title: '3D Epics & Shlokas', desc: 'Turn animated palm-leaf pages of Rigveda, Upanishads, Gita, Ramayana & Mahabharata.' },
          { id: 'stories', icon: '🪔', title: 'Vedic & Puranic Stories', desc: 'Nachiketa, Satyakama, Svetaketu, Gargi, Rantideva & Ashtavakra with life lessons.' },
          { id: 'usecases', icon: '⚖️', title: 'Real-World Use Cases', desc: 'Solve workplace burnout, digital addiction & ethical dilemmas via Vedic frameworks.' },
          { id: 'preachers', icon: '🧘‍♂️', title: 'Famous Preachers', desc: 'Vivekananda, Prabhupada, Ramanuja, Ashtavakra, Kabir, Buddha & Shankara + Live API.' },
          { id: 'kids', icon: '🦚', title: 'Child’s Corner (Gamified)', desc: 'Bal Sanskar moral quests, stars, badges, good-deed tracker & merit certificates.' },
          { id: 'spirituality', icon: '🪷', title: 'Spirituality & Metacognition', desc: 'Pranayama Lotus Visualizer, 108 Japa Mala, Pancha Kosha Radar & Witness Journal.' },
          { id: 'quizzes', icon: '🏹', title: 'Quizzes & Test Wisdom', desc: 'Timed Shastra quizzes with lifelines + Guna & Metacognition Wisdom Assessment.' },
          { id: 'blogs', icon: '✍️', title: 'Vedic Blogs & Essays', desc: 'Deep treatises on neuroscience, temple acoustics, Panini AI & circadian Ayurveda.' },
          { id: 'news', icon: '📰', title: 'Sanatana Dharma News', desc: 'Temple Pranpratisthana, Kumbh Mela, unexplained temple mysteries & live API sync.' },
          { id: 'seva', icon: '🤝', title: 'Community Seva Portal', desc: 'Enrol in Anna Daan, Ganga clean-up, Goshala & global diaspora volunteer drives.' },
          { id: 'calendar', icon: '📅', title: 'Festival Calendar & Planner', desc: 'Year-round Hindu festivals, daily rituals & advance preparation checklists.' },
          { id: 'admin', icon: '⚙️', title: 'Admin & Multi-API HA Hub', desc: 'Publish content, manage seeker roles, and test Multi-API failover resilience.' }
        ].map(function(m) {
          return '<button type="button" onclick="navigateModule(\'' + m.id + '\')" class="v-card p-5 text-left flex flex-col justify-between hover:-translate-y-1 transition">' +
            '<div>' +
              '<div class="text-2xl mb-2">' + m.icon + '</div>' +
              '<h3 class="font-bold text-base font-serif-vedic">' + m.title + '</h3>' +
              '<p class="text-xs opacity-75 mt-1.5 leading-relaxed">' + m.desc + '</p>' +
            '</div>' +
            '<div class="mt-4 text-xs font-semibold text-amber-600 flex items-center gap-1">Enter Sanctuary →</div>' +
          '</button>';
        }).join('') +
      '</div>' +
    '</div>' +
  '</div>';
}

/* 2. EPICS & SCRIPTURES 3D BOOK READER MODULE */
function renderEpicsModule() {
  var epic = window.VEDANTIFY_DATA.epics.find(function(e) { return e.id === window.VedantifyState.selectedEpicId; }) || window.VEDANTIFY_DATA.epics[0];
  var pageIdx = Math.max(0, Math.min(window.VedantifyState.selectedEpicPageIdx, epic.pages.length - 1));
  var page = epic.pages[pageIdx];
  var isBookmarked = window.VedantifyState.bookmarks.includes(page.ref);

  return '<div class="space-y-6">' +
    /* Top Banner with Manuscript Illustration */
    '<div class="v-card p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">' +
      '<div class="lg:col-span-7 space-y-2">' +
        '<span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full v-badge">📜 Interactive 3D Tala-Patra & Grantha Reader</span>' +
        '<h1 class="text-2xl sm:text-3xl font-bold font-serif-vedic">Epics, Vedas & Upanishads Manuscript Sanctuary</h1>' +
        '<p class="text-sm opacity-80 leading-relaxed">' +
          'Select a sacred scripture below and turn the 3D illuminated pages to study original Devanagari Sanskrit, IAST transliteration, word-by-word Padartha, English translation, and practical metacognitive exercises.' +
        '</p>' +
        '<div class="flex flex-wrap gap-2 pt-2">' +
          window.VEDANTIFY_DATA.epics.map(function(e) {
            var active = e.id === epic.id;
            return '<button type="button" onclick="selectEpic(\'' + e.id + '\')" class="px-3.5 py-2 rounded-xl text-xs font-semibold transition ' +
              (active ? 'v-btn-primary shadow' : 'v-btn-outline') + '">' + e.title + '</button>';
          }).join('') +
        '</div>' +
      '</div>' +
      '<div class="lg:col-span-5">' +
        '<img src="' + window.VEDANTIFY_EPICS_IMG + '" alt="Ancient Sanskrit Palm-Leaf Manuscript" class="w-full h-44 object-cover rounded-2xl border border-amber-500/30 shadow-md" />' +
      '</div>' +
    '</div>' +

    /* 3D Animated Book Spread */
    '<div class="book-stage">' +
      '<div id="epic-book-spread" class="book-spread rounded-3xl p-6 sm:p-10">' +
        '<div class="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-amber-800/20">' +
          '<div>' +
            '<div class="text-xs font-bold uppercase tracking-widest opacity-70">' + epic.tradition + ' • ' + page.chandas + '</div>' +
            '<h2 class="text-xl sm:text-2xl font-bold font-serif-vedic">' + epic.title + ' — ' + page.ref + '</h2>' +
          '</div>' +
          '<div class="flex items-center gap-2">' +
            '<span class="text-xs font-semibold px-3 py-1 rounded-full bg-amber-900/10 border border-amber-800/20">Folio ' + (pageIdx + 1) + ' of ' + epic.pages.length + '</span>' +
            '<button type="button" onclick="fetchEpicLiveAPI(\'' + epic.wikiSlug + '\', \'' + epic.title.replace(/'/g, '') + '\')" class="px-3 py-1 rounded-xl text-xs font-semibold v-btn-outline">🌐 Live API Context</button>' +
          '</div>' +
        '</div>' +

        '<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">' +
          /* Left Page: Devanagari, Transliteration, Word-by-Word */
          '<div class="space-y-5 lg:pr-6 lg:border-r border-amber-900/20">' +
            '<div class="p-5 rounded-2xl bg-amber-500/10 border border-amber-700/25 text-center">' +
              '<div class="text-xs uppercase tracking-widest opacity-60 mb-2">Devanagari Mulam (Original Mantra/Shloka)</div>' +
              '<p class="text-xl sm:text-2xl font-bold font-sanskrit leading-loose whitespace-pre-line">' + page.sanskrit + '</p>' +
            '</div>' +
            '<div>' +
              '<div class="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">IAST Roman Transliteration</div>' +
              '<p class="text-sm italic leading-relaxed whitespace-pre-line opacity-90">' + page.transliteration + '</p>' +
            '</div>' +
            '<div>' +
              '<div class="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">Padaccheda & Word-by-Word Meaning</div>' +
              '<p class="text-xs sm:text-sm leading-relaxed opacity-85">' + page.wordByWord + '</p>' +
            '</div>' +
          '</div>' +

          /* Right Page: English Meaning, Metacognition & Daily Action */
          '<div class="space-y-5">' +
            '<div>' +
              '<div class="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">✨ English Translation & Purport</div>' +
              '<p class="text-base sm:text-lg font-medium leading-relaxed">' + page.english + '</p>' +
            '</div>' +
            '<div class="p-4 rounded-2xl bg-amber-600/10 border border-amber-600/30 space-y-1.5">' +
              '<div class="text-xs font-bold uppercase tracking-wider">🧠 Metacognitive Insight (Sakshi Viveka)</div>' +
              '<p class="text-xs sm:text-sm leading-relaxed">' + page.metacognition + '</p>' +
            '</div>' +
            '<div class="p-4 rounded-2xl bg-emerald-600/10 border border-emerald-600/30 space-y-1.5">' +
              '<div class="text-xs font-bold uppercase tracking-wider">🎯 Real-World Everyday Practice</div>' +
              '<p class="text-xs sm:text-sm leading-relaxed">' + page.dailyTask + '</p>' +
            '</div>' +
            '<div class="flex flex-wrap items-center gap-2.5 pt-2">' +
              '<button type="button" onclick="speakShlokaText(\'' + page.english.replace(/'/g, '') + '\')" class="v-btn-primary px-4 py-2 text-xs">🔊 Chant & Listen</button>' +
              '<button type="button" onclick="toggleBookmarkShloka(\'' + page.ref.replace(/'/g, '') + '\')" class="v-btn-outline px-4 py-2 text-xs">' + (isBookmarked ? '🔖 Bookmarked' : '🔖 Bookmark Shloka') + '</button>' +
              '<button type="button" onclick="addPunyaXP(20, \'Completed Svadhyaya study of ' + page.ref.replace(/'/g, '') + '\')" class="v-btn-outline px-4 py-2 text-xs">✅ Mark Contemplated (+20 XP)</button>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* Page Turning Footer Controls */
        '<div class="mt-8 pt-4 border-t border-amber-800/20 flex items-center justify-between">' +
          '<button type="button" onclick="turnEpicPage(-1)" class="v-btn-outline px-5 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2">← Turn Previous Leaf</button>' +
          '<span class="text-xs opacity-75 hidden sm:inline">Tip: Watch the 3D manuscript page-turn animation as you flip folios</span>' +
          '<button type="button" onclick="turnEpicPage(1)" class="v-btn-primary px-5 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2">Turn Next Leaf →</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function selectEpic(epicId) {
  window.VedantifyState.selectedEpicId = epicId;
  window.VedantifyState.selectedEpicPageIdx = 0;
  playPageFlipSound();
  renderActiveModule();
}

function turnEpicPage(delta) {
  var epic = window.VEDANTIFY_DATA.epics.find(function(e) { return e.id === window.VedantifyState.selectedEpicId; }) || window.VEDANTIFY_DATA.epics[0];
  var nextIdx = (window.VedantifyState.selectedEpicPageIdx + delta + epic.pages.length) % epic.pages.length;
  window.VedantifyState.selectedEpicPageIdx = nextIdx;
  playPageFlipSound();
  var spread = document.getElementById('epic-book-spread');
  if (spread) {
    spread.classList.remove('flip-next', 'flip-prev');
    void spread.offsetWidth;
    spread.classList.add(delta >= 0 ? 'flip-next' : 'flip-prev');
  }
  setTimeout(function() {
    renderActiveModule();
  }, 240);
}

function toggleBookmarkShloka(ref) {
  var idx = window.VedantifyState.bookmarks.indexOf(ref);
  if (idx === -1) {
    window.VedantifyState.bookmarks.push(ref);
    showToast('🔖 Saved "' + ref + '" to your Shloka Bookmarks', 'info');
  } else {
    window.VedantifyState.bookmarks.splice(idx, 1);
    showToast('Removed bookmark for "' + ref + '"', 'info');
  }
  saveState();
  renderSidepanelWidgets();
  renderActiveModule();
}

async function fetchEpicLiveAPI(wikiSlug, title) {
  showToast('🌐 Querying Multi-API Cluster for ' + title + '...', 'info');
  var data = await window.VedantifyAPICluster.fetchTopicEnrichment(wikiSlug, 'Epics & Scriptures', 'Historical and philosophical overview of ' + title + ' from the Sanatana Dharma canon.');
  openUniversalModal(
    '📜 Live Multi-API Encyclopedic Dossier: ' + title,
    '<div class="space-y-4 text-sm">' +
      '<div class="flex items-center justify-between text-xs px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">' +
        '<span><strong>Served By:</strong> ' + data.tier + '</span>' +
        '<span><strong>Latency:</strong> ' + data.latencyMs + ' ms</span>' +
      '</div>' +
      '<p class="leading-relaxed">' + data.extract + '</p>' +
      '<div class="pt-2"><a href="' + data.url + '" target="_blank" rel="noopener noreferrer" class="text-amber-600 font-semibold hover:underline">Read Full Canonical Entry on Wikipedia ↗</a></div>' +
    '</div>'
  );
}

/* 3. VEDIC STORIES MODULE */
function renderStoriesModule() {
  var curFilter = window.VedantifyState.storyFilter;
  var values = ['All', 'Viveka (Discernment)', 'Satya (Radical Honesty)', 'Atma-Jnana (Self-Knowledge)', 'Jijnasa (Fearless Inquiry)', 'Karuna (Compassion & Seva)', 'Samadarshana (Equal Vision)'];
  var filtered = window.VEDANTIFY_DATA.stories.filter(function(s) {
    return curFilter === 'All' || s.value === curFilter;
  });

  return '<div class="space-y-6">' +
    '<div class="v-card p-6">' +
      '<span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full v-badge">🪔 Upanishadic & Puranic Katha Sangraha</span>' +
      '<h1 class="text-2xl sm:text-3xl font-bold font-serif-vedic mt-2">Timeless Vedic Stories & Moral Parables</h1>' +
      '<p class="text-sm opacity-80 mt-1">Explore authentic dialogues from the Upanishads, Mahabharata, and Puranas designed to awaken ethical clarity and spiritual insight.</p>' +
      '<div class="flex flex-wrap gap-2 mt-4">' +
        values.map(function(v) {
          var active = v === curFilter;
          return '<button type="button" onclick="setStoryFilter(\'' + v + '\')" class="px-3 py-1.5 rounded-xl text-xs font-semibold transition ' +
            (active ? 'v-btn-primary' : 'v-btn-outline') + '">' + v + '</button>';
        }).join('') +
      '</div>' +
    '</div>' +

    '<div class="grid grid-cols-1 md:grid-cols-2 gap-6">' +
      filtered.map(function(st) {
        return '<div class="v-card p-6 flex flex-col justify-between">' +
          '<div>' +
            '<div class="flex items-center justify-between gap-2 mb-2">' +
              '<span class="text-xs font-semibold px-2.5 py-1 rounded-full v-badge">' + st.value + '</span>' +
              '<span class="text-xs opacity-70">' + st.source + ' • ' + st.readTime + '</span>' +
            '</div>' +
            '<h2 class="text-xl font-bold font-serif-vedic mt-1">' + st.title + '</h2>' +
            '<p class="text-xs font-sanskrit text-amber-600 mt-1">' + st.sutra + '</p>' +
            '<p class="text-sm opacity-85 mt-3 leading-relaxed">' + st.summary + '</p>' +
            '<div class="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs">' +
              '<strong>💡 Key Value Takeaway:</strong> ' + st.takeaway +
            '</div>' +
          '</div>' +
          '<div class="mt-5 pt-3 border-t border-stone-200/50 flex items-center justify-between">' +
            '<button type="button" onclick="openStoryModal(\'' + st.id + '\')" class="v-btn-primary px-4 py-2 text-xs">📖 Read Full Story & Reflect</button>' +
            '<button type="button" onclick="addPunyaXP(25, \'Reflected on ' + st.title.replace(/'/g, '') + '\')" class="v-btn-outline px-3 py-2 text-xs">✨ +25 XP</button>' +
          '</div>' +
        '</div>';
      }).join('') +
    '</div>' +
  '</div>';
}

function setStoryFilter(val) {
  window.VedantifyState.storyFilter = val;
  renderActiveModule();
}

function openStoryModal(storyId) {
  var st = window.VEDANTIFY_DATA.stories.find(function(s) { return s.id === storyId; });
  if (!st) return;
  playSacredTone(432, 0.5, 'sine');
  openUniversalModal(
    '🪔 ' + st.title + ' (' + st.source + ')',
    '<div class="space-y-4 text-sm leading-relaxed">' +
      '<div class="p-3 rounded-xl v-badge text-xs font-semibold">' + st.sutra + ' • Core Virtue: ' + st.value + '</div>' +
      st.fullText.map(function(p) { return '<p>' + p + '</p>'; }).join('') +
      '<div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">' +
        '<strong>🌟 Practical Life Application:</strong> ' + st.takeaway +
      '</div>' +
    '</div>'
  );
}

/* 4. REAL-WORLD USE CASES & DHARMA DILEMMA SIMULATOR */
function renderUseCasesModule() {
  var curDomain = window.VedantifyState.useCaseFilter;
  var domains = ['All', 'Career & Burnout', 'Digital Focus & Attention', 'Relationships & Conflict', 'Wealth & Consumption', 'Leadership & Ethics', 'Mental Health & Metacognition'];
  var filtered = window.VEDANTIFY_DATA.useCases.filter(function(u) {
    return curDomain === 'All' || u.domain === curDomain;
  });
  var dilIdx = window.VedantifyState.activeDilemmaIdx % window.VEDANTIFY_DATA.dilemmas.length;
  var dil = window.VEDANTIFY_DATA.dilemmas[dilIdx];
  var dilRes = window.VedantifyState.dilemmaResult;

  return '<div class="space-y-8">' +
    /* Interactive Modern Dharma Dilemma Simulator */
    '<div class="v-card p-6 sm:p-8 border-2 border-amber-500/40">' +
      '<div class="flex flex-wrap items-center justify-between gap-2 mb-3">' +
        '<span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full v-badge">⚖️ Interactive Dharma Dilemma Simulator</span>' +
        '<div class="flex gap-2">' +
          window.VEDANTIFY_DATA.dilemmas.map(function(d, idx) {
            return '<button type="button" onclick="selectDilemma(' + idx + ')" class="px-3 py-1 rounded-lg text-xs font-semibold ' +
              (idx === dilIdx ? 'v-btn-primary' : 'v-btn-outline') + '">Case #' + (idx + 1) + '</button>';
          }).join('') +
        '</div>' +
      '</div>' +
      '<h2 class="text-xl sm:text-2xl font-bold font-serif-vedic">' + dil.title + '</h2>' +
      '<p class="text-sm opacity-90 mt-2 leading-relaxed p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">' + dil.context + '</p>' +
      '<div class="mt-4 space-y-2.5">' +
        '<div class="text-xs font-bold uppercase tracking-wider opacity-75">How do you respond? Choose an action to inspect its Guna & Karmic Analysis:</div>' +
        dil.options.map(function(opt, oIdx) {
          return '<button type="button" onclick="evaluateDilemmaChoice(' + oIdx + ')" class="w-full text-left p-4 rounded-xl border border-stone-300/70 hover:border-amber-500 transition flex items-start justify-between gap-3">' +
            '<span class="text-sm font-medium">' + opt.label + '</span>' +
            '<span class="text-xs px-2.5 py-1 rounded-full v-badge shrink-0">Select →</span>' +
          '</button>';
        }).join('') +
      '</div>' +
      (dilRes ? (
        '<div class="mt-5 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-sm space-y-1">' +
          '<div class="font-bold text-emerald-700">🧭 Guna Evaluation: ' + dilRes.guna + ' (+' + dilRes.xp + ' Punya XP)</div>' +
          '<p class="text-xs sm:text-sm leading-relaxed">' + dilRes.analysis + '</p>' +
        '</div>'
      ) : '') +
    '</div>' +

    /* Filterable Real-World Use Case Blueprints */
    '<div class="space-y-4">' +
      '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">' +
        '<h2 class="text-xl font-bold font-serif-vedic">🛠️ Real-World Vedic Action Blueprints</h2>' +
        '<div class="flex flex-wrap gap-1.5">' +
          domains.map(function(d) {
            return '<button type="button" onclick="setUseCaseFilter(\'' + d + '\')" class="px-3 py-1.5 rounded-xl text-xs font-semibold ' +
              (d === curDomain ? 'v-btn-primary' : 'v-btn-outline') + '">' + d + '</button>';
          }).join('') +
        '</div>' +
      '</div>' +
      '<div class="grid grid-cols-1 md:grid-cols-2 gap-6">' +
        filtered.map(function(u) {
          return '<div class="v-card p-6 space-y-3">' +
            '<div class="flex items-center justify-between">' +
              '<span class="text-xs font-bold px-2.5 py-1 rounded-full v-badge">' + u.domain + '</span>' +
              '<span class="text-xs font-sanskrit opacity-80">' + u.shlokaRef + '</span>' +
            '</div>' +
            '<h3 class="text-lg font-bold font-serif-vedic">' + u.problem + '</h3>' +
            '<div class="text-xs font-semibold text-amber-600">Vedic Framework: ' + u.vedicConcept + '</div>' +
            '<p class="text-sm opacity-85 leading-relaxed">' + u.solution + '</p>' +
            '<div class="pt-2 space-y-1.5">' +
              '<div class="text-xs font-bold uppercase tracking-wider opacity-70">3-Step Daily Protocol:</div>' +
              u.steps.map(function(st, i) {
                return '<div class="text-xs flex items-start gap-2"><span class="font-bold text-amber-600">' + (i + 1) + '.</span><span>' + st + '</span></div>';
              }).join('') +
            '</div>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</div>' +
  '</div>';
}

function selectDilemma(idx) {
  window.VedantifyState.activeDilemmaIdx = idx;
  window.VedantifyState.dilemmaResult = null;
  renderActiveModule();
}

function evaluateDilemmaChoice(optionIdx) {
  var dilIdx = window.VedantifyState.activeDilemmaIdx % window.VEDANTIFY_DATA.dilemmas.length;
  var opt = window.VEDANTIFY_DATA.dilemmas[dilIdx].options[optionIdx];
  if (!opt) return;
  window.VedantifyState.dilemmaResult = opt;
  playSacredTone(opt.xp >= 40 ? 528 : 396, 0.5, 'sine');
  addPunyaXP(opt.xp, 'Completed Dharma Dilemma Analysis (' + opt.guna + ')');
  renderActiveModule();
}

function setUseCaseFilter(domain) {
  window.VedantifyState.useCaseFilter = domain;
  renderActiveModule();
}

/* 5. FAMOUS PREACHERS & PERSONALITIES MODULE */
function renderPreachersModule() {
  var list = window.VEDANTIFY_DATA.preachers;
  return '<div class="space-y-6">' +
    '<div class="v-card p-6">' +
      '<span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full v-badge">🧘‍♂️ Acharyas, Rishis & Awakened Masters</span>' +
      '<h1 class="text-2xl sm:text-3xl font-bold font-serif-vedic mt-2">Famous Preachers & Spiritual Personalities</h1>' +
      '<p class="text-sm opacity-80 mt-1">Explore the life stories, philosophies, and timeless works of Swami Vivekananda, Srila Prabhupada, Ramanujacharya, Maharshi Ashtavakra, Sant Kabir, Gautama Buddha, Adi Shankaracharya, and Sri Ramakrishna—enriched in real time via our Multi-API engine.</p>' +
    '</div>' +

    '<div class="grid grid-cols-1 md:grid-cols-2 gap-6">' +
      list.map(function(pr) {
        return '<div class="v-card p-6 flex flex-col justify-between">' +
          '<div>' +
            '<div class="flex items-start justify-between gap-3">' +
              '<div class="flex items-center gap-3">' +
                '<div class="w-12 h-12 rounded-2xl v-badge flex items-center justify-center text-2xl shrink-0">' + pr.avatarIcon + '</div>' +
                '<div>' +
                  '<h2 class="text-lg font-bold font-serif-vedic">' + pr.name + '</h2>' +
                  '<div class="text-xs opacity-75">' + pr.dates + ' • ' + pr.tradition + '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<blockquote class="mt-4 p-3 rounded-xl bg-amber-500/10 border-l-4 border-amber-500 text-xs italic">' +
              '"' + pr.quote + '"' +
            '</blockquote>' +
            '<p class="text-sm opacity-85 mt-3 leading-relaxed">' + pr.bio + '</p>' +
            '<div class="mt-3 space-y-1">' +
              '<div class="text-xs font-bold uppercase tracking-wider opacity-70">Core Teachings:</div>' +
              pr.teachings.map(function(t) {
                return '<div class="text-xs leading-snug">• ' + t + '</div>';
              }).join('') +
            '</div>' +
            '<div class="mt-3 text-xs opacity-75"><strong>Major Works:</strong> ' + pr.works + '</div>' +
          '</div>' +
          '<div class="mt-5 pt-3 border-t border-stone-200/50 flex flex-wrap gap-2">' +
            '<button type="button" onclick="openPreacherModal(\'' + pr.id + '\')" class="v-btn-primary px-4 py-2 text-xs">📖 Full Life Story & Live Wikipedia API</button>' +
          '</div>' +
        '</div>';
      }).join('') +
    '</div>' +
  '</div>';
}

async function openPreacherModal(preacherId) {
  var pr = window.VEDANTIFY_DATA.preachers.find(function(p) { return p.id === preacherId; });
  if (!pr) return;
  openUniversalModal(
    pr.avatarIcon + ' ' + pr.name + ' (' + pr.dates + ')',
    '<div class="space-y-4 text-sm">' +
      '<div class="text-xs font-semibold px-3 py-1.5 rounded-xl v-badge inline-block">' + pr.tradition + ' — ' + pr.title + '</div>' +
      '<blockquote class="p-3.5 rounded-xl bg-amber-500/10 border-l-4 border-amber-500 italic">"' + pr.quote + '"</blockquote>' +
      '<p class="leading-relaxed">' + pr.bio + '</p>' +
      '<div class="space-y-1.5">' +
        '<h4 class="font-bold text-xs uppercase tracking-wider">Pillar Teachings</h4>' +
        pr.teachings.map(function(t) { return '<p class="text-xs sm:text-sm">• ' + t + '</p>'; }).join('') +
      '</div>' +
      '<div id="preacher-live-api-box" class="p-3.5 rounded-xl border border-stone-300/60 text-xs">🔄 Fetching live encyclopedic enrichment from Multi-API Cluster...</div>' +
    '</div>'
  );
  var apiData = await window.VedantifyAPICluster.fetchTopicEnrichment(pr.wikiSlug, 'Famous Preachers', pr.bio);
  var box = document.getElementById('preacher-live-api-box');
  if (box) {
    box.innerHTML = '<div class="flex justify-between font-bold text-emerald-600 mb-1"><span>🌐 ' + apiData.tier + '</span><span>' + apiData.latencyMs + ' ms</span></div>' +
      '<p class="leading-relaxed opacity-90">' + apiData.extract + '</p>' +
      '<a href="' + apiData.url + '" target="_blank" rel="noopener noreferrer" class="inline-block mt-2 text-amber-600 font-semibold hover:underline">View Canonical Wikipedia Biography ↗</a>';
  }
}

/* 6. CHILD'S CORNER — GAMIFIED BAL SANSKAR WORLD */
function renderKidsModule() {
  var stars = window.VedantifyState.kidsStars;
  var rank = stars >= 150 ? '👑 Dharma Maharathi' : (stars >= 100 ? '🏹 Yuva Sadhaka' : '🌱 Bal Rishi Explorer');
  var qIdx = window.VedantifyState.activeKidsQuestIdx % window.VEDANTIFY_DATA.kidsQuests.length;
  var quest = window.VEDANTIFY_DATA.kidsQuests[qIdx];
  var fb = window.VedantifyState.kidsQuestFeedback;

  return '<div class="space-y-6">' +
    /* Hero Banner for Kids */
    '<div class="v-card p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">' +
      '<div class="lg:col-span-7 space-y-3">' +
        '<div class="flex flex-wrap items-center gap-2">' +
          '<span class="text-xs font-bold uppercase px-3 py-1 rounded-full v-badge">🦚 Child’s Corner • Gamified Bal Sanskar</span>' +
          '<span class="text-xs font-bold px-3 py-1 rounded-full bg-amber-500 text-white">⭐ ' + stars + ' Sanskar Stars</span>' +
          '<span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-600 text-white">' + rank + '</span>' +
        '</div>' +
        '<h1 class="text-2xl sm:text-3xl font-bold font-serif-vedic">Welcome to the Banyan Tree Gurukul of Moral Superpowers!</h1>' +
        '<p class="text-sm opacity-85 leading-relaxed">Complete interactive Panchatantra & Upanishad Moral Quests, check off your Daily Good Deeds, unlock Golden Badges, and print your official Bal Sanskar Merit Certificate!</p>' +
        '<div class="flex flex-wrap gap-2 pt-1">' +
          window.VedantifyState.kidsBadges.map(function(b) {
            return '<span class="px-3 py-1 rounded-xl text-xs font-semibold v-badge">' + b + '</span>';
          }).join('') +
          '<button type="button" onclick="openKidsCertificateModal()" class="v-btn-primary px-4 py-1.5 text-xs">🏆 View My Merit Certificate</button>' +
        '</div>' +
      '</div>' +
      '<div class="lg:col-span-5">' +
        '<img src="' + window.VEDANTIFY_KIDS_IMG + '" alt="Children learning under a banyan tree" class="w-full h-48 object-cover rounded-2xl border border-amber-500/40 shadow-md" />' +
      '</div>' +
    '</div>' +

    '<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">' +
      /* Interactive Story Quest Game */
      '<div class="lg:col-span-7 v-card p-6 space-y-4">' +
        '<div class="flex items-center justify-between gap-2">' +
          '<span class="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full v-badge">🎮 Interactive Moral Story Quest</span>' +
          '<div class="flex gap-1.5">' +
            window.VEDANTIFY_DATA.kidsQuests.map(function(kq, i) {
              return '<button type="button" onclick="selectKidsQuest(' + i + ')" class="px-2.5 py-1 rounded-lg text-xs font-bold ' +
                (i === qIdx ? 'v-btn-primary' : 'v-btn-outline') + '">#' + (i + 1) + '</button>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<h2 class="text-xl font-bold font-serif-vedic">' + quest.title + '</h2>' +
        '<div class="text-xs font-semibold text-amber-600">Superpower Virtue: ' + quest.virtue + ' • Reward: +' + quest.stars + ' ⭐ & ' + quest.badge + '</div>' +
        '<p class="text-sm leading-relaxed p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25">' + quest.story + '</p>' +
        '<div class="space-y-2.5">' +
          quest.choices.map(function(c, cIdx) {
            return '<button type="button" onclick="answerKidsQuest(' + cIdx + ')" class="w-full text-left p-3.5 rounded-xl border border-stone-300/80 hover:border-amber-500 text-xs sm:text-sm font-medium transition flex items-center justify-between gap-2">' +
              '<span>' + c.text + '</span>' +
              '<span class="px-2.5 py-1 rounded-lg v-badge text-xs shrink-0">Choose</span>' +
            '</button>';
          }).join('') +
        '</div>' +
        (fb ? (
          '<div class="p-4 rounded-2xl text-xs sm:text-sm font-semibold ' + (fb.correct ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-700' : 'bg-rose-500/15 border border-rose-500/40 text-rose-700') + '">' +
            fb.text +
          '</div>'
        ) : '') +
      '</div>' +

      /* Kids Daily Good Deeds Board */
      '<div class="lg:col-span-5 v-card p-6 space-y-4">' +
        '<h2 class="text-lg font-bold font-serif-vedic">🌟 Daily Good Deeds Board (Bal Dinacharya)</h2>' +
        '<p class="text-xs opacity-75">Tap each good deed you completed today to collect Sanskar Stars!</p>' +
        '<div class="space-y-2.5">' +
          window.VEDANTIFY_DATA.kidsHabits.map(function(kh) {
            return '<div onclick="toggleKidsHabit(\'' + kh.id + '\')" class="p-3 rounded-xl border cursor-pointer transition flex items-center justify-between gap-3 ' +
              (kh.done ? 'bg-emerald-500/10 border-emerald-500/40' : 'border-stone-200/80 hover:border-amber-500') + '">' +
              '<div class="flex items-center gap-2.5">' +
                '<span class="text-lg">' + kh.icon + '</span>' +
                '<span class="text-xs font-semibold ' + (kh.done ? 'line-through opacity-65' : '') + '">' + kh.title + '</span>' +
              '</div>' +
              '<span class="text-xs font-bold px-2 py-0.5 rounded-full v-badge shrink-0">+' + kh.stars + ' ⭐</span>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function selectKidsQuest(idx) {
  window.VedantifyState.activeKidsQuestIdx = idx;
  window.VedantifyState.kidsQuestFeedback = null;
  renderActiveModule();
}

function answerKidsQuest(choiceIdx) {
  var qIdx = window.VedantifyState.activeKidsQuestIdx % window.VEDANTIFY_DATA.kidsQuests.length;
  var quest = window.VEDANTIFY_DATA.kidsQuests[qIdx];
  var choice = quest.choices[choiceIdx];
  if (!choice) return;
  window.VedantifyState.kidsQuestFeedback = { correct: choice.correct, text: choice.feedback };
  if (choice.correct) {
    playTempleBell();
    window.VedantifyState.kidsStars += quest.stars;
    if (!window.VedantifyState.kidsBadges.includes(quest.badge)) {
      window.VedantifyState.kidsBadges.push(quest.badge);
    }
    addPunyaXP(quest.stars, 'Kids Moral Quest Completed: ' + quest.virtue);
  } else {
    playSacredTone(240, 0.3, 'triangle');
  }
  saveState();
  renderActiveModule();
}

function toggleKidsHabit(habitId) {
  var h = window.VEDANTIFY_DATA.kidsHabits.find(function(k) { return k.id === habitId; });
  if (!h) return;
  h.done = !h.done;
  if (h.done) {
    playSacredTone(528, 0.4, 'sine');
    window.VedantifyState.kidsStars += h.stars;
    addPunyaXP(h.stars, 'Bal Sanskar Good Deed: ' + h.title);
  }
  saveState();
  renderActiveModule();
}

function openKidsCertificateModal() {
  var stars = window.VedantifyState.kidsStars;
  openUniversalModal(
    '🏆 Official Bal Sanskar Merit Scroll',
    '<div class="p-6 rounded-2xl border-4 border-double border-amber-500 text-center space-y-3 bg-amber-500/5">' +
      '<div class="text-3xl">🕉️ 🦚 🏆</div>' +
      '<div class="text-xs font-bold uppercase tracking-widest text-amber-600">Vedantify Gurukul of Moral Excellence</div>' +
      '<h3 class="text-2xl font-bold font-serif-vedic">Certificate of Dharmic Character</h3>' +
      '<p class="text-xs opacity-80">This certifies that young seeker</p>' +
      '<div class="text-xl font-bold text-amber-600 underline">' + window.VedantifyState.currentUser.name + '</div>' +
      '<p class="text-xs leading-relaxed max-w-md mx-auto">has practiced Satya (Truth), Ahimsa (Kindness), Maitri (Friendship), and Ekagrata (Focus), earning <strong>' + stars + ' Sanskar Stars</strong> and <strong>' + window.VedantifyState.kidsBadges.length + ' Virtue Badges</strong>.</p>' +
      '<div class="flex flex-wrap justify-center gap-2 py-2">' +
        window.VedantifyState.kidsBadges.map(function(b) { return '<span class="px-3 py-1 rounded-full text-xs font-bold v-badge">' + b + '</span>'; }).join('') +
      '</div>' +
      '<div class="pt-3 text-[11px] opacity-70">Issued by Vedantify Bal Sanskar Academy • Satyameva Jayate</div>' +
    '</div>'
  );
}

/* 7. SPIRITUALITY & METACOGNITION LAB MODULE */
var _pranayamaTimer = null;
function renderSpiritualityModule() {
  var curMantra = window.VEDANTIFY_DATA.mantras.find(function(m) { return m.id === window.VedantifyState.selectedMantraId; }) || window.VEDANTIFY_DATA.mantras[0];
  var ks = window.VedantifyState.koshaScores;
  var avgKosha = Math.round((ks.annamaya + ks.pranamaya + ks.manomaya + ks.vijnanamaya + ks.anandamaya) / 5);

  return '<div class="space-y-8">' +
    '<div class="v-card p-6">' +
      '<span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full v-badge">🪷 Antahkarana & Sakshi Bhava Laboratory</span>' +
      '<h1 class="text-2xl sm:text-3xl font-bold font-serif-vedic mt-2">Spirituality, Pranayama & Metacognition Studio</h1>' +
      '<p class="text-sm opacity-80 mt-1">Harmonize breath (Prana), mantra vibration (Nada), the five sheaths of consciousness (Pancha Kosha), and witness-awareness journaling (Svadhyaya).</p>' +
    '</div>' +

    '<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">' +
      /* Pranayama Lotus Breathing Studio */
      '<div class="lg:col-span-6 v-card p-6 flex flex-col justify-between items-center text-center">' +
        '<div class="w-full flex items-center justify-between mb-2">' +
          '<span class="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full v-badge">🌬️ Pranayama Breath Visualizer</span>' +
          '<span class="text-xs font-semibold">Cycles: ' + window.VedantifyState.pranayamaCycles + '</span>' +
        '</div>' +
        '<div class="my-6 relative flex items-center justify-center w-48 h-48">' +
          '<div id="pranayama-lotus-orb" class="breath-orb w-36 h-36 rounded-full flex flex-col items-center justify-center text-white shadow-xl" style="background: var(--v-gradient);">' +
            '<span class="text-2xl">🪷</span>' +
            '<span id="pranayama-phase-label" class="text-xs font-bold mt-1 px-2">' + window.VedantifyState.pranayamaPhase + '</span>' +
          '</div>' +
        '</div>' +
        '<p class="text-xs opacity-75 max-w-md mb-4">Inhale (Puraka) for 4s → Hold (Kumbhaka) for 4s → Exhale slowly (Rechaka) for 6s to activate parasympathetic vagal calm and witness stillness.</p>' +
        '<div class="flex flex-wrap justify-center gap-2.5 w-full">' +
          '<button type="button" onclick="togglePranayamaSession()" class="v-btn-primary px-5 py-2.5 text-xs">' +
            (window.VedantifyState.pranayamaRunning ? '⏸ Pause Breath Guide' : '▶️ Start Guided Pranayama') +
          '</button>' +
          '<button type="button" onclick="playSacredTone(432, 2.2, \'sine\')" class="v-btn-outline px-4 py-2.5 text-xs">🔔 432 Hz Om Resonance</button>' +
        '</div>' +
      '</div>' +

      /* Digital 108-Bead Rudraksha Japa Mala */
      '<div class="lg:col-span-6 v-card p-6 flex flex-col justify-between">' +
        '<div>' +
          '<div class="flex items-center justify-between gap-2 mb-3">' +
            '<span class="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full v-badge">📿 Digital 108-Bead Japa Mala</span>' +
            '<span class="text-xs font-bold text-amber-600">Malas Completed: ' + window.VedantifyState.japaMalasCompleted + '</span>' +
          '</div>' +
          '<div class="flex flex-wrap gap-1.5 mb-3">' +
            window.VEDANTIFY_DATA.mantras.map(function(m) {
              return '<button type="button" onclick="selectMantra(\'' + m.id + '\')" class="px-2.5 py-1 rounded-lg text-xs font-semibold ' +
                (m.id === curMantra.id ? 'v-btn-primary' : 'v-btn-outline') + '">' + m.name.split(' (')[0] + '</button>';
            }).join('') +
          '</div>' +
          '<div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-1.5">' +
            '<div class="text-lg sm:text-xl font-bold font-sanskrit">' + curMantra.sanskrit + '</div>' +
            '<p class="text-xs opacity-80">' + curMantra.meaning + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="my-4 flex items-center justify-between gap-4 p-4 rounded-2xl border border-stone-200/70">' +
          '<div>' +
            '<div class="text-xs uppercase opacity-70">Current Bead Count</div>' +
            '<div class="text-3xl font-extrabold font-serif-vedic text-amber-600">' + window.VedantifyState.japaCount + ' <span class="text-sm font-normal opacity-70">/ 108</span></div>' +
          '</div>' +
          '<div class="flex gap-2">' +
            '<button type="button" onclick="advanceJapaBead()" class="v-btn-primary px-6 py-3 text-sm shadow-md">📿 Pull Bead (+1)</button>' +
            '<button type="button" onclick="resetJapaMala()" class="v-btn-outline px-3 py-3 text-xs">Reset</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +

    /* Pancha Kosha Self-Audit & Metacognitive Witness Journal */
    '<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">' +
      '<div class="lg:col-span-5 v-card p-6 space-y-4">' +
        '<div class="flex items-center justify-between">' +
          '<h2 class="text-lg font-bold font-serif-vedic">🧬 Pancha Kosha Alignment</h2>' +
          '<span class="text-xs font-bold px-2.5 py-1 rounded-full v-badge">Harmony: ' + avgKosha + '%</span>' +
        '</div>' +
        '<p class="text-xs opacity-75">Taittiriya Upanishad maps 5 concentric sheaths around the Atman. Adjust sliders to audit your present state:</p>' +
        [
          { key: 'annamaya', label: '1. Annamaya Kosha (Physical Body & Rest)' },
          { key: 'pranamaya', label: '2. Pranamaya Kosha (Vital Breath & Energy)' },
          { key: 'manomaya', label: '3. Manomaya Kosha (Emotional Calm)' },
          { key: 'vijnanamaya', label: '4. Vijnanamaya Kosha (Clarity & Viveka)' },
          { key: 'anandamaya', label: '5. Anandamaya Kosha (Inner Contentment)' }
        ].map(function(k) {
          var val = ks[k.key];
          return '<div class="space-y-1">' +
            '<div class="flex justify-between text-xs font-semibold"><span>' + k.label + '</span><span>' + val + '%</span></div>' +
            '<input type="range" min="10" max="100" value="' + val + '" oninput="updateKoshaScore(\'' + k.key + '\', this.value)" class="w-full accent-amber-600 cursor-pointer" />' +
          '</div>';
        }).join('') +
      '</div>' +

      '<div class="lg:col-span-7 v-card p-6 space-y-4">' +
        '<h2 class="text-lg font-bold font-serif-vedic">🪞 Sakshi Bhava Metacognitive Thought Deconstructor</h2>' +
        '<p class="text-xs opacity-75">Observe a reactive thought, tag its underlying Klesha (cognitive distortion), and reframe it from the perspective of the unchanging Witness (Sakshi):</p>' +
        '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">' +
          '<input id="meta-thought-input" type="text" placeholder="Passing thought (e.g., I felt slighted in today’s meeting)" class="px-3.5 py-2.5 rounded-xl border border-stone-300 bg-transparent text-xs" />' +
          '<select id="meta-klesha-select" class="px-3.5 py-2.5 rounded-xl border border-stone-300 bg-transparent text-xs">' +
            '<option value="Asmita (Ego-Identification)">Klesha: Asmita (Ego-Identification)</option>' +
            '<option value="Raga (Compulsive Craving)">Klesha: Raga (Compulsive Craving)</option>' +
            '<option value="Dvesha (Aversion / Irritation)">Klesha: Dvesha (Aversion / Irritation)</option>' +
            '<option value="Abhinivesha (Fear / Anxiety)">Klesha: Abhinivesha (Fear / Anxiety)</option>' +
            '<option value="Avidya (Overlooking the Whole)">Klesha: Avidya (Overlooking the Whole)</option>' +
          '</select>' +
        '</div>' +
        '<div class="flex gap-2">' +
          '<input id="meta-reframe-input" type="text" placeholder="Upanishadic Reframe (e.g., I am the Witness observing this passing wave with equanimity)" class="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-300 bg-transparent text-xs" />' +
          '<button type="button" onclick="saveMetacognitionEntry()" class="v-btn-primary px-4 py-2.5 text-xs shrink-0">Save Reflection (+30 XP)</button>' +
        '</div>' +
        '<div class="space-y-2 pt-2 max-h-48 overflow-y-auto">' +
          window.VedantifyState.journalEntries.map(function(je) {
            return '<div class="p-3 rounded-xl border border-stone-200/70 text-xs space-y-1">' +
              '<div class="flex justify-between font-semibold"><span class="text-amber-600">' + je.klesha + '</span><span class="opacity-60">' + je.date + '</span></div>' +
              '<div><strong>Observed Thought:</strong> "' + je.thought + '"</div>' +
              '<div class="text-emerald-700"><strong>Sakshi Reframe:</strong> ' + je.reframe + '</div>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function togglePranayamaSession() {
  window.VedantifyState.pranayamaRunning = !window.VedantifyState.pranayamaRunning;
  if (!window.VedantifyState.pranayamaRunning) {
    if (_pranayamaTimer) clearInterval(_pranayamaTimer);
    _pranayamaTimer = null;
    window.VedantifyState.pranayamaPhase = 'Paused';
    renderActiveModule();
    return;
  }
  var step = 0;
  var phases = [
    { label: 'Puraka • Inhale (4s)', scale: 'scale(1.28)' },
    { label: 'Antara Kumbhaka • Hold (4s)', scale: 'scale(1.28)' },
    { label: 'Rechaka • Slow Exhale (6s)', scale: 'scale(0.88)' }
  ];
  function runStep() {
    var p = phases[step % 3];
    window.VedantifyState.pranayamaPhase = p.label;
    if (step > 0 && step % 3 === 0) {
      window.VedantifyState.pranayamaCycles++;
      addPunyaXP(15, 'Completed Pranayama Breath Cycle');
    }
    playSacredTone(step % 3 === 0 ? 432 : (step % 3 === 1 ? 528 : 396), 0.6, 'sine');
    var orb = document.getElementById('pranayama-lotus-orb');
    var lbl = document.getElementById('pranayama-phase-label');
    if (orb) orb.style.transform = p.scale;
    if (lbl) lbl.textContent = p.label;
    step++;
  }
  runStep();
  _pranayamaTimer = setInterval(runStep, 4000);
}

function selectMantra(mantraId) {
  window.VedantifyState.selectedMantraId = mantraId;
  var m = window.VEDANTIFY_DATA.mantras.find(function(x) { return x.id === mantraId; });
  if (m) playSacredTone(m.freq, 0.7, 'sine');
  renderActiveModule();
}

function advanceJapaBead() {
  var m = window.VEDANTIFY_DATA.mantras.find(function(x) { return x.id === window.VedantifyState.selectedMantraId; }) || window.VEDANTIFY_DATA.mantras[0];
  window.VedantifyState.japaCount++;
  if (window.VedantifyState.japaCount >= 108) {
    window.VedantifyState.japaCount = 0;
    window.VedantifyState.japaMalasCompleted++;
    playTempleBell();
    addPunyaXP(108, 'Completed Full 108-Bead Japa Mala!');
  } else {
    playSacredTone(m.freq, 0.12, 'triangle');
  }
  renderActiveModule();
}

function resetJapaMala() {
  window.VedantifyState.japaCount = 0;
  renderActiveModule();
}

function updateKoshaScore(key, val) {
  window.VedantifyState.koshaScores[key] = parseInt(val, 10) || 75;
  renderActiveModule();
}

function saveMetacognitionEntry() {
  var tEl = document.getElementById('meta-thought-input');
  var kEl = document.getElementById('meta-klesha-select');
  var rEl = document.getElementById('meta-reframe-input');
  if (!tEl || !rEl) return;
  var thought = tEl.value.trim();
  var reframe = rEl.value.trim();
  if (!thought || !reframe) {
    showToast('Please enter both your observed thought and your Upanishadic reframe.', 'warn');
    return;
  }
  window.VedantifyState.journalEntries.unshift({
    id: 'je-' + Date.now(),
    date: 'Just now',
    thought: thought,
    klesha: kEl ? kEl.value : 'Asmita',
    reframe: reframe
  });
  saveState();
  addPunyaXP(30, 'Logged Sakshi Bhava Metacognitive Inquiry');
  renderActiveModule();
}

/* 8. QUIZZES & "TEST YOUR WISDOM" ARENA */
function renderQuizzesModule() {
  var mode = window.VedantifyState.quizMode;
  var qList = window.VEDANTIFY_DATA.quizzes;
  var qIdx = window.VedantifyState.quizIndex % qList.length;
  var curQ = qList[qIdx];
  var ans = window.VedantifyState.quizAnswered;
  var wRes = window.VedantifyState.wisdomResult;

  return '<div class="space-y-6">' +
    '<div class="v-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">' +
      '<div>' +
        '<span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full v-badge">🏹 Shastra Pariksha & Pragya Assessment</span>' +
        '<h1 class="text-2xl sm:text-3xl font-bold font-serif-vedic mt-2">Quizzes & "Test Your Wisdom" Arena</h1>' +
      '</div>' +
      '<div class="flex flex-wrap gap-2">' +
        '<button type="button" onclick="switchQuizMode(\'shastra\')" class="px-4 py-2 rounded-xl text-xs font-semibold ' + (mode === 'shastra' ? 'v-btn-primary' : 'v-btn-outline') + '">📚 Shastra Knowledge Quiz</button>' +
        '<button type="button" onclick="switchQuizMode(\'wisdom\')" class="px-4 py-2 rounded-xl text-xs font-semibold ' + (mode === 'wisdom' ? 'v-btn-primary' : 'v-btn-outline') + '">🧭 Test Your Wisdom (Guna Analyzer)</button>' +
        '<button type="button" onclick="syncLiveQuizBank()" class="px-3.5 py-2 rounded-xl text-xs font-semibold v-btn-outline">🔄 Multi-API Sync</button>' +
      '</div>' +
    '</div>' +

    (mode === 'shastra' ? (
      '<div class="v-card p-6 sm:p-8 space-y-5">' +
        '<div class="flex flex-wrap items-center justify-between gap-2">' +
          '<span class="text-xs font-bold px-3 py-1 rounded-full v-badge">Question ' + (qIdx + 1) + ' of ' + qList.length + ' • ' + curQ.category + ' (' + curQ.difficulty + ')</span>' +
          '<span class="text-sm font-bold text-amber-600">Current Quiz Score: ' + window.VedantifyState.quizScore + ' pts</span>' +
        '</div>' +
        '<h2 class="text-xl font-bold font-serif-vedic">' + curQ.question + '</h2>' +
        '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">' +
          curQ.options.map(function(opt, i) {
            var btnStyle = 'v-btn-outline';
            if (ans !== null) {
              if (i === curQ.correctIndex) btnStyle = 'bg-emerald-600 text-white border-emerald-600';
              else if (i === ans) btnStyle = 'bg-rose-600 text-white border-rose-600';
            }
            return '<button type="button" onclick="submitShastraQuizAnswer(' + i + ')" class="p-4 rounded-xl text-left text-sm font-medium border transition ' + btnStyle + '">' +
              '<span class="font-bold mr-2">' + String.fromCharCode(65 + i) + '.</span>' + opt +
            '</button>';
          }).join('') +
        '</div>' +
        (ans !== null ? (
          '<div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm space-y-2">' +
            '<div class="font-bold">' + (ans === curQ.correctIndex ? '✅ Uttamam! Correct Answer (+30 XP)' : '💡 Scriptural Insight:') + '</div>' +
            '<p>' + curQ.explanation + '</p>' +
            '<button type="button" onclick="nextShastraQuestion()" class="v-btn-primary px-4 py-2 text-xs mt-2">Next Question →</button>' +
          '</div>'
        ) : '') +
      '</div>'
    ) : (
      /* Test Your Wisdom Mode */
      '<div class="v-card p-6 sm:p-8 space-y-6">' +
        '<div>' +
          '<h2 class="text-xl font-bold font-serif-vedic">🧭 Pragya & Triguna Wisdom Assessment (Bhagavad Gita Ch. 14 & 17)</h2>' +
          '<p class="text-xs opacity-75 mt-1">Select the response that most honestly reflects your habitual reaction in each life situation to compute your Sattva-Rajas-Tamas balance:</p>' +
        '</div>' +
        '<div class="space-y-5">' +
          window.VEDANTIFY_DATA.wisdomTestQuestions.map(function(wq, wIdx) {
            var picked = window.VedantifyState.wisdomAnswers[wIdx];
            return '<div class="p-4 rounded-2xl border border-stone-200/70 space-y-2.5">' +
              '<div class="font-bold text-sm">' + wq.q + '</div>' +
              '<div class="space-y-2">' +
                wq.choices.map(function(ch, cIdx) {
                  var isSel = picked === cIdx;
                  return '<button type="button" onclick="selectWisdomOption(' + wIdx + ', ' + cIdx + ')" class="w-full text-left p-3 rounded-xl text-xs sm:text-sm border transition ' +
                    (isSel ? 'v-btn-primary' : 'v-btn-outline') + '">' + ch.text + '</button>';
                }).join('') +
              '</div>' +
            '</div>';
          }).join('') +
        '</div>' +
        '<button type="button" onclick="calculateWisdomAssessment()" class="v-btn-primary px-6 py-3 text-sm">✨ Compute My Vedic Wisdom & Guna Profile</button>' +
        (wRes ? (
          '<div class="p-6 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/40 space-y-2">' +
            '<div class="text-xs font-bold uppercase tracking-wider text-emerald-700">Your Personal Triguna & Metacognition Report</div>' +
            '<h3 class="text-xl font-bold font-serif-vedic">' + wRes.archetype + ' (Wisdom Quotient: ' + wRes.scorePct + '%)</h3>' +
            '<p class="text-sm leading-relaxed">' + wRes.summary + '</p>' +
          '</div>'
        ) : '') +
      '</div>'
    )) +
  '</div>';
}

function switchQuizMode(mode) {
  window.VedantifyState.quizMode = mode;
  renderActiveModule();
}

function submitShastraQuizAnswer(idx) {
  if (window.VedantifyState.quizAnswered !== null) return;
  window.VedantifyState.quizAnswered = idx;
  var qList = window.VEDANTIFY_DATA.quizzes;
  var curQ = qList[window.VedantifyState.quizIndex % qList.length];
  if (idx === curQ.correctIndex) {
    window.VedantifyState.quizScore += 30;
    playTempleBell();
    addPunyaXP(30, 'Solved Shastra Quiz Question');
  } else {
    playSacredTone(240, 0.3, 'triangle');
  }
  renderActiveModule();
}

function nextShastraQuestion() {
  window.VedantifyState.quizIndex = (window.VedantifyState.quizIndex + 1) % window.VEDANTIFY_DATA.quizzes.length;
  window.VedantifyState.quizAnswered = null;
  renderActiveModule();
}

function selectWisdomOption(qIdx, cIdx) {
  window.VedantifyState.wisdomAnswers[qIdx] = cIdx;
  renderActiveModule();
}

function calculateWisdomAssessment() {
  var qs = window.VEDANTIFY_DATA.wisdomTestQuestions;
  var total = 0;
  var sattvaCount = 0;
  for (var i = 0; i < qs.length; i++) {
    var pick = window.VedantifyState.wisdomAnswers[i];
    var choice = qs[i].choices[typeof pick === 'number' ? pick : 0];
    total += choice.score;
    if (choice.guna === 'sattva') sattvaCount++;
  }
  var pct = Math.round((total / (qs.length * 10)) * 100);
  var arch = sattvaCount >= 4
    ? 'Sthita-Prajna Explorer (High Sattvic Clarity & Witness Awareness)'
    : (sattvaCount >= 2 ? 'Karmayogi in Training (Balancing Dynamic Rajas with Rising Sattva)' : 'Emerging Sadhaka (Awakening from Tamas/Rajas through Daily Sankalpa)');
  window.VedantifyState.wisdomResult = {
    scorePct: pct,
    archetype: arch,
    summary: 'Based on Bhagavad Gita Chapters 14 and 18, your responses show ' + pct + '% alignment with Sattvic metacognition. Recommended practice: 10 minutes of daily Sakshi breath observation and studying Katha Upanishad.'
  };
  playTempleBell();
  addPunyaXP(45, 'Completed Triguna Wisdom Assessment');
  renderActiveModule();
}

async function syncLiveQuizBank() {
  var res = await window.VedantifyAPICluster.syncDynamicQuizQuestions();
  showToast('🔄 Quiz Bank Verified via ' + res.tier + ' (' + res.latency + 'ms)', 'info');
}

/* 9. BLOGS & PHILOSOPHICAL TREATISES MODULE */
function renderBlogsModule() {
  var cats = ['All', 'Metacognition & Neuroscience', 'Temple Science & Heritage', 'Vedic Science & Language', 'Ayurveda & Daily Living'];
  var curCat = window.VedantifyState.blogCategory;
  var filtered = window.VEDANTIFY_DATA.blogs.filter(function(b) {
    return curCat === 'All' || b.category === curCat;
  });

  return '<div class="space-y-6">' +
    '<div class="v-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">' +
      '<div>' +
        '<span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full v-badge">✍️ Vichar & Shastra-Manana</span>' +
        '<h1 class="text-2xl sm:text-3xl font-bold font-serif-vedic mt-2">Vedic Blogs & Research Essays</h1>' +
        '<p class="text-sm opacity-80 mt-1">Deep explorations at the intersection of Upanishadic philosophy, cognitive science, temple acoustics, and daily living.</p>' +
      '</div>' +
      '<button type="button" onclick="openPublishBlogModal()" class="v-btn-primary px-4 py-2.5 text-xs shrink-0">➕ Write & Publish Blog</button>' +
    '</div>' +

    '<div class="flex flex-wrap gap-2">' +
      cats.map(function(c) {
        return '<button type="button" onclick="setBlogCategory(\'' + c + '\')" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold ' +
          (c === curCat ? 'v-btn-primary' : 'v-btn-outline') + '">' + c + '</button>';
      }).join('') +
    '</div>' +

    '<div class="grid grid-cols-1 md:grid-cols-2 gap-6">' +
      filtered.map(function(b) {
        return '<div class="v-card p-6 flex flex-col justify-between">' +
          '<div>' +
            '<div class="flex items-center justify-between text-xs mb-2">' +
              '<span class="px-2.5 py-1 rounded-full v-badge font-semibold">' + b.category + '</span>' +
              '<span class="opacity-70">' + b.date + ' • ' + b.readTime + '</span>' +
            '</div>' +
            '<h2 class="text-xl font-bold font-serif-vedic">' + b.title + '</h2>' +
            '<div class="text-xs opacity-75 mt-1">By ' + b.author + '</div>' +
            '<p class="text-sm opacity-85 mt-3 leading-relaxed">' + b.summary + '</p>' +
          '</div>' +
          '<div class="mt-5 pt-3 border-t border-stone-200/50 flex items-center justify-between">' +
            '<button type="button" onclick="openBlogReaderModal(\'' + b.id + '\')" class="v-btn-primary px-4 py-2 text-xs">📖 Read Full Essay</button>' +
            '<button type="button" onclick="likeBlogPost(\'' + b.id + '\')" class="v-btn-outline px-3 py-1.5 text-xs">🙏 ' + b.likes + ' Appreciations</button>' +
          '</div>' +
        '</div>';
      }).join('') +
    '</div>' +
  '</div>';
}

function setBlogCategory(cat) {
  window.VedantifyState.blogCategory = cat;
  renderActiveModule();
}

function likeBlogPost(blogId) {
  var b = window.VEDANTIFY_DATA.blogs.find(function(x) { return x.id === blogId; });
  if (!b) return;
  b.likes++;
  addPunyaXP(10, 'Appreciated Vedic Essay');
  renderActiveModule();
}

function openBlogReaderModal(blogId) {
  var b = window.VEDANTIFY_DATA.blogs.find(function(x) { return x.id === blogId; });
  if (!b) return;
  openUniversalModal(
    '✍️ ' + b.title,
    '<div class="space-y-4 text-sm leading-relaxed">' +
      '<div class="text-xs opacity-75">' + b.author + ' • ' + b.date + ' • ' + b.category + '</div>' +
      b.content.map(function(p) { return '<p>' + p + '</p>'; }).join('') +
    '</div>'
  );
}

function openPublishBlogModal() {
  openUniversalModal(
    '✍️ Publish a New Community Vedic Essay',
    '<div class="space-y-3 text-xs sm:text-sm">' +
      '<input id="new-blog-title" type="text" placeholder="Essay Title (e.g., How Karma Yoga Transformed My Engineering Workflow)" class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-transparent" />' +
      '<input id="new-blog-cat" type="text" value="Metacognition & Neuroscience" class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-transparent" />' +
      '<textarea id="new-blog-body" rows="4" placeholder="Write your reflection or scriptural analysis..." class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-transparent"></textarea>' +
      '<button type="button" onclick="submitNewBlogPost()" class="v-btn-primary px-5 py-2.5 text-xs">Publish to Vedantify (+50 XP)</button>' +
    '</div>'
  );
}

function submitNewBlogPost() {
  var tEl = document.getElementById('new-blog-title');
  var cEl = document.getElementById('new-blog-cat');
  var bEl = document.getElementById('new-blog-body');
  if (!tEl || !bEl || !tEl.value.trim() || !bEl.value.trim()) {
    showToast('Please enter a title and essay body.', 'warn');
    return;
  }
  window.VEDANTIFY_DATA.blogs.unshift({
    id: 'b-' + Date.now(),
    title: tEl.value.trim(),
    author: window.VedantifyState.currentUser.name,
    date: 'Just Now',
    category: (cEl && cEl.value.trim()) || 'Metacognition & Neuroscience',
    readTime: '4 min read',
    likes: 1,
    summary: bEl.value.trim().slice(0, 160) + '...',
    content: [bEl.value.trim()]
  });
  closeUniversalModal();
  addPunyaXP(50, 'Published Community Vedic Blog Post');
  renderActiveModule();
}

/* 10. SANATANA DHARMA & CULTURAL NEWS MODULE */
function renderNewsModule() {
  var cats = ['All', 'Temple Pranpratisthana', 'Kumbh Mela & Sacred Gatherings', 'Strange Happenings & Mysteries', 'Heritage & Commoner Experiences'];
  var curCat = window.VedantifyState.newsCategory;
  var filtered = window.VEDANTIFY_DATA.news.filter(function(n) {
    return curCat === 'All' || n.category === curCat;
  });

  return '<div class="space-y-6">' +
    '<div class="v-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">' +
      '<div>' +
        '<span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full v-badge">📰 Multi-API Sanatana Dharma News & Chronicles</span>' +
        '<h1 class="text-2xl sm:text-3xl font-bold font-serif-vedic mt-2">Temple Pranpratisthana, Kumbh Mela & Unexplained Phenomena</h1>' +
        '<p class="text-sm opacity-80 mt-1">Live cultural dispatches, archaeological discoveries, and unexplained architectural marvels across the Hindu world.</p>' +
      '</div>' +
      '<button type="button" onclick="triggerGlobalAPISync()" class="v-btn-primary px-4 py-2.5 text-xs shrink-0">🔄 Refresh Multi-API News Feeds</button>' +
    '</div>' +

    '<div class="flex flex-wrap gap-2">' +
      cats.map(function(c) {
        return '<button type="button" onclick="setNewsCategory(\'' + c + '\')" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold ' +
          (c === curCat ? 'v-btn-primary' : 'v-btn-outline') + '">' + c + '</button>';
      }).join('') +
    '</div>' +

    '<div class="grid grid-cols-1 md:grid-cols-2 gap-6">' +
      filtered.map(function(n) {
        return '<div class="v-card p-6 flex flex-col justify-between">' +
          '<div>' +
            '<div class="flex items-center justify-between text-xs mb-2">' +
              '<span class="px-2.5 py-1 rounded-full v-badge font-semibold">' + n.category + '</span>' +
              '<span class="opacity-70">📍 ' + n.location + ' • ' + n.date + '</span>' +
            '</div>' +
            '<h2 class="text-lg sm:text-xl font-bold font-serif-vedic">' + n.title + '</h2>' +
            '<p class="text-sm opacity-85 mt-3 leading-relaxed">' + n.summary + '</p>' +
            '<p class="text-xs opacity-75 mt-2.5 leading-relaxed">' + n.details + '</p>' +
          '</div>' +
          '<div class="mt-5 pt-3 border-t border-stone-200/50 flex flex-wrap gap-2">' +
            '<button type="button" onclick="fetchEpicLiveAPI(\'' + n.wikiSlug + '\', \'' + n.title.slice(0, 36).replace(/'/g, '') + '\')" class="v-btn-primary px-4 py-2 text-xs">🌐 Fetch Live API Background</button>' +
            '<a href="' + n.sourceUrl + '" target="_blank" rel="noopener noreferrer" class="v-btn-outline px-3.5 py-2 text-xs">Source Reference ↗</a>' +
          '</div>' +
        '</div>';
      }).join('') +
    '</div>' +
  '</div>';
}

function setNewsCategory(cat) {
  window.VedantifyState.newsCategory = cat;
  renderActiveModule();
}

/* 11. COMMUNITY SERVICE (VISHWA SEVA PORTAL) */
function renderSevaModule() {
  var regions = ['All', 'India', 'Abroad / Global', 'Remote / Digital'];
  var curReg = window.VedantifyState.sevaRegion;
  var filtered = window.VEDANTIFY_DATA.sevaCampaigns.filter(function(sv) {
    return curReg === 'All' || sv.region === curReg;
  });

  return '<div class="space-y-6">' +
    '<div class="v-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">' +
      '<div>' +
        '<span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full v-badge">🤝 Vishwa Seva & Nishkama Karma Action</span>' +
        '<h1 class="text-2xl sm:text-3xl font-bold font-serif-vedic mt-2">Community Service (India & Global Enrollment)</h1>' +
        '<p class="text-sm opacity-80 mt-1">"Atmano mokshartham jagad hitaya cha" — For one’s own liberation and for the welfare of the world. Enrol in active Seva drives near you or online.</p>' +
      '</div>' +
      '<div class="flex flex-wrap gap-2">' +
        regions.map(function(r) {
          return '<button type="button" onclick="setSevaRegion(\'' + r + '\')" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold ' +
            (r === curReg ? 'v-btn-primary' : 'v-btn-outline') + '">' + r + '</button>';
        }).join('') +
      '</div>' +
    '</div>' +

    '<div class="grid grid-cols-1 md:grid-cols-2 gap-6">' +
      filtered.map(function(sv) {
        var enrolled = window.VedantifyState.enrolledSevaIds.includes(sv.id);
        var pct = Math.min(100, Math.round((sv.volunteersEnrolled / sv.goalVolunteers) * 100));
        return '<div class="v-card p-6 flex flex-col justify-between">' +
          '<div>' +
            '<div class="flex items-center justify-between text-xs mb-2">' +
              '<span class="px-2.5 py-1 rounded-full v-badge font-semibold">' + sv.category + '</span>' +
              '<span class="font-semibold text-amber-600">' + sv.region + ' • ' + sv.urgency + '</span>' +
            '</div>' +
            '<h2 class="text-xl font-bold font-serif-vedic">' + sv.title + '</h2>' +
            '<div class="text-xs opacity-75 mt-1">📍 ' + sv.location + '</div>' +
            '<p class="text-sm opacity-85 mt-3 leading-relaxed">' + sv.description + '</p>' +
            '<div class="mt-3 space-y-1">' +
              '<div class="text-xs font-bold opacity-75">Available Sevak Roles:</div>' +
              '<div class="flex flex-wrap gap-1.5">' +
                sv.roles.map(function(r) { return '<span class="px-2.5 py-1 rounded-lg bg-stone-500/10 text-xs">' + r + '</span>'; }).join('') +
              '</div>' +
            '</div>' +
            '<div class="mt-4">' +
              '<div class="flex justify-between text-xs font-semibold mb-1"><span>Sevaks Enrolled: ' + sv.volunteersEnrolled + ' / ' + sv.goalVolunteers + '</span><span>' + pct + '%</span></div>' +
              '<div class="w-full h-2 bg-stone-200 rounded-full overflow-hidden"><div class="h-full bg-emerald-600" style="width:' + pct + '%"></div></div>' +
            '</div>' +
          '</div>' +
          '<div class="mt-5 pt-3 border-t border-stone-200/50 flex items-center justify-between">' +
            '<button type="button" onclick="openSevaEnrollModal(\'' + sv.id + '\')" class="' + (enrolled ? 'bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-semibold' : 'v-btn-primary px-4 py-2 text-xs') + '">' +
              (enrolled ? '✅ Enrolled as Sevak (View Pass)' : '🤝 Enrol in This Seva Drive') +
            '</button>' +
          '</div>' +
        '</div>';
      }).join('') +
    '</div>' +
  '</div>';
}

function setSevaRegion(reg) {
  window.VedantifyState.sevaRegion = reg;
  renderActiveModule();
}

function openSevaEnrollModal(sevaId) {
  var sv = window.VEDANTIFY_DATA.sevaCampaigns.find(function(x) { return x.id === sevaId; });
  if (!sv) return;
  openUniversalModal(
    '🤝 Sevak Enrollment: ' + sv.title,
    '<div class="space-y-4 text-xs sm:text-sm">' +
      '<div class="p-3 rounded-xl v-badge">📍 ' + sv.location + ' (' + sv.region + ')</div>' +
      '<div class="space-y-2">' +
        '<label class="block font-semibold">Your Name</label>' +
        '<input id="seva-enroll-name" type="text" value="' + window.VedantifyState.currentUser.name + '" class="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-transparent" />' +
      '</div>' +
      '<div class="space-y-2">' +
        '<label class="block font-semibold">Preferred Sevak Role</label>' +
        '<select id="seva-enroll-role" class="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-transparent">' +
          sv.roles.map(function(r) { return '<option value="' + r + '">' + r + '</option>'; }).join('') +
        '</select>' +
      '</div>' +
      '<button type="button" onclick="confirmSevaEnrollment(\'' + sv.id + '\')" class="v-btn-primary px-5 py-2.5 text-xs">Confirm Volunteer Enrollment (+60 Punya XP)</button>' +
    '</div>'
  );
}

function confirmSevaEnrollment(sevaId) {
  var sv = window.VEDANTIFY_DATA.sevaCampaigns.find(function(x) { return x.id === sevaId; });
  if (!sv) return;
  if (!window.VedantifyState.enrolledSevaIds.includes(sevaId)) {
    window.VedantifyState.enrolledSevaIds.push(sevaId);
    sv.volunteersEnrolled++;
  }
  playTempleBell();
  saveState();
  closeUniversalModal();
  addPunyaXP(60, 'Enrolled as Volunteer in ' + sv.title);
  renderActiveModule();
}

/* 12. HINDU FESTIVAL CALENDAR & EVENT PREPARATION PLANNER */
function renderCalendarModule() {
  var fests = window.VEDANTIFY_DATA.festivals;
  var selFest = fests.find(function(f) { return f.id === window.VedantifyState.selectedFestivalId; }) || fests[0];
  var checks = window.VedantifyState.festivalChecklists[selFest.id] || [false, false, false];

  return '<div class="space-y-6">' +
    '<div class="v-card p-6">' +
      '<span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full v-badge">📅 Sanatana Panchang & Utsava Planner</span>' +
      '<h1 class="text-2xl sm:text-3xl font-bold font-serif-vedic mt-2">Year-Round Hindu Festival Calendar & Advance Preparation Planner</h1>' +
      '<p class="text-sm opacity-80 mt-1">Select any festival below to view its lunar Tithi, spiritual significance, step-by-step daily observance ("What to Do"), and interactive advance preparation checklist.</p>' +
    '</div>' +

    '<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">' +
      /* Left: All Festivals List */
      '<div class="lg:col-span-5 space-y-2.5 max-h-[640px] overflow-y-auto pr-1">' +
        fests.map(function(f) {
          var active = f.id === selFest.id;
          return '<button type="button" onclick="selectFestivalPlanner(\'' + f.id + '\')" class="w-full text-left p-4 rounded-2xl border transition ' +
            (active ? 'v-btn-primary shadow-md' : 'v-card hover:border-amber-500') + '">' +
            '<div class="flex items-center justify-between gap-2">' +
              '<span class="font-bold text-sm font-serif-vedic">' + f.name + '</span>' +
              '<span class="text-[11px] opacity-85 shrink-0">' + f.month.split(' (')[0] + '</span>' +
            '</div>' +
            '<div class="text-xs opacity-80 mt-1 truncate">🕉️ ' + f.deity + '</div>' +
          '</button>';
        }).join('') +
      '</div>' +

      /* Right: Active Festival Details + Advance Preparation Planner */
      '<div class="lg:col-span-7 space-y-6">' +
        '<div class="v-card p-6 space-y-4">' +
          '<div class="flex flex-wrap items-center justify-between gap-2">' +
            '<span class="text-xs font-bold px-3 py-1 rounded-full v-badge">' + selFest.month + '</span>' +
            '<span class="text-xs opacity-75">Tithi: ' + selFest.tithi + '</span>' +
          '</div>' +
          '<h2 class="text-2xl font-bold font-serif-vedic">' + selFest.name + '</h2>' +
          '<div class="text-xs font-semibold text-amber-600">Presiding Deity / Tattva: ' + selFest.deity + '</div>' +
          '<p class="text-sm leading-relaxed">' + selFest.significance + '</p>' +
          '<div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">' +
            '<div class="text-xs font-bold uppercase tracking-wider">🪔 What to Do on This Day (Vidhi, Mantra & Dana)</div>' +
            '<p class="text-xs sm:text-sm leading-relaxed">' + selFest.whatToDo + '</p>' +
          '</div>' +

          /* Advance Prep Checklist for Selected Festival */
          '<div class="pt-2 space-y-2.5">' +
            '<div class="text-xs font-bold uppercase tracking-wider opacity-75">📋 Advance Preparation Checklist for ' + selFest.name + ':</div>' +
            selFest.prepTasks.map(function(pt, idx) {
              var isDone = !!checks[idx];
              return '<div onclick="toggleFestivalPrepTask(\'' + selFest.id + '\', ' + idx + ')" class="p-3 rounded-xl border cursor-pointer flex items-center gap-3 text-xs sm:text-sm ' +
                (isDone ? 'bg-emerald-500/10 border-emerald-500/40 line-through opacity-70' : 'border-stone-200/80 hover:border-amber-500') + '">' +
                '<input type="checkbox" ' + (isDone ? 'checked' : '') + ' onchange="event.stopPropagation(); toggleFestivalPrepTask(\'' + selFest.id + '\', ' + idx + ')" class="h-4 w-4 rounded accent-amber-600" />' +
                '<span>' + pt + '</span>' +
              '</div>';
            }).join('') +
          '</div>' +
        '</div>' +

        /* Custom Personal Festival Planner Adder */
        '<div class="v-card p-6 space-y-3">' +
          '<h3 class="text-base font-bold font-serif-vedic">➕ Add Custom Utsava Preparation Task</h3>' +
          '<div class="flex flex-col sm:flex-row gap-2">' +
            '<input id="custom-fest-task-input" type="text" placeholder="e.g., Arrange organicBilva leaves / invite grandparents for Puja" class="flex-1 px-3.5 py-2 rounded-xl border border-stone-300 bg-transparent text-xs" />' +
            '<button type="button" onclick="addCustomFestivalTask()" class="v-btn-primary px-4 py-2 text-xs shrink-0">Add to Planner</button>' +
          '</div>' +
          '<div class="space-y-2 pt-2">' +
            window.VedantifyState.customPlannerTasks.map(function(cpt) {
              return '<div class="flex items-center justify-between text-xs p-2.5 rounded-xl border border-stone-200/60">' +
                '<span><strong>' + cpt.festivalName + ':</strong> ' + cpt.task + '</span>' +
                '<span class="px-2 py-0.5 rounded v-badge">' + cpt.due + '</span>' +
              '</div>';
            }).join('') +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function selectFestivalPlanner(festId) {
  window.VedantifyState.selectedFestivalId = festId;
  navigateModule('calendar');
}

function toggleFestivalPrepTask(festId, idx) {
  if (!window.VedantifyState.festivalChecklists[festId]) {
    window.VedantifyState.festivalChecklists[festId] = [false, false, false];
  }
  window.VedantifyState.festivalChecklists[festId][idx] = !window.VedantifyState.festivalChecklists[festId][idx];
  if (window.VedantifyState.festivalChecklists[festId][idx]) {
    addPunyaXP(20, 'Completed Festival Advance Prep Task');
  }
  renderActiveModule();
}

function addCustomFestivalTask() {
  var inp = document.getElementById('custom-fest-task-input');
  if (!inp || !inp.value.trim()) {
    showToast('Please enter a preparation task description.', 'warn');
    return;
  }
  var selFest = window.VEDANTIFY_DATA.festivals.find(function(f) { return f.id === window.VedantifyState.selectedFestivalId; }) || window.VEDANTIFY_DATA.festivals[0];
  window.VedantifyState.customPlannerTasks.unshift({
    id: 'cpt-' + Date.now(),
    festivalName: selFest.name,
    task: inp.value.trim(),
    due: 'Upcoming Prep',
    done: false
  });
  addPunyaXP(15, 'Added Festival Preparation Milestone');
  renderActiveModule();
}

/* 13. AUTH (SIGN UP / LOGIN) & ADMIN MULTI-API COMMAND CENTER */
function openAuthModal() {
  var u = window.VedantifyState.currentUser;
  openUniversalModal(
    '🔐 Seeker Sign Up / Login & Role Switcher',
    '<div class="space-y-4 text-xs sm:text-sm">' +
      '<div class="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">' +
        '<strong>Currently Signed In As:</strong> ' + u.name + ' (' + u.email + ') • Role: <strong>' + u.role + '</strong>' +
      '</div>' +
      '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">' +
        '<div><label class="block font-semibold mb-1">Full Spiritual / Seeker Name</label><input id="auth-name-input" type="text" value="' + u.name + '" class="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-transparent" /></div>' +
        '<div><label class="block font-semibold mb-1">Email Address</label><input id="auth-email-input" type="email" value="' + u.email + '" class="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-transparent" /></div>' +
      '</div>' +
      '<div>' +
        '<label class="block font-semibold mb-1">Select Platform Role</label>' +
        '<select id="auth-role-select" class="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-transparent">' +
          '<option value="Sadhaka (Seeker)">Sadhaka (Adult Spiritual Seeker)</option>' +
          '<option value="Bal Rishi (Child & Parent Mode)">Bal Rishi (Child & Parent Mode)</option>' +
          '<option value="Acharya (Content Contributor)">Acharya (Content & Shloka Contributor)</option>' +
          '<option value="Platform Administrator">Platform Administrator</option>' +
        '</select>' +
      '</div>' +
      '<button type="button" onclick="saveAuthProfile()" class="v-btn-primary px-5 py-2.5 text-xs">Save & Authenticate Profile</button>' +
    '</div>'
  );
}

function saveAuthProfile() {
  var nEl = document.getElementById('auth-name-input');
  var eEl = document.getElementById('auth-email-input');
  var rEl = document.getElementById('auth-role-select');
  if (nEl && nEl.value.trim()) window.VedantifyState.currentUser.name = nEl.value.trim();
  if (eEl && eEl.value.trim()) window.VedantifyState.currentUser.email = eEl.value.trim();
  if (rEl) window.VedantifyState.currentUser.role = rEl.value;
  var uBtn = document.getElementById('header-user-btn');
  if (uBtn) uBtn.innerHTML = '👤 ' + window.VedantifyState.currentUser.name.split(' ')[0];
  saveState();
  closeUniversalModal();
  showToast('🙏 Namaste, ' + window.VedantifyState.currentUser.name + '! Profile updated.', 'info');
  renderActiveModule();
}

function renderAdminModule() {
  var m = window.VedantifyAPICluster.metrics;
  var isOutage = window.VedantifyAPICluster.simulatePrimaryOutage;

  return '<div class="space-y-6">' +
    '<div class="v-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">' +
      '<div>' +
        '<span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full v-badge">⚙️ Admin Console & Multi-API High-Availability Cluster</span>' +
        '<h1 class="text-2xl sm:text-3xl font-bold font-serif-vedic mt-2">Platform Governance, Content CMS & Fault-Tolerance Telemetry</h1>' +
      '</div>' +
      '<div class="flex flex-wrap gap-2">' +
        '<button type="button" onclick="toggleSimulatePrimaryOutage()" class="px-4 py-2 rounded-xl text-xs font-semibold ' + (isOutage ? 'bg-amber-600 text-white' : 'v-btn-outline') + '">' +
          (isOutage ? '⚡ Restore Tier-1 Primary API' : '🧪 Simulate Tier-1 API Outage') +
        '</button>' +
        '<button type="button" onclick="triggerGlobalAPISync()" class="v-btn-primary px-4 py-2 text-xs">🔄 Test Multi-API Failover Now</button>' +
      '</div>' +
    '</div>' +

    /* Telemetry Cards */
    '<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">' +
      '<div class="v-card p-5"><div class="text-xs opacity-70">Circuit Breaker State</div><div class="text-xl font-bold mt-1 text-emerald-600">' + window.VedantifyAPICluster.circuitBreakerState + '</div><div class="text-[11px] opacity-70 mt-1">3-Tier Auto Failover Active</div></div>' +
      '<div class="v-card p-5"><div class="text-xs opacity-70">Tier-1 Live API Hits</div><div class="text-2xl font-bold mt-1">' + m.tier1Success + '</div><div class="text-[11px] opacity-70 mt-1">Wikimedia REST + Quiz APIs</div></div>' +
      '<div class="v-card p-5"><div class="text-xs opacity-70">Tier-2/3 Failover Recoveries</div><div class="text-2xl font-bold mt-1 text-amber-600">' + (m.tier2Failovers + m.tier3EdgeHits) + '</div><div class="text-[11px] opacity-70 mt-1">100% Zero-Downtime Uptime</div></div>' +
      '<div class="v-card p-5"><div class="text-xs opacity-70">Avg Response Latency</div><div class="text-2xl font-bold mt-1">' + m.avgLatencyMs + ' ms</div><div class="text-[11px] opacity-70 mt-1">Last Sync: ' + m.lastSyncTime + '</div></div>' +
    '</div>' +

    '<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">' +
      /* Admin Quick Content Publisher */
      '<div class="lg:col-span-6 v-card p-6 space-y-4">' +
        '<h2 class="text-lg font-bold font-serif-vedic">📝 Admin Quick Content Publisher (Live CMS)</h2>' +
        '<p class="text-xs opacity-75">Publish a new Sanatana Dharma News Dispatch or Community Seva Initiative directly to the platform:</p>' +
        '<input id="admin-news-title" type="text" placeholder="Headline (e.g., Ancient Saraswati River Paleo-Channel Study Published)" class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-transparent text-xs" />' +
        '<select id="admin-news-cat" class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-transparent text-xs">' +
          '<option value="Temple Pranpratisthana">Temple Pranpratisthana</option>' +
          '<option value="Kumbh Mela & Sacred Gatherings">Kumbh Mela & Sacred Gatherings</option>' +
          '<option value="Strange Happenings & Mysteries">Strange Happenings & Mysteries</option>' +
          '<option value="Heritage & Commoner Experiences">Heritage & Commoner Experiences</option>' +
        '</select>' +
        '<textarea id="admin-news-summary" rows="3" placeholder="Detailed dispatch summary..." class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-transparent text-xs"></textarea>' +
        '<button type="button" onclick="adminPublishNewsItem()" class="v-btn-primary px-5 py-2.5 text-xs">Publish Dispatch to Live Feed</button>' +
      '</div>' +

      /* Live Multi-API Event Log */
      '<div class="lg:col-span-6 v-card p-6 space-y-3">' +
        '<h2 class="text-lg font-bold font-serif-vedic">📡 Live Multi-API Failover & High-Availability Logs</h2>' +
        '<div class="space-y-2 max-h-64 overflow-y-auto text-xs">' +
          (window.VedantifyAPICluster.logs.length === 0
            ? '<p class="opacity-70">Click "Test Multi-API Failover Now" above to inspect live Tier-1 -> Tier-2 -> Tier-3 resilience telemetry.</p>'
            : window.VedantifyAPICluster.logs.map(function(l) {
                return '<div class="p-2.5 rounded-xl border border-stone-200/60 flex justify-between items-start gap-2">' +
                  '<div><div class="font-bold">[' + l.status + '] ' + l.tier + ' (' + l.domain + ')</div><div class="opacity-80 mt-0.5">' + l.msg + '</div></div>' +
                  '<span class="font-mono opacity-70 shrink-0">' + l.latency + 'ms</span>' +
                '</div>';
              }).join('')
          ) +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function adminPublishNewsItem() {
  var tEl = document.getElementById('admin-news-title');
  var cEl = document.getElementById('admin-news-cat');
  var sEl = document.getElementById('admin-news-summary');
  if (!tEl || !sEl || !tEl.value.trim() || !sEl.value.trim()) {
    showToast('Please provide both a headline and dispatch summary.', 'warn');
    return;
  }
  window.VEDANTIFY_DATA.news.unshift({
    id: 'n-' + Date.now(),
    category: cEl ? cEl.value : 'Temple Pranpratisthana',
    title: tEl.value.trim(),
    location: 'India & Global',
    date: 'Just Published',
    wikiSlug: 'Hindu_temple',
    sourceUrl: 'https://en.wikipedia.org/wiki/Hindu_temple',
    summary: sEl.value.trim(),
    details: 'Published via Vedantify Admin CMS and replicated to local high-availability storage.'
  });
  showToast('📰 News dispatch published to Sanatana Dharma News Hub!', 'info');
  navigateModule('news');
}

/* Initialize App on Load */
window.addEventListener('DOMContentLoaded', function() {
  loadSavedState();
  document.documentElement.setAttribute('data-sect', window.VedantifyState.sectTheme);
  if (window.VedantifyState.darkMode) {
    document.documentElement.classList.add('dark-mode');
  }
  var sel = document.getElementById('sect-theme-select');
  if (sel) sel.value = window.VedantifyState.sectTheme;
  var badge = document.getElementById('header-xp-badge');
  if (badge) badge.innerHTML = '✨ ' + window.VedantifyState.punyaXP + ' Punya XP';
  var uBtn = document.getElementById('header-user-btn');
  if (uBtn) uBtn.innerHTML = '👤 ' + window.VedantifyState.currentUser.name.split(' ')[0];

  renderSidepanelWidgets();
  navigateModule('home');

  // Initial background API health check
  setTimeout(function() {
    window.VedantifyAPICluster.logEvent('Tier-1 Primary Cluster', 'Startup Health Check', 'OK', 'Multi-API High-Availability Router online (Tier-1 REST + Tier-2 Mirror + Tier-3 Edge Vault)', 18);
  }, 400);
});
