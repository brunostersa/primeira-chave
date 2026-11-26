# Agenda as 15 peças da leva de 26/11 (Reels 58–72) no calendario.json. Rodar uma vez.
import json
AV="Valores estimados com base nas regras de financiamento da Caixa (Minha Casa Minha Vida) vigentes em novembro de 2026. As regras podem mudar a qualquer momento. Não é aprovação de crédito."
ED="Conteúdo educativo. Não é aprovação de crédito."
HT="#primeiroimovel #financiamentoimobiliario #minhacasaminhavida #casapropria #comprarimovel"
SIM="Simule a sua parcela: primeirachave.com.br/simulador-financiamento-caixa (estimativa educativa, não é aprovação)."
U="https://primeirachave.com.br/ig/"
P=[
 ("2026-11-30","Lista: quanto custa além da entrada","reel-58-lista-custos.mp4",10000,
  "Imóvel de R$ 200 mil: o que sai do bolso além da entrada.\n\n1. ITBI, o imposto da prefeitura: cerca de R$ 6 mil numa cidade que cobra 3%.\n2. Registro no cartório: cerca de R$ 2.200 em SP, já com o desconto de primeiro imóvel.\n3. Avaliação do banco: cerca de R$ 1 mil.\n\nNada disso entra no financiamento. Separe junto com a entrada.\n\nE no seu caso? Descubra no link da bio.\n\n"+AV+"\n\n"+HT+" #itbi #cartorio",
  "O ITBI muda de cidade para cidade: confira a alíquota na sua prefeitura. "+SIM),
 ("2026-12-04","Busca: dá pra comprar casa sem entrada?","reel-59-busca-sem-entrada.mp4",20000,
  "Dá pra comprar casa sem entrada? Dá, quando o banco avalia o imóvel 25% ou mais acima do preço.\n\nO banco empresta até 80% da avaliação. Uma casa de R$ 200 mil avaliada em R$ 250 mil: 80% de R$ 250 mil são os R$ 200 mil inteiros.\n\nO cartório e o ITBI continuam por sua conta. E combinar com o vendedor um preço maior no papel é fraude: quem diz quanto vale é o engenheiro do banco.\n\nE no seu caso? Descubra no link da bio.\n\n"+AV+"\n\n"+HT+" #entradazero",
  "Entrada zero depende da avaliação do banco, não do anúncio. Entenda o caso: primeirachave.com.br/financiar-casa-sem-entrada"),
 ("2026-12-07","Lista: documentos para financiar","reel-60-lista-documentos.mp4",9000,
  "Vai financiar o primeiro imóvel? Separe isto antes de ir ao banco:\n\n1. RG, CPF e certidão de estado civil (nascimento ou casamento).\n2. Comprovante de renda: os últimos holerites; autônomo leva 6 meses de extrato e o imposto de renda.\n3. Comprovante de residência atual.\n4. Extrato do FGTS, se for usar.\n\nCada banco pode pedir algo a mais. Mas com estes em mãos você não perde semana.\n\nSalve e mande para quem vai comprar junto. Mais no link da bio.\n\n"+ED+"\n\n"+HT+" #documentos",
  "Cada banco tem a sua lista; esta é a base. O passo a passo até a chave: primeirachave.com.br/do-zero-a-chave"),
 ("2026-12-11","Carrossel: antes do primeiro imóvel",None,None,
  "6 frases para lembrar antes do primeiro imóvel. Salve e mande para quem vai comprar com você.\n\nE no seu caso? Descubra no link da bio.\n\n"+ED+"\n\n"+HT,
  SIM),
 ("2026-12-14","Busca: financiar casa com nome sujo","reel-62-busca-nome-sujo.mp4",18000,
  "Dá pra financiar casa com nome sujo? Na prática, não: com restrição no nome, o banco nega o crédito.\n\nO caminho: negocie a dívida, pague ou parcele, e guarde o comprovante. Depois do pagamento, quem negativou tem 5 dias úteis para tirar o seu nome. Confira no Registrato (é de graça, do Banco Central) se não sobrou nada antes de pedir o financiamento.\n\nE no seu caso? Descubra no link da bio.\n\nConteúdo educativo. Cada banco faz a sua análise. Não é aprovação de crédito.\n\n"+HT+" #nomesujo #registrato",
  "O prazo de 5 dias úteis para tirar o nome depois de pagar é da Súmula 548 do STJ. Registrato: registrato.bcb.gov.br"),
 ("2026-12-18","Lista: antes de visitar imóvel","reel-63-lista-antes-de-visitar.mp4",10000,
  "Antes de visitar o primeiro imóvel, faça isto:\n\n1. Descubra quanto o banco te empresta: é ele que define o preço que dá para buscar.\n2. Puxe o Registrato (é de graça, do Banco Central) e veja se tem dívida no seu nome.\n3. Separe uns 5% do valor do imóvel para o ITBI e o cartório.\n4. Junte os documentos de renda.\n\nVisitar sem isso é se apaixonar por um imóvel que não cabe.\n\nSalve. Descubra o seu número no link da bio.\n\n"+ED+"\n\n"+HT,
  SIM),
 ("2026-12-21","Busca: autônomo consegue financiar?","reel-64-busca-autonomo.mp4",22800,
  "Autônomo consegue financiar? Consegue, se provar a renda.\n\nLeve os extratos bancários dos últimos 6 meses e a declaração do imposto de renda. MEI leva também os comprovantes do DAS. A renda que não aparece na conta não conta: se você recebe em dinheiro vivo, comece a depositar já.\n\nQuem comprova R$ 3.000 por mês pode ter parcela de até R$ 900 (30% da renda).\n\nE no seu caso? Descubra no link da bio.\n\n"+AV+"\n\n"+HT+" #autonomo #mei",
  "Cada banco pode pedir documentos a mais para autônomo e MEI. "+SIM),
 ("2026-12-28","Lista: regras para usar o FGTS","reel-65-lista-fgts.mp4",9500,
  "Quer usar o FGTS para comprar o primeiro imóvel? Confira as regras:\n\n1. 3 anos de trabalho com FGTS, somando todos os empregos.\n2. Não ter imóvel na cidade onde você mora ou trabalha.\n3. Não ter outro financiamento habitacional ativo.\n4. O imóvel é residencial e é para você morar.\n\nO FGTS pode entrar na entrada e, depois, amortizar a dívida a cada 2 anos.\n\nSalve. Mais no link da bio.\n\nConteúdo educativo com base nas regras do FGTS vigentes em novembro de 2026. As regras podem mudar.\n\n"+HT+" #fgts",
  "O saldo do FGTS aparece no app FGTS da Caixa. "+SIM),
 ("2027-01-04","Busca: financiar ou continuar no aluguel?","reel-66-busca-aluguel.mp4",21500,
  "Vale a pena financiar ou continuar no aluguel? Compare com números.\n\nUm imóvel de R$ 200 mil pelo Minha Casa Minha Vida dá uma parcela de uns R$ 860, em 35 anos. Se o seu aluguel está nessa faixa e você pretende ficar anos, financiar costuma fazer sentido.\n\nMas tem o antes: uns R$ 40 mil de entrada e uns R$ 10 mil de ITBI e cartório. Se esse dinheiro ainda não existe, o aluguel compra tempo para juntar.\n\nE no seu caso? Descubra no link da bio.\n\n"+AV+" Estimativa com renda de R$ 2.880, tabela Price.\n\n"+HT+" #aluguel",
  SIM),
 ("2027-01-08","Carrossel: antes de assinar",None,None,
  "6 frases para lembrar antes de assinar a compra do primeiro imóvel. Salve e mande para quem vai comprar com você.\n\nE no seu caso? Descubra no link da bio.\n\n"+ED+"\n\n"+HT,
  "Modelos de contrato com cláusula para crédito negado: primeirachave.com.br/modelos-de-contrato"),
 ("2027-01-11","Lista: perguntas antes de fechar","reel-68-lista-perguntas.mp4",11000,
  "4 perguntas para fazer antes de fechar o imóvel:\n\n1. A matrícula está no nome de quem está vendendo?\n2. Tem IPTU ou condomínio atrasado? A dívida pode passar para você.\n3. A reforma ou ampliação está registrada? Se não estiver, a avaliação do banco pode travar.\n4. O vendedor aceita esperar o banco aprovar? Combine isso no contrato.\n\nSalve e leve na próxima visita. Mais no link da bio.\n\nConteúdo educativo. Não substitui a análise do banco nem de um advogado.\n\n"+HT+" #matricula",
  "Modelos de contrato com cláusula para crédito negado: primeirachave.com.br/modelos-de-contrato"),
 ("2027-01-15","Busca: primeiro imóvel paga ITBI?","reel-69-busca-itbi.mp4",18500,
  "Primeiro imóvel paga ITBI? Paga. O desconto de primeiro imóvel é no cartório, não no imposto.\n\nO ITBI é da prefeitura e cada cidade tem a sua alíquota. Numa cidade que cobra 3%, um imóvel de R$ 200 mil paga R$ 6 mil. Algumas prefeituras cobram menos na parte financiada ou em programas habitacionais: pergunte na sua antes de fechar.\n\nSepare esse dinheiro junto com a entrada: o ITBI não entra no financiamento.\n\nE no seu caso? Descubra no link da bio.\n\n"+AV+"\n\n"+HT+" #itbi",
  "A alíquota e as reduções do ITBI estão na lei do seu município: confira no site da prefeitura. "+SIM),
 ("2027-01-18","Busca: MCMV vale pra imóvel usado?","reel-70-busca-usado.mp4",12000,
  "Minha Casa Minha Vida vale pra imóvel usado? Vale, desde que o preço caiba no limite da sua faixa.\n\nRenda até R$ 3.200 ou R$ 5.000: imóvel de até R$ 210 mil (em algumas cidades o limite é maior).\nRenda até R$ 9.600: até R$ 400 mil.\nRenda até R$ 13.000: até R$ 600 mil.\n\nO banco avalia o usado do mesmo jeito: empresta até 80% do valor que ele encontrar.\n\nE no seu caso? Descubra no link da bio.\n\n"+AV+"\n\n"+HT+" #imovelusado #mcmv",
  SIM),
 ("2027-01-22","Busca: comprar na planta vale a pena?","reel-71-busca-planta.mp4",18000,
  "Comprar na planta vale a pena? Pode valer, se você souber o que muda.\n\nA favor: preço de lançamento e entrada parcelada direto com a construtora durante a obra.\nContra: essas parcelas são corrigidas por um índice da construção (o INCC), e o banco analisa o seu crédito de novo na entrega das chaves. Se a sua renda ou o seu nome mudarem até lá, o financiamento pode travar.\n\nAntes de assinar, peça a matrícula com o registro da incorporação: é o que mostra que o prédio pode ser vendido na planta.\n\nE no seu caso? Descubra no link da bio.\n\nConteúdo educativo. Cada construtora e cada banco têm as suas regras. Não é aprovação de crédito.\n\n"+HT+" #imovelnaplanta",
  "O registro da incorporação fica na matrícula do terreno, no cartório de imóveis da cidade."),
 ("2027-01-25","Busca: desconto no cartório no primeiro imóvel","reel-72-busca-cartorio.mp4",16000,
  "Primeiro imóvel tem desconto no cartório? Tem: 50% no registro, quando é o seu primeiro imóvel para morar e a compra é financiada.\n\nNum imóvel de R$ 200 mil em São Paulo, financiando R$ 160 mil, o registro cai de uns R$ 4.400 para uns R$ 2.200.\n\nConfira na guia do cartório se o desconto veio. O ITBI é outra coisa: é da prefeitura.\n\nE no seu caso? Descubra no link da bio.\n\n"+AV+"\n\n"+HT+" #cartorio",
  "O desconto vem da Lei 6.015/73, art. 290. "+SIM),
]
FONTE={"reel-58-lista-custos.mp4":"reel-lista-custos.mp4","reel-60-lista-documentos.mp4":"reel-lista-docs.mp4","reel-63-lista-antes-de-visitar.mp4":"reel-lista-visita.mp4","reel-65-lista-fgts.mp4":"reel-lista-fgts.mp4","reel-68-lista-perguntas.mp4":"reel-lista-perguntas.mp4",
 "reel-59-busca-sem-entrada.mp4":"reel-busca-sem-entrada.mp4","reel-62-busca-nome-sujo.mp4":"reel-busca-nome-sujo.mp4","reel-64-busca-autonomo.mp4":"reel-busca-autonomo.mp4","reel-66-busca-aluguel.mp4":"reel-busca-aluguel.mp4","reel-69-busca-itbi.mp4":"reel-busca-itbi.mp4","reel-70-busca-usado.mp4":"reel-busca-usado.mp4","reel-71-busca-planta.mp4":"reel-busca-planta.mp4","reel-72-busca-cartorio.mp4":"reel-busca-cartorio.mp4"}
if __name__=="__main__":
  import shutil,subprocess,os
  raiz="../../../";cal=raiz+"scripts/instagram/calendario.json";C=json.load(open(cal))
  assert not any(p["n"]>=58 for p in C),"já agendado"
  car={61:"c1",67:"c2"}
  for i,(data,tit,vid,capa,leg,com) in enumerate(P):
    n=58+i;e={"n":n,"titulo":tit,"data":data,"hora":"12:00","status":"aprovado","imagens":[],"legenda":leg,"comentario":com}
    if vid:
      shutil.copy(FONTE[vid],raiz+"public/ig/"+vid);e["video"]=U+vid;e["capa_ms"]=capa
    else:
      for s in range(1,9):
        dst=f"{n}-{s}.jpg";subprocess.run(["sips","-s","format","jpeg","-s","formatOptions","90",f"../../carrosseis/frases/{car[n]}-{s:02d}.png","--out",raiz+"public/ig/"+dst],check=True,capture_output=True)
        e["imagens"].append(U+dst)
    C.append(e)
  json.dump(C,open(cal,"w"),ensure_ascii=False,indent=2)
  print("ok",len(P))
