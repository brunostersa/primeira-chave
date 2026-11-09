import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/badge";
import { Secao } from "@/components/conteudo/pecas";
import { metadadosPagina } from "@/lib/seo";

export const metadata: Metadata = metadadosPagina({
  titulo: "Privacidade: como a Primeira Chave cuida dos seus dados",
  descricao: "O que a Primeira Chave guarda (e o que não guarda), para que usa, com quem compartilha e como você apaga os seus dados.",
  slug: "/privacidade/",
});

const CONTATO = "joao@primeirachave.com.br";

/** Só o que o site faz de verdade hoje. Mudou um formulário? Atualize aqui junto. */
export default function PrivacidadePage() {
  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-12 px-4 pb-10 pt-12 sm:px-6">
      <header className="flex flex-col gap-4">
        <Eyebrow>Privacidade</Eyebrow>
        <h1 className="font-display text-[clamp(34px,5vw,52px)] font-light leading-[1.05]">
          Seus dados, <span className="marca-texto font-semibold">em poucas linhas.</span>
        </h1>
        <p className="text-lg text-ink-2">
          A Primeira Chave é um projeto da CustomerHub. Seguimos a Lei Geral de Proteção de Dados (LGPD): pedimos só o necessário e você pode sair ou apagar tudo
          quando quiser.
        </p>
      </header>

      <Secao titulo="O simulador">
        <p>
          As respostas do simulador (renda, idade, valores) <b>não saem do seu navegador</b>: a conta é feita ali mesmo, e nada é enviado nem guardado por nós. Não precisa de cadastro para simular.
        </p>
      </Secao>

      <Secao titulo="O Recado do João (e-mail)">
        <p>
          Se você se inscreve, guardamos o seu <b>e-mail</b>, a <b>fase da compra</b> que você escolheu, a página de onde veio e a data do aceite. Quando a
          inscrição vem do simulador, guardamos também um resumo em faixas (por exemplo, a faixa do Minha Casa Minha Vida e se você tem FGTS), <b>nunca o valor da
          sua renda</b>.
        </p>
        <p>
          Usamos isso só para mandar o recado e os e-mails da sua fase, e para saber quais conteúdos ajudam mais (se o e-mail foi aberto e quais links foram
          clicados). O envio é feito pela Resend, um serviço de e-mail, e os dados ficam guardados no sistema da CustomerHub. <b>Não vendemos nem repassamos</b>{" "}
          o seu contato a bancos, corretores ou parceiros.
        </p>
        <p>Para sair, use o link “Sair da lista” no fim de qualquer e-mail.</p>
      </Secao>

      <Secao titulo="A conversa com o João">
        <p>
          O João é uma inteligência artificial. O que você escreve passa pelo sistema da CustomerHub e pela Anthropic, a empresa do modelo de IA, nos Estados Unidos,
          para gerar a resposta. Antes de sair do seu navegador, tiramos CPF, telefone e e-mail do texto. Mesmo assim, evite escrever documentos ou dados de outras
          pessoas ali.
        </p>
        <p>
          O seu plano e os dados do imóvel ficam no seu navegador. Para responder, o João recebe um resumo deles, como renda, idade, FGTS e preço do imóvel, além da
          conversa. As contas continuam sendo feitas no seu navegador.
        </p>
        <p>
          Quando o João não sabe responder, guardamos a pergunta. Quando você aponta um erro, guardamos também a resposta. Isso fica sem ligar a você e sem CPF,
          telefone ou e-mail, para melhorar as nossas páginas. Falas sobre crise, disputa ou pedido de atendente não saem do seu navegador. Se quiser, você
          pode guardar a conversa, o plano e o imóvel num <b>link só seu</b>. Isso só acontece com o seu aceite. Quem tiver o link consegue abrir, então guarde bem.
          Apagamos depois de 12 meses sem uso, e você pode apagar tudo antes, na própria tela.
        </p>
      </Secao>

      <Secao titulo="Interesse num imóvel de ouro">
        <p>
          Quando você pede para conversar sobre um imóvel da Seleção de imóvel de ouro, guardamos o seu <b>nome</b>, o seu <b>WhatsApp</b>, o imóvel e a página
          de onde veio, no sistema da CustomerHub. Em seguida a conversa abre no WhatsApp de quem atende aquele imóvel, com a mensagem pronta para você enviar.
          Usamos esses dados só para o atendimento desse imóvel; a simulação da página continua no seu navegador e não é enviada.
        </p>
      </Secao>

      <Secao titulo="Relatos e sugestões">
        <p>
          Quando você usa “Algo errado aqui?” ou “Sugerir uma ideia”, guardamos o texto, a página e, se você informar, o e-mail para responder. Pedimos que não
          escreva CPF, renda ou outros dados pessoais ali.
        </p>
      </Secao>

      <Secao titulo="Medição de visitas">
        <p>Usamos ferramentas de medição do Google para saber quais páginas são lidas e de onde as pessoas chegam, de forma agregada.</p>
      </Secao>

      <Secao titulo="Seus direitos">
        <p>
          Você pode pedir para ver, corrigir ou apagar os seus dados, ou tirar o consentimento a qualquer momento. É só escrever para{" "}
          <a href={`mailto:${CONTATO}`} className="font-semibold text-ink underline underline-offset-4">
            {CONTATO}
          </a>
          .
        </p>
      </Secao>
    </article>
  );
}
