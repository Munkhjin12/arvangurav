# /commit — Conventional Commit Message Generator

Staged өөрчлөлтүүдийг харж Conventional Commits форматаар commit message үүсгэ.

## Conventional Commits формат

```
<type>(<scope>): <description>

[body — optional]

[footer — optional]
```

## Type сонголт

| Type | Хэрэглэх үе |
|------|-------------|
| `feat` | Шинэ feature нэмсэн |
| `fix` | Bug зассан |
| `docs` | Зөвхөн баримт бичиг |
| `test` | Тест нэмсэн/зассан |
| `refactor` | Логик өөрчлөгдөөгүй, код цэгцлэсэн |
| `chore` | Build tool, config өөрчлөлт |
| `style` | Formatting, semi-colon |
| `perf` | Performance сайжруулалт |

## AI ашигласан бол footer нэмэх

```
Co-Authored-By: Claude <noreply@anthropic.com>
```

## Жишээ

```
feat(tasks): add overdue task detection endpoint

- GET /api/v1/tasks/overdue returns tasks past due_date
- Filters out tasks with status 'done'
- Sorted by due_date ascending

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Дүрэм

- Description: 50 тэмдэгтээс богино, imperative mood ("add" биш "added")
- Scope: файлын нэр эсвэл модулийн нэр (tasks, tags, auth, db)
- Body: яагаад өөрчилсөн, яаж өөрчилсөн

Staged файлуудыг харж commit message үүсгэ: $ARGUMENTS
