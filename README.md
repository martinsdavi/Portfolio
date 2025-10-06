# Portfólio Power Platform - Template

Conteúdo criado com base no prompt fornecido para destacar habilidades em Power BI, Power Automate e Power Apps.

Arquivos:

- `index.html` — Site estático responsivo com as seções: Home, Power BI, Power Automate, Power Apps e Contato.
- `styles.css` — Estilos com paleta de cores (azul, cinza, branco) e destaques em verde/roxo.

Este template agora inclui suporte a modo claro/escuro com um botão de alternância no canto superior direito. A preferência é salva no Local Storage e respeita a configuração do sistema por padrão.

Como usar:

1. Abra a pasta `d:/Usuario 2/Desktop/Portfolio`.
2. Para visualizar localmente, use um servidor simples. Em PowerShell execute:

```powershell
python -m http.server 8000
```

Abra http://localhost:8000 no navegador.

Prompt pronto (PT-BR) — use em outra IA geradora de sites/designs:

"Crie um portfólio digital moderno, profissional e visualmente atraente para apresentar minhas experiências em **criação de soluções Microsoft Power Platform**.\
O portfólio deve ter **design clean, inovador e confiável**, usando uma paleta de cores elegante (tons de azul, cinza e branco, com detalhes em verde ou roxo para dar destaque).\
\
O portfólio deve conter:\
\
1. **Página Inicial (Home)**\
\
   * Título de destaque: *'Transformando Dados em Soluções Inteligentes'*\
   * Subtítulo: *'Especialista em Power BI, Power Automate e Power Apps'*\
   * Uma imagem de capa chamativa relacionada a tecnologia/dados/automação.\
\
2. **Seção Power BI – Dashboards Interativos**\
\
   * Título: *'Dashboards Inteligentes em Power BI'*\
   * Descrição: *'Experiência em transformar dados brutos em insights estratégicos por meio de dashboards interativos, relatórios personalizados e análises de desempenho. Criação de KPIs visuais que ajudam na tomada de decisão.'*\
   * Imagem ilustrativa: um dashboard moderno, com gráficos, indicadores e painéis interativos.\
\
3. **Seção Power Automate – Automação de Processos**\
\
   * Título: *'Automação de Fluxos com Power Automate'*\
   * Descrição: *'Desenvolvimento de fluxos de automação que reduzem retrabalhos, eliminam erros manuais e aumentam a eficiência operacional. Experiência em integrações entre sistemas e notificações inteligentes.'*\
   * Imagem ilustrativa: fluxos automatizados representando processos conectados.\
\
4. **Seção Power Apps – Aplicativos Personalizados**\
\
   * Título: *'Aplicativos Sob Medida com Power Apps'*\
   * Descrição: *'Construção de aplicativos personalizados para diferentes áreas, garantindo maior produtividade e padronização dos processos internos. Criação de interfaces intuitivas e soluções que se adaptam ao negócio.'*\
   * Imagem ilustrativa: telas de aplicativos modernos, responsivos e fáceis de usar.\
\
5. **Seção Contato**\
\
   * Título: *'Vamos Conversar?'*\
   * Texto: *'Entre em contato para desenvolvermos juntos soluções inovadoras com a Microsoft Power Platform.'*\
   * Espaço para e-mail, LinkedIn e botão de contato.\
\
O portfólio deve ter layout responsivo (desktop e mobile), com tipografia clara, ícones minimalistas e imagens em alta qualidade."

---

Sugestões rápidas:

- Substitua as imagens de exemplo por capturas reais dos seus dashboards, fluxos e apps.
- Atualize o e-mail e link do LinkedIn no `index.html`.
- Para deploy, hospede em Netlify, GitHub Pages ou Azure Static Web Apps.

Modo claro/escuro:

- Clique no botão 🌙/☀️ no topo para alternar.
- A preferência é salva automaticamente.

Backend (envio de email / rota de contato)

O projeto inclui um pequeno backend Node.js com Express que expõe um endpoint POST `/api/contact`. Por padrão, se você não configurar SMTP, as mensagens serão gravadas em `contact.log`.

Passos rápidos:

1. Instale dependências (Node.js precisa estar instalado):

```powershell
Set-Location -Path "d:/Usuario 2/Desktop/Portfolio"
npm install
```

2. Crie um arquivo `.env` baseado no `.env.example` e configure suas credenciais SMTP se quiser enviar emails de verdade.

3. Inicie o servidor:

```powershell
npm start
# ou em desenvolvimento
npm run dev
```

4. Abra http://localhost:3000 (o servidor serve os arquivos estáticos e a rota `/api/contact`).

Segurança:

- O servidor inclui rate limiting básico e cabeçalhos de segurança com Helmet.
- Não exponha credenciais em repositórios públicos.


