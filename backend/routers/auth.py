from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from slowapi import Limiter
from slowapi.util import get_remote_address
import models
import schemas
import auth
from database import get_db

router = APIRouter(prefix="/auth", tags=["Autenticação"])
limiter = Limiter(key_func=get_remote_address)

@router.post("/registro", response_model=schemas.Token, status_code=201)
def registrar_usuario(usuario: schemas.UsuarioRegistro, db: Session = Depends(get_db)):
    if db.query(models.Usuario).filter(models.Usuario.email == usuario.email).first():
        raise HTTPException(status_code=400, detail="Email já registrado")
    
    usuario_db = models.Usuario(
        email=usuario.email,
        senha_hash=auth.hash_senha(usuario.senha)
    )
    db.add(usuario_db)
    db.commit()
    db.refresh(usuario_db)

    token = auth.criar_token({"sub": usuario_db.email})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/login", response_model=schemas.Token)
@limiter.limit("5/minute")
def login(
    request: Request,
    dados: schemas.UsuarioLogin,
    db: Session = Depends(get_db)
):
    usuario = db.query(models.Usuario).filter(models.Usuario.email == dados.email).first()
    if not usuario or not auth.verificar_senha(dados.senha, usuario.senha_hash):
        raise HTTPException(status_code=401, detail="Email ou senha inválidos")
    
    token = auth.criar_token({"sub": usuario.email})
    return {"access_token": token, "token_type": "bearer"}
