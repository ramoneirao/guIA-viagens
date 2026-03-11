import os
from unittest import result

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from crewai import Agent, Task, Crew, Process, LLM
from crewai_tools import TavilySearchTool

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas as origens
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos
    allow_headers=["*"],  # Permite todos os headers
)
    

class TripRequest(BaseModel):
    city: str
    days: int
    interests: str
    groq_key: str
    tavily_key: str


@app.post("/generate")
def generate_trip(data: TripRequest):
    try:
        llm = LLM(
        model="groq/llama-3.3-70b-versatile",
        api_key=data.groq_key,
        max_tokens=1000
)

        search_tool = TavilySearchTool(api_key=data.tavily_key)

        travel_guide = Agent(
            role=f"Especialista Local de {data.city}",
            goal=f"Fornecer sugestões para {data.days} dias em {data.city} com foco em {data.interests}",
            backstory=f"Você é um guia turístico local de {data.city}, apaixonado por compartilhar os segredos da sua cidade.",
            llm=llm,
            tools=[search_tool],
            allow_delegation=False,
        )

        planner = Agent(
            role="Planejador Logístico",
            goal=f"Organizar roteiro para {data.days} dias",
            backstory=f"Você é um especialista em logística de viagens e organização de itinerários em {data.city}.",
            llm=llm,
            allow_delegation=False
        )

        writer = Agent(
            role="Escritor de Roteiros",
            goal="Criar roteiro final em Markdown",
            backstory=f"Você é um redator profissional especializado em guias de viagem para {data.city}.",
            llm=llm,
            allow_delegation=False
        )

        research_task = Task(
            description = (f"Use a ferramenta de busca para achar atrações, restaurantes e experiências para {data.days} dias em {data.city} "
                           f"com base em: {data.interests}. Liste atrações com nome e URL."),
            expected_output = "Lista com pelo menos 3 sugestões e URL.",
            agent=travel_guide
        )

        planning_task = Task(
            description=(f"Agrupe as sugestões por localização e crie um esboço dia a dia para {data.days} dias em {data.city}."),
            expected_output = f"Plano estruturado por dia, com blocos por região e janelas de horário.",
            agent=planner,
            context=[research_task]
        )

        writing_task = Task(
            description="Criar roteiro final",
            expected_output="Roteiro final em Markdown com pequeno detalhamento da viagem.",
            agent=writer,
            context=[planning_task]
        )

        crew = Crew(
            agents=[travel_guide, planner, writer],
            tasks=[research_task, planning_task, writing_task],
            process=Process.sequential  
        )

        result = crew.kickoff()
        return {
            "result": result.raw if hasattr(result, "raw") else str(result)
        }

    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Erro ao gerar roteiro: {error_details}")
        return {"error": str(e), "detail": "Verifique suas chaves de API e tente novamente."}