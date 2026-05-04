# AI Usage Report — F.CSM311 Бие даалт 13

**Огноо:** 2025-04-24  
**Төсөл:** Personal Task Tracker  
**Хэрэгсэл:** Claude (claude.ai, Claude Code)  
**Нийт үг:** ~2000+

---

## 1. Юуг AI хийсэн, юуг өөрөө хийсэн?

### А хэсэг (Төлөвлөлт)

**AI хийсэн:**
- Stack харьцуулалтын хүснэгт үүсгэж анхны draft бэлтгэсэн. Гурван stack-ийн давуу болон сул талуудыг тоочсон.
- Mermaid диаграмын syntax-г зохицуулахад туслаж, ER diagram болон sequence diagram-ийн template санал болгосон.
- CLAUDE.md-д No-Go Zones хэсгийн жагсаалт гаргахад туслаж, OWASP-тэй холбогдох аюулуудыг тодорхойлсон.
- ADR форматыг санал болгосон — Context, Decision, Rationale, Consequences бүтэц.

**Өөрөө хийсэн:**
- Stack-ийг сонгох эцсийн шийдвэр — AI FastAPI илүүд үзсэн ч Node.js-г сонгосон шалтгааныг өөрөө тодорхойлсон.
- Директор бүтцийг тохируулсан — AI template санал болгосон ч services/ давхарга нэмэх, db/ тусгаарлах нь өөрийн шийдвэр.
- CLAUDE.md-ийн No-Go Zones-д `console.log` нэмэх шийдвэр — AI хэт ерөнхий дүрэм санал болгосон байсан.
- ADR-001-ийн үндэслэл хэсэг — "AI мэдлэг" тухай тайлбарыг өөрийн туршлагаас нэмсэн.

### Б хэсэг (Хэрэгжилт)

**AI хийсэн:**
- `task.model.js`-д `findAll()` функцийн dynamic WHERE clause pattern санал болгосон. Энэ нь params array + conditions join хэв маяг.
- `validate.js`-д createTaskRules болон updateTaskRules-ийн express-validator chains бичихэд туслаж анхны draft гаргасан.
- `errorHandler.js`-д 4-аргументтай Express error middleware pattern санал болгосон.
- Unit test-үүдийн `describe/it` бүтцийн анхны scaffold гаргасан.
- OpenAPI 3.0 spec-ийн YAML бүтцийг template-аар бэлтгэхэд туслаж components/schemas/responses structure санал болгосон.

**Өөрөө хийсэн:**
- Бүх SQL query-г шалгаж prepared statement мөн эсэхийг баталгаажуулсан.
- `task.service.js`-д `getOverdueTasks()` функцийн логик — overdue тодорхойлолт, filter нөхцөл өөрөө бичсэн.
- Тест `afterEach`-д cleanup strategy тодорхойлсон — AI `DELETE FROM tasks` sanал болгосон ч foreign key cascade дарааллыг өөрөө зохицуулсан.
- `src/index.js`-д `require.main === module` шалгалт — тест дотор server listen болохгүй байх шаардлагыг өөрөө ойлгож нэмсэн.
- Validation rules-д `due_date`-д regex `/^\d{4}-\d{2}-\d{2}$/` ашиглах шийдвэр — AI `isDate()` санал болгосон ч тодорхой format шаарддаг учир regex-г өөрийн болгосон.

### В хэсэг (Эргэцүүлэл)

**AI хийсэн:** Энэ тайланг эхлүүлэхэд тусалсан — асуултын жагсаалт уншиж бүтцийн санаа санал болгосон.  
**Өөрөө хийсэн:** Бүх агуулга — туршлага, жишээ, дүгнэлт бүгд өөрийн бодол байна.

---

## 2. Hallucination жишээ (2+)

### Жишээ 1: SQLite ENUM type

**Нөхцөл:** Schema дизайн үеэр Claude-д асуухад `status` талбарыг дараах байдлаар санал болгосон:
```sql
status ENUM('pending', 'in-progress', 'done') NOT NULL DEFAULT 'pending'
```

**Асуудал:** SQLite-д `ENUM` гэсэн өгөгдлийн төрөл **байхгүй**. Энэ нь PostgreSQL болон MySQL-д байдаг. SQLite-д хэрэглэвэл `ENUM` гэдгийг `TEXT` гэж ойлгоод CHECK constraint-гүйгээр ажиллана — буруу утга оруулах боломж нээлттэй болно.

**Хэрхэн олсон:** SQLite-ийн official documentation-г шалгаж, `Data Types` хэсэгт `ENUM` байхгүйг олсон.

**Засал:**
```sql
status TEXT NOT NULL DEFAULT 'pending'
  CHECK(status IN ('pending', 'in-progress', 'done'))
```

**Сургамж:** AI-д "SQLite" гэж хэлсэн боловч PostgreSQL syntax санал болгосон. Database-specific syntax-г заавал баримт бичгээр шалгах шаардлагатай.

---

### Жишээ 2: express-validator-ийн `check()` function

**Нөхцөл:** Validation middleware бичихэд Claude дараах pattern санал болгосон:
```javascript
const { check, validationResult } = require('express-validator');

router.post('/', [
  check('title').notEmpty().isLength({ max: 200 }),
  check('status').isIn(['pending', 'done']),
], handler);
```

**Асуудал:** `check()` нь express-validator v6 хүртэлх хуучин API. v7-д `body()`, `param()`, `query()` гэсэн тусгай функцүүд байдаг бөгөөд `check()` нь deprecated болсон. Хэдийгээр одоохондоо ажиллах боловч цаашид `body()` ашиглах нь best practice.

**Хэрхэн олсон:** npm package-ийн changelog болон express-validator v7 migration guide-г уншсан.

**Засал:**
```javascript
const { body, validationResult } = require('express-validator');
body('title').trim().notEmpty().isLength({ max: 200 })
```

**Сургамж:** Library version-д анхаар — AI-н мэдлэг хуучин version дээр суурилсан байж болно.

---

### Жишээ 3: `jest.resetModules()` болон singleton DB

**Нөхцөл:** In-memory SQLite тестэд Claude `jest.resetModules()` ашиглан module cache цэвэрлэх санал болгосон.

**Асуудал:** `better-sqlite3`-тэй хамт module cache цэвэрлэхэд singleton `_db` variable reset болдоггүй тул DB холболт тасарч тест бүтэлддэг. Claude энэ нарийн ширийнийг ойлгоогүй байсан.

**Засал:** `beforeAll`-д `migrate()` нэг удаа дуудах, `afterEach`-д SQL DELETE ашиглах — module cache огт хөндөхгүй.

---

## 3. Security/License анхаарал

### Security жишээ: Stack trace production дотор

**Claude-ийн анхны санал:**
```javascript
function errorHandler(err, req, res, next) {
  res.status(err.statusCode || 500).json({
    error: err.message,
    stack: err.stack,  // ← АЮУЛТАЙ
  });
}
```

**Асуудал:** Stack trace нь `OWASP A05 — Security Misconfiguration`-д тодорхойлогдсон аюул. Хэрэглэгчид stack trace харуулах нь:
- Системийн директор бүтцийг задруулна
- Ашигласан framework, library-г харуулна
- Хакерт attack vector олоход туслана

**Засал:** `NODE_ENV` шалгаж зөвхөн development-д харуулах:
```javascript
const isDev = process.env.NODE_ENV === 'development';
res.json({
  error: err.message,
  ...(isDev && { stack: err.stack }),
});
```

**Нотолгоо:** OWASP A05 — "Detailed error messages, stack traces... exposed to users."

---

## 4. AI-аар хурдан хийсэн зүйлс

**Хамгийн том давуу тал нь ажлын эхний хязгаарыг хурдан тодорхойлох явдал байсан:**

- **Boilerplate код:** Express app setup, CORS, dotenv, middleware chain — 10 минутад л бэлэн болсон. Гараараа хийвэл 1-2 цаг зарна.
- **OpenAPI YAML spec:** 100+ мөрийн YAML бичих нь маш уйдаартай ажил — AI анхны draft 5 минутад гаргасан, засаж тохируулахад 15 мин зарсан.
- **Test scaffold:** `describe/it` бүтэц, `beforeAll/afterEach` pattern — Claude хурдан гаргасан, агуулгыг өөрөө нэмсэн.
- **Mermaid диаграм:** ER diagram, sequence diagram-ийн syntax-г санах хэрэггүй болсон.
- **Documentation:** JSDoc comment-уудын бүтэц хурдан гарсан.

Нийтдээ А хэсгийн төлөвлөлт дангаараа 4-6 цаг зарна гэж тооцсон байсан ч AI-тай 1.5-2 цагт дуусгасан.

---

## 5. AI-аар удаан хийсэн зүйлс

**Хамгийн том бэрхшээл нь hallucination-г илрүүлэх, шалгах цаг зарцуулах:**

- **SQLite specific syntax:** AI PostgreSQL syntax санал болгох тохиолдол олон байсан. `ENUM`, `SERIAL`, `RETURNING *` гэх мэт — бүгдийг гараар шалгах шаардлагатай болсон.
- **Library version мэдлэг:** express-validator v6 vs v7 API зөрүүг AI ялгаагүй. Баримт бичиг уншихад цаг зарсан.
- **Context алдагдах:** Урт chat session дотор AI анхны нөхцлийг мартаж өөр хандлагаар хариулна. Жишээ нь: "DB_PATH environment variable ашигла" гэж тохируулсан ч дараа нь hardcoded path санал болгосон.
- **Тест refine хийх:** AI үүсгэсэн тест зарим тохиолдолд хэт энгийн эсвэл давхардсан байсан — бүгдийг уншиж давхцал хасах шаардлагатай.
- **Дээрхийн дүгнэлт:** "Зүгээр accept хийснээс засаж шалгах нь ихэвчлэн удаан."

---

## 6. Skill Atrophy эрсдэлийг яаж зохицуулсан?

Энэ нь бие даалтын хамгийн чухал асуулт байсан. Би дараах стратеги ашигласан:

**"AI Blackout" цаг тохируулсан:**  
Б хэсгийн явцад нэг өдрийг AI-гүйгээр ажилласан. Тухайлбал, `task.service.js`-д `getOverdueTasks()` функцийг бүтнээрээ өөрөө бичсэн — хамгийн анх. Дараа нь Claude-аас шалгуулсан. Ялгаа: дангаараа бичихэд 20 минут, Claude-тай 3 минут. Гол зүйл нь логикоо өөрөө бодож гаргасан.

**Бүх код review хийсэн:**  
AI-аас кодыг paste хийж шууд commit хийгээгүй. Мөр бүрийг уншаж, ойлгосон гэдгээ шалгасан. Зарим функцийн нэр болон бүтцийг өөрчилсөн — ингэснээр "өөрийн болгосон" мэдрэмж бий болсон.

**Тест өөрөө бичсэн:**  
AI тестийн scaffold бичиж өгсөн ч тест case-ийн агуулга — ямар нөхцөлд ямар үр дүн гарах ёстой гэдгийг өөрөө тодорхойлсон. Ингэснээр системийг гүн ойлгосон.

**Шалгалтын бэлтгэл:**  
Бие даалт дуусахаас өмнө нэг удаа кодоо уншиж, "Хэрэв шалгалт өнөөдөр болбол энэ хэсгийг тайлбарлаж чадах уу?" гэж өөрөөсөө асуусан. Validate middleware-ийн chain-ийг, SQLite prepared statement-ийн зарчмыг, error handler middleware-ийн 4 аргументийн учрыг бүгдийг тайлбарлаж чадна.

**Дүгнэлт:** AI нь хурд нэмэгдүүлэх хэрэгсэл болохоос "оронд нь ажилладаг" хэрэгсэл болж болохгүй. "Verify, don't trust" зарчим нь техникийн шалгалт биш — өөрийн ойлголтын шалгалт.
