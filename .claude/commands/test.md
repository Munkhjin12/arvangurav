# /test — Test Generation

Дараах модулд зориулж Jest unit test үүсгэ. Testing pyramid-ийн зарчмыг баримтла.

## Тест бичих зарчим

### Unit Tests (үндэс)
- Функц бүрд дор хаяж 3 тест: happy path, edge case, error case
- Mock: DB, external API-г jest.mock()-аар mock хий
- Isolation: тест хоорондоо хамааралгүй байх

### Edge Cases шалгах
- Хоосон string, null, undefined input
- Тоон хязгаар (0, -1, MAX_INT)
- Маш урт string (limit тест)
- Зэрэгцээ call (race condition)
- DB connection алдаа

### Тест бүтэц
```javascript
describe('[Module нэр]', () => {
  beforeAll(() => { /* setup */ });
  afterEach(() => { /* cleanup */ });

  describe('[функц нэр]()', () => {
    it('should [expected behavior] when [condition]', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

### Coverage зорилт
- Line coverage: ≥80%
- Branch coverage: ≥70%
- Error path: заавал шалгах

## Тест файлын нэрлэлт
- `[module].test.js` — unit test
- `[module].routes.test.js` — integration test

Тест үүсгэх файл: $ARGUMENTS
