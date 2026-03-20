# Backend-e-commerce_v1

Backend de una aplicación e-commerce construido con **Node.js**, **TypeScript** y **Sequelize**. Gestiona usuarios, productos, compras y notificaciones por mail con un diseño en capas limpio y mantenible.

---

## 🚀 Stack tecnológico

| Capa | Tecnología |
|---|---|
| Runtime | Node.js |
| Lenguaje | TypeScript |
| Framework | Next.js (API Routes) |
| ORM | Sequelize |
| Base de datos | MySQL / PostgreSQL |
| Autenticación | JWT (JSON Web Tokens) |
| Mailing | Nodemailer + Gmail |
| Pagos | MercadoPago |

---

## 📦 Funcionalidades

- 🔐 **Autenticación** con JWT — registro, login y protección de rutas via middleware
- 👤 **Gestión de usuarios** — CRUD completo con validaciones
- 🛍️ **Gestión de productos** — alta, baja y modificación de catálogo
- 💳 **Compras** — creación, asociación de productos y confirmación de pago
- 📧 **Notificaciones por mail** — código de verificación y confirmación de compra
- 🔗 **Relaciones entre entidades** — `User → Purchase ↔ Product` con tabla intermedia `PurchaseProduct`

---

## 🧱 Estructura del proyecto

```
src/
├── db/             # Modelos Sequelize (User, Product, Purchase, PurchaseProduct)
├── controllers/    # Lógica de negocio por entidad
├── pages/api/      # Endpoints REST (Next.js API Routes)
├── middlewares/    # Auth JWT, validación de productos, manejo de errores
├── lib/            # Utilidades: mailer, helpers, configuración de DB
└── types/          # Tipos e interfaces TypeScript
```

---

## ⚙️ Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/Puyol312/backend-e-commerce_v1.git
cd backend-e-commerce_v1
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=ecommerce

# Autenticación
JWT_SECRET=tu_jwt_secret

# Gmail (Nodemailer)
GMAIL_USER=tu_correo@gmail.com
GMAIL_PASS=tu_app_password

# MercadoPago
MP_ACCESS_TOKEN=tu_access_token
BASE_URL=http://localhost:3000
```

> **Nota:** Para Gmail, generá una [App Password](https://myaccount.google.com/apppasswords) en lugar de usar tu contraseña principal.

### 4. Correr en desarrollo

```bash
npm run dev
```

---

## 🔐 Autenticación

El sistema usa **JWT Bearer tokens**. Incluir en cada request protegido:

```
Authorization: Bearer <token>
```

El middleware de auth valida el token y adjunta el usuario a la request antes de llegar al controller.

---

## 🛒 Flujo de compra

```
1. Usuario autenticado inicia la compra
         ↓
2. Selecciona productos con cantidad
         ↓
3. Se crea el registro en Purchase (con monto total)
         ↓
4. Se asocian los productos en PurchaseProduct (bulkCreate)
         ↓
5. Se procesa el pago via MercadoPago
         ↓
6. Se confirma la compra y se envía email de notificación
```

---

## 📧 Tipos de email

| Tipo | Subject | Descripción |
|---|---|---|
| `code` | Tu código de verificación | Código OTP para verificar cuenta |
| `paid` | ¡Pago confirmado! | Confirmación de compra exitosa |

---

## 🧠 Decisiones técnicas

- **Middlewares reutilizables** — la lógica de autenticación y validación vive en capas separadas, manteniendo los controllers limpios.
- **Transacciones en operaciones críticas** — la creación de Purchase + PurchaseProduct se envuelve en una transacción para garantizar consistencia.
- **Tipado estricto con TypeScript** — interfaces y enums para tipos de mail, opciones de compra y respuestas de la API.
- **Separación en capas clara** — `controller / model / middleware / lib` con responsabilidades bien definidas.

---

## 📌 Roadmap / Mejoras planificadas

- [ ] Testing con AVA
- [ ] Documentación de endpoints con Swagger / OpenAPI
- [ ] Sistema de roles (`admin` / `user`)
- [ ] Paginación en listados de productos y compras
- [ ] Cacheo de consultas frecuentes
- [ ] Refresh tokens para sesiones persistentes

---

## 👨‍💻 Autor

**Caio Puyol** — [@Puyol312](https://github.com/Puyol312)

---

## 🏫 Academia

APX School — [www.apx.school](https://www.apx.school)

---

## 📄 Licencia

Proyecto de uso educativo. Sin licencia comercial.