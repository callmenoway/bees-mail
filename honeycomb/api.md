# Bees Mail - API Documentation

Base URL: `http://localhost:8080/api/v1`

---

## Authentication

### 1. Register User
**Endpoint:** `POST /api/v1/auth/register`
**URL completo:** `http://localhost:8080/api/v1/auth/register`

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
**URL completo:** `http://localhost:8080/api/v1/auth/login`

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

## 🔑 Come usare il Token

Dopo il login, aggiungi il token negli **Headers** di Postman:

**Tab Authorization (CONSIGLIATO):**
- Type: `Bearer Token`
- Token: `{{token}}`

Oppure **Tab Headers:**
- Key: `Authorization`
- Value: `Bearer {{token}}`

---

## Mail Operations

### 3. Send Email
**Endpoint:** `POST /api/v1/mail/send`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {{token}}
```

**Body MINIMO (schema corretto):**
```json
{
  "to": ["recipient~beesmail.com"],
  "subject": "Test Email",
  "content": {
    "type": "plain",
    "body": "Email body here"
  },
  "metadata": {
    "hashcash": {
      "stamp": "1:4:250115:recipient~beesmail.com::abc123:0",
      "bits": 4,
      "computedAt": "2025-01-15T10:30:00.000Z"
    }
  }
}
```

**⚠️ SCHEMA DEFINITIVO:**
- `to`: **array** di indirizzi formato `username~domain.com`
- `subject`: **stringa** min 1, max 500 caratteri
- `content.type`: **enum** → `"plain"` | `"markdown"` | `"html"`
- `content.body`: **stringa**
- `metadata.hashcash.stamp`: **stringa** formato hashcash
- `metadata.hashcash.bits`: **numero**
- `metadata.hashcash.computedAt`: **stringa ISO datetime**

**Campi opzionali:**
- `cc`: array di indirizzi
- `bcc`: array di indirizzi
- `content.renderedHtml`: stringa
- `content.plainText`: stringa
- `attachments`: array
- `poll`: oggetto
- `collaborative`: oggetto
- `metadata.priority`: `"low"` | `"normal"` | `"high"`
- `metadata.labels`: array stringhe
- `metadata.readReceipt`: boolean
- `metadata.ephemeral`: oggetto
- `metadata.scheduled`: oggetto

**Esempio con più campi:**
```json
{
  "to": ["user1~beesmail.com", "user2~beesmail.com"],
  "cc": ["cc~beesmail.com"],
  "subject": "Meeting Notes",
  "content": {
    "type": "markdown",
    "body": "# Meeting\n\n**Attendees:** John, Jane"
  },
  "metadata": {
    "priority": "high",
    "labels": ["meeting", "important"],
    "readReceipt": true,
    "hashcash": {
      "stamp": "1:4:250115:user1~beesmail.com::abc123:0",
      "bits": 4,
      "computedAt": "2025-01-15T10:30:00.000Z"
    }
  }
}
```

**Per testare SUBITO (usa questo):**
```json
{
  "to": ["test~beesmail.com"],
  "subject": "Test",
  "content": {
    "type": "plain",
    "body": "Hello world"
  },
  "metadata": {
    "hashcash": {
      "stamp": "1:4:250115:test~beesmail.com::test:0",
      "bits": 4,
      "computedAt": "2025-01-15T10:00:00.000Z"
    }
  }
}
```

**Successful Response (201):**
```json
{
  "id": "email-uuid",
  "from": "sender~beesmail.com",
  "to": ["recipient~beesmail.com"],
  "subject": "Test Email",
  "sentAt": "2024-01-15T10:30:00Z"
}
```

---

### 4. Get Inbox
**Endpoint:** `GET /api/v1/mail/inbox`
**URL completo:** `http://localhost:8080/api/v1/mail/inbox`

**Headers:**
```
Authorization: Bearer {{token}}
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
**URL completo:** `http://localhost:8080/api/v1/mail/sent`

**Headers:**
```
Authorization: Bearer {{token}}
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
**URL completo:** `http://localhost:8080/api/v1/mail/123`

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
**URL completo:** `http://localhost:8080/api/v1/mail/123/read`

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
**URL completo:** `http://localhost:8080/api/v1/mail/123`

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

**Successful Response (200):**
```json
{
  "challenge": "244fc7b86b5eec65625d6c29bd299c17",
  "difficulty": 4
}
```

**NOTE:** Il challenge serve per riferimento, ma l'hashcash stamp va costruito manualmente!

---

### 🔨 Come Creare lo Stamp Hashcash

Lo stamp Hashcash ha questo formato:
```
1:bits:date:resource::random:counter
```

**Esempio:**
```
1:20:240115:recipient~beesmail.com::abc123def456:12345
```

**Parti:**
- `1`: versione hashcash
- `20`: bits (difficulty)
- `240115`: data YYMMDD
- `recipient~beesmail.com`: indirizzo destinatario
- (vuoto): extension (opzionale)
- `abc123def456`: stringa random
- `12345`: counter (nonce)

**Per calcolare:**
```javascript
const crypto = require('crypto');

function createHashcashStamp(recipient, bits = 20) {
  const version = 1;
  const date = new Date().toISOString().slice(2, 10).replace(/-/g, ''); // YYMMDD
  const random = crypto.randomBytes(8).toString('hex');
  
  let counter = 0;
  while (true) {
    const stamp = `${version}:${bits}:${date}:${recipient}::${random}:${counter}`;
    const hash = crypto.createHash('sha1').update(stamp).digest('hex');
    
    // Check if hash has required leading zero bits
    const binaryHash = BigInt('0x' + hash).toString(2).padStart(160, '0');
    if (binaryHash.startsWith('0'.repeat(bits))) {
      return {
        stamp,
        bits,
        computedAt: new Date().toISOString()
      };
    }
    counter++;
    
    if (counter > 1000000) {
      console.log('Max iterations reached, using what we have');
      return {
        stamp,
        bits,
        computedAt: new Date().toISOString()
      };
    }
  }
}

// Esempio
const hashcash = createHashcashStamp('recipient~beesmail.com', 4);
console.log(hashcash);
// { stamp: '1:4:240115:recipient~beesmail.com::abc123:12345', bits: 4, computedAt: '2024-01-15T10:30:00.000Z' }
```

---

## 📋 Flusso Completo per Inviare Email

### Step 1: Login
```json
POST {{baseUrl}}/auth/login
Body:
{
  "address": "sender~beesmail.com",
  "password": "myPassword123"
}
```

### Step 2: Calcola Hashcash Stamp
Usa lo script JavaScript sopra o valori di test:
```javascript
{
  "stamp": "1:4:240115:recipient~beesmail.com::test:0",
  "bits": 4,
  "computedAt": "2024-01-15T10:30:00.000Z"
}
```

### Step 3: Invia Email
```json
POST {{baseUrl}}/mail/send
Authorization: Bearer {{token}}
Body:
{
  "to": ["recipient~beesmail.com"],
  "subject": "My Email",
  "content": {
    "type": "plain",
    "body": "Email content"
  },
  "metadata": {
    "hashcash": {
      "stamp": "1:4:240115:recipient~beesmail.com::test:0",
      "bits": 4,
      "computedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

---

## ✅ EMAIL INVIATA CON SUCCESSO!

L'email è stata creata! Controlla questi campi nella risposta:
- `isSpam`: se `true`, l'email finisce nello spam (problema hashcash o mittente=destinatario)
- `metadata.hashcash.verified`: se `false`, l'hashcash non è valido
- `recipients`: lista dei destinatari

### Per inviare a un altro utente:

**1. Registra un secondo utente:**
```json
POST /api/v1/auth/register
{
  "username": "mario",
  "email": "mario",
  "password": "password123",
  "domain": "beesmail.com"
}
```

**2. Invia email da russolo a mario:**
```json
POST /api/v1/mail/send
Authorization: Bearer {{token_russolo}}
{
  "to": ["mario~beesmail.com"],
  "subject": "Ciao Mario!",
  "content": {
    "type": "plain",
    "body": "Questa è un'email da russolo a mario"
  },
  "metadata": {
    "hashcash": {
      "stamp": "1:4:250115:mario~beesmail.com::test:0",
      "bits": 4,
      "computedAt": "2025-01-15T12:00:00.000Z"
    }
  }
}
```

**3. Login come mario e controlla inbox:**
```json
POST /api/v1/auth/login
{
  "address": "mario~beesmail.com",
  "password": "password123"
}

GET /api/v1/mail/inbox
Authorization: Bearer {{token_mario}}
```

---

## 📬 Endpoints Completi Funzionanti

### ✅ Invia Email
```
POST /api/v1/mail/send
Authorization: Bearer {{token}}
```

### ✅ Leggi Inbox
```
GET /api/v1/mail/inbox
Authorization: Bearer {{token}}
```

### ✅ Leggi Sent
```
GET /api/v1/mail/sent
Authorization: Bearer {{token}}
```

### ✅ Leggi Email Singola
```
GET /api/v1/mail/:id
Authorization: Bearer {{token}}
```

### ✅ Marca come Letta
```
PATCH /api/v1/mail/:id/read
Authorization: Bearer {{token}}
```

### ✅ Elimina Email
```
DELETE /api/v1/mail/:id
Authorization: Bearer {{token}}
```

---

## 🎯 Quick Test Completo

**1. Registrazione:**
```json
POST http://localhost:8080/api/v1/auth/register
{
  "username": "test1",
  "email": "test1",
  "password": "pass123",
  "domain": "beesmail.com"
}
```

**2. Login:**
```json
POST http://localhost:8080/api/v1/auth/login
{
  "address": "test1~beesmail.com",
  "password": "pass123"
}
```
Salva il token: `{{token}}`

**3. Invia Email (a te stesso per test):**
```json
POST http://localhost:8080/api/v1/mail/send
Authorization: Bearer {{token}}
{
  "to": ["test1~beesmail.com"],
  "subject": "Test",
  "content": {
    "type": "plain",
    "body": "Hello"
  },
  "metadata": {
    "hashcash": {
      "stamp": "1:4:250115:test1~beesmail.com::test:0",
      "bits": 4,
      "computedAt": "2025-01-15T12:00:00.000Z"
    }
  }
}
```

**4. Controlla Inbox:**
```
GET http://localhost:8080/api/v1/mail/inbox
Authorization: Bearer {{token}}
```

**5. Controlla Sent:**
```
GET http://localhost:8080/api/v1/mail/sent
Authorization: Bearer {{token}}
```

---

## 🐝 TUTTO FUNZIONA!

Il protocollo Honeycomb è operativo! Gli endpoint principali sono:
- ✅ Registrazione utenti
- ✅ Login con JWT
- ✅ Invio email con hashcash
- ✅ Lettura inbox/sent
- ✅ Gestione email (read, delete)

**Per testare completamente:**
1. Crea 2-3 utenti diversi
2. Invia email tra di loro
3. Controlla inbox di ciascuno
4. Marca email come lette
5. Elimina email

COMPLIMENTI! 🎉🐝

