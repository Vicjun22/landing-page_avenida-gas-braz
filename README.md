# Landing Page Avenida Gas Braz

Este projeto é uma landing page desenvolvida para o cliente Avenida Gas Braz.

## Objetivo

O objetivo deste projeto é fornecer uma landing page funcional e otimizada para o cliente Avenida Gas Braz, utilizando as melhores práticas de desenvolvimento web e tecnologias modernas.

## Tecnologias

Para este projeto, foram utilizadas as seguintes tecnologias:

| Tecnologia  | Versão | Documentação                                                       |
| ----------- | ------ | ------------------------------------------------------------------ |
| TypeScript  | 4.5    | https://www.typescriptlang.org/docs/                               |
| Angular     | 13     | https://angular.io/docs                                            |
| HTML        |        | https://developer.mozilla.org/en-US/docs/Web/HTML                  |
| CSS         |        | https://developer.mozilla.org/en-US/docs/Web/CSS                   |

## Desenvolvimento

### Primeiro Passo:

Como primeiro passo para o desenvolvimento, foi criado um layout responsivo utilizando HTML e CSS, garantindo que a landing page seja visualmente atraente e funcional em dispositivos de diferentes tamanhos.

### Segundo Passo:

O segundo passo envolveu a integração com uma API de terceiros para obter dados dinâmicos que são exibidos na landing page. A API utilizada foi a Google Sheets API para carregar dados diretamente de uma planilha compartilhada.

```typescript
fetch('https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}?key={API_KEY}')
  .then(response => response.json())
  .then(data => {
    // Processar dados da planilha
  });
```

### Terceiro Passo:

O terceiro passo foi implementar a lógica de navegação e interação do usuário utilizando Angular, permitindo uma experiência de usuário fluida e intuitiva.

### Quarto Passo:

O quarto e último passo foi realizar testes e otimizações para garantir que a landing page funcione corretamente em diferentes navegadores e dispositivos, além de otimizar o desempenho para tempos de carregamento rápidos.

## Deploy

O deploy da landing page foi realizado utilizando a plataforma Vercel. A página está disponível em [landing-page-avenida-gas-braz.vercel.app](https://landing-page-avenida-gas-braz.vercel.app).

## Contato

Para mais informações ou dúvidas, entre em contato:

- Email: vicjun22@gmail.com
- LinkedIn: [Victor Elias Ross Jr.](https://www.linkedin.com/in/victor-elias-ross-jr/)

Att. Victor
