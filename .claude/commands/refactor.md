# /refactor — Code Refactoring Assistant

Дараах кодыг clean code зарчмаар refactor хий. Логик өөрчлөхгүй — зөвхөн бүтэц, уншигдах чанар, хамгаалалтыг сайжруул.

## Refactoring зарчмууд

### 1. Single Responsibility
- Функц нэг л зүйл хийх
- 20 мөрөөс урт функцийг хуваах
- Файл 200 мөрөөс хэтрэхгүй

### 2. DRY (Don't Repeat Yourself)
- Давтагдах код → utility функц болгох
- Magic number → named constant болгох
- Duplicate validation → shared middleware болгох

### 3. Readable Names
- Утга тодорхой нэр: `getUserById` биш `get`
- Boolean: `isActive`, `hasPermission`, `canEdit`
- Array: дандаа plural: `tasks`, `tags`

### 4. Error Handling
- Caught error-г дахин throw хийх
- Error message нь context-тэй байх
- Custom error class ашиглах

### 5. Guard Clauses
```javascript
// Муу:
function process(data) {
  if (data) {
    if (data.valid) {
      // үндсэн логик
    }
  }
}

// Сайн:
function process(data) {
  if (!data) return null;
  if (!data.valid) throw new Error('Invalid');
  // үндсэн логик
}
```

### 6. Express Specific
- async handler бүр try/catch эсвэл asyncHandler wrapper
- Validation middleware-г router-т тусгаарлах
- Config нь environment-ээс авах

## Гаргах форомат

```
## Refactor: [файл]

### Өөрчлөлтүүд
1. [яагаад өөрчилсөн]: [хуучин → шинэ]

### Refactored код
\`\`\`javascript
// ...
\`\`\`

### Тайлбар
[Ямар зарчим хэрэглэсэн, яагаад]
```

Refactor хийх зорилт: $ARGUMENTS
