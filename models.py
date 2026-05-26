from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    senha_hash = Column(String, nullable=False)
    criado_em = Column(DateTime, default=datetime.utcnow)

    cenarios = relationship("Cenario", back_populates="usuario")


class Cenario(Base):
    __tablename__ = "cenarios"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    principal = Column(Float, nullable=False)
    taxa = Column(Float, nullable=False)
    taxa_anual = Column(Boolean, default=False)
    tempo = Column(Integer, nullable=False)
    em_anos = Column(Boolean, default=False)
    aporte_mensal = Column(Float, default=0)
    saldo_final = Column(Float, nullable=False)
    salvo_em = Column(DateTime, default=datetime.utcnow)

    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    usuario = relationship("Usuario", back_populates="cenarios")