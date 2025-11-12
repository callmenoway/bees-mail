# Bees Mail - API Documentation

Base URL: `http://localhost:8080/api/v1`

---

## Authentication

### 1. Register User
**Endpoint:** `POST /api/v1/auth/register`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "username": "text",
  "email": "text",
  "password": "securePassword123",
  "domain": "domain.com"
}
```

**Come funziona:** 
- `email` = solo username (es. "text")
- `domain` = dominio (es. "domain.com")
- Nel DB viene salvato come: `text~domain.com`

**Successful Response (201):**
```json
{
  "id": "uuid-here",
  "username": "text",
  "email": "text~domain.com",
  "domain": "domain.com"
}
```

---

### 2. Login
**Endpoint:** `POST /api/v1/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "address": "text~dominio.com",
  "password": "securePassword123"
}
```

**Successful Response (200):**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "uuid-here",
    "username": "text",
    "email": "text~domain.com"
  }
}
```

**Error Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

---

## Mail Operations

### 3. Send Email
**Endpoint:** `POST /api/v1/mail/send`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {jwt-token}
```

**Body:**
```json
{
  "address": "recipient~domain.com",
  "subject": "Test Email",
  "body": "This is a test email body"
}
```

**Successful Response (201):**
```json
{
  "id": "email-uuid",
  "from": "sender~example.com",
  "to": "recipient~example.com",
  "subject": "Test Email",
  "body": "This is a test email body",
  "sentAt": "2024-01-15T10:30:00Z"
}
```

---

### 4. Get Inbox
**Endpoint:** `GET /api/v1/mail/inbox`

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Successful Response (200):**
```json
[
  {
    "id": "email-uuid",
    "from": "sender~example.com",
    "to": "recipient~example.com",
    "subject": "Test Email",
    "body": "Email content",
    "isRead": false,
    "receivedAt": "2024-01-15T10:30:00Z"
  }
]
```

---

### 5. Get Sent Emails
**Endpoint:** `GET /api/v1/mail/sent`

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Successful Response (200):**
```json
[
  {
    "id": "email-uuid",
    "from": "sender~example.com",
    "to": "recipient~example.com",
    "subject": "Test Email",
    "sentAt": "2024-01-15T10:30:00Z"
  }
]
```

---

### 6. Get Email by ID
**Endpoint:** `GET /api/v1/mail/:id`

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Successful Response (200):**
```json
{
  "id": "email-uuid",
  "from": "sender~example.com",
  "to": "recipient~example.com",
  "subject": "Test Email",
  "body": "Full email content here",
  "isRead": true,
  "receivedAt": "2024-01-15T10:30:00Z"
}
```

---

### 7. Mark Email as Read
**Endpoint:** `PATCH /api/v1/mail/:id/read`

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Successful Response (200):**
```json
{
  "id": "email-uuid",
  "isRead": true
}
```

---

### 8. Delete Email
**Endpoint:** `DELETE /api/v1/mail/:id`

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Successful Response (204):**
No content

---

## Hashcash (Proof of Work)

### 9. Generate Challenge
**Endpoint:** `GET /api/v1/hashcash/challenge`

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Successful Response (200):**
```json
{
  "challenge": "challenge-string-here",
  "difficulty": 4
}
```

---

### 10. Verify Proof of Work
**Endpoint:** `POST /api/v1/hashcash/verify`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {jwt-token}
```

**Body:**
```json
{
  "challenge": "challenge-string-here",
  "nonce": "computed-nonce-here"
}
```

**Successful Response (200):**
```json
{
  "valid": true
}
```

**Error Response (400):**
```json
{
  "valid": false,
  "error": "Invalid proof of work"
}
```

---

## Health Check

### 11. Server Health
**Endpoint:** `GET /health`

**No authentication required**

**Successful Response (200):**
```json
{
  "status": "ok",
  "protocol": "honeycomb",
  "version": "1.0.0",
  "endpoints": {
    "rest": "/api/v1",
    "trpc": "/trpc"
  }
}
```

---

## Notes for Testing in Postman

### Environment Variables
Create a Postman environment with:
- `baseUrl`: `http://localhost:8080/api/v1`
- `token`: (will be set after login)
- `userId`: (will be set after registration/login)
- `emailId`: (will be set after sending email)

### ✅ Flusso Corretto - Esempio Pratico

**1. Register:**
```json
POST {{baseUrl}}/auth/register
{
  "username": "text",
  "email": "text",
  "password": "myPassword123",
  "domain": "domain.com"
}
```
→ Viene creato utente con email: `text~domain.com` nel DB

**2. Login:**
```json
POST {{baseUrl}}/auth/login
{
  "address": "text~domain.com",
  "password": "myPassword123"
}
```
→ **IMPORTANTE:** Usa il campo `address` (non `email`)!

**3. Send Email:**
```json
POST {{baseUrl}}/mail/send
Authorization: Bearer {{token}}
{
  "address": "destinatario~domain.com",
  "subject": "Hello",
  "body": "Test message"
}
```
→ **IMPORTANTE:** Il campo destinatario si chiama `address` (non `to`)!

### Token Management
After successful login, add this to Postman Tests tab:
```javascript
pm.environment.set("token", pm.response.json().token);
pm.environment.set("userId", pm.response.json().user.id);
```

### Authorization Header
For authenticated requests, use:
```
Authorization: Bearer {{token}}
```

### Common Error Responses
- `400 Bad Request`: Invalid data
- `401 Unauthorized`: Missing or invalid token / Wrong email or password
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## Important Notes

⚠️ **Port:** Il server gira sulla porta `8080`

⚠️ **Base URL:** Tutti gli endpoint REST hanno il prefisso `/api/v1`

⚠️ **Campo "address":**
- **Login:** Usa `address` (non `email`) per l'autenticazione
- **Send Email:** Usa `address` (non `to`) per il destinatario
- Il protocollo usa `address` come nome campo standard

⚠️ **Email Storage & Login:**
- **Registration:** Invii `email: "text"` + `domain: "domain.com"` → Salvato come `text~domain.com`
- **Login:** Devi usare `address: "text~domain.com"` (esattamente come nel DB)

⚠️ **tRPC:** Gli endpoint tRPC sono disponibili su `/trpc` per il frontend React

---

## 🐝 Email Format - Come Funziona

| Step | Campo | Valore di esempio | Note |
|------|-------|-------------------|------|
| **Registration** | email | `"text"` | Solo username |
| **Registration** | domain | `"domain.com"` | Solo dominio |
| **Database** | email (salvato) | `"text~domain.com"` | Backend concatena: email + "~" + domain |
| **Login** | **address** | `"text~domain.com"` | **Campo si chiama `address`!** |
| **Send Email** | **address** | `"recipient~domain.com"` | **Campo destinatario si chiama `address`!** |
| **API Response** | email | `"text~domain.com"` | Ritorna il valore dal DB |

**Riassunto:** 
- Registrazione → `email` + `domain` (parti separate)
- Database → Salva con `~`
- Login → `address` con formato `~` (come salvato)
- Send Email → `address` per il destinatario

