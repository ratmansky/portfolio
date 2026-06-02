# Projects

Реестр кейсов портфолио. Данные в UI дублируются в `src/data/projects.js`.

Картинки и превью: см. [assets.md](../assets.md).

## Паттерн страницы кейса (как COVO)

Ориентир — `src/pages/Covo.jsx` + `src/projects/<id>/content.js`.

| Что | Как |
|-----|-----|
| Разметка | Каждая секция — отдельный `portfolio-row`: слева заголовок (`portfolio-label`), справа контент |
| Контент | Массив `sections` в `content.js`: `type: 'section'`, `heading`, `paragraphs`, опционально `list`, `image`, `imageGrid`, вложенные `subsections` |
| Шапка | `meta`, `title`, блок `summary` (текст + колонка «команда/scope») |
| Превью при скролле | `previewImage` на секции/подсекции + `get*PreviewSections()` в `content.js` |
| Картинки в тексте | `CaseStudyImage` (клик → модалка); на мобилке — квадратное inline-превью в первом абзаце |
| Метрики | Секция `type: 'metrics'` в конце, заголовок только в левой колонке |
| Скругления | У скриншотов кейса `border-radius: 0` |
| Квадратные кадры | Класс `page--case-study-square` на `<main>` (сейчас Uchi.ru): `aspect-ratio: 1/1`, `object-fit: cover` |

| id | Название | Статус |
|----|----------|--------|
| [redesign-of-teacher-dashboard](./redesign-of-teacher-dashboard.md) | Redesign of teacher dashboard | live; разметка как COVO |
| `covo` | COVO — intranet MVP | live; текст в `src/projects/covo/content.js` (источник: Obsidian «COVO v2») |
| `project-2` … `project-5` | — | placeholders |
