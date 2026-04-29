# ARCHITECTURE.md — Personal Task Tracker

## Системийн архитектур

```mermaid
graph TB
    subgraph Client["🖥️ Client Layer"]
        UI[Vanilla JS Frontend<br/>index.html + app.js]
    end

    subgraph API["⚙️ API Layer (Express)"]
        Router[Router<br/>api/v1/tasks]
        Middleware[Middleware<br/>validation · error handler]
    end

    subgraph Service["🔧 Service Layer"]
        TaskService[Task Service<br/>business logic]
        SearchService[Search Service<br/>filter · sort]
    end

    subgraph Data["💾 Data Layer"]
        TaskModel[Task Model<br/>SQLite queries]
        TagModel[Tag Model<br/>SQLite queries]
        DB[(SQLite DB<br/>tasks.db)]
    end

    UI -->|HTTP/JSON| Router
    Router --> Middleware
    Middleware --> TaskService
    TaskService --> TaskModel
    TaskService --> SearchService
    SearchService --> TagModel
    TaskModel --> DB
    TagModel --> DB
```

## Давхаргын тайлбар

| Давхарга | Файл | Үүрэг |
|---------|------|-------|
| Router | `src/routes/tasks.js` | HTTP endpoint тодорхойлох, request/response |
| Middleware | `src/middleware/validate.js` | Input validation, error handling |
| Service | `src/services/task.service.js` | Бизнесийн логик |
| Model | `src/models/task.model.js` | SQLite CRUD query |
| DB | `src/db/schema.sql` | Хүснэгтийн бүтэц |

## Өгөгдлийн урсгал

```mermaid
sequenceDiagram
    participant C as Client
    participant R as Router
    participant M as Middleware
    participant S as Service
    participant DB as SQLite

    C->>R: POST /api/v1/tasks
    R->>M: validate(body)
    M-->>R: 400 Bad Request (validation fail)
    M->>S: createTask(data)
    S->>DB: INSERT INTO tasks
    DB-->>S: {id, ...}
    S-->>R: task object
    R-->>C: 201 Created {success, data}
```

## Өгөгдлийн загвар (Schema)

```mermaid
erDiagram
    TASKS {
        int id PK
        string title
        string description
        string status
        string priority
        date due_date
        datetime created_at
        datetime updated_at
    }
    TAGS {
        int id PK
        string name
        string color
    }
    TASK_TAGS {
        int task_id FK
        int tag_id FK
    }

    TASKS ||--o{ TASK_TAGS : has
    TAGS ||--o{ TASK_TAGS : applied_to
```

## Директор бүтэц

```
partB/
├── src/
│   ├── index.js              # Entry point, Express app
│   ├── db/
│   │   ├── schema.sql        # Хүснэгтийн бүтэц
│   │   ├── migrate.js        # Migration runner
│   │   └── seed.js           # Test өгөгдөл
│   ├── routes/
│   │   ├── tasks.js          # /api/v1/tasks
│   │   └── tags.js           # /api/v1/tags
│   ├── models/
│   │   ├── task.model.js     # Task CRUD queries
│   │   └── tag.model.js      # Tag queries
│   ├── services/
│   │   └── task.service.js   # Business logic
│   └── middleware/
│       ├── validate.js       # express-validator rules
│       └── errorHandler.js   # Global error handler
├── tests/
│   ├── task.model.test.js
│   ├── task.routes.test.js
│   └── task.service.test.js
├── public/
│   ├── index.html
│   └── app.js
└── package.json
```
