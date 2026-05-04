# SELF-EVALUATION.md — Өөрийн үнэлгээ

**F.CSM311 Бие даалт 13 — В хэсэг**

---

## 1. Хэрэв шалгалт өнөөдөр болбол би энэ кодыг өөрөө бичиж чадах уу?

**Хариу: Хэсэгчлэн (Partial) — тайлбартай**

### Чадна:
- `task.model.js`-д prepared statement ашиглан CRUD query бичих — dynamic WHERE clause pattern ойлгосон
- Express router болон middleware chain тохируулах — `app.use()`, route handler, 4-аргументтай error middleware
- `express-validator`-аар validation rules бичих — `body()`, `param()`, `validationResult()`
- `task.service.js`-д business logic тусгаарлах — 404 throw, overdue filter
- SQLite schema бичих — `CHECK` constraint, `PRAGMA foreign_keys`, index

### Хэсэгчлэн чадна:
- Many-to-many JOIN query (task_tags) — ойлгодог ч `GROUP_CONCAT` syntax-г санах хэрэгтэй болно
- Jest + Supertest integration test — бүтцийг мэднэ, гэхдээ `afterEach` cleanup дарааллыг Google хайх магадлалтай
- OpenAPI YAML бичих — format мэднэ, component/schema reference syntax-г санах хэрэгтэй болно

### Чадахгүй (шуудаа):
- `better-sqlite3`-ийн WAL mode pragma-г санах — баримт бичиг шалгана
- express-validator v7-ийн бүх method-ийг цээжлэх — `.optional({ nullable: true })` гэх мэт нарийн тохиргоог хайна

### Дүгнэлт:
Кодыг тайлбарлаж чадна. Ямар давхарга ямар үүрэгтэй, яагаад prepared statement хэрэглэснийг, яагаад 4-аргументтай error handler ашигласнийг — бүгдийг ойлгосон. AI бичсэн кодыг review хийж, зарим хэсгийг өөрөө дахин бичиж туршсан учир "копи пэйст" биш болсон.

---

## 2. Дахин хийнэ гэвэл юуг өөрөөр хийх вэ?

### TypeScript ашиглах

Хамгийн том харамсал. `task.model.js` дахь JSDoc type annotation нь TypeScript-ийн орлуулгаар ашигласан ч IDE дэмжлэг дутмаг байсан. Дараагийн удаад Express + TypeScript + Zod validation ашиглах нь AI hallucination-г илрүүлэхэд ч тусална — type error нь compile-д гарна.

### AI chat history аанхнаас нь хадгалах

Б хэсгийн 01-model-database.md session log-г тухайн chat дууссаны дараа бичсэн учир зарим нарийн ширийн алдарсан. Ярилцлага явагдах үед нэгэн зэрэг хадгалах нь дараа нь цаг хэмнэнэ.

### Frontend хийх

Public/index.html-г маш хялбар байдлаар орхисон. Дараагийн удаад React эсвэл Svelte ашиглаж, fetch API-аар backend-тэй холбох туршлага хийхийг хүсэж байна. Одоогийн API-г UI-гүйгээр тест хийх нь curl-аар хийгддэг — энэ нь хангалтгүй.

### Git branch ашиглах

Feature branch ашиглаагүй. `feat/task-crud`, `feat/tags`, `feat/search` гэх мэт branch-аар ажиллавал commit history нь цэмцгэр, merge request-ийн workflow туршиж болно. Заавал биш ч workflow сайжрана.

### Rate limiting нэмэх

OWASP A04 (Insecure Design) — API-д rate limiting байхгүй. `express-rate-limit` package-г `/security` slash command санал болгосон ч хугацааны хязгаараас болж хэрэгжүүлээгүй. Production систем бол заавал нэмэх ёстой.

---

## 3. Энэ туршлагаас юу сурсан бэ?

### "Verify, don't trust" — практик утгаараа ойлгосон

Лекц 13-д сурсан зарчим биелж байгааг бодит кодонд харсан. SQLite ENUM hallucination, express-validator deprecated API — хоёулаа баримт бичгийг шалгаснаар л илрүүлсэн. AI-д "итгэж болох мэт" санагдаж байсан ч алдаа гарсан. Цаашид бүх AI кодыг "эхний хариулт нь draft" гэж хандана.

### AI нь хурдасгагч, орлуулагч биш

Boilerplate бичих, pattern санал болгох, template гаргахад AI хэмнэлт маш их. Гэхдээ:
- Домейн-специфик логик (overdue тодорхойлолт)
- Architecture шийдвэр (2 vs 3 давхарга)
- Security review

— эдгээрт AI санал болгодог ч эцсийн шийдвэр, хариуцлага өөртөө байна.

### Commit дэг журам нь баримт бичиглэл

Conventional Commits format ашиглаж, `Co-Authored-By: Claude` нэмж байгаад AI-г хэзээ, юунд ашигласнаа бичлэгт үлдээсэн. Саруудын дараа харахад "энэ commit яагаад хийгдсэн" тэр даруй ойлгогдоно. Энэ дадал нь team-д ажиллах үед ч хэрэгтэй.

### Hallucination нь санамсаргүй, тогтмол биш

Нэг хандлагад Claude маш зөв байхад нөгөөд нь буруу. Хэв маяг байхгүй. Тиймээс бүх хариултыг тэгш шалгах шаардлагатай — "энэ хэсэг зөв байсан учир энэ хэсэг ч зөв байна" гэж дүгнэж болохгүй.

### Хамгийн чухал сургамж

Кодыг AI бичлээ гэдэг нь "би мэднэ" гэсэн үг огтхон биш. Мэдлэг нь ойлгоход л бий болдог — тэр ойлголтыг AI авч чадахгүй.
