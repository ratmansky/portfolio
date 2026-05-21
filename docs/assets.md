# Ассеты

Все медиа для сайта — в `public/assets/`. Vite отдаёт их по URL `/assets/…`.

## Структура

| Папка | URL на сайте | Назначение |
|-------|--------------|------------|
| `public/assets/shared/` | `/assets/shared/…` | Favicon, портрет на главной (`portrait.png`), OG-картинки |
| `public/assets/projects/<id>/` | `/assets/projects/<id>/…` | Скриншоты и медиа кейсов (напр. `covo/covo-logo.svg`) |
| `public/assets/previews/` | `/assets/previews/…` | Превью при ховере на главной (если файл не из папки кейса) |

## Примеры путей

**Превью на главной** (`src/data/projects.js`):

```js
previewImage: '/assets/projects/redesign-of-teacher-dashboard/07-result-shared-class.png',
// или отдельный файл:
previewImage: '/assets/previews/covo.png',
```

**Кейс** (`src/projects/<id>/content.js`):

```js
const imageBase = '/assets/projects/redesign-of-teacher-dashboard';
// src: `${imageBase}/01-flow-from-classroom-to-purchase.png`
```

**Favicon** — оранжевый круг `#ff4d00` (r=15.84 в viewBox 48×48): `public/assets/shared/favicon.svg`, копии `public/favicon.svg`, `public/favicon-42.png` (42×42), `public/favicon.ico` (42×42, копия PNG). В `index.html` — `?v=6`; после замены увеличь номер.

**Портрет на главной** — `public/assets/shared/portrait.png`, `157×209`, `object-fit: cover`. По hover (только desktop с мышью) — оранжевый оверлей `--accent` с `mix-blend-mode: multiply`, opacity `0.42`, внутри `isolation: isolate`. На мобилке эффект отключён.

Портрет и превью делят `--media-left: calc(8.33% + 2px - 30px)`. На десктопе портрет `position: fixed` слева (`top: var(--chrome-top)`); переключатель темы `.theme-toggle` — `top: var(--chrome-top)`. На мобилке (≤960px) портрет в потоке над именем в `.portfolio-intro-header`; верх фото = `padding-top` страницы (`--page-top`: 48px / 32px на ≤640px), тугл на том же уровне — `top: var(--page-top)`. Вертикальный отступ до имени и от контактов до блока Projects — один токен `--block-gap: 42px` (gap в `.portfolio-intro-header` и `.portfolio-layout`). Блок с ФИО, intro-текстом и контактами начинается с `.portfolio-label` в intro-ряду: у него `padding-top: 12px` (селектор `.portfolio-row--intro .portfolio-intro-header .portfolio-label`). Превью: `left: var(--media-left)`, `--preview-bottom: 61px`; скрыто на экранах ≤1280px.

## Именование

- Нумерация: `01-`, `02-` — порядок на странице
- Slug в имени: `07-result-shared-class.png`
- Латиница и дефисы

## Форматы

- Скриншоты: PNG или WebP
- Превью на главной: ~342×296 px (`--preview-width` / `--preview-height` в `src/styles.css`)
