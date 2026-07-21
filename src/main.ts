import './style.css'
import { capturePt, applyLang, initialLang, type Lang } from './i18n'

const GAME_URL = 'https://zeroonebit.github.io/chapada-escapade/'

// ── intro: a animação do logo TOCA SOZINHA no load (2.7s, som junto);
// ao terminar, TL:01:ZB + seta aparecem convidando a rolar pra página ──
// frames 33-100 do render original (1-32 são vazios)
const SHEET = { src: '/brand/logo-sheet.webp', cols: 8, frames: 68, fw: 1484, fh: 579 }
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

if (!reducedMotion) {
  document.documentElement.classList.add('intro-on')
  const canvas = document.querySelector<HTMLCanvasElement>('#intro-canvas')!
  const ctx = canvas.getContext('2d')!
  ctx.imageSmoothingQuality = 'high'
  const sheet = new Image()
  sheet.src = SHEET.src

  let curFrame = 0

  // som da marca (5.wav). Autoplay de áudio é bloqueado no load em TODO
  // browser sem engajamento prévio (mobile sempre) — só toca após um gesto.
  const sfx = new Audio('/brand/logo-sound.mp3')
  sfx.preload = 'auto'
  sfx.volume = 0.35

  const draw = (frame: number) => {
    curFrame = frame
    const sx = (frame % SHEET.cols) * SHEET.fw
    const sy = Math.floor(frame / SHEET.cols) * SHEET.fh
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(sheet, sx, sy, SHEET.fw, SHEET.fh, 0, 0, canvas.width, canvas.height)
  }

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2)
    const w = canvas.clientWidth
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(w * (SHEET.fh / SHEET.fw) * dpr)
    if (sheet.complete) draw(curFrame)
  }
  window.addEventListener('resize', resize)

  const DUR = (SHEET.frames / 25) * 1000 // ~2.7s a 25fps — mesma janela do som
  const finish = () => {
    if (document.documentElement.classList.contains('intro-done')) return
    if (sheet.complete) draw(SHEET.frames - 1)
    document.documentElement.classList.add('intro-done')
  }
  let start = 0
  const step = (ts: number) => {
    if (document.documentElement.classList.contains('intro-done')) return
    if (!start) start = ts
    const t = Math.min(1, (ts - start) / DUR)
    const frame = Math.round(t * (SHEET.frames - 1))
    if (frame !== curFrame) draw(frame)
    if (t < 1) requestAnimationFrame(step)
    else finish()
  }
  const begin = () => { resize(); draw(0); sfx.play().catch(() => {}); requestAnimationFrame(step) }
  if (sheet.complete) begin()
  else sheet.onload = begin

  // Destrava o som no 1º gesto do usuário. CRÍTICO: só remove os listeners
  // quando o play() REALMENTE começa — um gesto que o iOS não reconhece
  // (ex.: pointerdown) não pode gastar a única chance. touchend/click
  // desbloqueiam iOS; wheel/keydown cobrem o desktop.
  const gestureEvents = ['touchend', 'click', 'keydown', 'wheel'] as const
  const disarm = () => { for (const ev of gestureEvents) window.removeEventListener(ev, unlockSfx) }
  const unlockSfx = () => {
    if (!sfx.paused && sfx.currentTime > 0.05) { disarm(); return } // autoplay já pegou
    sfx.currentTime = 0
    sfx.play().then(disarm).catch(() => { /* mantém armado pro próximo gesto */ })
  }
  for (const ev of gestureEvents) {
    window.addEventListener(ev, unlockSfx, { passive: true })
  }
  // rolou antes de acabar? pula pro final — ninguém fica refém do intro
  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 0.25) finish()
  }, { passive: true })
} else {
  document.documentElement.classList.add('intro-done')
}

// ── idioma: PT vem do HTML, EN do dicionário; botão alterna e persiste ──
capturePt()
let lang: Lang = initialLang()
const langBtn = document.querySelector<HTMLButtonElement>('#lang-toggle')!
function setLang(next: Lang) {
  lang = next
  applyLang(lang)
  langBtn.textContent = lang === 'pt' ? 'EN' : 'PT' // mostra o destino
}
setLang(lang)
langBtn.addEventListener('click', () => setLang(lang === 'pt' ? 'en' : 'pt'))

// ── tema claro/escuro (escuro = mid-grey, nunca pitch black) ──
const themeBtn = document.querySelector<HTMLButtonElement>('#theme-toggle')!
const themeMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')!
function setTheme(t: 'light' | 'dark') {
  document.documentElement.dataset.theme = t
  themeBtn.textContent = t === 'light' ? '☾' : '☀' // mostra o destino
  themeMeta.content = t === 'light' ? '#ffffff' : '#26292f'
  localStorage.setItem('zob-theme', t)
}
setTheme((localStorage.getItem('zob-theme') as 'light' | 'dark') ?? 'light')
themeBtn.addEventListener('click', () =>
  setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'))

// click-to-play: o iframe só entra quando o visitante pede (boot do jogo ~30s)
const embed = document.querySelector<HTMLDivElement>('#game-embed')!
const playBtn = document.querySelector<HTMLButtonElement>('#play-btn')!

playBtn.addEventListener('click', () => {
  const iframe = document.createElement('iframe')
  iframe.src = GAME_URL
  iframe.allow = 'fullscreen'
  iframe.title = 'Chapada Escapade — protótipo jogável'
  embed.replaceChildren(iframe)
  iframe.focus()
})

// reel: click-to-load do YouTube; enquanto o ID for TODO, avisa "em edição"
const reelEmbed = document.querySelector<HTMLDivElement>('#reel-embed')!
const reelBtn = document.querySelector<HTMLButtonElement>('#reel-btn')!
reelBtn.addEventListener('click', () => {
  const src = reelEmbed.dataset.src ?? ''
  const hint = reelEmbed.querySelector<HTMLElement>('.embed-hint')!
  if (src.includes('TODO')) {
    hint.textContent = document.documentElement.lang === 'en'
      ? 'reel still in the edit bay — coming soon!'
      : 'reel em edição — sai do forno em breve!'
    return
  }
  const iframe = document.createElement('iframe')
  iframe.src = src + '?autoplay=1'
  iframe.allow = 'accelerometer; autoplay; encrypted-media; fullscreen; picture-in-picture'
  iframe.title = 'ZerO-OneBit — reel'
  reelEmbed.replaceChildren(iframe)
})

// reveal on scroll — sem libs, IntersectionObserver puro
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in')
        io.unobserve(e.target)
      }
    }
  },
  { threshold: 0.15 },
)
document.querySelectorAll('.reveal').forEach((el) => io.observe(el))

// rede de segurança: se nada revelou em 1.2s (IO indisponível/estranho),
// mostra tudo — página invisível nunca. Com o intro ativo, o conteúdo está
// legitimamente abaixo da dobra, então o fallback não se aplica.
setTimeout(() => {
  if (!document.documentElement.classList.contains('intro-on') && !document.querySelector('.reveal.in')) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'))
  }
}, 1200)
