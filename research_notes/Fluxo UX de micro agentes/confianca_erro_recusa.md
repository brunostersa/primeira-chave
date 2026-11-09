# Trust, transparency, error handling and refusal design for AI agents in high-stakes domains

Evidence tags used below: **[Empirical]** peer-reviewed or preregistered study; **[Preprint]** study not confirmed as peer reviewed; **[Legal]** statute, ruling or regulator text; **[Reporting]** journalism; **[Practitioner]** expert or firm opinion; **[Vendor]** commercial source with an interest in the result. Items marked "secondary" were read through a summary, not the original document. Research date: 4 Nov 2026.

## What builds or breaks trust: citations, confidence indicators, disclaimers, explanations?

### Takeaway
Citations and confident tone raise trust whether or not the answer deserves it, so the design goal is calibrated trust, not more trust. First-person uncertainty is the best-supported cue for reducing overreliance. No study I found directly tests whether chatbot disclaimers change reliance, so "disclaimer blindness" is an open question for LLM chat.

### Cited Findings
- **[Empirical]** Ding et al. (AAAI 2025): citations significantly raised trust, and this held even when the citations were random. Trust fell significantly when participants actually checked them. The authors read citations as a social-proof signal. The study warns about small samples in its demographic analysis of who checks. — [AAAI](https://ojs.aaai.org/index.php/AAAI/article/view/34550); [arXiv](https://arxiv.org/pdf/2501.01303)
- **[Empirical]** Kim, Liao, Vorvoreanu, Ballard and Vaughan (FAccT 2024; preregistered, N=404, medical questions, fictional LLM search engine): first-person hedges ("I'm not sure, but...") lowered confidence in the system and agreement with its answers, and raised accuracy. Exploratory analysis suggests this came from reduced, but not eliminated, overreliance on wrong answers. Impersonal wording ("It's not clear, but...") showed the same direction but weaker, non-significant effects. The authors say the exact wording matters and call for user testing before deployment. — [FAccT paper](https://facctconference.org/static/papers24/facct24-56.pdf); [arXiv mirror](https://ar5iv.labs.arxiv.org/html/2405.00623v1)
- **[Empirical]** Bean et al. (Nature Medicine, Feb 2026; preregistered RCT, N=1,298 UK adults, 10 scenarios): models alone identified conditions in 94.9% of cases and chose the right disposition in 56.3% on average. Participants using those same models identified relevant conditions in under 34.5% of cases and the right disposition in under 44.2%, no better than controls using their usual resources. The authors attribute the gap to the user interaction, not medical knowledge, and say standard benchmarks did not predict these failures. — [Oxford Internet Institute](https://www.oii.ox.ac.uk/?p=410415); [Oxford repository](https://ora.ox.ac.uk/objects/uuid:ccb8b891-c738-4890-a4d5-45959d0e04d9)
- **[Preprint]** "Are Generative AI Agents Effective Personalized Financial Advisors?": a more emotionally positive advisor was trusted more even though it gave worse guidance, focusing on upsides and overlooking serious drawbacks. Secondary, read via search summary. — [arXiv 2504.05862](https://arxiv.org/pdf/2504.05862)
- **[Reporting, unverified study]** A consumer-tech article describes a study in the journal *Artificial Intelligence* in which people trusted an overconfident chatbot more than a balanced one, though it gave more wrong answers, and could not spot bad advice. I could not locate the paper, so treat this as a lead only. — [SlashGear](https://www.slashgear.com/2024445/chatgpt-financial-investing-advice-problems-risks)
- **[Preprint]** Disclaimers are vanishing from model outputs: medical disclaimers in answers to medical questions fell from 26.3% in 2022 to 0.97% in 2025. This measures presence, not effect on users. Coverage says it was later published in npj Digital Medicine, which I did not confirm. — [arXiv 2507.08030](https://web3.arxiv.org/pdf/2507.08030)
- **[Empirical]** A 2026 JMIR evaluation found the models it tested adapt, with more explicit disclaimers and urgent referrals for high-urgency queries. This is an audit of model outputs, not a user study. — [JMIR](https://www.jmir.org/2026/1/e84668)
- **[Empirical]** Adjacent evidence on labels. In a CHI 2025 study (N=911), AI labels changed belief that content was AI-generated but did not significantly change engagement. In a 2024 experiment (N=2,049), warning labels reduced trust in false information. Neither tests chat disclaimers. — [CHI 2025 paper](https://arxiv.org/html/2503.05711v1); [Warning labels paper](https://arxiv.org/html/2407.21592v1)
- **[Practitioner / qualitative]** NN/g diary study (18 participants, 2 weeks): users rated chatbots helpful and trustworthy and many grew more trusting with use. Separately, users chose classic search when they needed accuracy, control and trusted sources. NN/g also found that sources in Google AI Mode were well received but did not solve hallucinations. Small qualitative samples. — [Diary study](https://www.nngroup.com/articles/generative-ai-diary/); [Search vs GenAI](https://www.nngroup.com/articles/ai-search-infoseeking/); [AI Mode](https://nngroup.com/articles/google-ai-mode/?amp=&amp=)
- **[Practitioner]** NN/g describes "magic-8-ball thinking", where users stop verifying, and recommends acknowledging limits. It notes first-person language can help flag possible hallucinations. — [NN/g](https://www.nngroup.com/articles/ai-magic-8-ball/)
- **[Practitioner]** Google PAIR frames the goal as helping users calibrate trust, covers whether and how to show confidence, and advises defining errors from the user's view and always offering a way forward after failure. — [Explainability + Trust](https://pair.withgoogle.com/chapter/People%20+%20AI%20Guidebook%20-%20Explainability%20+%20Trust.pdf); [Errors + Graceful Failure](https://pair.withgoogle.com/chapter/People%20+%20AI%20Guidebook%20-%20Errors%20+%20Graceful%20Failure.pdf)

### Inferences
- Citing only the site's own pages does not by itself protect users. Ding implies a citation works as a trust signal even when wrong, so João's validator should check that the cited page actually supports the specific sentence, not merely that the link exists.
- Prefer inline, first-person, specific uncertainty in the reply ("não tenho certeza se isso vale para o seu caso, porque...") over a static footer. This wording is untested in Portuguese and should be user-tested, as Kim et al. insist.
- Avoid warmth that spills into optimism on credit. The positive-advisor preprint suggests tone can buy trust the content has not earned, and this is the exact failure mode for "você consegue!".
- Numeric model confidence scores have little support in this evidence for lay users. Prefer plain statements of what the number depends on.
- Bean et al. is the most important finding for João: a high offline eval score says little about what real users walk away understanding.

### Gaps
- I found no experiment isolating the effect of chat disclaimers such as "may make mistakes" on reliance, nor one in finance. "Disclaimer blindness" in LLM chat is plausible but unproven in these sources.
- No Brazilian or Portuguese-language study on trust cues. No study with low-income or low-literacy users.
- I found no study testing numeric confidence displays with lay users in LLM chat.

## How should an agent say "I don't know", refuse, or hand off, including with no human team?

### Takeaway
Giving general information while withholding the personal or actionable part beats flat refusal, and explaining the refusal softens it. The worst failure is the loop with no exit. With no live team, an honest asynchronous route plus named external channels is the design that remains; I found no study of it.

### Cited Findings
- **[Empirical]** "Let Them Down Easy!" (EMNLP Findings 2025): partial compliance, meaning general information without actionable details, was the best strategy, reducing negative perceptions by over 50% compared with flat-out refusal. Response strategy shaped experience far more than user motivation. Models tend to default to direct or explanation-based refusals, and reward models undervalue partial compliance. — [arXiv](https://arxiv.org/pdf/2506.00195)
- **[Preprint]** "When AI Says 'I Am Unable to Answer'" (N=480): explanations were associated with less negative views of refusals, most strongly for users high in need for cognitive closure. Frequent refusals were judged more harshly than infrequent ones, but only among those users. Peer-review status unconfirmed. — [arXiv 2609.16191](https://arxiv.org/pdf/2609.16191)
- **[Empirical]** Fürst, Trißler, Friedrich and Wirtz (Journal of Service Management, 2025; three experiments in financial and healthcare chat): customers preferred AI agents after a customer-caused failure and humans after a company-caused failure. Humans were preferred for apologies; AI for explanations or monetary redress. — [FAU record](https://cris.fau.de/publications/342953528)
- **[Empirical]** Mixed evidence on bot apologies. One 2023 paper found appreciation worked better than apology admitting limited competence. An EMAC 2023 conference paper found apology improved satisfaction with a real chatbot. A separate 2023 study found chatbot recovery produced lower satisfaction and revisit intention than human recovery. — [JRCS 2023](https://ideas.repec.org/a/eee/joreco/v73y2023ics096969892300070x.html); [EMAC 2023](https://proceedings.emac-online.org/pdfs/A2023-114513.pdf); [JHTT 2023](https://www.emeraldinsight.com/insight/content/doi/10.1108/JHTT-06-2021-0164/full/html)
- **[Empirical]** Mozafari et al. (Journal of Service Management, 2021, older than the requested window): when the bot could not solve the request, disclosure that it was a bot made people more forgiving. In important conversations such as financial issues, learning it was a chatbot weakened trust. Secondary, via trade press. — [AccountsRecovery](https://www.accountsrecovery.net/2021/07/23/i-type-therefore-i-am/)
- **[Legal / regulator, June 2023]** CFPB Issue Spotlight: chatbots become less effective as issues grow complex, and are "not suitable" as the primary customer service channel. Doom loops with no route to a human can cause late fees and other harm. It cites a survey in which 80% left more frustrated and 78% needed a human afterwards. — [CFPB](https://www.consumerfinance.gov/data-research/research-reports/chatbots-in-consumer-finance/chatbots-in-consumer-finance/)
- **[Practitioner]** PAIR: give users a path forward after failure, and note that a user may perceive a failure even when the system works as designed. — [PAIR](https://pair.withgoogle.com/chapter/People%20+%20AI%20Guidebook%20-%20Errors%20+%20Graceful%20Failure.pdf)
- **[Legal, Brazil]** Consumer-facing rules treat exit to a human as the baseline for regulated providers. See the regulation section. — [Cescon Barrieu](https://cesconbarrieu.com.br/novo-decreto-do-sac-novas-regras-entram-em-vigor-em-20-dias/)

### Inferences
Suggested pattern for João, derived from the above. These are design inferences, not tested patterns:
- **Refusal shape:** say what João cannot do, why in one line, what is generally true, and what the person can do next. This is partial compliance. "Não sei dizer se o banco vai aprovar, porque quem decide é o banco. O que costuma pesar é X e Y. Quer simular com a sua renda?"
- **Never a dead end:** every "não sei" ends in one concrete action: a simulator, a site page, a documents checklist, or an external body.
- **Be honest about the absence of humans.** Do not imply someone will answer soon. State the real channel and real expectation, for example "isso fica registrado e o Bruno lê em até X dias", only if it is true.
- **External handoff replaces the missing team:** route to the bank or correspondent for approval, a CRECI-registered broker for a property, a lawyer or Defensoria for contracts, Procon or consumidor.gov.br for disputes, and CVV 188 or CAPS for emotional crisis. A debt case goes to the free renegotiation channels. These destinations are my suggestions and need checking before use.
- **Separate the two failure types.** When the user "failed" (nome sujo, wrong income figure), the bot is an acceptable, perhaps preferred, partner. When João itself erred, Fürst suggests a human is preferred, so João's own errors are the case that most needs an owner: a "isso está errado" button, a written correction, and an asynchronous human reply.
- **Limit retries:** after two failed attempts at the same question, stop rephrasing and move to the exit. Doom loops are the CFPB's central concern.
- Rule-based exits should fire on the request itself, without the model's consent: "falar com alguém", dispute words, crisis words.

### Gaps
- I found no study of escalation in products with no human team, and none of asynchronous human review as a stand-in.
- Handoff quality itself (context transfer, timing) was not covered by the studies found. The service-recovery literature tests recovery messages, mostly in scenarios.

## How do you design for anxiety and low confidence: tone, acknowledgment, pacing, reducing shame?

### Takeaway
Shame drives avoidance, so the job is to keep people engaged without judgment. Evidence favours cognitive empathy (showing the situation was understood) over a bot claiming feelings, and plain, non-humanised framing on embarrassing topics. Pacing evidence is largely absent.

### Cited Findings
- **[Empirical]** Gladstone, Jachimowicz, Greenberg and Galinsky (OBHDP 2021, older than window; six studies, N=9,110): shame pushes people to withdraw from their finances, worsening hardship, and was a stronger driver than guilt. Kindness-affirming acts reduced the link between shame and disengagement. — [Harvard Kennedy School](https://www.hks.harvard.edu/centers/mrcbg/programs/growthpolicy/financial-shame-spirals-how-shame-intensifies-financial); [CU Boulder](https://www.colorado.edu/business/faculty-research/2021/11/03/financial-shame-spirals-how-shame-intensifies-financial-hardship)
- **[Practitioner-research project]** Erasmus University tested a brief intervention (animated explainer and card tool) using plain language to normalise financial stress for people of lower socioeconomic position. It worked better among those with lower stigma, and the researchers said future versions could focus more on reducing stigma. — [Erasmus](https://www.eur.nl/en/essb/research/behavioural-insights-and-projects/research-projects/discussing-financial-concerns)
- **[Empirical]** Rubin, Perry et al. (Nature Human Behaviour, 2025; nine experiments, over 6,000 participants): identical empathic responses were rated more genuine when attributed to a human. The gap disappeared for cognitive empathy. Secondary, via press and a Harvard summary. — [Harvard D3](https://d3.harvard.edu/?p=28946); [Neuroscience News](https://neurosciencenews.com/ai-human-empathy-psychology-29372/)
- **[Empirical]** A related study found recipients felt more heard by AI responses, but felt less heard once told the message came from AI. — [Neuroscience News](https://neurosciencenews.com/ai-empathy-25911/)
- **[Empirical]** Jin, Walker and Reczek (Journal of Consumer Psychology, 2024): humanlike design reduced the embarrassment advantage of chatbots. Participants engaged less with a chatbot with a cartoon human avatar and emotional language than with a plain chatbot, though both were identified as bots. — [EurekAlert](https://www.eurekalert.org/news-releases/1044241)
- **[Survey]** Serasa with Opinion Box (released late 2025): 84% said money problems had affected their mental health and 49% reported anxiety. Commercial survey, secondary. — [Diário do Nordeste](https://diariodonordeste.verdesmares.com.br/ser-saude/inadimplencia-recorde-amplia-riscos-a-saude-mental-dos-brasileiros-1.3782996)
- **[Practitioner]** NN/g warns about sycophancy, noting users sometimes prefer false agreeable answers to true ones. — [NN/g](https://www.nngroup.com/articles/sycophancy-generative-ai-chatbots/)

### Inferences
- Use cognitive empathy: "faz sentido isso pesar, é muita conta para encaixar", then name the specific constraint, then the next step. Avoid "eu entendo como você se sente", which the Rubin finding suggests will land worse from a bot.
- Tension for the João character: the design system personifies João (a bird), while Jin et al. suggest humanlike cues and emotional language weaken the embarrassment advantage. A non-human mascot is not the same as a human avatar, so this needs testing. Keeping the mascot while avoiding human-feeling claims is a reasonable default.
- Normalise before asking: "muita gente chega aqui com nome negativado" before asking about restrictions, and let people give ranges rather than exact figures. This is my inference from the shame-avoidance mechanism and is untested.
- Never use numbers to judge. Present a gap as a distance with a route, not a verdict ("faltam R$ X por mês para essa faixa", not "sua renda é insuficiente").
- Kindness must not become sycophancy. João should remain clear that a figure does not fit, in a respectful way. Bad news delivered gently is the goal; softened news that misleads is the Moffatt risk.
- Pacing: one question at a time and one number at a time is a reasonable default given anxiety, but this rests on general UX principles, not on evidence found here.

### Gaps
- I found no experiment on shame-reducing wording in chatbots or in Portuguese.
- I found no controlled evidence on pacing, reply length or delay in anxious financial conversations.
- Survey figures on shame seen in search summaries could not be traced to a specific page, so they are excluded as citations: Serasa/Opinion Box Aug 2025 (shame 22% as the top feeling linked to debt), Creditas/Opinion Box 2025 (73% of indebted people prefer to handle debts alone), Serasa 2022 (51% ashamed of themselves). Verify against the originals before use.

## Do users disclose more or less to a bot than to a human on sensitive money topics?

### Takeaway
Evidence suggests less embarrassment with bots, but no study I found directly measures actual debt or income disclosure to a bot versus a human. Bots appear to help with embarrassment and hurt trust in high-stakes conversations. Treat "people tell bots more" as a hypothesis for money.

### Cited Findings
- **[Empirical]** Jin et al. (2024): in Study 1 (N=386), 81% chose the chatbot store for an embarrassing medicine, while 91% chose the human store for hay fever medication. In Study 3, 62% gave their email for a sample to a perceived chatbot versus 38% to a human. The authors attribute this to perceiving bots as less able to feel or judge. These are products, not finance. — [EurekAlert](https://www.eurekalert.org/news-releases/1044241)
- **[Empirical]** Buckley et al. (2021 conference paper, older than the window): participants reported being equally comfortable making financial disclosures to a chatbot as to a human. This is stated comfort, not behaviour. — [Cranfield repository](https://dspace.lib.cranfield.ac.uk/items/cd941efe-3e5b-4cef-9aea-4789720cbb4b)
- **[Empirical]** Mozafari et al. (2021): in critical conversations such as financial ones, learning it was a chatbot weakened trust. Secondary. — [AccountsRecovery](https://www.accountsrecovery.net/2021/07/23/i-type-therefore-i-am/)
- **[Vendor, weak]** A contact-centre vendor blog cites a Grant Thornton analysis drawing on UK FCA work: 58% of vulnerable customers do not disclose circumstances to their provider, most often from embarrassment or fear of judgment. Not verified at source. — [Sabio](https://sabiogroup.com/blog/why-people-tell-ai-about-their-debt-but-not-you/)
- **[Practitioner]** The collections industry widely holds that debtors prefer digital channels because of embarrassment. This is an assumption, not a tested finding. — [AccountsRecovery](https://www.accountsrecovery.net/?p=219962)

### Inferences
- João can reasonably expect some disclosure benefit, mainly for shame-loaded facts such as negative credit or irregular income. It should not rely on it.
- Ask only for what the simulation needs, explain why just before asking, and say what happens to the data. This serves LGPD necessity as well as trust.
- Measure this directly: compare field completion and drop-off for income and debt questions by wording variant. See the measurement section.

### Gaps
- No study found comparing actual disclosure of debt or income to a bot versus a human, and none in Brazil.
- A study seen in search results reporting higher AI disclosure, shifting toward humans when social support is sought or dissemination is a risk, could not be retrieved (the page returned 404), so it is excluded as a citation.

## Real failures and lessons: incidents, Woebot/Wysa evidence, studies of AI financial advice

### Takeaway
Most incidents share a pattern: an unconstrained generator in a role that needed constrained, verified answers, combined with no owner watching production. Mental-health bots show promising but fragile evidence, and AI financial answers are often incomplete in ways lay users cannot see.

### Cited Findings
**Moffatt v. Air Canada (2024 BCCRT 149)**
- **[Legal]** The tribunal rejected the "separate legal entity" argument as "a remarkable submission", saying "It makes no difference whether the information comes from a static page or a chatbot", and asked why customers "should have to double-check information found in one part of its website." — [McCarthy Tétrault](https://www.mccarthy.ca/en/insights/blogs/techlex/moffatt-v-air-canada-misrepresentation-ai-chatbot)
- **[Legal, secondary]** Air Canada argued that the correct information was hyperlinked in the chatbot's response. The argument failed; one firm reads this as meaning a wrong answer paired with a link to current policy "may not be enough to circumvent liability." — [WeirFoulds](https://www.weirfoulds.com/moffatt-v-air-canada-bot-betrayal-and-negligent-misrepresentation)
- **[Legal, secondary]** Reported damages were $650.88 plus $36.14 interest and $125 in fees. I read the ruling through summaries, not the full text. Air Canada apparently did not rely on a disclaimer, so the case does not test whether one would have worked. — [amounts taken from law-firm summaries seen in search; verify on CanLII](https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html); [McCarthy Tétrault](https://www.mccarthy.ca/en/insights/blogs/techlex/moffatt-v-air-canada-misrepresentation-ai-chatbot)

**Klarna**
- **[Reporting]** In May 2025 the CEO said AI was cheaper but produced "lower quality", and Klarna began hiring human agents again in an Uber-style remote model, while saying it remains AI-first. Headcount and "700 roles" figures vary across reports, and I did not verify them. — [Entrepreneur](https://www.entrepreneur.com/business-news/klarna-ceo-reverses-course-by-hiring-more-humans-not-ai/491396); [Tech.co](https://tech.co/news/klarna-reverses-ai-overhaul)

**NEDA Tessa**
- **[Reporting]** Tessa was tested as a rule-based closed system ("By design it, it couldn't go off the rails", in the words of its co-creator). Vendor Cass added generative AI in 2022 as a "systems upgrade". NEDA says it was not told; Cass says the change was within contract. In May 2023 the bot gave weight-loss and calorie-deficit advice to a person with eating-disorder concerns and was taken offline. — [NPR](https://www.npr.org/2023/06/08/1180838096/eating-disorders-hotline-chatbot-tessa-disabled); [Futurism](https://futurism.com/backstory-eating-disorder-bot-stupid)
- **[Reporting, secondary]** Coverage says the bot's timing drew scrutiny as the human helpline was wound down after staff unionised, and that NEDA's CEO blamed "bad actors", a claim outsiders could not verify. Taken from a search summary of several outlets, not traced to one article. — [Fortune](https://fortune.com/well/2023/05/31/neda-ai-chatbot-harmful-advice); [Global News](https://globalnews.ca/news/9739041/eating-disorder-chatbot-neda-tessa-diet-tips)

**NYC MyCity**
- **[Reporting]** The Markup found the official city bot said employers could take tips and businesses could refuse cash; ten staffers asking about housing vouchers were all told landlords need not accept them. The city kept it online and added disclaimers. In January 2026 Mayor Mamdani planned to end it, calling it "unusable". — [The Markup 2024](https://themarkup.org/news/2024/03/29/nycs-ai-chatbot-tells-businesses-to-break-the-law); [The Markup 2026](https://themarkup.org/artificial-intelligence/2026/01/30/mamdani-to-kill-the-nyc-ai-chatbot-we-caught-telling-businesses-to-break-the-law)

**DPD and Chevrolet of Watsonville**
- **[Reporting]** DPD disabled part of its chat AI in January 2024 after a customer got it to swear and write a poem criticising the firm; one report attributes this to an error after a system update. — [The Register](https://www.theregister.com/2024/01/23/dpd_chatbot_goes_rogue)
- **[Reporting, weaker sourcing]** A user got a Fullpath ChatGPT-based dealership bot to agree to sell a 2024 Tahoe for $1, with a "legally binding" phrase, and the dealer pulled it. Nobody appears to have enforced it. — [Vibe Graveyard](https://vibegraveyard.ai/story/chevy-watsonville-chatbot-one-dollar-car/)

**Woebot, Wysa and other mental-health bots**
- **[Reporting]** Woebot retired its consumer app on 30 June 2025. Its founder largely attributed this to the cost and challenge of FDA marketing authorisation requirements. Not a clinical failure, per leadership; this is the company's framing. — [STAT](https://www.statnews.com/2025/07/02/woebot-mental-health-chatbot-shuts-down-founder-says-ai-moving-faster-than-regulators/)
- **[Empirical]** Li et al. (npj Digital Medicine 2023; 15 RCTs in meta-analysis): depression g=0.64 (CI 0.17–1.12), distress g=0.70 (CI 0.18–1.22), no significant improvement in well-being (g=0.32). Wide intervals. — [PubMed](https://pubmed.ncbi.nlm.nih.gov/38114588/)
- **[Empirical, secondary]** Therabot (NEJM AI, March 2025; N=210, 4 weeks versus waitlist) reported a 51% reduction in depression symptoms and 31% in anxiety. Outside researchers cautioned that this does not establish readiness for wide use. The comparison was a waitlist, not an active control. — [MIT Technology Review](https://www.technologyreview.com/2025/03/28/1114001/the-first-trial-of-generative-ai-therapy-shows-it-might-help-with-depression/)
- **[Vendor]** Wysa received FDA Breakthrough Device Designation in May 2022, which is not marketing authorisation. Its trial claims come from company materials; I found no independent review. — [BusinessWire](https://www.businesswire.com/news/home/20220512005084/en); [Healio](https://cm.healio.com/news/psychiatry/20220513/fda-designates-aibased-therapy-for-pain-depression-anxiety-as-breakthrough-device)

**AI financial advice**
- **[Empirical, secondary]** University of Illinois Springfield study (Journal of Risk and Financial Management): ChatGPT advice often lacked a prioritised plan and key counselling elements, and contained basic maths errors in retirement calculations, though it could be a starting point. — [UIS](https://www.uis.edu/news/study-uis-finance-professors-examines-chatgpts-ability-provide-financial-advice)
- **[Vendor-adjacent test]** Investing in the Web had experts review 100 finance questions: 65% correct, 29% incomplete or misleading, 6% wrong. — [The Intermediary](https://theintermediary.co.uk/2025/01/chatgpt-gave-incorrect-answers-to-35-of-finance-questions-research-finds/)
- **[Vendor survey]** Pearl.com (2025, N=2,000 US adults): 19% said they lost over $100 following chatbot financial advice. Self-reported, from a company selling human expert answers. — [PBS/The Conversation](https://www.pbs.org/newshour/economy/when-managing-your-money-take-a-chatbots-confidence-with-a-grain-of-salt)

### Inferences
- **Tessa is the closest analogue to João's risk:** the validated version and the deployed version diverged silently. Any change of model, prompt or knowledge base should re-run the eval set before release, and a provider's model update should count as a change.
- **Air Canada, NYC and João:** consistency with the site is the safeguard. If the bot and a page disagree, the operator owns both statements. João's page-only citation policy helps only if pages themselves are current, so stale pages become a safety issue.
- **Adding a disclaimer after the fact did not fix NYC's bot**, and it stayed criticised. Fix accuracy first.
- **DPD and Chevrolet:** prompt injection is reputational even when no money moves. João's pre-send validation should cover role-breaking, price or approval commitments, and off-topic content. Screenshots are the damage.
- **Klarna:** cost savings can mask quality decline until later. João has no labour to save, so its risk is unobserved error, not over-automation.
- **Woebot:** rule-bound, validated content may be sound and still costly. The therapy-bot evidence does not license João to do emotional support; it should acknowledge and refer on.
- A maths error is the failure most under João's control, and validating numbers deterministically outside the model addresses a documented weakness.

### Gaps
- I did not read Moffatt's full text, and the amounts rest on secondary summaries.
- I found no reliable data on Klarna's post-reversal quality metrics.
- The Therabot and UIS papers were not read directly.
- No documented incident of an AI home-finance or mortgage-education agent was found, in Brazil or elsewhere.

## Measurement: what metrics go beyond deflection? How are eval sets and transcript reviews run?

### Takeaway
Deflection counts silence, not success. Practice is moving toward verified resolution, repeat contact and human error analysis, but this literature is mostly vendor and practitioner material. For João the most valuable metrics are user comprehension and verified correctness, which public benchmarks do not cover.

### Cited Findings
- **[Vendor]** Deflection counts conversations that never reached a human; high deflection may hide dissatisfaction. Resolution is the share where the underlying issue was solved end to end. High deflection with low resolution suggests people return via other channels. — [Fin](https://fin.ai/glossary/deflection-rate); [Lorikeet](https://www.lorikeetcx.ai/articles/resolution-rate-vs-deflection-rate-ai-support); [Zendesk](https://www.zendesk.com/th/blog/ai/workflow-automation/ticket-deflection-vs-resolution/)
- **[Vendor]** Vendors suggest verifying resolution via completed actions, repeat contact, feedback and conversation review. Benchmark figures such as "65–70% resolution" are vendor assertions without independent support, and should not be used as targets. — [Chatbase](https://www.chatbase.co/blog/deflection-vs-resolution)
- **[Practitioner]** Husain's error analysis: a single domain expert (a "benevolent dictator") reviews sampled traces, writing open notes (open coding); notes are grouped into a failure taxonomy and counted (axial coding); this decides which evals to write. Start with random sampling; synthetic data is acceptable before real traffic; LLMs may help categorise, but humans must validate. — [Hamel Husain](https://hamel.dev/blog/posts/evals-faq/why-is-error-analysis-so-important-in-llm-evals-and-how-is-it-performed.html)
- **[Practitioner]** LLM judges suit subjective issues such as tone or handoff quality, but require validation against humans. — [Lenny's Newsletter](https://www.lennysnewsletter.com/p/building-eval-systems-that-improve)
- **[Empirical]** Bean et al.: standard benchmarks did not predict real-user failure, and the authors call for systematic testing with human users. — [OII](https://www.oii.ox.ac.uk/?p=410415)
- **[Reporting]** The Markup's method is itself an eval template: repeat the same question across testers, since the NYC bot's answers varied and it answered one question correctly once and incorrectly ten times. — [The Markup](https://themarkup.org/news/2024/03/29/nycs-ai-chatbot-tells-businesses-to-break-the-law)

### Inferences
Proposed scorecard for João. This is my synthesis, not an established standard:
- **Verified correctness:** share of sampled replies whose every number and claim is backed by the cited page, scored by human review.
- **Validator block rate:** how often the pre-send check rejects a draft, by reason. A spike signals drift.
- **Honest "não sei" rate and gap log:** questions João could not answer, clustered into content to write. Track whether the gap closes.
- **False refusal rate:** questions João refused though the site had the answer. Over-refusal is a failure too, and is invisible to safety-only metrics.
- **Abandonment at sensitive questions:** drop-off right after asking income, debts or negative credit, compared across wording.
- **Comprehension check:** an optional teach-back ("o que você levaria dessa conversa?"), or a single quiz item. This is the direct response to Bean et al.
- **Return rate and next action:** return visits, simulator completion and advance to the next step. Treat as a proxy, since a user may leave because they are finished or because they gave up.
- **Promise-language incidents:** any occurrence of approval or guarantee phrasing. Target zero, reviewed individually.
- **Red-team and critical cases:** crisis messages, injection attempts, requests for specific bank choice, and approval questions. Every one must pass, regardless of the average score.

Suggested process:
- Before launch, one reviewer (Bruno) reads roughly 100 synthetic or test transcripts and builds the taxonomy. After launch, read a random weekly sample plus 100% of flagged conversations.
- Each failure class becomes a regression case, and the full set re-runs on any change to prompt, model or knowledge base.
- Test each critical question several times and in several phrasings, including vague, misspelled and informal Brazilian Portuguese, since Bean locates the failure in the user interaction, not in model knowledge.
- Transcript review needs a retention period and anonymisation under LGPD.

### Gaps
- I found no peer-reviewed standard for "verified resolution", and no independent benchmark for agents in finance.
- I found no reliable source on eval-set size, inter-rater agreement or sampling rates for consumer finance agents.
- The roughly 100-transcript figure above is my rule-of-thumb starting point, not a sourced number.

## Regulatory expectations: Brazil (LGPD, Banco Central, Senacon, CDC) and the education versus advice line

### Takeaway
Brazil has no AI-specific law in force as far as I could confirm, but the CDC already binds what a supplier communicates, and the new SAC decree (Oct 2026) explicitly allows AI only if the right to a human is preserved, within its scope. The education/advice line depends on substance, not on labels. João's scope under each rule needs a lawyer's confirmation.

### Cited Findings
**CDC (Lei 8.078/1990)**
- **[Legal]** Art. 6, III grants clear and adequate information; Art. 30 makes sufficiently precise information binding on the supplier; Art. 31 requires offers to be correct, clear, precise and prominent; Art. 37 bans misleading advertising, including by omission. — [Planalto](https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm)
- **[Legal]** Superendividamento provisions: Art. 54-B requires total effective cost and charges disclosed at the offer; Art. 54-C II bans suggesting credit can be granted without checking credit databases or assessing the consumer's finances; Art. 54-C III bans obscuring costs and risks; Art. 54-C IV bans pressuring vulnerable consumers; Art. 54-D requires explaining costs and default consequences. These bind a supplier or intermediary of credit. — [Planalto](https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm)

**SAC decree**
- **[Legal, secondary]** Decreto 13.135/2026 was published on 13 Oct 2026 and takes effect 20 days later (around 2 Nov), revoking Decreto 11.034/2022. It allows AI for triage and resolution "desde que preservado o direito ao atendimento humano". Human service runs 8h–20h, including electronic channels. It expressly covers digital financial, payment and credit providers supervised by the Banco Central, adds record-keeping duties, and limits menus. Summarised from a law firm article, not from the text. — [Cescon Barrieu](https://cesconbarrieu.com.br/novo-decreto-do-sac-novas-regras-entram-em-vigor-em-20-dias/); [O Liberal](https://www.oliberal.com/para/novo-decreto-garante-atendimento-humano-no-sac-a-partir-de-2-de-novembro-1.1188620)
- **[Legal, secondary]** The scope is providers regulated by the federal Executive, so a purely educational site may fall outside it, though this was not confirmed. — [Cescon Barrieu](https://cesconbarrieu.com.br/novo-decreto-do-sac-novas-regras-entram-em-vigor-em-20-dias/)

**LGPD**
- **[Legal, secondary]** Art. 20 gives a right to request review of decisions based solely on automated processing that affect one's interests, including profiling. Congress upheld the veto, so that review need not be by a human. — [Serpro](https://serpro.gov.br/lgpd/noticias/2019/congresso-aprecia-veto-ao-artigo-20-da-lgpd)
- **[Regulator]** ANPD ran a consultation on AI and review of automated decisions (Nov 2024–Jan 2025, 124 contributions). I found no final rule. — [Participa + Brasil](https://www.gov.br/participamaisbrasil/tomada-de-subsidios-inteligencia-artificial-e-revisao-de-decisoes-automatizadas); [Compliasset](https://www.compliasset.com/alerta/anpd-publica-resultados-da-tomada-de-subsidios-sobre-ia-e-revisao-de-decisoes-automatizadas/)

**Banco Central and PL 2338**
- **[Reporting]** BC placed AI risks on its 2025/2026 priorities agenda and said in Sept 2025 that it did not plan AI-specific rules before the end of 2026, treating the matter mainly from a prudential angle. — [Revista Oeste](https://www.revistaoeste.com/economia/banco-central-planeja-regulamentacao-gradual-da-ia-no-setor-financeiro/); [Convergência Digital](https://convergenciadigital.com.br/governo/inteligencia-artificial-criptoativos-e-tokenizacao-no-foco-do-banco-central)
- **[Reporting]** PL 2338/2023 passed the Senate in December 2024. By mid-2026 it remained in a Chamber special committee awaiting a report. The most recent status I found dates from July 2026. — [Congresso Nacional](https://www.congressonacional.leg.br/web/atividade/materias/-/materia/157233); [Teletime](https://teletime.com.br/16/12/2025/pl-de-inteligencia-artificial-fica-para-fevereiro-de-2026/)

**Education versus advice**
- **[Regulator, secondary]** CVM does not regulate financial education limited to general guidance. Yet phrases like "não é recomendação" are not enough if the substance amounts to securities analysis. Consultancy means orienting, recommending or advising on investments professionally and requires CVM registration. — [Seu Dinheiro](https://www.seudinheiro.com/2020/economia/cvm-esclarece-em-que-casos-e-preciso-ter-registro-de-analista-para-postar-sobre-investimentos-nas-redes-sociais); [gov.br Investidor](https://www.gov.br/investidor/pt-br/investir/como-investir/profissionais-do-mercado/consultor-de-valores-mobiliarios)
- **[Legal]** Home finance itself is governed by CMN Resolution 4.676/2018 and later changes such as 5.197/2024; correspondents are governed by CMN Resolution 4.935/2021. — [BCB norm](https://normativos.bcb.gov.br/Lists/Normativos/Attachments/50628/Res_4676_v12_P.pdf); [IRIB](https://www.irib.org.br/noticias/detalhes/resolucao-cmn-n-5-119-de-1o-de-fevereiro-de-2024)

**International reference**
- **[Regulator, secondary]** CFPB (2023): chatbots must comply with consumer finance law and firms may be liable. It treats wrong answers, missed rights requests and blocked human access as compliance risks. — [CFPB](https://www.consumerfinance.gov/data-research/research-reports/chatbots-in-consumer-finance/chatbots-in-consumer-finance/)
- **[Regulator, secondary]** The UK's "targeted support" regime sits between guidance and personal advice, allowing authorised firms to give ready-made suggestions to groups with common characteristics. An FCA director reportedly called the AI line "blurry". Trade body TISA is pressing for clear warnings. — [Browne Jacobson](https://www.brownejacobson.com/insights/the-word-september-2026/chatgpt-and-fca-regulation); [Aveni](https://aveni.ai/glossary/targeted-support/)

### Inferences
- **The label does not decide.** By analogy from CVM and FCA, João's status turns on what it says. Group-level, conditional statements ("quem tem esse perfil costuma...", "bancos costumam olhar...") are safer than individual directives ("escolha o banco X", "feche esse imóvel"). This is an analogy: CVM covers securities, not home credit.
- **Art. 30 risk:** a simulator figure stated precisely, without conditions, may be read as binding or misleading if the business is treated as a supplier or intermediary. Always label results as estimates, showing date, assumptions and what could change them. Show effective cost where possible.
- **Art. 54-C II and João:** never promising approval fits the statute directly. Also avoid implied versions, such as "fácil", "garantido", "com certeza aprova".
- **Vulnerability:** Art. 54-C IV reinforces no urgency or pressure. It maps to no fake scarcity in João's flows.
- **SAC and no human team:** João is probably outside the decree today, but this could change if Primeira Chave becomes a correspondent, a lead intermediary for regulated parties, or otherwise supervised. Check before adding those roles. The commit log shows the site already routes property leads to WhatsApp, so this should be reviewed now.
- **Disclosure that João is an AI:** I found no Brazilian rule in force requiring it in general, but it is honest, and the Mozafari finding suggests a forgiveness benefit at failure. Say it at the start.
- **LGPD:** data minimisation, purpose statement before collection, transcript retention limits, and care with income and debt data. If João ever classifies users (for example a "readiness score" that affects what they see or lead routing), Art. 20 becomes relevant.

### Gaps
- I did not read Decreto 13.135/2026 itself. Whether it requires disclosure of automated service was not stated in the source. Read the official text before relying on it.
- I found no Senacon position, Brazilian court ruling or Procon action specifically on chatbots and wrong information. No Brazilian analogue to Moffatt was found, and applying CDC Art. 30 to chatbot statements is my reading, not an established holding.
- I found no BC or CMN rule on property-finance simulators from third parties, and no source settling whether a home-finance educator crosses into correspondent activity.
- CVM rules cover securities. I found no Brazilian regulator statement drawing an education/advice line for credit or home finance.
- CFPB report status: I did not check whether it has been withdrawn or revised since 2023; the page was still accessible.
- PL 2338's current status after July 2026 and its treatment of credit as high risk could not be confirmed.
- All legal content here is research input, not legal opinion. Counsel should review it before launch.
