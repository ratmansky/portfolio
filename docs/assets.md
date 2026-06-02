# Ассеты

Все медиа для сайта — в `public/assets/`. Vite отдаёт их по URL `/assets/…`.

## Структура

| Папка | URL на сайте | Назначение |
|-------|--------------|------------|
| `public/assets/shared/` | `/assets/shared/…` | Favicon, портрет на главной (`portrait.png`), OG-картинки |
| `public/assets/projects/<id>/` | `/assets/projects/<id>/…` | Скриншоты и медиа других кейсов |
| `public/covo/` | `/covo/…` | **COVO** — короткие имена для экспорта из Figma |
| `public/assets/previews/` | `/assets/previews/…` | Превью при ховере на главной (если файл не из папки кейса) |

## Примеры путей

**Превью на главной** (`src/data/projects.js`):

```js
previewImage: '/assets/projects/redesign-of-teacher-dashboard/07-result-shared-class.png',
// COVO:
previewImage: '/covo/cov1.png',
```

**Кейс** (`src/projects/<id>/content.js`):

```js
const imageBase = '/assets/projects/redesign-of-teacher-dashboard';
// src: `${imageBase}/01-flow-from-classroom-to-purchase.png`
```

**Favicon** — оранжевый круг `#ff4d00` (r=15.84 в viewBox 48×48): `public/assets/shared/favicon.svg`, копии `public/favicon.svg`, `public/favicon-42.png` (42×42), `public/favicon.ico` (42×42, копия PNG). В `index.html` — `?v=6`; после замены увеличь номер.

**Портрет на главной** — `public/assets/shared/portrait.png`, `157×209`, `object-fit: cover`. По hover (только desktop с мышью) — оранжевый оверлей `--accent` с `mix-blend-mode: multiply`, opacity `0.42`, внутри `isolation: isolate`. На мобилке эффект отключён.

Портрет и превью делят `--media-left: calc(8.33% + 2px - 30px)`. На десктопе портрет `position: fixed` слева (`top: var(--chrome-top)`); переключатель темы `.theme-toggle` — `top: var(--chrome-top)`. На мобилке (≤960px) портрет в потоке над именем в `.portfolio-intro-header`; верх фото = `padding-top` страницы (`--page-top`: 48px / 32px на ≤640px), тугл на том же уровне — `top: var(--page-top)`. Вертикальный отступ до имени и от контактов до блока Projects — один токен `--block-gap: 42px` (gap в `.portfolio-intro-header` и `.portfolio-layout`). Блок с ФИО, intro-текстом и контактами начинается с `.portfolio-label` в intro-ряду: у него `padding-top: 12px` (селектор `.portfolio-row--intro .portfolio-intro-header .portfolio-label`). Превью: на 641–1280px следует за курсором с отступом и clamp по viewport; на широких десктопах стоит слева (`left: var(--media-left)`, `--preview-bottom: 61px`); скрыто на touch/mobile ≤640px.

## Именование

- Нумерация: `01-`, `02-` — порядок на странице
- Slug в имени: `07-result-shared-class.png`
- Латиница и дефисы

## Форматы

- Скриншоты: PNG или WebP
- Превью на главной и в кейсе (липкое слева): **4:3**, ширина `--preview-width` (342px), высота `calc(342 * 3/4)` ≈ **257px** (`--preview-aspect-ratio: 4/3` в `src/styles.css`)
### COVO (`public/covo/` → `/covo/`)

Клади экспорт из Figma сюда, подменяя файлы **с тем же именем**. Легенда дублируется в `src/projects/covo/content.js`.

| Файл | Раздел кейса |
|------|----------------|
| `cov1.png` | Контекст — иллюстрация (фон превью, главная) |
| `cov2.png` | **Проблема** — липкое превью на этой секции |
| `cov3.png` | *(не используется — можно удалить)* |
| `cov-screens-getting-dressed.png` | Временная плашка для секций без финальных скринов |
| `cov4.png`–`cov8.png` | Старые плейсхолдеры, сейчас не используются |
| `cov-logo.svg` / `cov-logo-light.svg` | Логотип в шапке кейса |
| `cov-icon.svg` / `cov-icon.png` | Иконка MeasureMate в тексте |

Формат скриншотов: PNG, **4:3** (см. выше). Иллюстрация `cov1` — фон уже в экспорте из Figma; в UI без доп. подложки, рамки и тени.
