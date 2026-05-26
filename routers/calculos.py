from fastapi import APIRouter, Depends
from schemas import CalculoInput, CalculoOutput
from auth import get_usuario_atual
import models

router = APIRouter(prefix="/calculos", tags=["Cálculos"])

@router.post("", response_model=CalculoOutput)
def calcular(
    dados: CalculoInput,
    usuario_atual: models.Usuario = Depends(get_usuario_atual)
):
    if dados.taxa_anual:
        taxa_mensal = (1 + dados.taxa / 100) ** (1 / 12) - 1
    else:
        taxa_mensal = dados.taxa / 100

    meses = dados.tempo * 12 if dados.em_anos else dados.tempo
    saldo = dados.principal
    for _ in range(meses):
        saldo += saldo * taxa_mensal + dados.aporte_mensal

    total_investido = dados.principal + dados.aporte_mensal * meses
    juros = saldo - total_investido

    return CalculoOutput(
        saldo_final=round(saldo, 2), 
        total_investido=round(total_investido, 2), 
        juros_ganhos=round(juros, 2)
    )