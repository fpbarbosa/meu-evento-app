# Arquitetura Geral do Sistema

Documento de visão macro do aplicativo de aluguel de utensílios para festas, no modelo marketplace (estilo Uber), conectando clientes e fornecedores locais.

---

## Objetivo

Descrever a arquitetura técnica do sistema, suas camadas, fluxo de autenticação e tecnologias utilizadas no MVP atual.

---

## Visão Geral

O sistema é composto por:

- App Mobile (Flutter)
- Backend API (Node.js + Express)
- Banco de Dados (PostgreSQL)
- Serviços externos (Pagamentos, Storage e Notificações)

---

## Fluxo Geral do Marketplace (Visão de Negócio)

1. Cliente acessa o app e busca produtos
2. App consulta a API
3. Backend processa regras de negócio
4. Banco retorna dados
5. Cliente cria pedido e realiza pagamento
6. Fornecedor recebe solicitação
7. Pedido é confirmado

---

## Arquitetura Mobile (Flutter)

Padrão adotado: **Feature-First Architecture**

### Estrutura principal

