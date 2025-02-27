# Projeto de E-commerce

Este é um projeto simples de e-commerce que consome a API [FakeStoreAPI](https://fakestoreapi.in) para exibir produtos. O projeto permite filtrar produtos por categoria, buscar produtos através de uma query e gerenciar um carrinho de compras. Além disso, o projeto inclui testes unitários.

### Tecnologias Utilizadas

- **React**
- **Next.js (app)**
- **TypeScript**
- **Tailwind CSS**
- **Jest**
- **React Testing Library**

### Requisitos

- Node.js v23.4.0 ou superior

### Instalação

1. Clone o repositório:
```bash
  git clone https://github.com/marlonberaldo/my-side-store.git
  cd my-side-store
```
  
2. Instale as dependências:
```bash
  npm install
```
3. Defina a variável de ambiente API_URL no arquivo .env com o URL da API (por padrão, é a FakeStoreAPI):
```bash
  API_URL="https://fakestoreapi.in/api"
```

### Rodando o projeto

Para rodar o projeto em modo de desenvolvimento:

```bash
  npm run dev
```
A aplicação estará disponível em http://localhost:3000.

### Testes

Este projeto inclui testes unitários para verificar a funcionalidade dos componentes e do fluxo do carrinho. Para rodar os testes, use o seguinte comando:

```bash
  npm run test
```
Os testes são realizados com Jest e React Testing Library, e a cobertura dos testes será exibida após a execução.

### Funcionalidades

- **Exibição de produtos em grid**: Os produtos são consumidos da API FakeStoreAPI e exibidos em um formato de grid.
- **Filtro por categoria**: Permite filtrar os produtos por categorias, como "audio", "mobile", etc.
- **Busca de produtos**: Permite realizar uma busca de produtos através de uma query.
- **Carrinho de compras**: Possui a funcionalidade de adicionar e remover produtos do carrinho.