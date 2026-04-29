# ADR-001: Stack сонголт — Node.js + Express + SQLite

**Огноо:** 2026-04-30 
**Статус:** Accepted  
**Шийдвэр гаргагч:** Оюутан 

---

## Нөхцөл байдал (Context)

Personal Task Tracker бие даалтад stack сонгох шаардлагатай болсон. Шалгуур:

- 2 долоо хоногийн хугацаа
- AI workflow (Claude Code) туршиж сурах
- Жижиг систем, ≥3 feature
- Deploy хялбар байх

## Авч үзсэн сонголтууд

1. **Node.js + Express + SQLite** — JavaScript full-stack, file DB
2. **Python + FastAPI + PostgreSQL** — type-safe, auto OpenAPI docs
3. **Bun + Hono + Turso** — bleeding-edge, хурдан

## Шийдвэр

**Node.js 20 + Express 4 + SQLite3 (better-sqlite3)**

## Үндэслэл

### Сонгосон шалтгаан

1. **AI hallucination эрсдэл бага**: Claude Code нь Express болон SQLite-д маш тодорхой мэдлэгтэй. FastAPI-г сонговол Pydantic v2 vs v1 API-ийн зөрүүнд Claude алдаа гаргах магадлал өндөр — энэ нь STACK-COMPARISON.md-д тодорхойлогдсон.

2. **Setup хугацаа**: Node.js суулгасан компьютерт `npm init` → `npm install express` → ажиллана. PostgreSQL server суулгах, `.env` тохируулах, миграц нарийн тохируулах шаардлагагүй.

3. **SQLite file-based DB**: `tasks.db` файл нэг — Git-д хянах боломжтой (seed data-д), migration скрипт энгийн, хамтран ажиллахад хялбар.

4. **Хэлний нийцтэй байдал**: Frontend (Vanilla JS) болон Backend (Node.js) нэг хэлтэй — context switch байхгүй.

### Татгалзсан шалтгаан

- **FastAPI**: Auto OpenAPI давуу талтай ч PostgreSQL setup 1-2 цаг зарна; хугацааны хязгаарт эрсдэлтэй.
- **Bun + Hono**: Ирээдүйтэй ч Claude-д хязгаарлагдмал мэдлэг — AI туслалцаа бага, hallucination эрсдэл өндөр.

## Үр дагавар

### Эерэг
- Хурдан эхлэх, AI workflow-д анхаарах цаг ихэссэн
- Express ecosystem тогтвортой, баримт бичиг элбэг
- SQLite production-д жижиг ачааллын sistemд хангалттай

### Сөрөг
- Type safety байхгүй (TypeScript нэмэхгүй — хугацаа дутмаг)
- SQLite concurrent write дутмаг — scale болоход PostgreSQL руу шилжих шаардлагатай
- Auto OpenAPI gen байхгүй — swagger.json гараар бичнэ

## Хянах огноо

Б хэсгийн дундуур (ADR-002-д) — хэрэв шийдвэр өөрчлөгдвөл энэ ADR-г supersede хийнэ.
