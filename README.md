# Sistema de Gestão de TCCs

Sistema web completo para gerenciamento de Trabalhos de Conclusão de Curso (TCCs).

- **Backend:** Django REST Framework
- **Frontend:** React + Vite + Bootstrap 5 + Recharts

---

## Pré-requisitos

- Python 3.10+
- Node.js 18+
- npm

---

## Como Executar

### 1. Backend (Django)

```bash
# Na raiz do projeto
cd projeto-web

# Criar e ativar ambiente virtual
python -m venv venv

# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Criar as tabelas no banco de dados
python manage.py migrate

# Popular o banco com dados de exemplo
python load.py

# Iniciar o servidor
python manage.py runserver
```

API disponível em: **http://127.0.0.1:8000/api/**

---

### 2. Frontend (React)

Em **outro terminal**:

```bash
cd projeto-web/frontend-tcc

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

Aplicação disponível em: **http://localhost:5173**

> **Atenção:** o backend deve estar rodando antes de abrir o frontend.

---

## Funcionalidades

- **Dashboard** com gráficos de TCCs por status, tipo, curso, semestre e orientador
- **Listagem e busca** de Alunos, Professores, Cursos, Departamentos e Unidades Acadêmicas
- **Listagem de TCCs** com filtro por título/resumo e alteração de status inline
- **Cadastro de TCC** com upload de PDF e seleção de aluno, orientador, banca e semestre

---

## Endpoints da API

| Recurso | URL |
|---|---|
| Unidades Acadêmicas | `GET/POST /api/unidades-academicas/` |
| Departamentos | `GET/POST /api/departamentos/` |
| Cursos | `GET/POST /api/cursos/` |
| Alunos | `GET/POST /api/alunos/` |
| Professores | `GET/POST /api/professores/` |
| TCCs | `GET/POST /api/tccs/` |
| Estatísticas | `GET /api/tccs/estatisticas/` |

Todos os endpoints de listagem aceitam busca via `?search=termo`.

### Status dos TCCs

| Valor | Descrição |
|---|---|
| `0` | Em Elaboração |
| `1` | Enviado |
| `2` | Aprovado |
| `3` | Reprovado |

---

## Estrutura do Projeto

```
projeto-web/
├── core/                  # App Django (models, views, serializers)
├── tcc_project/           # Configurações Django
├── frontend-tcc/          # Aplicação React
│   └── src/
│       ├── pages/         # Dashboard, TCCs, Alunos, Professores, etc.
│       ├── components/    # Navbar, Table, Search
│       └── services/      # Configuração do axios
├── manage.py
├── load.py                # Script para popular o banco
└── requirements.txt
```

