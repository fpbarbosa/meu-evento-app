# Modelagem do Banco de Dados – PostgreSQL

Este documento descreve a modelagem relacional do sistema marketplace de aluguel de utensílios para festas.

---

## Padrões Gerais

- Banco relacional: **PostgreSQL**
- ORM: **Prisma**
- Chaves primárias: UUID
- Soft delete: `deleted_at`
- Auditoria: `created_at`, `updated_at`
- Convenção: snake_case no banco

---

## Estrutura Geral

### Principais Entidades

- Users
- Suppliers
- Products
- Orders
- Payments
- Reviews

---

# Tabelas

---

## 1. users

Armazena todos os usuários do sistema (clientes, fornecedores e admins).

### Campos

- id (UUID, PK)
- name (VARCHAR)
- email (VARCHAR, UNIQUE)
- password (VARCHAR)
- role (ENUM: CLIENT, SUPPLIER, ADMIN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- deleted_at (TIMESTAMP, NULL)

### Regra de Negócio

- Autenticação centralizada
- Controle de acesso baseado em role
- Soft delete para manter histórico

---

## 2. suppliers

Contém dados específicos de fornecedores.

### Campos

- id (UUID, PK)
- user_id (UUID, FK → users.id)
- status (ENUM: PENDING, APPROVED, BLOCKED)
- description (TEXT)
- rating (DECIMAL)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### Regra de Negócio

- Cada fornecedor possui exatamente um usuário
- Aprovação obrigatória antes de publicar produtos
- Avaliação média calculada via reviews

---

## 3. products

Itens disponíveis para aluguel.

### Campos

- id (UUID, PK)
- supplier_id (UUID, FK → suppliers.id)
- name (VARCHAR)
- category (VARCHAR)
- description (TEXT)
- price_per_day (DECIMAL)
- quantity (INT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- deleted_at (TIMESTAMP)

### Regra de Negócio

- Um fornecedor pode ter vários produtos
- Produto pode ser desativado via soft delete
- Controle de estoque por quantidade

---

## 4. orders

Pedidos realizados pelos clientes.

### Campos

- id (UUID, PK)
- client_id (UUID, FK → users.id)
- supplier_id (UUID, FK → suppliers.id)
- status (ENUM: PENDING, ACCEPTED, REJECTED, PAID, CANCELED)
- start_date (DATE)
- end_date (DATE)
- total_price (DECIMAL)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### Regra de Negócio

- Representa a transação principal do marketplace
- Status controla ciclo do pedido
- Apenas pedidos concluídos podem gerar review

---

## 5. payments

Controle financeiro dos pedidos.

### Campos

- id (UUID, PK)
- order_id (UUID, FK → orders.id)
- provider (ENUM: MERCADO_PAGO, STRIPE)
- status (ENUM: PENDING, PAID, FAILED)
- amount (DECIMAL)
- transaction_id (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### Regra de Negócio

- Nunca confiar apenas no status do pedido
- Status financeiro independente do pedido
- Integração futura com gateway externo

---

## 6. reviews

Avaliações de fornecedores.

### Campos

- id (UUID, PK)
- order_id (UUID, FK → orders.id)
- client_id (UUID, FK → users.id)
- supplier_id (UUID, FK → suppliers.id)
- rating (INT)
- comment (TEXT)
- created_at (TIMESTAMP)

### Regra de Negócio

- Apenas pedidos finalizados podem gerar avaliação
- Um pedido pode ter no máximo uma review

---

# Soft Delete

Todas as tabelas principais utilizam soft delete através do campo `deleted_at`.

## Regras

- Exclusões são feitas com UPDATE, não DELETE
- Registros ativos possuem `deleted_at = NULL`
- Queries devem sempre filtrar `deleted_at IS NULL`
- Exclusão definitiva apenas via admin ou script manual

---

# Relações Principais

- User 1:N Orders
- User 1:1 Supplier
- Supplier 1:N Products
- Supplier 1:N Orders
- Order 1:1 Payment
- Order 1:1 Review

---

# Estado Atual da Implementação

- Users → Implementado
- Suppliers → Implementado
- Products → Implementado
- Orders → Modelado
- Payments → Modelado
- Reviews → Modelado
