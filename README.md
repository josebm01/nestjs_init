<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">API construida con <a href="http://nestjs.com/" target="_blank">NestJS</a> y <a href="https://www.prisma.io/" target="_blank">Prisma ORM</a> sobre PostgreSQL.</p>

## Descripción

Proyecto de práctica con NestJS que expone módulos de `users`, `tasks`, `projects`, `payments` y `auth`, usando Prisma ORM (v8, basado en "data contract") como capa de acceso a datos y Swagger para documentar la API.

## Requisitos

- Node.js >= 20
- npm
- PostgreSQL >= 15 (o Docker, ver más abajo)

## Estructura del proyecto

```
myapp/
├── docker-compose.yml        # Servicio de PostgreSQL para desarrollo local
├── prisma.config.ts          # Configuración del CLI de Prisma (contrato + conexión a la BD)
├── nest-cli.json             # Configuración del CLI de Nest
├── .env.example               # Plantilla de variables de entorno
├── migrations/                # Historial de migraciones y snapshots de la base de datos
│   └── app/
│       ├── <timestamp>_init/
│       ├── <timestamp>_remove_post/
│       └── <timestamp>_add_user_phone_age/
├── src/
│   ├── main.ts                # Bootstrap de la app: Swagger, CORS, ValidationPipe
│   ├── app.module.ts          # Módulo raíz, importa todos los módulos de feature
│   ├── prisma.module.ts       # Módulo global de Prisma
│   ├── prisma.service.ts      # Servicio de acceso a Prisma
│   ├── prisma/
│   │   ├── contract.prisma    # Data contract: definición de modelos (fuente de verdad)
│   │   ├── contract.json      # Contrato compilado (generado, se commitea)
│   │   ├── contract.d.ts      # Tipos generados para autocompletado (generado, se commitea)
│   │   └── db.ts              # Cliente de base de datos (`import { db } from './prisma/db'`)
│   ├── init/                  # Controlador de ejemplo: rutas base, pipes y guards de demo
│   │   ├── init.controller.ts
│   │   ├── guards/
│   │   └── pipes/
│   ├── auth/                  # Módulo de autenticación (base)
│   ├── users/                 # CRUD de usuarios + middleware de logging
│   │   ├── dto/
│   │   └── middlewares/
│   ├── tasks/                 # CRUD de tareas
│   │   └── dto/
│   ├── projects/              # CRUD de proyectos
│   └── payments/              # CRUD de pagos
│       ├── dto/
│       └── entities/
└── test/
    └── app.e2e-spec.ts        # Pruebas end-to-end
```

Cada módulo de feature (`users`, `tasks`, `projects`, `payments`) sigue la estructura estándar de Nest: `*.module.ts`, `*.controller.ts`, `*.service.ts` y, cuando aplica, una carpeta `dto/`.

## Configuración inicial

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Copiar el archivo de variables de entorno y ajustar la cadena de conexión:

   ```bash
   cp .env.example .env
   ```

3. Levantar PostgreSQL con Docker (usuario `admin`, base `nestdb`, puerto `5499`):

   ```bash
   docker compose up -d
   ```

   Si usas el `docker-compose.yml` incluido, `.env` ya debe apuntar a:

   ```env
   DATABASE_URL="postgresql://admin:test1234@localhost:5499/nestdb"
   ```

4. Generar el contrato de Prisma (tipos y `contract.json`) a partir de `src/prisma/contract.prisma`:

   ```bash
   npx prisma contract emit
   ```

   Si es la primera vez que se crean las tablas en la base de datos:

   ```bash
   npx prisma db init
   ```

## Levantar el proyecto

```bash
# desarrollo
npm run start

# modo watch (recomendado durante el desarrollo)
npm run start:dev

# modo debug
npm run start:debug

# producción (requiere build previo)
npm run build
npm run start:prod
```

Por defecto el servidor corre en `http://localhost:3000` (configurable con la variable de entorno `PORT`).

## Documentación de la API (Swagger)

Con el servidor corriendo, la documentación interactiva está disponible en:

```
http://localhost:3000/api
```

## Tests

```bash
# unitarios
npm run test

# unitarios en modo watch
npm run test:watch

# end-to-end
npm run test:e2e

# cobertura
npm run test:cov
```

## Lint y formato

```bash
npm run lint     # oxlint sobre src/ y test/
npm run format   # prettier sobre src/ y test/
```

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run start` | Inicia la app en modo normal |
| `npm run start:dev` | Inicia la app con recarga automática |
| `npm run start:debug` | Inicia la app en modo debug con recarga automática |
| `npm run start:prod` | Ejecuta el build de producción (`dist/main`) |
| `npm run build` | Compila el proyecto con `nest build` |
| `npm run deploy` | Despliega con `nest deploy` |
| `npm run lint` | Ejecuta oxlint |
| `npm run format` | Formatea el código con Prettier |
| `npm run test` / `test:watch` / `test:cov` / `test:debug` | Pruebas unitarias con Vitest |
| `npm run test:e2e` | Pruebas end-to-end |
| `npm run contract:emit` | Regenera `contract.json` y `contract.d.ts` a partir de `contract.prisma` |

## Base de datos y Prisma ORM

- El modelo de datos vive en [`src/prisma/contract.prisma`](src/prisma/contract.prisma).
- Tras modificar el contrato, corré `npx prisma contract emit` para regenerar `contract.json` y `contract.d.ts` (ambos se commitean al repo).
- El cliente tipado se importa desde `src/prisma/db.ts`.
- `npx prisma migration status` muestra el estado de las migraciones aplicadas.

### Agregar una tabla o columna nueva

1. **Editar el contrato** — agregar el `model` (o el campo) en `src/prisma/contract.prisma`.
2. **Emitir el contrato**:
   ```bash
   npx prisma contract emit
   ```
3. **Planear la migración**:
   ```bash
   npx prisma migration plan --name <nombre_descriptivo>
   ```
   Genera un paquete en `migrations/app/<timestamp>_<nombre>/`. Si el cambio requiere backfill (ej. columna `NOT NULL` en una tabla con filas), el `migration.ts` queda con `placeholder(...)` por rellenar a mano.
   - Al rellenar un backfill, evitar el query builder (`db.public.<tabla>.update(...)`) si toca una columna con timestamp auto-generado (`updatedAt`): genera un valor no determinístico en cada build y provoca `MIGRATION.CONTRACT_SPACE_VIOLATION` (hash mismatch). Usar `rawSql({...})` con SQL explícito (`now()` literal, no parámetro JS) en su lugar.
4. **Self-emit si quedaron placeholders**:
   ```bash
   node migrations/app/<timestamp>_<nombre>/migration.ts
   ```
5. **Aplicar la migración**:
   ```bash
   npx prisma db migrate
   ```
6. **Verificar** (opcional pero recomendado):
   ```bash
   npx prisma db verify
   ```
7. **Actualizar el `db` ref** — `db migrate` no lo avanza solo; si vas a encadenar más `migration plan` sin pasar `--from`, corré:
   ```bash
   npx prisma migration ref set db <hash-final-aplicado>
   ```
   (el hash aparece como `to` en la salida de `db migrate`). Alternativa en desarrollo activo: usar `npx prisma db update` en vez de `db migrate`, que sí mantiene el ref al día automáticamente.

## Licencia

UNLICENSED (proyecto privado de práctica).
