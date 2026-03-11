<div align="center">

# guIA-viagens

### Planejador de viagens inteligente com IA

![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi)
![JavaScript](https://img.shields.io/badge/JavaScript-Frontend-F7DF1E?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-Markup-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Style-1572B6?logo=css3)
![CrewAI](https://img.shields.io/badge/CrewAI-Multi--Agent-purple)
![Groq](https://img.shields.io/badge/Groq-LLM-orange)
![Tavily](https://img.shields.io/badge/Tavily-WebSearch-green)
![License](https://img.shields.io/badge/License-MIT-green.svg)

</div>

## Descrição

**guIA-viagens** é um planejador de viagens que utiliza **multi-agentes de inteligência artificial** para gerar roteiros personalizados.  
O usuário informa destino, duração da viagem e interesses, e o sistema cria automaticamente um itinerário estruturado.

O projeto utiliza **CrewAI** para orquestração de agentes, **Groq LLM** para geração de texto e **Tavily** para pesquisa na web.

---

## Funcionalidades

- Geração automática de roteiros de viagem
- Sistema de agentes especializados
- Pesquisa de informações atualizadas na web
- Organização do roteiro por dias
- Personalização baseada em interesses do usuário
- Interface web simples e responsiva

---

## Exemplo de uso

### Entrada

```json
{
  "city": "Paris, França",
  "days": 2,
  "interests": "Museu e gastronomia"
}
````

### Saída

```markdown
## Roteiro de 3 dias em Paris
### Dia 1: Montmartre, Louvre e Île de la Cité

    09:00 - 10:00: Montmartre

    Visite a Basílica do Sagrado Coração (Sacre-Cœur) e explore as ruas estreitas do bairro.
    Desfrute de um café da manhã típico francês em um dos cafés da região.

    10:30 - 12:30: Louvre

    Visite o Museu do Louvre e explore as exposições de arte e história.
    Não perca a oportunidade de visitar a loja de gastronomia do Louvre e degustar alguns dos produtos locais.

    13:00 - 15:00: Île de la Cité

    Visite a Catedral de Notre-Dame e explore a ilha.
    Almoce em um dos restaurantes da região e experimente some da cozinha francesa.

    16:00 - 18:00: Museus Gourmet de Paris

    Visite o Museu do Queijo e explore a exposição sobre a história do queijo francês.
    Desfrute de uma degustação de queijos e vinhos.

### Dia 2: Champs-Élysées, Museu d'Orsay e Trocadéro

    09:00 - 10:00: Champs-Élysées

    Caminhe pela famosa avenida e explore as lojas e cafés da região.
    Desfrute de um café da manhã em um dos cafés da avenida.

    10:30 - 12:30: Museu d'Orsay

    Visite o museu e explore as exposições de arte impressionista e moderna.
    Não perca a oportunidade de visitar a cafeteria do museu e degustar alguns dos produtos locais.

    13:00 - 15:00: Trocadéro

    Visite o Palácio de Chaillot e explore as exposições de arte e história.
    Almoce em um dos restaurantes da região e experimente some da cozinha francesa.

    16:00 - 18:00: Cultura gastronômica

    Visite um dos mercados da região e explore as opções de comida fresca e local.
    Desfrute de uma degustação de vinhos e queijos em um dos estabelecimentos da região.

```

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/ramoneirao/guIA-viagens.git
cd guIA-viagens
```

Crie um ambiente virtual:

```bash
python3 -m venv venv
source venv/bin/activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

---

## Configuração

Você precisará de duas chaves de API:

* Groq → [https://console.groq.com](https://console.groq.com)
* Tavily → [https://tavily.com](https://tavily.com)

As chaves são inseridas diretamente na interface da aplicação.

---

## Como executar

### Backend

```bash
cd backend
uvicorn app:app --reload
```

Servidor disponível em:

```
http://localhost:8000
```

### Frontend

Abra o arquivo:

```
frontend/index.html
```

no navegador.

---

## Estrutura do projeto

```
guIA-viagens
│
├── backend
│   └── app.py
│
├── frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── requirements.txt
└── README.md
```

---

## API

### Endpoint

```
POST /generate
```

### Request

```json
{
  "city": "Tokyo, Japão",
  "days": 5,
  "interests": "Templos e culinária",
  "groq_key": "API_KEY",
  "tavily_key": "API_KEY"
}
```

### Response

```json
{
  "result": "Roteiro em Markdown..."
}
```

---

## Contribuição

Contribuições são bem-vindas.

1. Fork do repositório
2. Crie uma branch

```bash
git checkout -b feature/nova-funcionalidade
```

3. Commit das mudanças

```bash
git commit -m "feat: nova funcionalidade"
```

4. Envie um Pull Request

---


## Autor

Ramon Neirão
[https://github.com/ramoneirao](https://github.com/ramoneirao)

