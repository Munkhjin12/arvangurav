# AI Planning Session — Plan Phase

**Огноо:** 2026-04-30 
**Хэрэгсэл:** Claude.ai (claude-sonnet-4)  
**Зорилго:** Stack сонголт, архитектур, CLAUDE.md тогтоох

---

## Session 1: Stack харьцуулалт

**Би:** Бие даалт 13-д Task Tracker хийнэ. Node.js+Express+SQLite, Python+FastAPI+PostgreSQL, Bun+Hono+Turso гурвыг харьцуулж өгнө үү. AI workflow туршихад хамгийн тохиромжтой аль нь вэ?

**Claude:** [Харьцуулалтыг хийсэн]
- Node.js: хамгийн хурдан эхлэх, Claude-д сайн мэддэг
- FastAPI: auto docs давуу талтай, PostgreSQL setup хэцүү
- Bun: ирээдүйтэй, гэхдээ тогтворгүй, AI мэдлэг дутмаг

**Би:** SQLite нь production-д хангалттай юу жижиг app-д?

**Claude:** Тийм — concurrent reader олон, write цөөн бол SQLite хангалттай. WAL mode-той бол read-write зэрэг хийх боломжтой. 10,000 хэрэглэгч хүртэл ашигласан жишээ бий.

**Шийдвэр:** Node.js + Express + SQLite ✅

⚠️ **Hallucination шалгалт:** Claude "SQLite 10,000 хэрэглэгч" гэдэг тоог баталгаажуулсан эх сурвалжгүй хэллэг — энэ нь тодорхой дүн биш, ерөнхий мэдлэг. ADR-001-д "жижиг ачаалал" гэж хязгаарласан.

---

## Session 2: Архитектур тогтоох

**Би:** Express app-д Router → Service → Model гэсэн давхаргалал зөв үү? Эсвэл Controller → Repository хэв маяг дээр?

**Claude:** Хоёулаа зөв. Express жижиг app-д Router + Model (2 давхарга) хангалттай. 3 давхарга (Router → Service → Model) нь:
- Unit test хялбар (Service-г mock хийнэ)
- Business logic Router-т хольж орохгүй
- Дараа нь scale болоход дээр

**Би:** Service давхаргыг нэмнэ.

**Claude:** Service файлд: createTask(), updateTask(), getTasksWithFilter() гэсэн функц. Model файлд: insert(), findById(), findAll(), update(), delete() — зөвхөн SQL.

**Шийдвэр:** Router → Service → Model (3 давхарга) ✅

---

## Session 3: CLAUDE.md болон Директор бүтэц

**Би:** CLAUDE.md-д юу оруулах хэрэгтэй вэ? No-go zones гэж юу оруулах вэ?

**Claude:** No-go zones:
1. SQL string concatenation → SQL injection эрсдэл
2. eval() → arbitrary code execution
3. API key hardcode → нууц алдрах
4. Sync file I/O request дотор → event loop блоклогдох
5. * wildcard import → bundle хэмжээ томрох

**Би:** Console.log-ийг no-go-д оруулна уу?

**Claude:** Production кодонд тийм — logger (winston/pino) ашиглах. Гэхдээ development-д хэрэглэж болно. CLAUDE.md-д "production код дотор" гэсэн нөхцөлтэй бич.

**Хэрэглэсэн:** CLAUDE.md No-Go section ✅

---

## Session 4: Mermaid Diagram

**Би:** Архитектур diagram-ийг Mermaid-аар бичихэд тусла. ER diagram болон sequence diagram хамтад нь хэрэгтэй.

**Claude:** [Mermaid код үүсгэсэн — ARCHITECTURE.md-д хэрэглэсэн]

⚠️ **Hallucination шалгалт:** Claude анхлан `erDiagram`-д `datetime` type ашиглаж байсан — SQLite-д `TEXT` эсвэл `INTEGER` хадгалдаг, `datetime` гэсэн native type байхгүй. Schema-д `TEXT` болгон засав.

---

## Хэмнэсэн цаг

| Ажил | AI-гүй | AI-тай |
|------|--------|--------|
| Stack харьцуулалт | 2-3 цаг | 20 мин |
| Mermaid diagram | 1 цаг | 10 мин |
| CLAUDE.md no-go бодох | 30 мин | 5 мин |
| **Нийт** | **~4 цаг** | **~35 мин** |
