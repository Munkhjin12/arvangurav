# Personal Task Tracker — README (Draft)

> ⚠️ Энэ нь А хэсгийн draft README. Б хэсгийн README нь `partB/README.md`-д бүрэн байна.

## Зорилго

Хувийн даалгаврын удирдлагын REST API + хялбар веб интерфэйс.  
Хэрэглэгч: хувь хүн, студент, хөгжүүлэгч.

## Технологи

- **Backend:** Node.js 20 + Express 4
- **Database:** SQLite3 (better-sqlite3)
- **Testing:** Jest + Supertest
- **Validation:** express-validator
- **Docs:** OpenAPI 3.0 (swagger-ui-express)

## Суулгах (товч)

```bash
git clone https://github.com/<user>/bie-daalt-13
cd bie-daalt-13/partB
npm install
cp .env.example .env
npm run migrate    # DB үүсгэх
npm start          # http://localhost:3000
```

## API Endpoint-үүд (товч)

| Method | Path | Үйлдэл |
|--------|------|--------|
| GET | /api/v1/tasks | Бүх даалгавар |
| POST | /api/v1/tasks | Шинэ даалгавар |
| GET | /api/v1/tasks/:id | Нэг даалгавар |
| PUT | /api/v1/tasks/:id | Засах |
| DELETE | /api/v1/tasks/:id | Устгах |
| GET | /api/v1/tags | Шошго жагсаалт |

## Тест

```bash
npm test           # Бүх тест
npm run test:watch # Watch mode
```

## TODO (Б хэсгээр дуусгах)

- [ ] Search/filter implementation
- [ ] Tag system
- [ ] Frontend
- [ ] OpenAPI spec
- [ ] Deployment guide
