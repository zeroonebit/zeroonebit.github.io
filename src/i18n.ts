// i18n minimalista: o HTML é a fonte de verdade do PT-BR; no boot capturamos
// o innerHTML de cada [data-i18n] como dicionário PT. Só o EN vive aqui.
export type Lang = 'pt' | 'en'

const EN: Record<string, string> = {
  'nav.reel': 'Reel',
  'nav.real': 'Virtual to real',
  'nav.industrias': 'Industries',
  'nav.prototipo': 'Prototype',
  'nav.aprender': 'Learn',
  'nav.contato': 'Contact',

  'hero.eyebrow': 'Thiago Laranjeira · Technical Artist · <em>Poppy Playtime</em> (Mob Entertainment)',
  'hero.h1': 'I build worlds that<br />only exist inside a computer.',
  'hero.lead':
    'And I teach the computer to build them by itself: instead of cooking dish by dish, I write the recipe. It’s called <strong>proceduralism</strong> — cities, forests, entire worlds, at whatever scale you need.',
  'hero.cta1': '▶ watch the reel',
  'hero.ctaPlaylists': 'playlists',
  'hero.ctaPrint': '3D printing',
  'hero.ctaTwins': 'twins &amp; splats',
  'hero.ctaProto': 'playable prototype',
  'hero.cta2': 'let’s talk',

  'reel.p': 'Three minutes of what this toolbox does — games, scans, prints, splats and starry skies:',
  'reel.play': '▶ WATCH THE REEL',
  'reel.hint': 'straight from YouTube · sound recommended',

  'print.h2': '3D printing — the road back',
  'print.p':
    'The scanner brings the world into the computer; the printer gives it back. FDM and resin, from functional prototypes to pieces that make people cry — this is where technology becomes something you hold in your hand.',
  'print.1': '<strong>Collection replicas</strong> — museums preserve the original and gain tactile copies anyone can touch.',
  'print.2':
    '<strong><a href="https://www.instagram.com/artevital3d" target="_blank" rel="noopener">Arte Vital 3D</a></strong> — the ultrasound becomes the baby’s face, framed, in the mother’s hands before birth.',
  'print.3': '<strong>Custom prosthetics</strong> — for people and animals, at prices that fit real life.',
  'print.4':
    '<strong><a href="https://www.instagram.com/primeira.camada" target="_blank" rel="noopener">Primeira Camada</a></strong> — parts and products: from drone cases to telescope mounts, designed, sliced, printed.',
  'print.link': 'watch 3D printing on the channel ↗',
  'print.mosaic': 'Instagram mosaic',

  'twins.h2': 'Digital twins &amp; Gaussian Splatting',
  'twins.p':
    'A living, faithful virtual copy of something real — a machine, a building, a production line. With Gaussian Splatting, a scan rebuilds the environment with near-photographic realism. Then you test on the twin before touching the real thing.',
  'twins.1': '<strong>Capture</strong> — drones, photogrammetry, LiDAR, 360°: the real world becomes data.',
  'twins.2': '<strong>Reconstruction</strong> — Gaussian Splatting and photogrammetry turn capture into a navigable 3D scene.',
  'twins.3': '<strong>Simulation</strong> — find where the part fails, how the air flows, what happens if something goes wrong. No risk, no physical cost.',
  'twins.link': 'watch splats &amp; scans on the channel ↗',

  'synth.h2': 'Synthetic data &amp; AI',
  'synth.p':
    'Machines learn by seeing examples — but nobody crashes a self-driving car a thousand times so it learns to swerve. So we fabricate the examples: virtual scenarios, realistic enough to train AI as if they had happened. It applies to cars, robots and medicine — spotting the tumor the eye might miss, planning the surgery before it exists.',
  'synth.link': 'see CV &amp; ML experiments on the channel ↗',

  'mission.quote':
    'Artists want it <span class="hl">beautiful</span>. Engineers want it <span class="hl">working</span>. I live in the middle of that fight, playing translator.',
  'mission.note':
    'Across the whole ecosystem — the artist, the engineer, the AI, the data, the client — my job is being the glue: connecting pieces that speak different languages and making the whole thing work end to end.',

  'dual.studios.h2': 'For studios &amp; industries',
  'dual.studios.1':
    '<strong>Production proceduralism</strong> — pipelines and tools (Houdini, HDAs, engine) that generate content at scale, from games to simulation.',
  'dual.studios.2':
    '<strong>Digital twins</strong> — scanning the real world (Gaussian Splatting, photogrammetry, drones) and rebuilding it faithfully: test on the twin before touching the real thing.',
  'dual.studios.3':
    '<strong>Synthetic data for AI</strong> — the thousand crashes a self-driving car needs to see without ever crashing for real; fabricated scenarios, realistic enough to train machines.',
  'dual.artists.h2': 'For artists &amp; the curious',
  'dual.artists.1':
    '<strong>INDIE DUNGEONS: From Zero to Hero</strong> — a Houdini course in Portuguese, from zero to a full HDA.',
  'dual.artists.2':
    '<strong><a href="https://www.youtube.com/@ThiagoLaranjeiraZerooneBit" target="_blank" rel="noopener">HOUDINI GAME READY &amp; NODE A NODE</a></strong> — YouTube series: Unreal integration and fundamentals, one node at a time.',
  'dual.artists.3':
    '<strong>Backyard astronomy</strong> — classes on the night sky and astrophotography, because science shouldn’t live only in labs.',

  'real.h2': 'From virtual to real — and back',
  'real.p':
    'The magic doesn’t stay locked in the screen. I fly drones to see the world the way birds do, use scanners that turn real objects into digital copies — and the 3D printer walks the road backwards: it spits them back into the real world.',
  'real.card1':
    'Museums preserve ancient pieces forever — and people who can’t see get to <strong>touch the replica</strong>.',
  'real.card2':
    'A mother holds in her hands the <strong>face of the baby</strong> still in her belly.',
  'real.card3':
    'People — and animals too — get <strong>custom-fit prosthetics</strong> without having to sell a kidney.',
  'real.quote': 'Technology that’s meant to hug,<br />not just to impress.',

  'tb.h2': 'The same toolbox',
  'tb.p':
    'What was born for games and film has become a serious tool in industries that have nothing to do with fun. Same engine — serving emotion and industry at the same time.',
  'tb.1.h3': 'Games',
  'tb.1.p': 'Worlds with monsters and forests, everything moving — someone has to teach the computer to make it all work.',
  'tb.2.h3': 'Film &amp; VFX',
  'tb.2.p': 'The impossible shots that look real. The root of it all, still alive.',
  'tb.3.h3': 'Projection mapping',
  'tb.3.p': 'An entire building façade coming to life, in perfect sync.',
  'tb.4.h3': 'Digital twins',
  'tb.4.p': 'A living, faithful virtual copy of a machine, a building, a factory — to predict before you touch.',
  'tb.5.h3': 'Synthetic data',
  'tb.5.p': 'Scenarios fabricated in the computer, realistic enough to train AI as if they had really happened.',
  'tb.6.h3': 'Medicine',
  'tb.6.p': 'Rebuilding and reading medical images: spotting the tumor the eye might miss, planning the surgery before it happens.',

  'proto.h2': 'Show &gt; tell — playable prototype',
  'proto.p':
    '<strong>Chapada Escapade</strong>: a 2D arcade where an alien ship abducts cows in the Brazilian Cerrado. Procedural terrain, AI-generated sprites with a custom pipeline, dynamic weather. Everything this site preaches, running in your browser:',
  'proto.play': '▶ PLAY NOW',
  'proto.hint': 'first boot takes ~30s · WASD or mouse · best on desktop',
  'proto.full': 'open fullscreen ↗',

  'teach.h2': 'Teacher in disguise',
  'teach.p':
    'In my free time I teach astronomy and how to photograph stars and galaxies — the things up there that make us feel small, in the good way. Science should be barbecue-table talk. HELLO MY DEAR NODE NERDS &lt;3!',
  'teach.1': '<strong>INDIE DUNGEONS</strong> — Houdini from zero to HDA, in Portuguese',
  'teach.2':
    '<strong><a href="https://www.youtube.com/playlist?list=PL4mSf1t7Hmopns-ADNlVlGlQZE4y0RLmN" target="_blank" rel="noopener">HOUDINI GAME READY</a></strong> — Houdini + Unreal in practice',
  'teach.3':
    '<strong><a href="https://www.youtube.com/playlist?list=PL4mSf1t7HmorSlefxEWGTAWMVtqwMIj8T" target="_blank" rel="noopener">HOUDINI NODE A NODE</a></strong> — fundamentals, one node at a time',

  'closing.quote': 'A good tool is one you<br /><span class="hl">forget you’re using.</span>',
  'closing.p':
    'That invisible backstage is what I build. Hard to explain at a barbecue — but I swear it’s fun.',

  'footer.text': '0:0 ZerO-OneBit · turning imagination into real things',
}

const PT: Record<string, string> = {}

function els(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-i18n]'))
}

// captura o PT do próprio DOM (roda uma vez, antes de qualquer troca)
export function capturePt() {
  for (const el of els()) PT[el.dataset.i18n!] = el.innerHTML
}

export function applyLang(lang: Lang) {
  const dict = lang === 'en' ? EN : PT
  for (const el of els()) {
    const html = dict[el.dataset.i18n!]
    if (html !== undefined) el.innerHTML = html
  }
  document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR'
  localStorage.setItem('zob-lang', lang)
}

export function initialLang(): Lang {
  const saved = localStorage.getItem('zob-lang')
  if (saved === 'pt' || saved === 'en') return saved
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}
