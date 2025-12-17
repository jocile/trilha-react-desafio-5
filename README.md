# Desafio da Trilha React - criar um blog com Next.js usando banco de dados Supabase

O desafio "Criando o Seu Blog Pessoal Com Next.js e Supabase" consiste em implementar a função `getPostBySlug` para buscar um post específico no banco de dados Supabase usando o `id` do post. A função deve fazer uma requisição à API REST do Supabase e retornar o post correspondente ou `null` se não for encontrado. Foi utilizado o template de blog Next.js da Bejamas como base para o projeto.

- [DIO Formacao-react-developer][formacao-react]

## Sumário

- [Desafio da Trilha React - criar um blog com Next.js usando banco de dados Supabase](#desafio-da-trilha-react---criar-um-blog-com-nextjs-usando-banco-de-dados-supabase)
  - [Sumário](#sumário)
  - [Desafio: busca de post por `id` (getPostBySlug)](#desafio-busca-de-post-por-id-getpostbyslug)
  - [Primeiros passos](#primeiros-passos)
    - [Instalação local](#instalação-local)
    - [Usando o assistente de configuração](#usando-o-assistente-de-configuração)
  - [Configuração do blog](#configuração-do-blog)
  - [Adicionando novos posts](#adicionando-novos-posts)
  - [Testes](#testes)
    - [Testes inclusos](#testes-inclusos)
    - [Remover Renovate](#remover-renovate)
    - [Remover Cypress](#remover-cypress)

---

## Desafio: busca de post por `id` (getPostBySlug)

Arquivo: [src/utils/mdx-utils.js](src/utils/mdx-utils.js)

A função `getPostBySlug` é uma solução para o desafio "Busca um post específico pela coluna `id` usando Supabase REST". Ela:

- Recebe um `id` e retorna `null` imediatamente se não houver `id`.
- Faz uma requisição GET para a rota REST do Supabase filtrando por `id` usando `?id=eq.<valor>` (com `encodeURIComponent` para segurança).
- Se a resposta for um array com ao menos um item, retorna o primeiro elemento; caso contrário, retorna `null`.
- Trata erros internamente e retorna `null` em caso de falha para não propagar exceções.

Exemplo de implementação (trecho presente em `src/utils/mdx-utils.js`):

```javascript
export const getPostBySlug = async (id) => {
  if (!id) return null;

  try {
    const { data } = await api.get(`/posts?id=eq.${encodeURIComponent(id)}`);
    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }
    return null;
  } catch (error) {
    return null;
  }
}
```

Essa abordagem funciona com a API REST do Supabase, que aceita consultas do tipo `?coluna=eq.valor` e retorna um array com os registros que batem no filtro.

---

![Template de blog Next.js para Netlify, criado pela Bejamas](github-banner.svg)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/nextjs-blog-theme)

Um starter personalizável para blog usando:

- Next.js v16
- Tailwind CSS v3
- Suporte integrado a MDX v1
- Tema moderno com modos claro e escuro

> 🎉 Essa colaboração Bejamas + Netlify é especial — em vez de brindes, preferimos usar esses recursos para apoiar o software livre e a comunidade!

![Pré-visualização do tema do blog](nextjs-blog-theme-preview.png)

Veja a demo: https://bejamas-nextjs-blog.netlify.app

Assista ao walkthrough do template: https://www.youtube.com/watch?v=63QZHs259dY

## Primeiros passos

Você pode começar com este projeto de duas maneiras: localmente ou usando o assistente de configuração (wizard).

### Instalação local

1. Clique em "Use this template" no repositório original para criar sua cópia.
2. Clone o repositório gerado e navegue até a pasta do projeto.
3. Instale dependências:

```shell
yarn install
```

4. Rode o projeto localmente:

```shell
yarn run dev
```

Abra http://localhost:3000 no navegador.

### Usando o assistente de configuração

O assistente (wizard) facilita criar o blog e fazer o deploy no Netlify: https://nextjs-wizard.netlify.app/

## Configuração do blog

A configuração é feita via variáveis de ambiente, o que facilita a integração com plataformas Jamstack como Netlify.

Variáveis disponíveis:

| Variável | Descrição | Opções |
| --- | --- | --- |
| BLOG_NAME | Nome do blog, exibido abaixo do avatar | — |
| BLOG_TITLE | Título principal (h1) da home | — |
| BLOG_FOOTER_TEXT | Texto exibido no rodapé | — |
| BLOG_THEME | Tema para o Tailwind | default |
| BLOG_FONT_HEADINGS | Fonte para headings (h1–h6) | sans-serif (padrão), serif, monospace |
| BLOG_FONT_PARAGRAPHS | Fonte para os demais textos | sans-serif (padrão), serif, monospace |

Você pode definir essas variáveis no painel do Netlify (Site settings → Build & deploy → Environment). Se preferir, altere os valores padrão em [src/utils/global-data.js](src/utils/global-data.js).

- `BLOG_THEME`, `BLOG_FONT_HEADINGS` e `BLOG_FONT_PARAGRAPHS` são usados em `tailwind-preset.js`.
- `BLOG_NAME`, `BLOG_TITLE`, `BLOG_FOOTER_TEXT` são usados em `pages/index.js` e `pages/posts/[slug].js` através do objeto `globalData`.

## Adicionando novos posts

Os posts ficam na pasta `/posts`. Para criar um post, adicione um arquivo com extensão `.mdx`.

Como os posts usam MDX, você pode inserir componentes React e passar props, tornando o conteúdo interativo. Veja mais em https://mdxjs.com/docs/using-mdx/#components

## Testes

### Testes inclusos

Este template inclui ferramentas que ajudam na manutenção:

- Renovate — atualiza dependências automaticamente
- Cypress — testes end-to-end no navegador
- Cypress Netlify Build Plugin — executa testes durante o build

Se você não quiser essas ferramentas, elas podem ser removidas com facilidade.

### Remover Renovate

Remova o arquivo `renovate.json` do repositório e faça commit.

### Remover Cypress

O template usa Cypress para testes E2E. Por padrão o build pode bloquear deploys quando os testes falham. Para manter Cypress e permitir deploys, remova o bloco de configuração do plugin em `netlify.toml` referente ao `netlify-plugin-cypress`.

Trecho de exemplo a ser removido do `netlify.toml`:

```diff
[[plugins]]
  package = "netlify-plugin-cypress"
  [plugins.inputs.postBuild]
    enable = true

  [plugins.inputs]
    enable = false
```

Para remover o plugin por completo, delete o bloco acima e desinstale o pacote:

```bash
npm uninstall -D netlify-plugin-cypress
```

Para remover o Cypress totalmente, delete a pasta `cypress` e o arquivo `cypress.config.ts`, e então remova a dependência:

```bash
npm uninstall cypress
```

[formacao-react]: https://web.dio.me/track/formacao-react-developer
