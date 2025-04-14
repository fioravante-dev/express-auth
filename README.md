# ExpressAuth

API RESTful de autenticação desenvolvida com Node.js, Express, Prisma e Zod.  
Segue uma arquitetura modular e segura utilizando `access_token` e `refresh_token` com JWT.

Repositório: [fioravante-dev/express-auth](https://github.com/fioravante-dev/express-auth)

---

## ⚙️ Tecnologias utilizadas

- Node.js + Express
- TypeScript
- Prisma ORM
- Zod (validação de schemas)
- JSON Web Token (JWT)

---

## 🚀 Como rodar o projeto localmente

```bash
# Instale as dependências
npm install

# Configure o banco de dados
npx prisma migrate dev --name init

# Rode o servidor
npm run dev
```
## 📦 Variáveis de ambiente (.env)

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DATABASE_URL=your-db-url
PORT=a-port # default 3333
JWT_ACCESS_SECRET=your-access-token-secret
JWT_REFRESH_SECRET=your-refresh-token-secret
```
---

## 🔐 Endpoints de Autenticação

### `POST /register`

Cria um novo usuário.

**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "123456",
  "name": "Usuário Teste"
}
```

**Resposta:**
```json
{
  "user": {
    "id": "...",
    "email": "...",
    "name": "...",
    "is_verified": false
  },
  "access_token": "...",
  "refresh_token": "..."
}
```

---

### `POST /login`

Autentica um usuário.

**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

**Resposta:**
```json
{
  "user": {
    "id": "...",
    "email": "...",
    "name": "...",
    "is_verified": false
  },
  "access_token": "...",
  "refresh_token": "..."
}
```

---

### `POST /refresh`

Gera um novo par de tokens a partir de um `refresh_token` válido.

**Body:**
```json
{
  "refresh_token": "..."
}
```

**Resposta:**
```json
{
  "access_token": "...",
  "refresh_token": "..."
}
```

---

### `POST /logout`

Revoga o `refresh_token`.

**Body:**
```json
{
  "refresh_token": "..."
}
```

**Resposta:**
```json
{
  "message": "Logged out successfully"
}
```

---

<!-- ## 📁 Estrutura de Pastas

```
src/
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.schemas.ts
│   │   └── auth.service.ts
│   └── token/
│       └── token.service.ts
├── middlewares/
├── utils/
├── lib/
│   └── prisma.ts
```

--- -->

## ✅ Futuras melhorias

- Rota `/me` para retorno de dados do usuário autenticado
- Middleware de autorização por roles (admin, user, etc.)
- Documentação Swagger/OpenAPI
- Testes automatizados com Jest ou Vitest

---

Feito com dedicação por Pedro Fioravante 
Projeto: **ExpressAuth**
