# /security — OWASP Top 10 Security Audit

Дараах кодыг OWASP Top 10 (2021)-ийн дагуу аудит хий.

## OWASP Top 10 Шалгалт

### A01 — Broken Access Control
- [ ] Зөвшөөрөлгүй хэрэглэгч өгөгдөл авах боломж байхгүй юу?
- [ ] IDOR (Insecure Direct Object Reference) эрсдэл байхгүй юу?

### A02 — Cryptographic Failures
- [ ] Нууц мэдээлэл plaintext байхгүй юу?
- [ ] Sensitive data log-д орохгүй юу?

### A03 — Injection (Хамгийн чухал)
- [ ] SQL Injection: prepared statement заавал
- [ ] NoSQL Injection
- [ ] Command injection (exec, eval)

### A04 — Insecure Design
- [ ] Rate limiting хэрэгжсэн үү?
- [ ] Brute force хамгаалалт?

### A05 — Security Misconfiguration
- [ ] Error message нь stack trace агуулахгүй юу?
- [ ] Default credential байхгүй юу?
- [ ]불필요한 endpoint байхгүй юу?

### A06 — Vulnerable Components
```bash
npm audit
npm outdated
```

### A07 — Auth Failures
- [ ] Session хугацаа дуусдаг уу?
- [ ] Password хэрэгтэй бол bcrypt/argon2 ашигласан уу?

### A08 — Integrity Failures
- [ ] npm package-ийн integrity шалгасан уу?

### A09 — Logging Failures
- [ ] Бүх алдаа log хийгдэж байна уу?
- [ ] Нууц мэдээлэл log-д орохгүй юу?

### A10 — SSRF
- [ ] External URL fetch байвал whitelist хийсэн үү?

## Гаргах форомат

```
## Security Audit: [файл]

### Критик ❌
- [асуудал + шийдэл]

### Анхааруулга ⚠️
- [асуудал + зөвлөгөө]

### Зөв байна ✅
- [хэрэгжүүлсэн хамгаалалт]

### Дүгнэлт
Risk score: [Low/Medium/High/Critical]
```

Аудит хийх зорилт: $ARGUMENTS
