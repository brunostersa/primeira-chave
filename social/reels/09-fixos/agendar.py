# Agenda os 4 Reels fixos (73–76) nas quartas de dezembro no calendario.json. Rodar uma vez.
import json,shutil
AV="Valores estimados com base nas regras de financiamento da Caixa (Minha Casa Minha Vida) vigentes em novembro de 2026. As regras podem mudar a qualquer momento. Não é aprovação de crédito."
ED="Conteúdo educativo. Não é aprovação de crédito."
HT="#primeiroimovel #financiamentoimobiliario #minhacasaminhavida #casapropria #comprarimovel"
SIM="Simule a sua parcela: primeirachave.com.br/simulador-financiamento-caixa (estimativa educativa, não é aprovação)."
U="https://primeirachave.com.br/ig/"
P=[
 ("2026-12-02","Fixo: antes de visitar um imóvel","reel-fixo-visita.mp4","reel-73-fixo-visita.mp4",
  "Antes de visitar um imóvel, faça isso:\n\n1. Saiba quanto o banco te empresta: é isso que define o preço que dá para buscar.\n2. Veja o seu nome no Registrato (é de graça, do Banco Central).\n3. Separe uns 5% do valor para ITBI e cartório.\n4. Visite o bairro de dia e à noite.\n\nSalve para a próxima visita. Descubra o seu número no link da bio.\n\n"+ED+"\n\n"+HT+" #visitaimovel",
  SIM),
 ("2026-12-09","Tabela: qual imóvel cabe no seu salário","reel-tabela-salario.mp4","reel-74-tabela-salario.mp4",
  "Qual imóvel cabe no seu salário? Salve a tabela.\n\nRenda de R$ 2.000: imóvel até uns R$ 137 mil.\nR$ 3.000: até uns R$ 209 mil.\nR$ 4.000: até R$ 210 mil, o teto do Minha Casa Minha Vida nessa faixa (varia por cidade).\nR$ 6.000: até uns R$ 300 mil.\nR$ 8.000: até uns R$ 400 mil.\n\nA parcela fica em até 30% da renda e a entrada é de 20%. Estimativa com 30 anos de idade, 35 anos de prazo e sem dívidas.\n\nE com o seu salário? Descubra no link da bio.\n\n"+AV+"\n\n"+HT+" #quantoganhar",
  SIM),
 ("2026-12-16","Fixo: o banco aprovou, ainda falta","reel-fixo-depois.mp4","reel-75-fixo-depois.mp4",
  "O banco aprovou o crédito. Ainda falta:\n\n1. A avaliação do imóvel pelo engenheiro do banco.\n2. A assinatura do contrato.\n3. O pagamento do ITBI.\n4. O registro no cartório.\n5. Só então, a chave.\n\nA ordem do ITBI e da assinatura pode mudar conforme a cidade e o banco. Salve para saber em que etapa você está.\n\nO passo a passo até a chave está no link da bio.\n\n"+ED+"\n\n"+HT,
  "O caminho completo, do zero à chave: primeirachave.com.br/do-zero-a-chave"),
 ("2026-12-23","Tabela: quanto ter na mão","reel-tabela-namao.mp4","reel-76-tabela-namao.mp4",
  "Quanto você precisa ter na mão para comprar? Salve a tabela.\n\nImóvel de R$ 150 mil: uns R$ 37,5 mil.\nR$ 200 mil: uns R$ 50 mil.\nR$ 250 mil: uns R$ 62,5 mil.\nR$ 300 mil: uns R$ 75 mil.\nR$ 400 mil: uns R$ 100 mil.\n\nÉ a entrada de 20% mais uns 5% para ITBI, cartório e avaliação. O ITBI muda de cidade para cidade, e o FGTS pode entrar na entrada.\n\nDá pra pagar menos de entrada? Veja no link da bio.\n\n"+AV+"\n\n"+HT+" #entrada #itbi",
  "Entrada menor depende da avaliação do banco: primeirachave.com.br/financiar-casa-sem-entrada"),
]
if __name__=="__main__":
  raiz="../../../";cal=raiz+"scripts/instagram/calendario.json";C=json.load(open(cal))
  assert not any(p["n"]>=73 for p in C),"já agendado"
  for i,(data,tit,src,dst,leg,com) in enumerate(P):
    shutil.copy(src,raiz+"public/ig/"+dst)
    C.append({"n":73+i,"titulo":tit,"data":data,"hora":"12:00","status":"aprovado","imagens":[],"legenda":leg,"comentario":com,"video":U+dst,"capa_ms":3000})
  json.dump(C,open(cal,"w"),ensure_ascii=False,indent=2)
  print("ok",len(P))
