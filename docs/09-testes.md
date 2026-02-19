# Testes

Este documento descreve a estratégia de testes do sistema Meu Evento.

---

## Objetivo

Garantir:

- Estabilidade do sistema
- Segurança nas regras de negócio
- Prevenção de regressões
- Confiabilidade nas integrações

---

# Estratégia Geral

Os testes são divididos em:

- Testes Unitários
- Testes de Integração
- Testes End-to-End (planejado)

---

# Backend

## 1. Testes Unitários

Responsáveis por testar:

- Services
- Regras de negócio
- Validações
- Cálculo de valores

Ferramentas:

- Jest

Exemplo de casos:

- Login com credenciais válidas
- Login com credenciais inválidas
- Criação de pedido
- Cálculo de total do pedido

---

## 2. Testes de Integração

Responsáveis por testar:

- Rotas HTTP
- Integração controller → service → banco
- Status code correto

Ferramentas:

- Jest
- Supertest

Exemplo:

```javascript
describe('POST /auth/login', () => {
  it('deve retornar 200 com credenciais válidas', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'demo@email.com',
        password: '123456'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
