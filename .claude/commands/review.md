# /review — Security & Robustness Review

Дараах кодыг security болон robustness талаас шалга. OWASP Top 10 болон ерөнхий best practice-ийг баримтла.

## Шалгах зүйлс

### 1. SQL Injection (OWASP A03)
- [ ] Бүх SQL query нь prepared statement ашигласан уу?
- [ ] String concatenation SQL дотор байхгүй юу?

### 2. Input Validation (OWASP A03)
- [ ] Бүх user input шалгагдаж байна уу?
- [ ] Length limit, type check, format check хийгдсэн үү?

### 3. Error Handling
- [ ] Stack trace хэрэглэгчид харагдахгүй юу?
- [ ] Бүх async функц try/catch-тай юу?
- [ ] Error message нь мэдрэмтгий мэдээлэл агуулахгүй юу?

### 4. Sensitive Data (OWASP A02)
- [ ] API key, нууц үгийг кодонд hardcode хийгээгүй юу?
- [ ] .env ашиглаж байна уу?
- [ ] Нууц мэдээлэл log дотор орохгүй юу?

### 5. Dependency Check (OWASP A06)
- [ ] npm audit алдаа байхгүй юу?
- [ ] Outdated package байхгүй юу?

### 6. HTTP Security
- [ ] Appropriate HTTP status code ашиглаж байна уу?
- [ ] CORS зөв тохируулагдсан уу?

## Гаргах форомат

```
## Review: [файлын нэр]

### ✅ Зөв байна
- ...

### ⚠️ Анхаарах
- ...

### ❌ Засах шаардлагатай
- [асуудал]: [шийдэл]
```

Шалгах файл: $ARGUMENTS
