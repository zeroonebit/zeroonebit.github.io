# ZerO-OneBit — portfolio site

Site portfolio do Thiago (Bolinho) — tech artist em jogos e indústria criativa. Brand `0:0`.

## Conceito atual (2026-07-20) — narrativa estilo Bismuth/LMI
Landing de storytelling profissional inspirada em **bismuthconsultancy.com** (tese de uma
frase no hero + dual audience) e **lebrov.com** (grid de craft + mostrar>contar), usando a
narrativa pessoal do Thiago (texto "churrasco" que ele forneceu — os títulos são frases dele).
**v2.3 (2026-07-21)**: (a) lockup do intro = `TL:01:ZB` GRANDÃO no CENTRO da tela
(clamp 3.2rem-8rem, VT323 self-hosted em `public/fonts/vt323.woff2`, mesma fonte do
Chapada — var `--terminal`; centralização por text-align + padding-left compensando o
tracking; some no primeiro scroll junto com a seta) + chevron SVG grande (64-96px) azul
com bounce no rodapé; (b) **modo claro/escuro** no header (botão ☾/☀ ao lado do EN/PT):
escuro é MID-GREY `#26292f` (nunca pitch black — pedido dele), cards `#2d3138`, inks
clareadas (`#46c6ff`/`#ffb547`), marca do header inverte via `filter: invert(1)`, persiste
em `localStorage[zob-theme]`, default claro, meta theme-color acompanha. Timing do intro
aprovado pelo user ("tá ótimo o timing").

**v2.4 (2026-07-21) — intro AUTOPLAY (substituiu o scrub)**: no load, a animação do logo
toca SOZINHA (rAF por tempo, 68 frames a 25fps ≈ 2.7s) em tela grande; ao terminar, o
chevron aparece (fade) convidando a rolar, e o header-banner desliza (lockup TL:01:ZB foi
REMOVIDO a pedido). Sheet no MÁXIMO NATIVO: 1484×579/frame (crop puro do render 1920×1080,
zero resize; sheet 11872×5211, 2.6MB q62, sem unsharp) — no monitor dele o canvas faz
DOWNSCALE 0.93×, nítido por construção; aguenta dpr 2 em telas 4K com upscale mínimo.
Era 720px/frame (upscale 1.9× = o "out of focus" que ele notou). imageSmoothingQuality
high no canvas. #intro tem 100vh (era 320vh de scrub). Rolar > 25% da viewport durante a animação pula pro
final (ninguém fica refém). Som `5.wav` (take escolhido dentre 1-5.wav em
`N:\OldGoogleDrive\MINHAS EMPRESAS\ZERO-ONE BIT\`) → `logo-sound.mp3` (2.98s, 49KB) tenta
tocar junto com a animação — autoplay no load é normalmente BLOQUEADO sem gesto; fallback
dispara no primeiro pointerdown/keydown/touchend enquanto anima. Volume 0.7. Sem rearm
(animação é 1x por load). reduced-motion pula tudo direto pro estado final.

**Intro scrollytelling (2026-07-20, v2.2)**: primeira dobra é tela branca + seta ▼; o scroll
SCRUBBA a animação do logo em tela grande (canvas + sprite sheet `brand/logo-sheet.webp`:
68 frames 720×281 em grade 8×9, 1.3MB — frames 33-100 do render, 1-32 são vazios). Seção
`#intro` de 320vh com stage sticky; progresso suavizado (lerp 0.16); seta some no primeiro
scroll; a >97% adiciona `html.intro-done` → header desliza de cima. Header agora é BANNER
com a marca centralizada (coluna: brand em cima, nav embaixo). `prefers-reduced-motion` pula
o intro inteiro. Scroll restoration do browser faz visitante recorrente cair com intro já
completo (comportamento desejado). `logo-anim.webp` saiu do hero (mantido em brand/ como
asset reserva). Verificado: primeira visita = branco+seta+header oculto; scrub pinta frames;
fim = header entra.

Arquitetura (2026-07-20, v2.1): hero-tese ("Eu construo mundos...") com **botoeira de mídia**
(▶ reel primário + ghosts: playlists, impressão 3D, twins & splats, protótipo, contato) →
**#reel** (click-to-load YouTube; enquanto data-src tiver TODO, mostra "reel em edição") →
missão "duas línguas" → dual audience → 01 "Do virtual pro real" → 02 grid "mesma caixa de
ferramentas" → **03 Impressão 3D** (réplicas museu, Arte Vital, próteses, produtos) →
**04 Digital twins & Gaussian Splatting** (captura/reconstrução/simulação) → **05 Dados
sintéticos & IA** → 06 protótipo jogável (Chapada embed) → 07 professor enrustido →
fechamento. Cada seção tech tem botão de playlist (href="#" TODO). Reveals por
IntersectionObserver com fallback anti-página-invisível.

**i18n PT/EN** (`src/i18n.ts`): o HTML é a fonte de verdade do PT — `capturePt()` lê o
innerHTML de cada `[data-i18n]` no boot; só o dicionário EN vive no código (~45 chaves).
Botão `#lang-toggle` no header (mostra o idioma DESTINO), persiste em `localStorage[zob-lang]`,
primeira visita detecta `navigator.language`, troca também o `<html lang>`. Tradução mantém
a voz mas SEMPRE traduz com sentido — nada fica "universal" em PT (decisão do user): "without
having to sell a kidney", "barbecue-table talk", RUDINHOS → "HELLO MY DEAR NODE NERDS <3!".

> O dungeon Three.js v0.1 anterior foi removido a pedido — backup completo em
> `_backup_dungeon_v01.zip` na raiz. Sem Three.js no projeto agora.

## Stack
- HTML + CSS + TypeScript mínimo, **Vite 6** (dev server/build). Sem framework, sem deps de runtime.
- `src/main.ts` só faz o click-to-play do iframe do jogo.

## Run
```
npm install
npm run dev      # http://localhost:5173 (launch config: zeroonebit-dev)
npm run build
```

## Layout
```
index.html       # página inteira (seções estáticas)
src/style.css    # tema BRANCO com paleta original da marca (ver Convenções)
src/main.ts      # embed click-to-play + i18n + reveals
src/i18n.ts      # dicionário EN (PT vem do DOM)
public/brand/    # marca real (fonte: N:\OldGoogleDrive\MINHAS EMPRESAS\ZERO-ONE BIT\MARCA & LOGO)
  logo-anim.webp   # animação do logo 100 frames, alpha, loop=1 (toca 1x e para no final)
  logo-final.png   # poster estático (usado em prefers-reduced-motion)
  favicon-32/64.png, apple-touch-icon.png, mark-512.png  # máscara O-O em PRETO original
```

## Pipeline da marca (reproduzível)
Frames originais: `finalcorrect/ZEROONEBIT.rop_comp1.*.png` (100×, 1920×1080, alpha máx 208 —
NÃO usar KEYFINAL, tem lixo de matte). Processo: PIL normaliza alpha ×255/208 + crop bbox união
+ resize 880w → `magick -delay 4 f*.png -loop 1 -quality 70 logo-anim.webp`. Ícone: alpha de
`GLASSESICON/O-O_BGt.png` como máscara preenchida em preto (8,10,12) — site branco.

## Links reais (preenchidos 2026-07-20)
- Reel: youtube uEIJHwW0Yig (embed nocookie em #reel-embed) · Canal: @ThiagoLaranjeiraZerooneBit
- Playlists: HOUDINI GAME READY `PL4mSf1t7Hmopns-ADNlVlGlQZE4y0RLmN` · NODE A NODE
  `PL4mSf1t7HmorSlefxEWGTAWMVtqwMIj8T` (existem tb: REEL, LIVES, MANTRA/KARMA, Assets)
- Sociais no #contato: ArtStation/Instagram/Twitch/Sketchfab `zeroonebit`, Facebook
  `zeroonebitstudio`
- Empreitadas: Instagram `@artevital3d` (card bebê + bullet 03) e `@primeira.camada`
  (cards museu/prótese + bullet "Primeira Camada" na 03) — handles `.card-handle` nos
  real-cards, prontos pra virar hover-image depois (ele avisou que vai mandar fotos)

## Página interna: feed.html — mosaico do Instagram (2026-07-20)
- `feed.html` (2ª entrada do Vite em rollupOptions.input): mosaico CSS-columns com
  **embeds OFICIAIS do Instagram** (blockquote .instagram-media + embed.js) — 6 posts
  curados por perfil: #zeroonebit (reels), #artevital3d, #primeira-camada. Botão
  "seguir ↗" por seção. Sem API key — mas é CURADO, não auto-atualiza: post novo =
  colar permalink novo no HTML.
- Rotas de entrada: `.card-handle` dos real-cards → `/feed.html#<perfil>`;
  botão "mosaico do Instagram" na seção 03.
- Feed automático de verdade exige Instagram Graph API (app Meta + conta business +
  token 60 dias) — decisão adiada; alternativa futura: GitHub Action baking JSON.
- Permalinks colhidos via browser dos perfis públicos em 2026-07-20.

## Git + Deploy (2026-07-21) ✅
- Repo: **github.com/zeroonebit/zeroonebit.github.io** (user site → URL raiz), branch main
- Deploy: GitHub Actions (`.github/workflows/deploy.yml`) — push em main → npm ci + build →
  Pages. Mesmo fluxo do Chapada: editou, commitou, push, ~1min no ar
- ⚠️ PEGADINHA (resolvida 2026-07-21): repo `.github.io` liga Pages em `build_type=legacy`
  (serve a RAIZ CRUA — index.html chamando /src/main.ts, sem CSS buildado) automaticamente.
  Tem que forçar `gh api -X PUT .../pages -f build_type=workflow` pra usar o artifact do
  Actions (o dist buildado). Sintoma: site aparece sem estilo nenhum (HTML cru serif).
- Identidade git LOCAL do repo: Thiago Laranjeira / laranjeira.thico@gmail.com (igual Chapada)
- Backups zip, .claude/ e tsbuildinfo ficam FORA do repo (.gitignore)
- **Domínios (2026-07-21)**: principal = **zero-onebit.com** ✅ DNS configurado na GoDaddy
  (4 A @ → 185.199.108/109/110/111.153 + CNAME www → zeroonebit.github.io), propagou rápido,
  HTTP responde 200. HTTPS: cert TLS em provisionamento automático pelo GitHub (poller liga
  o Enforce assim que sair). E-mail do domínio preservado (MX/email.secureserver intactos).
  **thiagolaranjeira.com** = redirect 301 na GoDaddy Forwarding → https://zero-onebit.com
  (PENDENTE — ele ainda vai fazer). **indiedungeons.com** = RESERVADO pra plataforma de
  conteúdo futura.

## Próximos passos (não fazer sem pedir)
- Configurar domínio GoDaddy (ver seção acima — aguardando ele dizer qual domínio)
- Link Hotmart do INDIE DUNGEONS (teach.1 + dual.artists.1)
- Email e LinkedIn no #contato (TODOs restantes)
- Playlists DEDICADAS de impressão 3D / splats / ML quando existirem — hoje os botões das
  seções 03/04/05 apontam pro canal (TODO comentado no HTML)
- Poster/screenshot do jogo como fundo do embed antes do play
- "Portfolio Mode" dentro do próprio jogo (proposta pausada — ver memória chapada-portfolio-mode)

## Backups (sem git ainda)
- `_backup_dungeon_v01.zip` — dungeon Three.js removido em 2026-07-06
- `_backup_site_v02_bismuth_white.zip` — estado 2026-07-20: narrativa Bismuth/LMI + i18n +
  marca real + tema branco (inclui public/brand)
- `_backup_site_v03_reel_techs_feed.zip` — estado 2026-07-20 final: reel real + botoeira
  hero + seções tech 03/04/05 + todos os links (canal/playlists/sociais/empreitadas) +
  feed.html mosaico Instagram

## Convenções
- Sem framework de UI. PT-BR no conteúdo (EN via i18n).
- **Identidade (2026-07-20, decisão do user): site BRANCO com as cores ORIGINAIS do logo** —
  preto #0b0d10, azul #02c8fd (fills; #0088c2 pra texto), amarelo #fbcc03 (fills; #d98f00 pra
  texto). Cores sampladas do próprio poster do logo. Ícones/favicon em PRETO original.
  Única área escura da página: o chip do game-embed (moldura proposital do jogo).
