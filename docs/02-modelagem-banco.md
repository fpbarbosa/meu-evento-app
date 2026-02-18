\# Modelagem do Banco de Dados – PostgreSQL



\## Padrões Gerais

\- Banco relacional: PostgreSQL

\- Chaves primárias: UUID

\- Soft delete: deleted\_at

\- Auditoria: created\_at, updated\_at



---



\## users

Armazena todos os usuários do sistema.



Campos:

\- id (UUID, PK)

\- name (VARCHAR)

\- email (VARCHAR, UNIQUE)

\- password (VARCHAR)

\- role (ENUM: CLIENT, SUPPLIER, ADMIN)

\- created\_at (TIMESTAMP)

\- updated\_at (TIMESTAMP)

\- deleted\_at (TIMESTAMP, NULL)



Motivo:

Centralizar autenticação e controle de acesso.



---



\## suppliers

Dados específicos de fornecedores.



Campos:

\- id (UUID, PK)

\- user\_id (UUID, FK → users.id)

\- status (ENUM: PENDING, APPROVED, BLOCKED)

\- description (TEXT)

\- rating (DECIMAL)

\- created\_at

\- updated\_at



Motivo:

Separar dados de fornecedor sem duplicar usuário.



---



\## products

Itens disponíveis para aluguel.



Campos:

\- id (UUID, PK)

\- supplier\_id (UUID, FK → suppliers.id)

\- name (VARCHAR)

\- category (VARCHAR)

\- description (TEXT)

\- price\_per\_day (DECIMAL)

\- quantity (INT)

\- created\_at

\- updated\_at

\- deleted\_at



Motivo:

Permitir múltiplos produtos por fornecedor.



---



\## orders

Pedidos realizados pelos clientes.



Campos:

\- id (UUID, PK)

\- client\_id (UUID, FK → users.id)

\- supplier\_id (UUID, FK → suppliers.id)

\- status (ENUM: PENDING, ACCEPTED, REJECTED, PAID, CANCELED)

\- start\_date (DATE)

\- end\_date (DATE)

\- total\_price (DECIMAL)

\- created\_at

\- updated\_at



Motivo:

Representa a transação principal do marketplace.



---



\## payments

Controle financeiro dos pedidos.



Campos:

\- id (UUID, PK)

\- order\_id (UUID, FK → orders.id)

\- provider (ENUM: MERCADO\_PAGO, STRIPE)

\- status (ENUM: PENDING, PAID, FAILED)

\- amount (DECIMAL)

\- transaction\_id (VARCHAR)

\- created\_at

\- updated\_at



Motivo:

Nunca confiar apenas no status do pedido para pagamentos.



---



\## reviews

Avaliações de fornecedores.



Campos:

\- id (UUID, PK)

\- order\_id (UUID, FK → orders.id)

\- client\_id (UUID, FK → users.id)

\- supplier\_id (UUID, FK → suppliers.id)

\- rating (INT)

\- comment (TEXT)

\- created\_at



Motivo:

Garantir que só pedidos concluídos possam gerar avaliações.


## Soft Delete

Todas as tabelas utilizam soft delete através do campo `deleted_at`.

Regras:
- Exclusões são feitas com UPDATE, não DELETE
- Registros ativos possuem deleted_at = NULL
- Queries devem sempre filtrar deleted_at IS NULL
- Exclusão definitiva só via admin ou script manual




