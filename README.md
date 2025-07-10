# ProjectInBio 🚀

ProjectInBio é uma plataforma SaaS (Software as a Service) desenvolvida para facilitar a criação, personalização e gerenciamento de portfólios profissionais e páginas pessoais de forma simples, rápida e intuitiva. Com recursos modernos, integrações e uma interface amigável, o ProjectInBio permite que qualquer pessoa destaque sua presença digital sem complicações técnicas.

## 🛠️ Instalação

Siga os passos abaixo para instalar e rodar o projeto localmente:

1. 📥 Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/inbio.git
   cd inbio
   ```
2. 📦 Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   # ou
   bun install
   ```
3. ▶️ Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   # ou
   bun dev
   ```
4. 🌐 Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para visualizar o projeto.

## 💻 Tecnologias Utilizadas

- ⚡ [Next.js](https://nextjs.org) – Framework React para aplicações web
- ⚛️ [React](https://react.dev) – Biblioteca para construção de interfaces de usuário
- 🟦 [TypeScript](https://www.typescriptlang.org/) – Superset do JavaScript para tipagem estática
- 💳 [Stripe](https://stripe.com/) – Plataforma de pagamentos integrada

## 📁 Estrutura do Projeto

Abaixo está a estrutura essencial do ProjectInBio, destacando os principais diretórios e arquivos:

```
project-in-bio/
├── public/
│   ├── manifest.json
│   └── robots.txt
└── src/
    ├── app/           # Páginas e rotas principais
    ├── components/    # Componentes reutilizáveis da interface
    ├── lib/           # Funções utilitárias e integrações (ex: Stripe, Firebase)
    ├── hooks/         # Custom React hooks
    ├── styles/        # Estilos globais
    └── utils/         # Funções auxiliares
```

- **app/**: Páginas e rotas da aplicação.
- **components/**: Componentes reutilizáveis de UI.
- **lib/**: Integrações e funções utilitárias (ex: autenticação, Stripe).
- **hooks/**: Hooks personalizados para lógica compartilhada.
- **styles/**: Estilos globais do projeto.
- **utils/**: Funções auxiliares e helpers.

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você deseja colaborar com este projeto, siga os passos abaixo:

1. 🍴 Faça um fork deste repositório
2. 🌿 Crie uma branch para sua feature ou correção (`git checkout -b minha-feature`)
3. 💡 Commit suas alterações (`git commit -m 'Minha nova feature'`)
4. 🚀 Faça push para a branch (`git push origin minha-feature`)
5. 📬 Abra um Pull Request

Fique à vontade para abrir issues com sugestões, dúvidas ou problemas encontrados.

---

Desenvolvido com ❤️ por Israel Jorge.
