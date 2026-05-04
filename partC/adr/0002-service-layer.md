# ADR-002: Service Давхарга Нэмэх — Router → Service → Model

**Огноо:** 2025-04-17  
**Статус:** Accepted  
**Supersedes:** Анхны Router → Model (2 давхарга) план

---

## Нөхцөл байдал (Context)

Б хэсэг эхлэхэд `tasks.js` router нь шууд `TaskModel`-г дуудаж байсан:

```javascript
// Анхны хялбар хандлага:
router.post('/', async (req, res) => {
  const task = TaskModel.create(req.body);  // Router шууд Model руу
  res.json(task);
});
```

Feature нэмэгдэх тусам асуудал гарч ирсэн: Overdue шалгалт, tag validation, 404 error нь router-т хуримтлагдаж 50+ мөр болсон. Claude-аас зөвлөгөө авсан.

---

## Claude-тай ярилцлага

**Би:** Router файл 50+ мөр болж байна. Business logic router дотор байх нь зөв үү?

**Claude:** Үгүй — Router-т зөвхөн HTTP-тэй холбоотой зүйл байх ёстой (request parsing, response). Business logic нь тусдаа Service давхаргад байвал:
- Unit test хялбар (HTTP-гүйгээр Service-г шалгана)
- Нэг логикийг олон route ашиглаж болно
- Router уншигдахуйц, богино байна

**Би:** Overhead нэмэгдэхгүй юу? Жижиг project-д шаардлагатай юу?

**Claude:** Function call нэмэгдэнэ, гэхдээ microsecond-ийн зөрүү. Хэрэв ≥3 feature, ≥10 test байвал Service давхарга зохицуулалтыг хялбарчилна. Жижиг project-д хэтэрхий early optimization хийхгүй байх нь зөв ч энэ хэмжээнд Service давуутай.

**Шийдвэр:** Service давхарга нэмэх.

---

## Авч үзсэн сонголтууд

| Сонголт | Тайлбар | Шийдвэр |
|---------|---------|---------|
| **A: Router + Model (2 давхарга)** | Хялбар, Router шууд Model | ❌ Logic хольж орно |
| **B: Router + Service + Model (3 давхарга)** | Тусгаарласан, тест хялбар | ✅ Сонгосон |
| **C: Controller + Repository (MVC)** | Классик pattern | ❌ Over-engineering |

---

## Шийдвэр

**Router → Service → Model (3 давхарга)**

```
HTTP Request
    ↓
tasks.js (Router)     ← зөвхөн HTTP
    ↓
task.service.js       ← business logic, 404 шалгалт
    ↓
task.model.js         ← SQL query
    ↓
SQLite DB
```

---

## Үндэслэл

1. **Тест isolation:** `task.service.test.js`-д HTTP server эхлүүлэхгүйгээр бизнесийн логикийг тест хийж болно. Хэрэв Service байхгүй бол бүх тест Supertest (HTTP) ашиглах шаардлагатай болно.

2. **404 логик нэг газарт:** `getTaskById()` Service-д 404 throw хийнэ. Хэрэв Model шууд дуудвал 5 өөр router handler тус бүрд `if (!task) res.status(404)` бичих шаардлагатай болно.

3. **Overdue логик:** `getOverdueTasks()` нь JavaScript date comparison ашигладаг — энэ нь SQL биш, тиймээс Model-д биш Service-д байх нь зөв.

---

## Үр дагавар

### Эерэг
- `task.service.test.js` нь 7 тест хийж 404, business logic-ийг Supertest ашиглалгүй шалгана
- Router файл 50 → 30 мөр болж уншигдах чанар сайжирсан
- Overdue, tag validation, error handling нэг газарт

### Сөрөг
- Нэмэлт файл: `services/task.service.js`
- Function call chain уртассан (router → service → model)
- Хэт жижиг project-д unnecessary abstraction болж болно

### Хэмжих

Б хэсгийн дараа:
- ✅ Router файл 30 мөрөөс хэтрэхгүй болсон
- ✅ Service тест нь Supertest ашиглалгүй ажиллаж байна
- ✅ Code duplication байхгүй болсон
