from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime

class UsuarioRegistro(BaseModel):
    email: EmailStr
    senha: str

    @field_validator("senha")
    def senha_forte(cls, v):
        if len(v) < 8:
            raise ValueError("A senha precisa ter pelo menos 8 caracteres")
        return v

class UsuarioLogin(BaseModel):
    email: EmailStr
    senha: str

class Token(BaseModel):
    access_token: str
    token_type: str

class CalculoInput(BaseModel):
    principal: float
    taxa: float
    taxa_anual: bool = False
    tempo: int
    em_anos: bool = False
    aporte_mensal: float = 0

    @field_validator("principal", "aporte_mensal")
    def nao_negativo(cls, v):
        if v < 0:
            raise ValueError("Valores não podem ser negativos")
        return v

    @field_validator("taxa", "tempo")
    def positivo(cls, v):
        if v <= 0:
            raise ValueError("Taxa e tempo precisam ser maiores que zero")
        return v

class CalculoOutput(BaseModel):
    saldo_final: float
    total_investido: float
    juros_ganhos: float

class CenarioCreate(BaseModel):
    nome: str
    principal: float
    taxa: float
    taxa_anual: bool
    tempo: int
    em_anos: bool
    aporte_mensal: float
    saldo_final: float

class CenarioResponse(CenarioCreate):
    id: int
    salvo_em: datetime

    class Config:
        from_attributes = True