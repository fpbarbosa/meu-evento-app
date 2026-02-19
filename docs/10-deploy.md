# Deploy

Este documento descreve a estratégia de deploy do sistema Meu Evento.

---

## Objetivo

Garantir:

- Disponibilidade
- Escalabilidade
- Segurança
- Separação entre ambientes

---

# Ambientes

## 1. Desenvolvimento (Local)

- Backend rodando localmente (Node.js)
- Banco PostgreSQL local
- Flutter Web ou emulador
- Variáveis via `.env`

---

## 2. Produção (Planejado)

- Backend hospedado em:
  - AWS
  - Render
  - Railway

- Banco:
  - PostgreSQL gerenciado (AWS RDS / Railway / Render DB)

- Storage:
  - AWS S3
  - Firebase Storage

---

# Arquitetura de Infraestrutura

