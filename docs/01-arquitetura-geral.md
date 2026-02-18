# Arquitetura Geral

Documento de visão macro do sistema.



\# Arquitetura Geral do Sistema



\## Objetivo

Este documento descreve a arquitetura geral do aplicativo de aluguel de utensílios para festas,

no modelo marketplace (estilo Uber), conectando clientes e fornecedores locais.



\## Visão Geral

O sistema é composto por:

\- App do Cliente (Flutter)

\- App do Fornecedor (Flutter)

\- Backend (Node.js + NestJS)

\- Banco de Dados (PostgreSQL)

\- Serviços externos (Pagamentos, Storage, Notificações)



\## Fluxo Geral

1\. Cliente acessa o app e busca produtos

2\. App consulta a API

3\. Backend processa regras de negócio

4\. Banco retorna dados

5\. Cliente cria pedido e realiza pagamento

6\. Fornecedor recebe solicitação

7\. Pedido é confirmado



\## Tecnologias

\- Flutter (Mobile)

\- Node.js + NestJS (Backend)

\- PostgreSQL (Banco)

\- JWT (Autenticação)

\- Mercado Pago / Stripe (Pagamentos)



