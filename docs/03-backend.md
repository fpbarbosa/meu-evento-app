# Backend

Este documento descreve a arquitetura e organização do backend do sistema Meu Evento.

---

## Visão Geral

O backend é responsável por:

- Autenticação e autorização
- Regras de negócio
- Persistência no banco de dados
- Controle de pedidos e pagamentos
- Comunicação com serviços externos

Tecnologia atual:

- Node.js
- Express
- CORS
- PostgreSQL (via Prisma)
- JWT (planejado para validação completa)

---

## Arquitetura

Padrão adotado:

Controller → Service → Repository

### Responsabilidades

- Controller → Recebe requisições HTTP e retorna respostas
- Service → Contém regras de negócio
- Repository → Comunicação com o banco de dados

---

## Estrutura de Domínios

O backend é organizado por domínio:

- auth
- users
- suppliers
- products
- orders
- payments

Cada domínio deverá conter:

- controller
- service
- repository
- dto (futuramente)

---

# Autenticação

## Modelo

Autenticação baseada em JWT (JSON Web Token).

Características:

- Stateless
- Token enviado pelo cliente via header Authorization
- Controle de acesso por role

---

## Fluxo de Login (Atual MVP)

1. Cliente envia email e senha
2. Backend valida credenciais
3. Se válidas → retorna token
4. Se inválidas → retorna 401

Rota implementada:

