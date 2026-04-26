# MindLink Dashboard

Landing page + dashboard interativo para apresentar a solução **MindLink — Inteligência Hospitalar na Saúde Mental do SUS**.

O projeto transforma dados públicos do **SIH-SUS/DATASUS** sobre internações por transtornos mentais e comportamentais em uma experiência visual para gestores: mapa por UF, rankings, tendência temporal, leitura por CID-10, faixa etária, custo médio e permanência média.

## Stack

- React
- Vite
- Tailwind CSS
- Recharts
- Framer Motion
- Vitest
- GitHub Actions para deploy no GitHub Pages

## Rodar localmente

```bash
npm install
npm run dev
```

Depois abra o endereço mostrado no terminal.

## Testes

```bash
npm test
```

Os testes validam as funções de dados e conferem se a soma das UFs bate com o total nacional em todos os anos usados no dashboard.

## Build

```bash
npm run build
```

## Publicar no GitHub Pages

Este repositório já vem com o workflow pronto em:

```txt
.github/workflows/deploy.yml
```

Depois de subir no GitHub:

1. Abra o repositório no GitHub.
2. Vá em **Settings**.
3. Clique em **Pages**.
4. Em **Build and deployment**, escolha **GitHub Actions**.
5. Faça um novo push ou rode o workflow manualmente em **Actions**.

O site ficará em um endereço parecido com:

```txt
https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/
```

O `vite.config.js` já calcula o `base` automaticamente para GitHub Pages usando o nome do repositório.

## Estrutura

```txt
mindlink-dashboard/
├─ .github/
│  └─ workflows/
│     └─ deploy.yml
├─ src/
│  ├─ App.jsx
│  ├─ data.js
│  ├─ icons.jsx
│  ├─ index.css
│  ├─ main.jsx
│  ├─ utils.js
│  └─ utils.test.js
├─ index.html
├─ package.json
├─ vite.config.js
└─ README.md
```

## Observação sobre GitHub Import Repository

O botão **Import repository** do GitHub serve para importar um repositório que já existe em uma URL Git, como GitHub, GitLab ou Bitbucket.

Para este ZIP, o caminho mais simples é:

1. Criar um repositório novo no GitHub.
2. Descompactar este ZIP.
3. Subir os arquivos pelo botão **Add file → Upload files** ou pelo GitHub Desktop.

## Fonte dos dados

Dados públicos do Ministério da Saúde / SIH-SUS / DATASUS, recorte CID-10 Capítulo V, organizados para fins acadêmicos e de prototipação da solução MindLink.
