# Painel Administrativo

Este documento descreve as responsabilidades, arquitetura e funcionalidades do Painel Administrativo do sistema Meu Evento.

---

## Objetivo

Permitir que administradores:

- Gerenciem usuários
- Aprovar ou bloquear fornecedores
- Monitorar pedidos
- Gerenciar pagamentos
- Controlar taxas e comissões
- Acompanhar relatórios do sistema

---

# Arquitetura

O painel administrativo será uma aplicação web separada do app mobile.

Tecnologia planejada:

- Frontend Web (React ou Flutter Web)
- Backend compartilhado com API principal
- Controle de acesso por role (ADMIN)

---

# Controle de Acesso

Apenas usuários com role ADMIN poderão acessar:

- Rotas administrativas
- Dados sensíveis
- Relatórios financeiros

Validação deverá ocorrer:

- No frontend (ocultação de rotas)
- No backend (middleware de autorização)

---

# Funcionalidades

## 1. Aprovação de Fornecedores

Fluxo:

1. Usuário solicita ativação como fornecedor
2. Status inicial: PENDING
3. Admin visualiza lista de pendentes
4. Admin aprova ou bloqueia
5. Status muda para APPROVED ou BLOCKED

---

## 2. Bloqueio de Usuários

- Bloquear CLIENT
- Bloquear SUPPLIER
- Impedir login
- Registrar motivo do bloqueio

---

## 3. Gerenciamento de Pedidos

- Visualizar todos os pedidos
- Filtrar por status
- Filtrar por data
- Visualizar histórico completo
- Forçar cancelamento (casos excepcionais)

---

## 4. Relatórios

Relatórios planejados:

- Total de pedidos
- Receita total
- Receita por período
- Comissão da plataforma
- Fornecedores mais ativos
- Produtos mais alugados

---

## 5. Controle de Comissões

O admin poderá:

- Definir percentual de comissão
- Ajustar taxas manualmente
- Aplicar taxa por categoria

---

# Estrutura de Domínio no Backend

Novo domínio:

