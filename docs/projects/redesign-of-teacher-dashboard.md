# Redesign of teacher dashboard

Кейс перенесён из Framer в портфолио.

## Идентификаторы

| Поле | Значение |
|------|----------|
| **id** | `redesign-of-teacher-dashboard` |
| **Название в списке** | Redesign of teacher dashboard |
| **Полный заголовок** | Redesign of Teacher Dashboard: How UX Improved Growth ×2 |
| **Клиент** | Uchi.ru |

## URL

| Где | Путь |
|-----|------|
| Страница кейса | `/projects/redesign-of-teacher-dashboard` |
| Источник (архив) | https://ratmanskii.framer.website/redesign-of-teacher-dashboard |

## Файлы в репозитории

| Что | Путь |
|-----|------|
| Контент (текст, структура) | `src/projects/redesign-of-teacher-dashboard/content.js` |
| Страница | `src/pages/RedesignOfTeacherDashboard.jsx` |
| Изображения | `public/assets/projects/redesign-of-teacher-dashboard/*.png` |
| Карточка на главной | `src/data/projects.js` |

## Карточка на главной

| Поле | Значение |
|------|----------|
| period | 2021 – 2023 |
| description | Uchi.ru \| class collaboration, teacher UX, design system |
| previewColor | `#5b8cff` |

## Метрики

- ×1.8 — increase in active teachers
- +17% — growth in teacher DAU
- +23% — increase in active students

## Перенос — статус

- [x] Создать id и название проекта
- [x] Роутинг (`react-router-dom`)
- [x] Страница кейса в дизайне портфолио (тёмная/светлая тема, сетка label + content)
- [x] Текст и структура секций с Framer
- [x] Изображения скачаны локально (10 файлов)
- [x] Переход страницы (`PageTransition.jsx`, fade/slide всей страницы)
- [x] ~~Shared layout заголовка~~ убран — `h1` статичный, без morph из списка проектов
- [x] Превью при ховере на главной (`previewImage` → `07-result-shared-class.png`)
- [x] Разметка как COVO: секции по строкам, `summary`, scroll-preview, подсекции, `CaseStudyImage`
- [x] Квадратный кроп скриншотов (`page--case-study-square`), без скругления углов
- [ ] Деплой и проверка на проде
- [ ] (опционально) Переэкспорт ассетов 1:1 вместо CSS-crop, если нужен точный кадр

## Отличия от COVO

- Нет логотипа клиента в `summary` (только текст + scope).
- Класс `page--case-study-square` на странице — квадратные превью и фигуры; у COVO пока прямоугольные ассеты 4:3.

## Как править контент

1. Текст — `content.js`, массив `sections`.
2. Картинки — положить в `public/assets/projects/redesign-of-teacher-dashboard/`, обновить `imageBase` в `content.js`.
3. Стили кейса — `src/styles.css`, блок `/* Case study */`.
