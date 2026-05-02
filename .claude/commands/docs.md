# /docs — Documentation Generator

Дараах файлд зориулж JSDoc comment болон README хэсэг үүсгэ.

## JSDoc форомат (JavaScript)

```javascript
/**
 * [Функцийн товч тайлбар — нэг мөр]
 *
 * [Дэлгэрэнгүй тайлбар — optional]
 *
 * @param {Type} paramName - Параметрийн тайлбар
 * @param {Object} opts - Options объект
 * @param {string} opts.field - opts.field тайлбар
 * @returns {Type} Буцаах утгын тайлбар
 * @throws {Error} Алдааны нөхцөл
 *
 * @example
 * const result = myFunction('input');
 * // => { id: 1, ... }
 */
```

## README хэсэг форомат

```markdown
### [Функц/Endpoint нэр]

[Товч тайлбар]

**Параметр:**
| Нэр | Төрөл | Заавал | Default | Тайлбар |
|-----|-------|--------|---------|---------|
| ... | ...   | ...    | ...     | ...     |

**Буцаах утга:** `Type` — тайлбар

**Жишээ:**
\`\`\`javascript
// жишээ код
\`\`\`
```

## API Endpoint docs (OpenAPI style)

Endpoint бол дараах format-аар:
- Method, path, description
- Request body schema
- Response schema (200, 400, 404, 500)
- Example request/response

Баримт бичиглэх зорилт: $ARGUMENTS
