\# Backend



\## Arquitetura

O backend segue o padrão:

Controller → Service → Repository



\## Domínios

\- auth

\- users

\- suppliers

\- products

\- orders

\- payments



\## Autenticação

Utiliza JWT para autenticação.

Roles:

\- CLIENT

\- SUPPLIER

\- ADMIN



\## Autenticação

\- JWT stateless

\- Payload contém userId e role

\- Senhas criptografadas com bcrypt



\## Usuários

\- Centralizados na tabela users

\- Soft delete aplicado

\- Roles controlam acesso



