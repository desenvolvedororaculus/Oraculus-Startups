# PROJECT_CONTEXT.md

## 1. Visão Geral do Projeto (Funcionalidade ATUALIZADA)

| Parâmetro | Detalhe |
| :--- | :--- |
| **Nome do Projeto** | **Portfolio de Projetos** |
| **Propósito** | Página para exibir um portfólio de projetos com detalhes aprofundados. |
| **Objetivo Principal** | Apresentar projetos de forma dinâmica, buscando todos os dados do banco de dados (Supabase) para atrair clientes/investidores. |
| **Público-Alvo** | Potenciais **clientes**, **investidores** e **recrutadores**. |
| **Funcionalidade Central** | **Exibição em Grade Responsiva:** Cards simplificados puxados do banco. |
| **Interação Principal** | **Modal de Detalhes em Tela Cheia:** Aberto ao clicar em qualquer parte do Card (exceto nos botões). |

### Estrutura do Card Simplificado (Grade)

Os cards devem exibir os seguintes atributos, buscados no banco:
1.  **Título** (`titulo`)
2.  **Resumo** (`resumo`)
3.  **Data de Lançamento** (`data_lancamento`)
4.  **Tag** (`tag`)
5.  **Botão 1 (Acessar)**: Link dinâmico (`link`).
6.  **Botão 2 (Investir)**: Link fixo para todos os projetos (ex: formulário de contato/investimento).

### Conteúdo do Modal (Tela Cheia)

O modal deve ocultar a grade de cards e exibir todos os detalhes do projeto:
1.  **Título** (`titulo`)
2.  **Descrição Completa** (`descricao`)
3.  **Proposta de Valor** (`proposta_valor`)
4.  **Mercado** (`mercado`)
5.  **Tecnologia** (`tecnologia`)

---

## 2. Stack Tecnológica e Arquitetura

| Camada | Tecnologia Principal | Detalhes Cruciais |
| :--- | :--- | :--- |
| **Frontend/Framework** | **Next.js** | Utilizar **JavaScript** (não TypeScript). |
| **Estilização** | **Tailwind CSS** | Estilização totalmente baseada no Tailwind. |
| **Backend/Funções** | **Next.js (API Routes)** | Backend Serverless, mantido na **Vercel**. |
| **Banco de Dados** | **Supabase** | Conexão externa, acessada via **API Routes** do Next.js. |
| **Estrutura de Pastas** | **Padrão Next.js/SRC** | Organizar o código em `src/components`, `src/pages`, `src/services`, `src/utils`, `src/hooks`. |
| **Nomenclatura** | **Padrão JavaScript** | Componentes em **PascalCase** (`ProjectCard.jsx`), funções em **camelCase** (`fetchProjectsData`). |

### Esquema da Tabela Supabase

| Atributo | Tipo de Dado | Uso |
| :--- | :--- | :--- |
| `id` | `int` | Chave Primária |
| `titulo` | `text` | Card (simplificado) + Modal (completo) |
| `resumo` | `text` | Card (simplificado) |
| `data_lancamento` | `date` | Card (simplificado) |
| `tag` | `Enum - tags(ALPHA, BETA)` | Card (simplificado) |
| `link` | `text` | Botão "Acessar" do Card |
| `descricao` | `text` | Modal (completo) |
| `proposta_valor` | `text` | Modal (completo) |
| `mercado` | `text` | Modal (completo) |
| `tecnologia` | `text` | Modal (completo) |

---

## 3. Diretrizes de Design e Estilização (Sem Alterações)

| Parâmetro | Detalhe |
| :--- | :--- |
| **Tom e Estilo** | **Moderno, minimalista e profissional.** Foco na legibilidade e seriedade. |
| **Modo de Cor** | **Dark Mode First** (Fundo escuro). |
| **Paleta de Cores** | **Fundo:** Preto ou cinza muito escuro. **Texto Principal:** Branco. **Destaque/Acento:** Tons de cinza claro ou um único tom de cor sutil para hover/links. |
| **Tipografia** | Fonte **Sem-Serifa** (Sans-serif) profissional e limpa (Sugestão: **Inter**, **Roboto** ou **Poppins**). |
| **Responsividade** | **Prioridade total em Desktop.** Deve ser funcional em mobile, mas a otimização visual é para telas grandes. |

---

### 📌 Instrução de Uso para a IA

Sempre use as diretrizes deste arquivo (`PROJECT_CONTEXT.md`) para garantir que todo o código, o design e a estrutura sigam as especificações de **Next.js + Tailwind** em **JavaScript** e o estilo **minimalista em modo escuro**, **priorizando a nova funcionalidade de Card/Modal com base na estrutura exata do Supabase fornecida.**