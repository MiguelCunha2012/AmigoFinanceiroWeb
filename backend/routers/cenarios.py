from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models
import schemas
import auth
from database import get_db

router = APIRouter(prefix="/cenarios", tags=["Cenários"])

@router.get("", response_model=List[schemas.CenarioResponse])
def listar(
    db: Session = Depends(get_db),
    usuario = Depends(auth.get_usuario_atual)
):
    return db.query(models.Cenario).filter(
        models.Cenario.usuario_id == usuario.id
    ).order_by(models.Cenario.salvo_em.desc()).all()

@router.post("", response_model=schemas.CenarioResponse, status_code=201)
def salvar(
    dados: schemas.CenarioCreate,
    db: Session = Depends(get_db),
    usuario = Depends(auth.get_usuario_atual)
):
    cenario = models.Cenario(**dados.model_dump(), usuario_id=usuario.id)
    db.add(cenario)
    db.commit()
    db.refresh(cenario)
    return cenario

@router.delete("/{cenario_id}", status_code=204)
def deletar(
    cenario_id: int,
    db: Session = Depends(get_db),
    usuario = Depends(auth.get_usuario_atual)
):
    cenario = db.query(models.Cenario).filter(
        models.Cenario.id == cenario_id,
        models.Cenario.usuario_id == usuario.id
    ).first()
    if not cenario:
        raise HTTPException(status_code=404, detail="Cenário não encontrado")
    db.delete(cenario)
    db.commit()