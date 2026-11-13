import React from 'react';
import './styles.css';

export default class App extends React.Component {
  constructor(...a) {
    super(...a);
    this.state = Object.assign(this.fresh(), { cfg: this.defaults(), setOpen: true, boardOpen: false, railHover: false, railPinned: false, pins: [], toast: null, bump: false, listening: false, heard: '' });
    this.boxEl = null; this.lastLen = 0; this.timers = [];
  }
  defaults() {
    return { theme: 'obsidian', orbMode: 'latest', orbStyle: 'holo', orbColor: 'holo', orbSize: 36, thinking: 'orb', agentBubble: 'none', agentSize: 32, agentFont: 'theme', reveal: 'words', agentAlign: 'left', density: 'comfy', sources: true, cardCorners: 'round', cardAnim: 'rise', userBubble: 'gradient', userAlign: 'right', radius: 20, tail: true, echo: true, bubbleAnim: 'fly', history: 'ghost', ghosts: 1, ghostLook: 'blur', historyNav: 'edge', histLabel: 'question', pinPlace: 'cards', pinStyle: 'label', pinTray: 'drawer', pinFx: 'toast', actions: 'buttons', composer: 'always', voice: true, sound: false, accent: 'theme', glow: 18, blur: 20, grid: true, width: 760, motion: 'full' };
  }
  presetList() {
    return [
      { t: 'One thing', s: 'Default focus', v: {} },
      { t: 'Chatty', s: 'Full thread, glass replies', v: { history: 'scroll', orbMode: 'every', agentBubble: 'glass', agentSize: 20, actions: 'chips', reveal: 'fade', orbSize: 28, density: 'compact', historyNav: 'docked', pinTray: 'side', bubbleAnim: 'pop' } },
      { t: 'Minimal', s: 'Quiet, text only', v: { orbMode: 'loading', orbStyle: 'dot', orbColor: 'white', agentFont: 'inter', agentSize: 28, userBubble: 'text', actions: 'list', history: 'focus', glow: 0, grid: false, composer: 'quiet', pinPlace: 'hover', pinStyle: 'icon', pinFx: 'badge', thinking: 'shimmer', historyNav: 'dots', sources: false, cardCorners: 'soft' } },
      { t: 'Cinematic', s: 'Centered, big orb', v: { orbStyle: 'holo', orbSize: 60, agentAlign: 'center', agentSize: 40, agentFont: 'serif', history: 'ghost', ghosts: 2, ghostLook: 'shrink', glow: 45, blur: 32, motion: 'calm', userAlign: 'center', userBubble: 'glass', accent: 'violet', density: 'spacious', historyNav: 'timeline', cardAnim: 'blur', pinTray: 'tray', cardCorners: 'extra' } }
    ];
  }
  schema() {
    return [
      { title: 'Theme', items: [
        { k: 'theme', label: 'Palette', opts: [['obsidian', 'Obsidian'], ['mist', 'Mist'], ['peach', 'Peach Bloom'], ['lavender', 'Lavender Haze'], ['rose', 'Rose Quartz'], ['prism', 'Prism'], ['opal', 'Opal'], ['tropic', 'Tropic'], ['neon', 'Neon Dusk']] }
      ] },
      { title: 'Agent orb', items: [
        { k: 'orbMode', label: 'Show orb', opts: [['every', 'Every reply'], ['latest', 'Latest only'], ['loading', 'While thinking'], ['none', 'Never']] },
        { k: 'orbStyle', label: 'Orb style', opts: [['holo', 'Holo'], ['pulse', 'Pulse'], ['ring', 'Ring'], ['dot', 'Dot']] },
        { k: 'orbColor', label: 'Orb color', opts: [['holo', 'Iridescent'], ['accent', 'Accent'], ['white', 'White']] },
        { k: 'orbSize', label: 'Orb size', min: 16, max: 72, unit: 'px' },
        { k: 'thinking', label: 'Thinking state', opts: [['orb', 'Spinning orb'], ['dots', 'Dots'], ['shimmer', 'Shimmer text']] }
      ] },
      { title: 'Agent message', items: [
        { k: 'agentBubble', label: 'Container', opts: [['none', 'None'], ['glass', 'Glass'], ['outline', 'Outline'], ['solid', 'Solid']] },
        { k: 'agentSize', label: 'Latest reply size', min: 16, max: 52, unit: 'px' },
        { k: 'agentFont', label: 'Typeface', opts: [['theme', 'From theme'], ['sora', 'Sora'], ['inter', 'Inter'], ['serif', 'Serif'], ['mono', 'Mono']] },
        { k: 'reveal', label: 'Text reveal', opts: [['words', 'Word by word'], ['fade', 'Fade'], ['none', 'Instant']] },
        { k: 'agentAlign', label: 'Alignment', opts: [['left', 'Left'], ['center', 'Center']] },
        { k: 'density', label: 'Reply density', opts: [['compact', 'Compact'], ['comfy', 'Comfortable'], ['spacious', 'Spacious']] },
        { k: 'sources', label: 'Show sources under results', tog: true }
      ] },
      { title: 'Cards', items: [
        { k: 'cardCorners', label: 'Card corners', opts: [['sharp', 'Sharp'], ['soft', 'Soft'], ['round', 'Round'], ['extra', 'Extra round']] },
        { k: 'cardAnim', label: 'Card entrance', opts: [['rise', 'Rise'], ['scale', 'Scale'], ['blur', 'Blur in'], ['none', 'None']] }
      ] },
      { title: 'Your messages', items: [
        { k: 'userBubble', label: 'Bubble', opts: [['gradient', 'Gradient'], ['glass', 'Glass'], ['outline', 'Outline'], ['text', 'No bubble']] },
        { k: 'userAlign', label: 'Position', opts: [['right', 'Right'], ['left', 'Left'], ['center', 'Center']] },
        { k: 'radius', label: 'Corner radius', min: 0, max: 32, unit: 'px' },
        { k: 'tail', label: 'Bubble tail', tog: true },
        { k: 'echo', label: 'Show my message above the reply', tog: true },
        { k: 'bubbleAnim', label: 'Send animation', opts: [['fly', 'Fly up'], ['pop', 'Pop'], ['fade', 'Fade']] }
      ] },
      { title: 'Earlier steps', items: [
        { k: 'history', label: 'Show earlier steps', opts: [['focus', 'Hidden'], ['ghost', 'Ghosted'], ['scroll', 'Full thread']] },
        { k: 'ghosts', label: 'How many ghosted', min: 1, max: 4, unit: '' },
        { k: 'ghostLook', label: 'Ghost look', opts: [['fade', 'Faded'], ['blur', 'Blurred'], ['shrink', 'Shrunk']] }
      ] },
      { title: 'History navigation', items: [
        { k: 'historyNav', label: 'Way in', opts: [['edge', 'Hover left edge'], ['docked', 'Docked bar'], ['dots', 'Dots on top'], ['timeline', 'Side timeline'], ['button', 'Button only']] },
        { k: 'histLabel', label: 'Label steps by', opts: [['question', 'My question'], ['topic', 'Topic']] }
      ] },
      { title: 'Pinning', items: [
        { k: 'pinPlace', label: 'Pin buttons', opts: [['cards', 'On every card'], ['hover', 'On hover'], ['off', 'Off']] },
        { k: 'pinStyle', label: 'Pin button', opts: [['label', 'Icon and label'], ['icon', 'Icon only']] },
        { k: 'pinTray', label: 'Where pins live', opts: [['drawer', 'Board drawer'], ['tray', 'Tray above input'], ['side', 'Side column']] },
        { k: 'pinFx', label: 'Pin feedback', opts: [['toast', 'Toast'], ['badge', 'Badge bump'], ['none', 'None']] }
      ] },
      { title: 'Actions and input', items: [
        { k: 'actions', label: 'Reply options', opts: [['buttons', 'Buttons'], ['chips', 'Chips'], ['list', 'List']] },
        { k: 'composer', label: 'Input bar', opts: [['always', 'Always on'], ['quiet', 'Quiet until hover']] },
        { k: 'voice', label: 'Voice input', tog: true },
        { k: 'sound', label: 'Sounds', tog: true }
      ] },
      { title: 'Atmosphere', items: [
        { k: 'accent', label: 'Accent', opts: [['theme', 'From theme'], ['mint', 'Mint'], ['violet', 'Violet'], ['coral', 'Coral'], ['gold', 'Gold']] },
        { k: 'glow', label: 'Glow', min: 0, max: 60, unit: '%' },
        { k: 'blur', label: 'Glass blur', min: 0, max: 40, unit: 'px' },
        { k: 'grid', label: 'Grid', tog: true },
        { k: 'width', label: 'Content width', min: 560, max: 960, unit: 'px' },
        { k: 'motion', label: 'Motion', opts: [['full', 'Full'], ['calm', 'Calm'], ['off', 'Off']] }
      ] }
    ];
  }
  fresh() {
    return { msgs: [this.coachFor('hero')], typing: false, draft: '', ans: null, on: [true, true, true], di: [0, 0, 0], reached: 0, focus: null, thinkLabel: 'Thinking' };
  }
  componentWillUnmount() { this.timers.forEach(clearTimeout); if (this.ro) this.ro.disconnect(); }
  componentDidUpdate() {
    const n = this.state.msgs.length + (this.state.typing ? 1 : 0);
    if (this.boxEl && n !== this.lastLen) {
      this.lastLen = n;
      if (this.state.cfg.history === 'scroll') { this.follow = true; this.toBottom(true); }
      else { const el = this.boxEl; setTimeout(() => { const c = el.querySelector('.vis-cur'); if (c && el.scrollHeight > el.clientHeight) { this.autoAt = Date.now(); el.scrollTo({ top: Math.max(0, c.offsetTop - 60), behavior: 'smooth' }); } }, 60); }
    }
  }
  later(fn, ms) { this.timers.push(setTimeout(fn, ms)); }
  toBottom(smooth) { const el = this.boxEl; if (!el) return; this.autoAt = Date.now(); el.scrollTo({ top: el.scrollHeight, behavior: smooth ? 'smooth' : 'auto' }); }
  attach(el) {
    if (el === this.boxEl) return;
    if (this.ro) { this.ro.disconnect(); this.ro = null; }
    this.boxEl = el;
    if (!el) return;
    el.addEventListener('scroll', () => { if (Date.now() - (this.autoAt || 0) < 900) return; this.follow = el.scrollHeight - el.scrollTop - el.clientHeight < 160; }, { passive: true });
    if (window.ResizeObserver && el.firstElementChild) { this.ro = new ResizeObserver(() => { if (this.follow && this.state.cfg.history === 'scroll' && el.scrollHeight > el.clientHeight) this.toBottom(false); }); this.ro.observe(el.firstElementChild); }
  }
  coachFor(intent, n) {
    const C = (o) => Object.assign({ role: 'coach' }, o);
    switch (intent) {
      case 'hero': return C({ kind: 'hero', kick: 'Good morning, Dana', topic: 'Start', text: 'One thing needs you this week: career growth dropped to 52%.', acts: [['Show Me Why', 'why', 1], ['Ask Something Else', 'else']] });
      case 'why': return C({ kind: 'items', kick: 'Why it dropped', topic: 'Results', think: 'Reading your results', text: 'Most of the drop sits in two items.', acts: [['What Can I Do?', 'plan', 1], ['Is This My Fault?', 'fault'], ['What Are People Saying?', 'saying']] });
      case 'fault': return C({ topic: 'Coaching', text: 'Not on its own. Growth scores dipped across Customer Success after the June reorg. What your team can shape is how clear the next step feels.', acts: [['What Can I Do?', 'plan', 1], ['What Are People Saying?', 'saying']] });
      case 'saying': return C({ kind: 'theme', topic: 'Themes', think: 'Reading comments', text: 'Comments about growth group into two themes.', acts: [['What Can I Do?', 'plan', 1], ['Which First?', 'first']] });
      case 'first': return C({ topic: 'Coaching', text: 'Start with unclear growth paths. It’s the bigger theme, and you can act on it this month.', acts: [['What Can I Do?', 'plan', 1]] });
      case 'scale': return C({ kind: 'scale', kick: 'Quick check · only you see this', topic: 'Check-in', text: 'I know what each person on my team wants next in their career.', acts: [] });
      case 'ans': return C({ topic: 'Coaching', text: n <= 2 ? 'Thanks for being honest. Then step one is finding out, and I’ll build that into the plan.' : n === 3 ? 'A fair middle. I’ll add a short prep guide so the first conversation is easier.' : 'Good. Let’s turn that into dates so it happens.', acts: [['Draft My Plan', 'plan', 1]] });
      case 'plan': return C({ kind: 'plan', kick: 'Draft plan', topic: 'Plan', think: 'Drafting your plan', text: 'A plan you can start this week.', acts: [['Save Plan', 'save', 1], ['Check My Readiness First', 'scale']] });
      case 'save': return C({ kind: 'saved', topic: 'Saved', text: 'Done. Your plan is saved.', acts: [['Add to Calendar', 'cal', 1], ['Start Over', 'restart']] });
      case 'cal': return C({ topic: 'Saved', text: 'Added to your calendar. You’ll get a reminder a week before each date.', acts: [['Start Over', 'restart']] });
      case 'talk': return C({ kind: 'talk', topic: 'Guide', text: 'Open with three questions, then mostly listen.', acts: [['Draft My Plan', 'plan', 1], ['Check My Readiness', 'scale']] });
      case 'recog': return C({ kind: 'recog', topic: 'Results', text: 'Recognition is your bright spot. Worth naming in your next team meeting.', acts: [['Why Did Growth Drop?', 'why']] });
      case 'privacy': return C({ topic: 'Privacy', text: 'I can’t show who said what. Results appear only for groups of 5 or more, and comments are always paraphrased.', acts: [['What Are People Saying?', 'saying']] });
      case 'else': return C({ topic: 'Open', text: 'Sure. What’s on your mind?', acts: [['Prep Me for My 1:1s', 'talk'], ['What Went Well?', 'recog'], ['Check My Readiness', 'scale']] });
      default: return C({ topic: 'Open', text: 'I can explain your results, share what people are saying, or help you plan.', acts: [['Show Me Why', 'why', 1], ['What Are People Saying?', 'saying'], ['Draft My Plan', 'plan']] });
    }
  }
  classify(t) {
    const q = t.toLowerCase();
    const R = (re) => re.test(q);
    if (R(/who (said|wrote)|which person|individual|\bnames?\b|who is/)) return 'privacy';
    if (R(/start over|restart|reset/)) return 'restart';
    if (R(/\bsave/)) return 'save';
    if (R(/calendar|remind/)) return 'cal';
    if (R(/fault|blame|is it me/)) return 'fault';
    if (R(/check|ready|readiness|pulse/)) return 'scale';
    if (R(/1:1|one on one|prep|opener|conversation|talk/)) return 'talk';
    if (R(/plan|action|commit|next step|\bdo\b|fix|help/)) return 'plan';
    if (R(/saying|comment|theme|feedback|want/)) return 'saying';
    if (R(/first|priorit|which/)) return 'first';
    if (R(/recogni|went well|good news|strength|best/)) return 'recog';
    if (R(/why|drop|low|fell|52|career|growth|score|result|compare|company/)) return 'why';
    return 'default';
  }
  milestone(intent) { return ({ why: 1, saying: 1, fault: 1, ans: 2, plan: 3, save: 4, cal: 4 })[intent] || 0; }
  act(label, intent, n) {
    if (this.state.typing) return;
    if (intent === 'restart') { this.lastLen = 0; this.setState(this.fresh()); return; }
    const reply = this.coachFor(intent, n);
    this.blip(620, 0);
    this.setState((s) => ({ msgs: s.msgs.concat([{ role: 'you', text: label }]), typing: true, draft: '', focus: null, thinkLabel: reply.think || 'Thinking', ans: intent === 'ans' ? n : s.ans }));
    this.later(() => { this.blip(880, 0); this.blip(1320, 0.07); this.setState((s) => ({ typing: false, reached: Math.max(s.reached, this.milestone(intent)), msgs: s.msgs.concat([reply]) })); }, 1100);
  }
  blip(f, delay) {
    if (!this.state.cfg.sound) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      this.ac = this.ac || new Ctx();
      const t0 = this.ac.currentTime + (delay || 0);
      const o = this.ac.createOscillator(); const g = this.ac.createGain();
      o.type = 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.06, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.28);
      o.connect(g); g.connect(this.ac.destination); o.start(t0); o.stop(t0 + 0.32);
    } catch (e) {}
  }
  listen() {
    if (this.state.listening || this.state.typing) return;
    const last = this.state.msgs.filter((m) => m.role === 'coach').pop();
    const phrase = last && last.acts && last.acts.length ? last.acts[0][0] : 'Why did career growth drop?';
    const words = phrase.split(' ');
    this.blip(520, 0);
    this.setState({ listening: true, heard: '' });
    words.forEach((w, i) => this.later(() => this.setState({ heard: words.slice(0, i + 1).join(' ') }), 500 + i * 320));
    this.later(() => { this.setState({ listening: false, heard: '' }); this.send(phrase); }, 900 + words.length * 320);
  }
  send(t) { t = (t || '').trim(); if (!t) return; this.act(t, this.classify(t)); }
  keyOf(kind) { return ({ hero: 'trend', items: 'result', theme: 'theme', recog: 'recog', talk: 'talk', plan: 'plan', saved: 'plan' })[kind] || ''; }
  pinDefs() {
    return {
      trend: { kind: 'Chart', title: 'Career growth trend', big: '52%', sub: '61 → 58 → 52 · company 64%', span: 1 },
      result: { kind: 'Result', title: 'Career growth items', big: '48%', sub: 'Path to next role ↓ 9 · time to learn 55%', span: 1 },
      theme: { kind: 'Theme', title: 'Growth paths feel unclear', big: '', sub: '6 comments, paraphrased · also little time to learn (3)', span: 2 },
      recog: { kind: 'Result', title: 'Recognition', big: '74%', sub: '↑ 8 since April', span: 1 },
      talk: { kind: 'Guide', title: 'Opening questions', big: '', sub: 'Three questions for career conversations', span: 1 },
      plan: { kind: 'Plan', title: 'Career growth plan', big: '', sub: 'Career talks by Dec 12 · open roles monthly · Jan 15 pulse', span: 2 }
    };
  }
  togglePin(k) {
    if (!k) return;
    const cur = this.state.pins;
    const has = cur.indexOf(k) >= 0;
    const fx = this.state.cfg.pinFx;
    this.setState({ pins: has ? cur.filter((x) => x !== k) : cur.concat([k]), toast: !has && fx === 'toast' ? k : null, bump: !has && fx === 'badge' });
    this.blip(has ? 440 : 990, 0);
    clearTimeout(this.tt);
    if (!has) this.tt = setTimeout(() => this.setState({ toast: null, bump: false }), 2400);
  }
  setCfg(k, v) { this.setState((s) => ({ cfg: Object.assign({}, s.cfg, { [k]: v }) })); }
  focusTurn(i, last) {
    this.setState({ focus: i === last ? null : i });
    if (this.state.cfg.history === 'scroll') { const el = this.boxEl && this.boxEl.querySelector('[data-t="' + i + '"]'); if (el) { this.follow = false; this.autoAt = Date.now(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }
  }
  renderVals() {
    const s = this.state;
    const c = s.cfg;
    const set = (o) => this.setState(o);
    const turns = [];
    s.msgs.forEach((m) => {
      if (m.role === 'you') turns.push({ you: m.text, coach: null });
      else { const last = turns[turns.length - 1]; if (last && !last.coach && last.you != null) last.coach = m; else turns.push({ you: null, coach: m }); }
    });
    const L = turns.length - 1;
    const f = s.focus == null ? L : s.focus;
    const r = c.radius;
    const ubr = !c.tail ? r + 'px' : c.userAlign === 'right' ? r + 'px ' + r + 'px ' + Math.min(r, 6) + 'px ' + r + 'px' : c.userAlign === 'left' ? r + 'px ' + r + 'px ' + r + 'px ' + Math.min(r, 6) + 'px' : r + 'px';
    const labels = ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'];
    const pins = s.pins;
    const tv = turns.map((t, k) => {
      const d = f - k;
      let vis = 'vis-hide', op = 1, bl = 0;
      if (d === 0) vis = 'vis-cur';
      else if (d > 0 && c.history === 'scroll') vis = 'vis-old';
      else if (d > 0 && c.history === 'ghost' && d <= c.ghosts) { vis = 'vis-ghost'; op = Math.max(0.14, 0.5 - (d - 1) * 0.12); bl = c.ghostLook === 'blur' ? d * 1.4 : 0; }
      const m = t.coach;
      const words = m && m.text ? m.text.split(' ') : [];
      const key = m ? this.keyOf(m.kind) : '';
      const isLive = k === L && s.focus == null && !s.typing;
      return {
        i: k, vis: vis, op: op, bl: bl,
        you: t.you, showYou: t.you != null && (c.history === 'scroll' || c.echo || !m),
        ubr: ubr, abr: r + 'px', blur: c.blur, orbs: c.orbSize,
        pending: !m, done: !!m,
        thinkOrb: c.thinking === 'orb' && c.orbMode !== 'none', thinkDots: c.thinking === 'dots' || (c.thinking === 'orb' && c.orbMode === 'none'), thinkShim: c.thinking === 'shimmer',
        thinkLabel: s.thinkLabel + '…',
        showOrb: !!m && (c.orbMode === 'every' || (c.orbMode === 'latest' && d === 0)),
        hasKick: !!(m && m.kick) && d === 0, kick: m && m.kick ? m.kick : '',
        fs: d === 0 ? c.agentSize : 17,
        words: words.map((w, j) => ({ w: w, d: j * 50 })),
        isHero: !!m && m.kind === 'hero', isItems: !!m && m.kind === 'items', isTheme: !!m && m.kind === 'theme', isRecog: !!m && m.kind === 'recog', isTalk: !!m && m.kind === 'talk', isScale: !!m && m.kind === 'scale', isPlan: !!m && m.kind === 'plan', isSaved: !!m && m.kind === 'saved',
        pinCls: pins.indexOf(key) >= 0 ? 'on' : '', pinTxt: pins.indexOf(key) >= 0 ? 'Pinned' : 'Pin', pin: () => this.togglePin(key),
        tiles: [1, 2, 3, 4, 5].map((n) => ({ n: n, lab: n === 1 || n === 5 ? labels[n - 1] : '', cls: s.ans === n ? 'on' : '', pick: () => { if (isLive) this.act(n + ' · ' + labels[n - 1], 'ans', n); } })),
        hasSrc: !!m && ['hero', 'items', 'theme', 'recog'].indexOf(m.kind) >= 0 && d === 0,
        showActs: isLive && !!(m && m.acts && m.acts.length),
        ad: 300 + words.length * 50 + (m && m.kind ? 500 : 0),
        acts: (m && m.acts ? m.acts : []).map((a) => ({ t: a[0], cls: a[2] ? 'p' : '', go: () => this.act(a[0], a[1]) }))
      };
    });
    const hist = turns.map((t, k) => {
      const q = t.you != null ? t.you : 'One thing needs you this week';
      const tp = t.coach ? t.coach.topic : 'Thinking…';
      return { t: c.histLabel === 'topic' ? tp : q, topic: c.histLabel === 'topic' ? q : tp, cls: k === f ? 'on' : '', go: () => this.focusTurn(k, L) };
    });
    const dates = [['by Dec 12', 'by Dec 5', 'by Dec 19'], ['Monthly', 'Every 2 weeks', 'Quarterly'], ['Jan 15', 'Jan 8', 'Jan 22']];
    const base = [
      { text: 'Hold a career conversation with each person', why: s.ans !== null && s.ans <= 3 ? 'Prep guide and 3 opening questions attached' : 'Ask what they want next, and what would help' },
      { text: 'Share open internal roles in team meeting', why: 'Makes next steps visible, the top theme in comments' },
      { text: 'Run a 2-question growth pulse', why: 'See if it is moving before the next survey' }
    ];
    const plan = base.map((b, i) => ({
      text: b.text, why: b.why, date: dates[i][s.di[i]], togCls: s.on[i] ? 'on' : '', txtCls: s.on[i] ? '' : 'off',
      toggle: () => { const on = s.on.slice(); on[i] = !on[i]; set({ on: on }); },
      cycle: () => { const di = s.di.slice(); di[i] = (di[i] + 1) % 3; set({ di: di }); }
    }));
    const D = this.pinDefs();
    const railOpen = c.historyNav === 'docked' || s.railPinned || (c.historyNav === 'edge' && s.railHover);
    const themeRgb = { obsidian: '125,249,227', mist: '120,160,255', peach: '255,158,125', lavender: '167,139,250', rose: '244,167,187', prism: '180,156,255', opal: '157,180,255', tropic: '95,211,190', neon: '255,122,198' };
    const glowRgb = c.accent === 'theme' ? themeRgb[c.theme] : ({ mint: '125,249,227', violet: '196,177,255', coral: '255,168,148', gold: '255,210,125' })[c.accent];
    const ga = (c.glow / 100).toFixed(2);
    const sections = this.schema().map((sec) => ({
      title: sec.title,
      items: sec.items.map((it) => {
        const val = c[it.k];
        const isTog = !!it.tog, isRange = it.min != null, isSeg = !!it.opts;
        const cur = isSeg ? it.opts.filter((o) => o[0] === val)[0] : null;
        return {
          label: it.label, isTog: isTog, isRange: isRange, isSeg: isSeg,
          valTxt: isTog ? (val ? 'On' : 'Off') : isRange ? val + it.unit : (cur ? cur[1] : ''),
          opts: isSeg ? it.opts.map((o) => ({ t: o[1], cls: o[0] === val ? 'on' : '', go: () => this.setCfg(it.k, o[0]) })) : [],
          min: it.min, max: it.max, val: val, on: (e) => this.setCfg(it.k, Number(e.target.value)),
          tcls: val ? 'on' : '', flip: () => this.setCfg(it.k, !val)
        };
      })
    }));
    return {
      outerBg: ['obsidian', 'opal', 'neon'].indexOf(c.theme) >= 0 ? '#020305' : '#D7DAE1',
      rootCls: ['root', 'th-' + c.theme, 'acc-' + c.accent, 'os-' + c.orbStyle, 'oc-' + c.orbColor, 'ab-' + c.agentBubble, 'af-' + c.agentFont, 'rv-' + c.reveal, 'aa-' + c.agentAlign, 'dn-' + c.density, c.sources ? '' : 'src-off', 'cr-' + c.cardCorners, 'ca-' + c.cardAnim, 'ub-' + c.userBubble, 'ua-' + c.userAlign, 'ba-' + c.bubbleAnim, 'gl-' + c.ghostLook, 'hn-' + c.historyNav, 'pp-' + c.pinPlace, 'ps-' + c.pinStyle, 'act-' + c.actions, 'cmp-' + c.composer, c.grid ? '' : 'grid-off', 'mo-' + c.motion].join(' '),
      showDots: c.historyNav === 'dots', showTimeline: c.historyNav === 'timeline', tlRight: c.pinTray === 'side' ? 268 : 18,
      showSide: c.pinTray === 'side', showTray: c.pinTray === 'tray' && pins.length > 0, mainPadR: c.pinTray === 'side' ? 250 : 0,
      cntCls: s.bump ? 'bump' : '',
      voiceOn: c.voice, listening: s.listening, notListening: !s.listening, heard: s.heard, micCls: s.listening ? 'on' : '', micGo: () => this.listen(),
      fxbg: 'radial-gradient(ellipse 55% 40% at 55% -5%, rgba(' + glowRgb + ',' + ga + '), transparent 70%), radial-gradient(ellipse 40% 35% at 95% 105%, rgba(165,180,255,' + (c.glow / 160).toFixed(2) + '), transparent 70%)',
      showHot: c.historyNav === 'edge' && !railOpen, railCls: railOpen ? 'open' : '',
      railIn: () => set({ railHover: true }), railOut: () => set({ railHover: false }),
      toggleRailPin: () => set({ railPinned: !s.railPinned, railHover: false }), railPinIcon: s.railPinned ? '×' : '›',
      histOn: s.railPinned ? 'on' : '',
      mainPad: c.historyNav === 'docked' ? 272 : 0,
      maxw: c.width, blur: c.blur, justify: c.history === 'scroll' ? 'flex-end' : 'center',
      segs: [1, 2, 3, 4].map((k) => ({ f: s.reached >= k ? 1 : (s.reached === k - 1 ? 0.35 : 0) })),
      turns: tv, hist: hist, rewound: s.focus != null && s.focus < L, toLatest: () => set({ focus: null }),
      plan: plan, kept: plan.filter((p, i) => s.on[i]).map((p) => ({ text: p.text, date: p.date })), pulseDate: dates[2][s.di[2]],
      draft: s.draft,
      onDraft: (e) => set({ draft: e.target.value }),
      onKey: (e) => { if (e.key === 'Enter') { e.preventDefault(); this.send(this.state.draft); } },
      sendDraft: () => this.send(this.state.draft),
      setBox: this.boxRef || (this.boxRef = (el) => this.attach(el)),
      pinCount: pins.length, boardOpen: s.boardOpen, boardEmpty: pins.length === 0,
      pins: pins.map((k) => Object.assign({}, D[k], { hasBig: !!D[k].big, remove: () => this.togglePin(k) })),
      toast: !!s.toast, toastTxt: s.toast ? D[s.toast].title : '',
      openBoard: () => set({ boardOpen: true, toast: null }),
      setOpen: s.setOpen, setOn: s.setOpen ? 'on' : '',
      labCls: 'root labwin th-' + c.theme + ' acc-' + c.accent,
      openSettings: () => set({ setOpen: !s.setOpen }),
      closeSettings: () => set({ setOpen: false }),
      closeDrawers: () => set({ boardOpen: false }),
      presets: this.presetList().map((p) => ({ t: p.t, s: p.s, go: () => set({ cfg: Object.assign(this.defaults(), p.v) }) })),
      sections: sections,
      resetCfg: () => set({ cfg: this.defaults() }),
      restart: () => { this.lastLen = 0; set(Object.assign(this.fresh(), { pins: [], toast: null, boardOpen: false })); }
    };
  }
  render() {
    const v = this.renderVals();
    return (
      <div style={{"width": "100%", "height": "100vh", "minHeight": "640px", "display": "flex", "gap": "12px", "padding": "12px", "boxSizing": "border-box", "background": v.outerBg, "fontFamily": "Inter, system-ui, sans-serif", "transition": "background .4s"}}>
        <div className={v.rootCls} style={{"flex": "1", "minWidth": "0", "height": "100%", "display": "flex", "flexDirection": "column", "overflow": "hidden", "position": "relative", "borderRadius": "16px", "border": "1px solid rgba(255,255,255,.08)"}}>
          <div className="fx" aria-hidden="true" style={{"background": v.fxbg}}>
            <i className="bl" style={{"width": "620px", "height": "620px", "left": "-180px", "top": "-260px", "background": "var(--b1)"}}></i>
            <i className="bl" style={{"width": "560px", "height": "560px", "right": "-200px", "top": "120px", "background": "var(--b2)"}}></i>
            <i className="bl" style={{"width": "520px", "height": "520px", "left": "34%", "bottom": "-360px", "background": "var(--b3)"}}></i>
            <i className="bl" style={{"width": "460px", "height": "460px", "right": "18%", "top": "-300px", "background": "var(--b4)"}}></i>
            <i className="g"></i>
          </div>
          {v.showHot && (
            <>
              <div className="hot" onMouseEnter={v.railIn} aria-hidden="true"></div>
            </>
          )}
          <aside className={`rail ${v.railCls}`} onMouseLeave={v.railOut} aria-label="History">
            <div style={{"display": "flex", "alignItems": "center", "gap": "10px", "padding": "2px 6px"}}>
              <span className="kick" style={{"flex": "1"}}>History</span>
              <button className="bx" onClick={v.toggleRailPin} aria-label="Pin history open">{v.railPinIcon}</button>
            </div>
            <button className="ibtn" style={{"justifyContent": "center", "padding": "9px 12px"}} onClick={v.restart}>New Chat</button>
            <div style={{"flex": "1", "minHeight": "0", "overflowY": "auto", "display": "flex", "flexDirection": "column", "gap": "2px"}}>
              {(v.hist || []).map((h, $index) => (
                <React.Fragment key={$index}>
                  <button className={`hitem ${h.cls}`} onClick={h.go}>
                    <i></i>
                    <span style={{"minWidth": "0"}}>
                      <span className="htxt">{h.t}</span>
                      <small>{h.topic}</small>
                    </span>
                  </button>
                </React.Fragment>
              ))}
              <div className="kick" style={{"padding": "18px 10px 6px"}}>Earlier</div>
              <button className="hitem">
                <i></i>
                <span style={{"minWidth": "0"}}>
                  <span className="htxt">Spring pulse recap</span>
                  <small>Apr 28</small>
                </span>
              </button>
              <button className="hitem">
                <i></i>
                <span style={{"minWidth": "0"}}>
                  <span className="htxt">Prep for team meeting</span>
                  <small>Apr 30</small>
                </span>
              </button>
            </div>
          </aside>
          <div className="lay" style={{"display": "flex", "alignItems": "center", "gap": "12px", "padding": "18px 32px 10px", "flexWrap": "wrap", "marginLeft": `${v.mainPad}px`, "marginRight": `${v.mainPadR}px`}}>
            <div style={{"display": "flex", "alignItems": "center", "gap": "10px", "fontWeight": "600", "fontSize": "15px"}}>
              <span className="orb" style={{"width": "20px", "height": "20px", "margin": "0"}}></span>
              Coach
            </div>
            <div style={{"flex": "1", "display": "flex", "gap": "6px", "maxWidth": "220px", "margin": "0 auto"}} aria-label="Progress">
              {(v.segs || []).map((s, $index) => (
                <React.Fragment key={$index}>
                  <div className="seg">
                    <i style={{"transform": `scaleX(${s.f})`}}></i>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <button className={`ibtn ${v.histOn}`} onClick={v.toggleRailPin}>History</button>
            <button className="ibtn" onClick={v.openBoard}>
              Board
              <span className={`cnt ${v.cntCls}`}>{v.pinCount}</span>
            </button>
            <button className={`ibtn ${v.setOn}`} onClick={v.openSettings}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"></path>
                <circle cx="16" cy="6" r="2"></circle>
                <circle cx="10" cy="12" r="2"></circle>
                <circle cx="18" cy="18" r="2"></circle>
              </svg>
              Settings
            </button>
            <button className="ibtn" onClick={v.restart}>Reset</button>
          </div>
          {v.showDots && (
            <>
              <div className="lay ndots" style={{"paddingBottom": "6px", "marginLeft": `${v.mainPad}px`, "marginRight": `${v.mainPadR}px`}}>
                {(v.hist || []).map((h, $index) => (
                  <React.Fragment key={$index}>
                    <button className={`ndot ${h.cls}`} onClick={h.go} aria-label={h.t} title={h.t}></button>
                  </React.Fragment>
                ))}
              </div>
            </>
          )}
          {v.showTimeline && (
            <>
              <div className="tline" style={{"right": `${v.tlRight}px`}}>
                {(v.hist || []).map((h, $index) => (
                  <React.Fragment key={$index}>
                    <button className={`tl ${h.cls}`} onClick={h.go}>
                      <span>{h.topic}</span>
                      <i></i>
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </>
          )}
          {v.showSide && (
            <>
              <aside className="side" aria-label="Pinned">
                <div className="kick">Pinned · {v.pinCount}</div>
                {v.boardEmpty && (
                  <>
                    <div className="lab" style={{"lineHeight": "1.5"}}>Pin any card and it stays here while you chat.</div>
                  </>
                )}
                {(v.pins || []).map((b, $index) => (
                  <React.Fragment key={$index}>
                    <div className="bcard">
                      <button className="bx" style={{"position": "absolute", "top": "4px", "right": "4px"}} onClick={b.remove} aria-label="Remove pin">×</button>
                      <div className="kick" style={{"fontSize": "10px"}}>{b.kind}</div>
                      <div style={{"fontWeight": "600", "marginTop": "4px", "paddingRight": "18px", "fontSize": "13px"}}>{b.title}</div>
                      {b.hasBig && (
                        <>
                          <div className="hx numd" style={{"fontSize": "28px", "marginTop": "4px"}}>{b.big}</div>
                        </>
                      )}
                    </div>
                  </React.Fragment>
                ))}
              </aside>
            </>
          )}
          <div className="lay" ref={v.setBox} style={{"flex": "1", "minHeight": "0", "overflowY": "auto", "padding": "0 40px", "position": "relative", "marginLeft": `${v.mainPad}px`, "marginRight": `${v.mainPadR}px`}}>
            <div className="stagein" style={{"maxWidth": `${v.maxw}px`, "margin": "0 auto", "minHeight": "100%", "boxSizing": "border-box", "display": "flex", "flexDirection": "column", "justifyContent": v.justify, "padding": "24px 0 24px"}}>
              {v.rewound && (
                <>
                  <div style={{"display": "flex", "justifyContent": "center"}}>
                    <button className="ibtn" onClick={v.toLatest}>Viewing an earlier step · Back to Latest</button>
                  </div>
                </>
              )}
              {(v.turns || []).map((t, $index) => (
                <React.Fragment key={$index}>
                  <div className={`turn ${t.vis}`} data-t={t.i} style={{"opacity": t.op, "filter": `blur(${t.bl}px)`}}>
                    {t.showYou && (
                      <>
                        <div className="urow">
                          <div className="ub" style={{"borderRadius": t.ubr}}>{t.you}</div>
                        </div>
                      </>
                    )}
                    {t.pending && (
                      <>
                        <div className="think">
                          {t.thinkOrb && (
                            <>
                              <span className="orb busy" style={{"width": `${t.orbs}px`, "height": `${t.orbs}px`}}></span>
                              <span className="shim">{t.thinkLabel}</span>
                            </>
                          )}
                          {t.thinkDots && (
                            <>
                              <div className="typing" aria-label="Coach is thinking">
                                <span></span>
                                <span></span>
                                <span></span>
                              </div>
                            </>
                          )}
                          {t.thinkShim && (
                            <>
                              <span className="shim" style={{"fontSize": "16px"}}>{t.thinkLabel}</span>
                            </>
                          )}
                        </div>
                      </>
                    )}
                    {t.done && (
                      <>
                        <div className="ct">
                          {t.showOrb && (
                            <>
                              <span className="orb" style={{"width": `${t.orbs}px`, "height": `${t.orbs}px`}}></span>
                            </>
                          )}
                          <div className="ab" style={{"borderRadius": t.abr, "WebkitBackdropFilter": `blur(${t.blur}px)`, "backdropFilter": `blur(${t.blur}px)`}}>
                            {t.hasKick && (
                              <>
                                <div className="kick acct">{t.kick}</div>
                              </>
                            )}
                            <div className="ttext" style={{"fontSize": `${t.fs}px`}}>
                              {(t.words || []).map((x, $index) => (
                                <React.Fragment key={$index}>
                                  <span className="wd" style={{"animationDelay": `${x.d}ms`}}>{x.w}</span>
                                </React.Fragment>
                              ))}
                            </div>
                            {t.isHero && (
                              <>
                                <div className="card in" style={{"animationDelay": ".5s", "padding": "24px 28px", "display": "grid", "gridTemplateColumns": "minmax(0, 1fr) minmax(0, 1fr)", "gap": "28px", "alignItems": "end"}}>
                                  <button className={`pinb ${t.pinCls}`} onClick={t.pin}>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                                      <path d="M12 17v5M9 3h6l-1 6 4 3H6l4-3z"></path>
                                    </svg>
                                    <span>{t.pinTxt}</span>
                                  </button>
                                  <div style={{"display": "flex", "flexDirection": "column", "gap": "6px"}}>
                                    <div className="lab">Career growth · % favorable</div>
                                    <div className="hx numd" style={{"fontSize": "78px"}}>52%</div>
                                    <div style={{"display": "flex", "gap": "8px", "alignItems": "center", "flexWrap": "wrap"}}>
                                      <span className="neg">↓ 6 since April</span>
                                      <span className="lab">Company 64% · 14 responses</span>
                                    </div>
                                  </div>
                                  <div style={{"position": "relative", "height": "130px", "display": "flex", "alignItems": "flex-end", "gap": "16px"}} role="img" aria-label="Career growth over three surveys: 61, 58, 52 percent. Company 64 percent.">
                                    <div style={{"position": "absolute", "left": "0", "right": "0", "bottom": "104px", "borderTop": "1.5px dashed var(--mut)"}}></div>
                                    <div style={{"flex": "1", "display": "flex", "flexDirection": "column", "alignItems": "center", "gap": "5px"}}>
                                      <span className="lab">61</span>
                                      <div className="bar bm" style={{"width": "100%", "height": "86px"}}></div>
                                      <span className="lab">Oct '25</span>
                                    </div>
                                    <div style={{"flex": "1", "display": "flex", "flexDirection": "column", "alignItems": "center", "gap": "5px"}}>
                                      <span className="lab">58</span>
                                      <div className="bar bm" style={{"width": "100%", "height": "74px", "animationDelay": ".5s"}}></div>
                                      <span className="lab">Apr '26</span>
                                    </div>
                                    <div style={{"flex": "1", "display": "flex", "flexDirection": "column", "alignItems": "center", "gap": "5px"}}>
                                      <b style={{"fontSize": "12px"}}>52</b>
                                      <div className="bar ba" style={{"width": "100%", "height": "50px", "animationDelay": ".6s"}}></div>
                                      <b style={{"fontSize": "12px"}}>Oct '26</b>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                            {t.isItems && (
                              <>
                                <div className="card in" style={{"animationDelay": ".4s", "padding": "40px 0 6px"}}>
                                  <button className={`pinb ${t.pinCls}`} onClick={t.pin}>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                                      <path d="M12 17v5M9 3h6l-1 6 4 3H6l4-3z"></path>
                                    </svg>
                                    <span>{t.pinTxt}</span>
                                  </button>
                                  <div style={{"display": "grid", "gridTemplateColumns": "minmax(0, 1fr) 170px 44px 40px", "gap": "14px", "alignItems": "center", "padding": "12px 22px"}}>
                                    <span>I can see a path to my next role here</span>
                                    <div className="track">
                                      <div className="hbar ba" style={{"width": "48%"}}></div>
                                    </div>
                                    <b>48%</b>
                                    <span style={{"color": "var(--neg)", "fontWeight": "600", "fontSize": "13px"}}>↓ 9</span>
                                  </div>
                                  <div style={{"display": "grid", "gridTemplateColumns": "minmax(0, 1fr) 170px 44px 40px", "gap": "14px", "alignItems": "center", "padding": "12px 22px", "borderTop": "1px solid var(--cline)"}}>
                                    <span>I have time to learn on the job</span>
                                    <div className="track">
                                      <div className="hbar bb" style={{"width": "55%"}}></div>
                                    </div>
                                    <b>55%</b>
                                    <span style={{"color": "var(--neg)", "fontWeight": "600", "fontSize": "13px"}}>↓ 4</span>
                                  </div>
                                </div>
                              </>
                            )}
                            {t.isTheme && (
                              <>
                                <div className="card in" style={{"animationDelay": ".4s", "padding": "44px 16px 16px", "display": "grid", "gridTemplateColumns": "minmax(0, 2fr) minmax(0, 1fr)", "gap": "12px"}}>
                                  <button className={`pinb ${t.pinCls}`} onClick={t.pin}>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                                      <path d="M12 17v5M9 3h6l-1 6 4 3H6l4-3z"></path>
                                    </svg>
                                    <span>{t.pinTxt}</span>
                                  </button>
                                  <div style={{"border": "1px solid var(--cline)", "borderRadius": "14px", "padding": "14px 16px"}}>
                                    <div style={{"fontWeight": "600"}}>Growth paths feel unclear</div>
                                    <div className="mut" style={{"fontSize": "14px", "marginTop": "2px"}}>People aren't sure what the next role looks like or how to get there.</div>
                                    <div className="lab" style={{"marginTop": "8px"}}>6 comments · paraphrased</div>
                                  </div>
                                  <div style={{"border": "1px solid var(--cline)", "borderRadius": "14px", "padding": "14px 16px"}}>
                                    <div style={{"fontWeight": "600"}}>Little time to learn</div>
                                    <div className="mut" style={{"fontSize": "14px", "marginTop": "2px"}}>Busy quarters crowd out training.</div>
                                    <div className="lab" style={{"marginTop": "8px"}}>3 comments · paraphrased</div>
                                  </div>
                                </div>
                              </>
                            )}
                            {t.isRecog && (
                              <>
                                <div className="card in" style={{"animationDelay": ".4s", "padding": "18px 110px 18px 22px", "display": "flex", "gap": "18px", "alignItems": "center"}}>
                                  <button className={`pinb ${t.pinCls}`} onClick={t.pin}>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                                      <path d="M12 17v5M9 3h6l-1 6 4 3H6l4-3z"></path>
                                    </svg>
                                    <span>{t.pinTxt}</span>
                                  </button>
                                  <div className="hx numd" style={{"fontSize": "46px"}}>74%</div>
                                  <div>
                                    <b>Recognition</b>
                                    <span style={{"color": "var(--pos)", "fontWeight": "600"}}>↑ 8 since April</span>
                                    <div className="lab">Your highest area · 14 responses</div>
                                  </div>
                                </div>
                              </>
                            )}
                            {t.isTalk && (
                              <>
                                <div className="card in" style={{"animationDelay": ".4s", "padding": "18px 110px 18px 22px"}}>
                                  <button className={`pinb ${t.pinCls}`} onClick={t.pin}>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                                      <path d="M12 17v5M9 3h6l-1 6 4 3H6l4-3z"></path>
                                    </svg>
                                    <span>{t.pinTxt}</span>
                                  </button>
                                  <ol style={{"margin": "0", "paddingLeft": "20px", "display": "flex", "flexDirection": "column", "gap": "8px", "fontSize": "15px"}}>
                                    <li>What would you like to be doing a year from now?</li>
                                    <li>What's one skill you want to build this quarter?</li>
                                    <li>What could I do to help?</li>
                                  </ol>
                                </div>
                              </>
                            )}
                            {t.isScale && (
                              <>
                                <div className="card in" style={{"animationDelay": ".5s", "padding": "18px", "display": "flex", "gap": "10px", "boxShadow": "none", "background": "transparent", "borderColor": "transparent"}}>
                                  {(t.tiles || []).map((k, $index) => (
                                    <React.Fragment key={$index}>
                                      <button className={`tile ${k.cls}`} onClick={k.pick}>
                                        {k.n}
                                        <small>{k.lab}</small>
                                      </button>
                                    </React.Fragment>
                                  ))}
                                </div>
                              </>
                            )}
                            {t.isPlan && (
                              <>
                                <div className="card in" style={{"animationDelay": ".4s", "overflow": "hidden"}}>
                                  <button className={`pinb ${t.pinCls}`} onClick={t.pin}>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                                      <path d="M12 17v5M9 3h6l-1 6 4 3H6l4-3z"></path>
                                    </svg>
                                    <span>{t.pinTxt}</span>
                                  </button>
                                  <div className="kick" style={{"padding": "16px 20px 12px"}}>Draft plan · career growth</div>
                                  {(v.plan || []).map((p, $index) => (
                                    <React.Fragment key={$index}>
                                      <div className="prow">
                                        <button className={`tog ${p.togCls}`} onClick={p.toggle} aria-label="Include this step">
                                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#06070B" strokeWidth="3" aria-hidden="true">
                                            <path d="M5 12l5 5 9-10"></path>
                                          </svg>
                                        </button>
                                        <div>
                                          <div className={p.txtCls} style={{"fontSize": "15px", "fontWeight": "500"}}>{p.text}</div>
                                          <div className="lab" style={{"marginTop": "2px"}}>{p.why}</div>
                                        </div>
                                        <button className="date" onClick={p.cycle}>{p.date}</button>
                                      </div>
                                    </React.Fragment>
                                  ))}
                                </div>
                              </>
                            )}
                            {t.isSaved && (
                              <>
                                <div className="card in" style={{"animationDelay": ".3s", "padding": "18px 110px 18px 22px", "display": "flex", "gap": "18px", "alignItems": "flex-start"}}>
                                  <button className={`pinb ${t.pinCls}`} onClick={t.pin}>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                                      <path d="M12 17v5M9 3h6l-1 6 4 3H6l4-3z"></path>
                                    </svg>
                                    <span>{t.pinTxt}</span>
                                  </button>
                                  <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true" style={{"flex": "none"}}>
                                    <circle cx="22" cy="22" r="20" fill="none" stroke="var(--acc)" strokeWidth="2" style={{"strokeDasharray": "126", "strokeDashoffset": "126", "animation": "draw .8s ease forwards"}}></circle>
                                    <path d="M13 23l6 6 12-13" fill="none" stroke="var(--acc)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{"strokeDasharray": "34", "strokeDashoffset": "34", "animation": "draw .45s ease .7s forwards"}}></path>
                                  </svg>
                                  <div style={{"flex": "1", "display": "flex", "flexDirection": "column", "gap": "8px"}}>
                                    {(v.kept || []).map((k, $index) => (
                                      <React.Fragment key={$index}>
                                        <div style={{"display": "flex", "justifyContent": "space-between", "gap": "12px", "fontSize": "15px"}}>
                                          <span>{k.text}</span>
                                          <span className="mut">{k.date}</span>
                                        </div>
                                      </React.Fragment>
                                    ))}
                                    <div className="lab">Saved to Act · check-in {v.pulseDate}</div>
                                  </div>
                                </div>
                              </>
                            )}
                            {t.hasSrc && (
                              <>
                                <div className="src in" style={{"animationDelay": ".8s"}}>Source · Fall pulse 2026 · 14 responses · above the 5-response minimum</div>
                              </>
                            )}
                            {t.showActs && (
                              <>
                                <div className="acts in" style={{"animationDelay": `${t.ad}ms`}}>
                                  {(t.acts || []).map((a, $index) => (
                                    <React.Fragment key={$index}>
                                      <button className={`act ${a.cls}`} onClick={a.go}>
                                        <span>{a.t}</span>
                                        <i>→</i>
                                      </button>
                                    </React.Fragment>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="lay" style={{"padding": "8px 40px 22px", "marginLeft": `${v.mainPad}px`, "marginRight": `${v.mainPadR}px`}}>
            {v.showTray && (
              <>
                <div className="tray" style={{"maxWidth": `${v.maxw}px`}}>
                  {(v.pins || []).map((b, $index) => (
                    <React.Fragment key={$index}>
                      <div className="tchip">
                        <span className="kick" style={{"fontSize": "10px"}}>{b.kind}</span>
                        <b style={{"fontWeight": "600"}}>{b.title}</b>
                        {b.hasBig && (
                          <>
                            <span className="numd" style={{"fontFamily": "Sora, sans-serif", "fontSize": "16px"}}>{b.big}</span>
                          </>
                        )}
                        <button className="bx" onClick={b.remove} aria-label="Remove pin">×</button>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </>
            )}
            <div className="dock" style={{"maxWidth": `${v.maxw}px`, "margin": "0 auto", "WebkitBackdropFilter": `blur(${v.blur}px)`, "backdropFilter": `blur(${v.blur}px)`}}>
              {v.notListening && (
                <>
                  <input className="cin" aria-label="Message your coach" placeholder="Reply, or tap an option above" value={v.draft} onChange={v.onDraft} onKeyDown={v.onKey} />
                </>
              )}
              {v.listening && (
                <>
                  <div className="listen" aria-live="polite">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <em>Listening… “{v.heard}”</em>
                  </div>
                </>
              )}
              {v.voiceOn && (
                <>
                  <button className={`mic ${v.micCls}`} onClick={v.micGo} aria-label="Talk to your coach">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="9" y="3" width="6" height="11" rx="3"></rect>
                      <path d="M5 11a7 7 0 0 0 14 0M12 18v3"></path>
                    </svg>
                  </button>
                </>
              )}
              <button className="send" onClick={v.sendDraft}>Send</button>
            </div>
          </div>
          {v.toast && (
            <>
              <div className="toast in">
                Pinned · {v.toastTxt}
                <button className="tlink" onClick={v.openBoard}>View Board</button>
              </div>
            </>
          )}
          {v.boardOpen && (
            <>
              <aside className="drawer" aria-label="Your board">
                <div style={{"display": "flex", "alignItems": "center", "gap": "10px", "padding": "18px 20px", "borderBottom": "1px solid var(--line)"}}>
                  <div style={{"flex": "1"}}>
                    <div className="kick">Your board</div>
                    <div className="lab" style={{"marginTop": "2px"}}>{v.pinCount} pinned from this chat</div>
                  </div>
                  <button className="bx" onClick={v.closeDrawers} aria-label="Close board">×</button>
                </div>
                <div style={{"flex": "1", "overflowY": "auto", "padding": "16px 20px", "display": "grid", "gridTemplateColumns": "repeat(2, minmax(0, 1fr))", "gap": "12px", "alignContent": "start"}}>
                  {v.boardEmpty && (
                    <>
                      <div className="mut" style={{"gridColumn": "1 / -1", "fontSize": "14px", "lineHeight": "1.5"}}>Nothing pinned yet. Use Pin on any card to keep it here.</div>
                    </>
                  )}
                  {(v.pins || []).map((b, $index) => (
                    <React.Fragment key={$index}>
                      <div className="bcard" style={{"gridColumn": `span ${b.span}`}}>
                        <button className="bx" style={{"position": "absolute", "top": "4px", "right": "4px"}} onClick={b.remove} aria-label="Remove from board">×</button>
                        <div className="kick" style={{"fontSize": "10px"}}>{b.kind}</div>
                        <div style={{"fontWeight": "600", "marginTop": "4px", "paddingRight": "20px"}}>{b.title}</div>
                        {b.hasBig && (
                          <>
                            <div className="hx numd" style={{"fontSize": "34px", "marginTop": "6px"}}>{b.big}</div>
                          </>
                        )}
                        <div className="lab" style={{"marginTop": "4px"}}>{b.sub}</div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                <div style={{"padding": "14px 20px", "borderTop": "1px solid var(--line)", "display": "flex", "gap": "8px", "flexWrap": "wrap"}}>
                  <button className="send">Open as Canvas</button>
                  <button className="ibtn">Add to Dashboard</button>
                </div>
              </aside>
            </>
          )}
        </div>
        {v.setOpen && (
          <>
            <aside className={v.labCls} aria-label="Interface settings">
              <div style={{"display": "flex", "alignItems": "center", "gap": "10px", "padding": "14px 16px", "borderBottom": "1px solid var(--line)", "background": "rgba(255,255,255,.03)"}}>
                <span style={{"display": "flex", "gap": "6px"}} aria-hidden="true">
                  <i style={{"width": "10px", "height": "10px", "borderRadius": "50%", "background": "#FF6B6B", "display": "block"}}></i>
                  <i style={{"width": "10px", "height": "10px", "borderRadius": "50%", "background": "#FFD27D", "display": "block"}}></i>
                  <i style={{"width": "10px", "height": "10px", "borderRadius": "50%", "background": "#7DF9B0", "display": "block"}}></i>
                </span>
                <div style={{"flex": "1", "textAlign": "center"}}>
                  <div className="kick">Interface lab</div>
                </div>
                <button className="bx" onClick={v.closeSettings} aria-label="Close settings">×</button>
              </div>
              <div className="lab" style={{"padding": "10px 20px 0"}}>Changes apply live to the prototype on the left.</div>
              <div style={{"flex": "1", "overflowY": "auto", "padding": "14px 20px 20px"}}>
                <div className="kick" style={{"marginBottom": "8px"}}>Presets</div>
                <div style={{"display": "grid", "gridTemplateColumns": "repeat(2, minmax(0, 1fr))", "gap": "8px", "marginBottom": "16px"}}>
                  {(v.presets || []).map((r, $index) => (
                    <React.Fragment key={$index}>
                      <button className="preset" onClick={r.go}>
                        {r.t}
                        <small>{r.s}</small>
                      </button>
                    </React.Fragment>
                  ))}
                </div>
                {(v.sections || []).map((sec, $index) => (
                  <React.Fragment key={$index}>
                    <div style={{"marginTop": "14px"}}>
                      <div className="kick acct" style={{"marginBottom": "4px"}}>{sec.title}</div>
                      {(sec.items || []).map((c, $index) => (
                        <React.Fragment key={$index}>
                          <div className="ctl">
                            <div className="clab">
                              <span>{c.label}</span>
                              <span className="mut">{c.valTxt}</span>
                            </div>
                            {c.isSeg && (
                              <>
                                <div className="segc">
                                  {(c.opts || []).map((o, $index) => (
                                    <React.Fragment key={$index}>
                                      <button className={`sopt ${o.cls}`} onClick={o.go}>{o.t}</button>
                                    </React.Fragment>
                                  ))}
                                </div>
                              </>
                            )}
                            {c.isRange && (
                              <>
                                <input className="rng" type="range" min={c.min} max={c.max} step="1" value={c.val} onChange={c.on} aria-label={c.label} />
                              </>
                            )}
                            {c.isTog && (
                              <>
                                <button className={`tg ${c.tcls}`} onClick={c.flip} aria-label={c.label}>
                                  <i></i>
                                </button>
                              </>
                            )}
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div style={{"padding": "14px 20px", "borderTop": "1px solid var(--line)", "display": "flex", "gap": "8px"}}>
                <button className="ibtn" onClick={v.resetCfg}>Reset Settings</button>
              </div>
            </aside>
          </>
        )}
      </div>
    );
  }
}
