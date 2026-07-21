import './style.css'
import { capturePt, applyLang, initialLang, type Lang } from './i18n'

const GAME_URL = 'https://zeroonebit.github.io/chapada-escapade/'

// ── intro OVERLAY: tela cheia com só a seta central (piscando nas cores da
// marca). O clique/toque dispara os frames do logo + o som JUNTOS (o gesto
// libera o áudio no mobile) e, ao terminar, o overlay some e revela a página. ──
// frames 33-100 do render original (1-32 são vazios)
const SHEET = { src: '/brand/logo-sheet.webp', cols: 8, frames: 68, fw: 1484, fh: 579 }
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

if (!reducedMotion) {
  const html = document.documentElement
  html.classList.add('intro-on')
  const canvas = document.querySelector<HTMLCanvasElement>('#intro-canvas')!
  const ctx = canvas.getContext('2d')!
  ctx.imageSmoothingQuality = 'high'
  const sheet = new Image()
  sheet.src = SHEET.src

  const sfx = new Audio('/brand/logo-sound.mp3')
  sfx.preload = 'auto'
  sfx.volume = 0.1

  let curFrame = -1
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
    if (curFrame >= 0 && sheet.complete) draw(curFrame) // só redesenha depois que começou
  }
  window.addEventListener('resize', resize)
  resize() // dimensiona o canvas; NÃO desenha nada (só a seta central aparece)

  // ao terminar os frames: segura o logo um instante, some com o overlay e
  // revela a página (sem esperar scroll/arrasto)
  const jumpToPage = () => {
    html.classList.add('intro-done')                          // dispara o fade do overlay (CSS)
    setTimeout(() => html.classList.add('intro-hidden'), 500) // display:none após o fade
  }

  const DUR = (SHEET.frames / 25) * 1000 // ~2.7s a 25fps
  let start = 0
  const step = (ts: number) => {
    if (!start) start = ts
    const t = Math.min(1, (ts - start) / DUR)
    const frame = Math.round(t * (SHEET.frames - 1))
    if (frame !== curFrame) draw(frame)
    if (t < 1) requestAnimationFrame(step)
    else setTimeout(jumpToPage, 450) // segura o logo ~0.45s, depois salta pra página
  }

  let started = false
  const playEvents = ['click', 'keydown'] as const
  const play = () => {
    if (started) return
    started = true
    html.classList.add('intro-playing') // esconde a seta central
    sfx.currentTime = 0
    sfx.play().catch(() => {})
    start = 0
    const run = () => requestAnimationFrame(step)
    if (sheet.complete) run(); else sheet.onload = run
    for (const ev of playEvents) window.removeEventListener(ev, play)
  }
  for (const ev of playEvents) window.addEventListener(ev, play, { passive: true })
} else {
  document.documentElement.classList.add('intro-done', 'intro-hidden')
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
