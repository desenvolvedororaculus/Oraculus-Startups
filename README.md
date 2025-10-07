# Portfolio de Projetos

Um portfólio moderno e responsivo para exibir projetos com conexão ao Supabase.

## 🚀 Funcionalidades

- **Grade Responsiva**: Cards simplificados com informações essenciais
- **Modal de Detalhes**: Visualização completa em tela cheia
- **Dark Mode**: Design moderno e minimalista
- **Conexão Supabase**: Busca dinâmica de dados do banco
- **Responsivo**: Otimizado para desktop e mobile

## 🛠️ Tecnologias

- **Next.js 15** - Framework React
- **Tailwind CSS** - Estilização
- **Supabase** - Banco de dados
- **JavaScript** - Linguagem principal

## 📋 Pré-requisitos

- Node.js 18+ 
- Conta no Supabase
- Projeto Supabase configurado

## ⚙️ Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Crie uma tabela chamada `projetos` com os seguintes campos:

```sql
CREATE TABLE projetos (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  resumo TEXT NOT NULL,
  data_lancamento DATE NOT NULL,
  tag TEXT CHECK (tag IN ('ALPHA', 'BETA')) NOT NULL,
  link TEXT NOT NULL,
  descricao TEXT NOT NULL,
  proposta_valor TEXT NOT NULL,
  mercado TEXT NOT NULL,
  tecnologia TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

3. Configure as variáveis de ambiente no arquivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

### 3. Executar o projeto

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver o resultado.

## 📊 Estrutura do Banco de Dados

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | SERIAL | Chave primária |
| `titulo` | TEXT | Título do projeto |
| `resumo` | TEXT | Resumo para o card |
| `data_lancamento` | DATE | Data de lançamento |
| `tag` | ENUM | ALPHA ou BETA |
| `link` | TEXT | Link para acessar o projeto |
| `descricao` | TEXT | Descrição completa |
| `proposta_valor` | TEXT | Proposta de valor |
| `mercado` | TEXT | Mercado alvo |
| `tecnologia` | TEXT | Tecnologias utilizadas |

## 🎨 Design

- **Modo**: Dark Mode First
- **Cores**: Preto/cinza escuro com acentos sutis
- **Tipografia**: Geist Sans (sem serifa)
- **Layout**: Grade responsiva com modal em tela cheia

## 📱 Responsividade

- **Desktop**: Grade de 3 colunas
- **Tablet**: Grade de 2 colunas  
- **Mobile**: Grade de 1 coluna

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Executa build de produção
- `npm run lint` - Executa linter

## 📝 Notas

- O botão "Investir" redireciona para `/contato` (pode ser customizado)
- O modal abre ao clicar em qualquer parte do card (exceto nos botões)
- Suporte a tecla ESC para fechar o modal
- Estados de loading e erro implementados