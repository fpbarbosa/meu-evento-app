# Pagamentos

Este documento descreve a arquitetura e o fluxo de pagamentos do sistema Meu Evento.

---

## Objetivo

Garantir que pedidos realizados pelos clientes sejam pagos de forma segura, rastreável e confiável.

---

# Gateways de Pagamento

Gateways planejados:

- Mercado Pago
- Stripe

A escolha do gateway poderá variar conforme:

- Região
- Taxas
- Meio de pagamento disponível

---

# Arquitetura de Pagamento

A responsabilidade de pagamento é separada em duas entidades:

- Order → representa o pedido do marketplace
- Payment → representa a transação financeira

Nunca confiar apenas no status do pedido para controle financeiro.

---

# Fluxo de Pagamento

## Fluxo Planejado Completo

1. Cliente cria pedido
2. Backend cria registro em orders (status: PENDING)
3. Backend cria registro em payments (status: PENDING)
4. Backend gera sessão no gateway
5. Cliente é redirecionado para pagamento
6. Gateway processa pagamento
7. Gateway envia confirmação via webhook
8. Backend valida assinatura do webhook
9. Payment é atualizado para PAID ou FAILED
10. Order é atualizado para PAID

---

# Fluxo Técnico

