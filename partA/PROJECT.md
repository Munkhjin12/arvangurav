# PROJECT.md — Personal Task Tracker

## Сонгосон сэдэв

**Сонголт 2: Personal Task Tracker**

## Зорилго

Хувийн даалгаврын удирдлагын систем — хэрэглэгч өдөр тутмын ажлуудаа бүртгэж, хугацаа болон тэргүүлэх чиглэлээр зохион байгуулах боломжтой REST API + хялбар веб интерфэйс.

## Scope (Хамрах хүрээ)

### Багтах feature-үүд (3-5)

| # | Feature | Тайлбар |
|---|---------|---------|
| 1 | Task CRUD | Даалгавар үүсгэх, харах, засах, устгах |
| 2 | Priority & Status | Тэргүүлэх чиглэл (low/medium/high), төлөв (pending/in-progress/done) |
| 3 | Due Date & Reminder | Хугацаа тохируулах, хоцорсон даалгавар тэмдэглэх |
| 4 | Label/Tag | Даалгаварт шошго нэмэх, шошгоор шүүх |
| 5 | Search & Filter | Нэрээр хайх, статус/тэргүүлэх чиглэлээр шүүх |

### Багтахгүй (Out of scope)

- Хэрэглэгчийн бүртгэл / authentication (энгийн demo)
- Notification / email илгээх
- Mobile app
- Багийн хамтын ажиллагаа (multi-user)

## Техникийн хязгаар

- Node.js 20 LTS
- SQLite (file-based, deploy хялбар)
- REST API (JSON)
- Vanilla JS frontend (framework-гүй, хялбар)

## Амжилтын шалгуур

- [ ] API-ийн бүх endpoint ажиллаж байгаа
- [ ] 10+ unit test pass
- [ ] Frontend-ээс CRUD хийх боломжтой
- [ ] Хугацаа хэтэрсэн даалгаврыг тодруулах
- [ ] Filter/search ажиллаж байгаа
