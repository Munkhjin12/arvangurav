# CLAUDE.md — Personal Task Tracker

Энэ файл нь AI assistant (Claude Code)-д зориулсан репозиторийн гарын авлага.

## Төслийн тойм

Personal Task Tracker REST API + minimal frontend.  
Stack: Node.js 20 + Express 4 + SQLite3 + Jest

## Build & Run команд

```bash
# Суулгах
cd partB && npm install

# Ажиллуулах (development)
npm run dev          # nodemon-той

# Ажиллуулах (production)
npm start            # node src/index.js

# Тест
npm test             # jest
npm run test:watch   # watch mode

# Lint
npm run lint         # eslint
```

## Файлын конвенц

- `src/routes/` — Express router файлууд (tasks.js, auth.js)
- `src/models/` — SQLite query функцууд (task.model.js)
- `src/middleware/` — validation, error handler
- `tests/` — Jest тест файлууд (*.test.js)

## Кодын дүрэм

- **JavaScript ES2022** — async/await заавал, callback хэрэглэхгүй
- **Conventional Commits** — feat:, fix:, docs:, test:, refactor:, chore:
- **Error handling** — бүх async функц try/catch-тай байх
- **Validation** — input бүрийг express-validator-аар шалгах
- **HTTP status codes** — 200, 201, 400, 404, 500 зөв ашиглах
- Нэг файл **200 мөрөөс** хэтрэхгүй (шаардлагатай бол хуваах)
- Функц нэр **camelCase**, констант **UPPER_SNAKE_CASE**
- Comment монгол эсвэл англиар — хольж болохгүй

## No-Go Zones (ХОРИОТОЙ)

- ❌ `eval()` болон `Function()` ашиглахгүй
- ❌ SQL raw string concatenation — prepared statement ЗААВАЛ
- ❌ `console.log` production код дотор
- ❌ API key / secret-ийг кодонд hardcode хийхгүй — `.env` ашиглах
- ❌ `*` wildcard import (tree-shaking алдагдана)
- ❌ Synchronous file I/O (`fs.readFileSync`) request handler дотор
- ❌ `npm install --save` без version pin (use exact versions)

## Database

- SQLite файл: `partB/data/tasks.db`
- Migration файлууд: `partB/src/db/migrations/`
- Seed: `partB/src/db/seed.js`
- Schema өөрчлөхөд migration бичих — db файлыг шууд засахгүй

## API конвенц

- Base URL: `/api/v1`
- Response format:
```json
{ "success": true, "data": {...}, "message": "..." }
{ "success": false, "error": "...", "details": [...] }
```
- Pagination: `?page=1&limit=20`
- Filter: `?priority=high&status=pending`

## Тест дүрэм

- Тест файл: `[module].test.js`
- Coverage: дор хаяж **80%** line coverage
- Мок: `jest.mock()` ашиглан DB-г mock хийх
- Тест нэр: `describe('Task Model') > it('should create a task')`

## AI ашиглалтын дүрэм

- AI үүсгэсэн код бүрийг review хийж, ойлгосны дараа commit хийх
- Hallucination шалгах: library API, SQL syntax, HTTP status
- Security: SQL injection, input validation заавал шалгах
- Commit body-д `Co-Authored-By: Claude <noreply@anthropic.com>` нэмэх
