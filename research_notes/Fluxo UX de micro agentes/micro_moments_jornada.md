# Micro moments, progressive data collection and retention across long multi-step journeys (with agents)

Evidence labels used throughout:
- **[E-field]** randomised field evidence
- **[E-lab]** lab or online experiment, or small study
- **[E-meta]** meta-analysis
- **[Obs]** observational or company-reported metric, not causal
- **[Vendor]** vendor marketing or vendor benchmark
- **[Opinion]** framework, commentary or practitioner opinion

Reading depth is flagged where only an abstract or search excerpt was seen. Scope assumption for inferences: João is free and educational, has an 11-step timeline, no account, a private save link, no document collection and no credit approval.

**Calibration rule for the whole file.** The best available discount factor comes from [DellaVigna and Linos](https://nber.org/papers/w27594). Academic-journal nudges average +8.7 percentage points, while the same kind of nudge run at scale by nudge units averages +1.4 points. Read every small classic study below with that shrinkage in mind.

## What are micro moments in practice (Google's framework and later critique), and how do they map to in-app and in-chat moments such as first number, first save, first fear and first milestone?

### Takeaway
"Micro-moments" is an advertiser-facing descriptive framework backed by Google/Ipsos survey statistics. It is not a tested behavioural theory. Google's own later "messy middle" work moves away from any linear reading. It is useful as a design vocabulary (a need arises, it gets met quickly), but no evidence shows that designing around these moments raises completion of a long journey.

### Cited Findings
- **[Opinion/Vendor]** Google defined micro-moments as intent-driven moments of decision-making in which people turn to a device, usually a smartphone, to act on a need to know, go, do or buy. Published 23 April 2015 by Sridhar Ramaswamy, then SVP of Ads and Commerce, so the author was the ads business lead — [Think with Google](https://business.google.com/uk/think/marketing-strategies/how-micromoments-are-changing-rules/)
- **[Vendor, self-report]** Supporting stats: 91% of smartphone users look things up mid-task; 82% consult phones while deciding in store; 69% of online consumers say message quality, timing or relevance influences brand perception (Google/Ipsos 2015). The page gives no sample size, fieldwork or selection method — [Think with Google](https://business.google.com/uk/think/marketing-strategies/how-micromoments-are-changing-rules/)
- **[Opinion]** The results of a search for critique were dominated by agency and vendor explainers, and I found no independent empirical test. The "150 moments a day" figure circulates in secondary sources attributed to Google, unverified — [Smart Insights](https://www.smartinsights.com/digital-marketing-platforms/google-marketing/google-micro-moments/); [cultural critique, The Billfold](https://www.thebillfold.com/2017/06/life-is-made-of-moments-in-which-you-buy-things/)
- **[Vendor/Opinion]** Google's 2020 "messy middle" report describes the space between a trigger and a purchase as non-linear, with looping exploration and evaluation. "Replaces the funnel" is the language of marketing blogs, not confirmed Google wording, and I did not read the 98-page PDF — [Google report PDF](https://thinkwithgoogle.com/_qs/documents/9998/Decoding_Decisions_The_Messy_Middle_of_Purchase_Behavior.pdf); [Search Engine Journal commentary](https://www.searchenginejournal.com/seo-messy-middle-purchase-journey/390575/); [Marketing Week counterpoint: the funnel is a useful simplification](https://www.marketingweek.com/the-funnel-isnt-really-a-funnel-at-all-but-seeing-it-as-one-makes-it-easier-to-manage/)

### Inferences
- Treat "first number, first save, first fear, first milestone" as a João-specific design hypothesis. They do not derive from Google's four types, and no study validates this taxonomy. Proposed mapping:
  - **First number** is a know moment (a simulation output). Closest evidence: the "value before ask" logic in the progressive profiling section, itself weak.
  - **First save** is a commitment moment. Closest evidence: Ovsiankina resumption, plus the need for a return path. Without a saved link, a return is impossible regardless of motivation.
  - **First fear** (for example the size of the parcela, or of the dívida) is a dropout-risk moment with no direct literature found. The best analogue is the proactive-agent evidence that context before advice matters. This is a design hypothesis and should be measured.
  - **First milestone** is a goal-gradient moment, closest to Kivetz-type evidence.
- The messy-middle looping fits an 11-step journey better than the funnel. People will re-open earlier steps, so the timeline should allow revisiting and should not read as a strict one-way march.

### Gaps
- No peer-reviewed evaluation of the micro-moments framework was found. No study was found on "first fear" or anxiety-triggered drop-off in homebuying tools.

## Progressive profiling: how do products collect data gradually, what triggers each question, and what evidence exists on completion and trust?

### Takeaway
Nearly all claims about progressive profiling come from vendors. The peer-reviewed literature addresses adjacent questions (question order, repeated requests), and it is mixed. It also carries an ethical warning: incremental asking may raise disclosure without raising comfort.

### Cited Findings
- **[Vendor]** Common pattern: collect data gradually across touchpoints, asking later questions after value has been delivered, and asking when the user is about to receive something they care about. These sources claim higher completion and accuracy, but none reports a controlled test — [Koji guide](https://www.koji.so/docs/progressive-profiling-guide); [Orbit Forms](https://orbitforms.ai/blog/progressive-profiling-explained); [Descope](https://descope.com/learn/post/progressive-profiling)
- **[Vendor]** Foot-in-the-door is asserted as the mechanism in marketing copy, not tested for forms — [Orbit Forms](https://orbitforms.ai/blog/progressive-form-fields)
- **[E-lab]** Acquisti, John and Loewenstein (2012): disclosure was higher when questions ran from most to least intrusive, lower from least to most, and also higher when people were told others had disclosed. This contradicts the "warm up with easy questions" advice — [JMR, listing of the paper](https://data.zhenzhi.com/details/1/886827157) (abstract level)
- **[E-lab, conflicting]** An IAREP 2022 paper reports the opposite direction, with ascending invasiveness producing higher actual disclosure. Order direction is unsettled — [IAREP 2022 paper](https://ktisis.cut.ac.cy/bitstream/20.500.14279/26872/1/IAREP%202022%20paper.pdf)
- **[E-lab]** Repeated personal data requests increased disclosure with no change in stated privacy concern, which the authors read as foot-in-the-door. A replication was run by the same team — [Tell me more, tell me more (UEA)](https://research-portal.uea.ac.uk/en/publications/tell-me-more-tell-me-more-repeated-personal-data-requests-increas/)
- **[E-lab]** In a clinical pre-consultation comparison (45 patients) of a chatbot, a questionnaire and a human wizard, the LLM agent was noticeably less proactive than the wizard at following up on unclear answers. Conversational collection is not automatically high quality — [CHI 2025](https://dl.acm.org/doi/full/10.1145/3706598.3713613)
- **[E-lab]** In-survey LLM chatbots ask follow-ups easily, but probes tend to be generic and fall short of human interviewers — [arXiv 2309.10187](https://arxiv.org/pdf/2309.10187)
- **[E-lab]** Added AI follow-ups between items could affect the validity of what is measured — [Behavior Research Methods 2026](https://link.springer.com/article/10.3758/s13428-026-03091-0)

### Inferences
- The defensible trigger rule is justification by immediate use: ask for a value only when the next output depends on it, and show why. This rests on logic and on data-minimisation principles rather than on effect sizes. It also fits João's no-documents stance.
- The UEA result is a warning. Rising disclosure with flat concern is not evidence of trust. João should track trust directly (a post-interaction check or "why are you asking?" taps), not treat answers given as trust.
- Do not cite "easy questions first" as proven. Income and debt ordering should be A/B tested with João's own users.

### Gaps
- No RCT found comparing progressive profiling with an upfront form on completion or trust. No conversational-agent reciprocity experiment was found.
- Knijnenburg and Kobsa (order changes raise early-item and lower late-item disclosure) and Moon (2000) surfaced only as second-hand mentions and were not verified.

## Progress UI: timelines, checklists, goal gradient, endowed progress and Zeigarnik. Which findings replicate, which are weak, and what do real products do?

### Takeaway
Ranking by evidence: (1) Zeigarnik memory claim, unsupported by a 2025 meta-analysis; (2) Ovsiankina resumption, supported, and the better framing for João; (3) progress bars, no average benefit, and honest fast-to-slow pacing is the only form that helps; (4) goal gradient and endowed progress, real original field evidence, small samples, and I found no preregistered direct replication either way. Treat effects as probably smaller than published.

### Cited Findings
**Goal gradient**
- **[E-field]** Kivetz, Urminsky and Zheng (2006): café members bought more often near the reward. Interpurchase time fell 20% (0.7 days) across the program, based on 949 completed cards. Purchases slowed again after a reward ("post-reward resetting"). Faster acceleration on the first reward predicted retention and faster reengagement, and defectors showed less of a goal gradient — [JMR PDF](https://business.columbia.edu/sites/default/files-efs/pubfiles/1200/goalgradient.pdf) (read directly)
- **[E-field, small]** Illusionary progress in the same paper: 108 café customers randomised to a 10-stamp card or a 12-stamp card with 2 pre-stamped. Means were 15.6 versus 12.7 days to finish 10 purchases, about 20% faster (t = 2.0, p < .05, a modest margin) — [JMR PDF](https://business.columbia.edu/sites/default/files-efs/pubfiles/1200/goalgradient.pdf)

**Endowed progress**
- **[E-field, small]** Nunes and Drèze (2006): 300 car-wash cards randomised. An 8-stamp card versus a 10-stamp card with 2 stamps already filled gave redemption of 19% versus 34% over nine months — [secondary summary](https://siliconcanals.com/t-car-wash-loyalty-cards-endowed-progress/). The original JCR paper was not opened and the numbers are secondary. Blog claims of "82%" do not match these figures.
- **Replication status.** A targeted search found no preregistered replication, failed or successful. Absence of a found replication is not confirmation. Do not state that the effect has failed or that it has replicated.

**Zeigarnik and Ovsiankina**
- **[E-meta]** Ghibellini and Meier (2025, Humanities and Social Sciences Communications): no memory advantage for unfinished tasks; a general tendency to resume them. Zeigarnik lacks universal validity and may depend on experimenter authority, demands and involvement — [abstract, RePEc](https://ideas.repec.org/a/pal/palcom/v12y2025i1d10.1057_s41599-025-05000-w.html) (effect sizes not accessed)

**Progress bars**
- **[E-meta]** Villar, Callegaro and Yang (2013, 32 randomised experiments, web surveys): a constant indicator did not significantly reduce drop-off overall, and raised it where a small incentive was promised. Fast-to-slow reduced drop-off; slow-to-fast raised it — [Google Research](https://research.google/pubs/where-am-i-a-meta-analysis-of-experiments-on-the-effects-of-progress-indicators-for-web-surveys/). A blog critique alleging coding errors surfaced in search but I did not verify it.

**Motivation shape**
- **[Secondary]** Bonezzi and colleagues (2011) on to-date versus to-go framing: to-date worked early and to-go worked late, with motivation lowest in the middle — [Goal pursuit overview](https://en.wikipedia.org/wiki/Goal_pursuit). Secondary source.

**Product examples (no causal evidence)**
- **[Vendor/Obs]** Checklists: average onboarding checklist completion is 19.2%, median 10.1%, across 188 Userpilot customers; FinTech and Insurance 24.5%. Userpilot notes users may get value without finishing — [Userpilot](https://userpilot.com/blog/?p=197841). Totango-style 40-60% figures appear to measure something different and were not verified.
- **[Obs/journalism]** TurboTax: a reported account says some progress indicators do not measure real progress — [The Billfold on The Atlantic](https://www.thebillfold.com/2017/02/the-progress-bars-in-turbotax-are-fake/). Intuit-side replies say the running refund meter is hidden by default until a review is run, because users made wrong assumptions about it, and users complained about the change — [TurboTax community](https://ttlc.intuit.com/community/taxes/discussion/please-bring-back-the-running-total-refund-tax-due-at-the-top-of-the-screen/00/3276283). This is a useful analogy for a live number that can mislead.
- **[Vendor]** Mortgage: Blend-powered portals advertise applying and tracking progress across devices — [MortgageOrb](https://mortgageorb.com/guardian-mortgage-partnering-with-blend-to-launch-digital-mortgage-experience). Blend reports a 13% higher pull-through for NRL Mortgage versus another platform, not attributable to progress UI — [Blend case study](https://blend.com/?p=34219). Rocket Logic AI begins when the client uploads a first document to the portal — [Investing.com on Rocket](https://m.uk.investing.com/news/stock-market-news/rocket-companies-introduces-rocket-logic-ai-platform-to-make-homeownership-faster-and-easier-93CH-3424962).
- **[E-field]** Health and pregnancy: Text4baby timed messages to due date or birth date. A randomised pilot reported participants nearly three times more likely to feel prepared for motherhood — [Fierce Healthcare](https://www.fiercehealthcare.com/mobile/study-text4baby-effectively-helps-new-moms-behavior-change). A later RCT found effects concentrated at high exposure on one self-reported outcome (postpartum alcohol) — [PubMed](https://www.pubmed.gov/23181985/). Authors say optimal timing, dose and interactivity remain unknown — [BMC Public Health](https://link.springer.com/doi/10.1186/1471-2458-12-1031).

### Inferences
- For João, "you left this open, resume here" (Ovsiankina) is better grounded than "unfinished tasks nag at you" (Zeigarnik). Copy should invite resumption and should not create tension.
- Reward-card findings involve a concrete prize, whereas João's reward is a real future purchase months away. Transfer to an 11-step, weeks-to-months journey is untested. Use sub-goals so that a near-term proximal goal always exists.
- Post-reward reset and the middle-slump finding suggest the danger zone is just after each milestone and around steps 4 to 7. Pair each milestone with an immediate named next step. Consider framing progress as done-so-far early and as remaining late.
- Endowed progress should be honest in João. Pre-filling step 1 is defensible only if something real was done (for example, a first simulation). Fake progress in a financial education product conflicts with trust, and the 12-stamp card worked by a framing trick that does not suit this context.
- Villar implies that a percentage bar across a long journey will not help by itself, and could harm if slow early. An 11-step timeline with named steps, where the first steps are short, approximates fast-to-slow honestly.
- Checklist completion is a poor north star (median 10%, per one vendor). Track whether users reach value moments.

### Gaps
- No Rocket, Better or Nubank data found on progress-tracker effects on completion. No Intuit experiment found. Claims that Frost and Blend reached 80% completion could not be verified and should not be used.
- Koo and Fishbach (small-area hypothesis) and the labour illusion in tax software were not retrieved. Pregnancy-app retention curves (BabyCenter, MomConnect) and health-coaching dropout were not found.
- Effect sizes from Ghibellini and Meier, and the original Nunes and Drèze paper, were not read directly.

## Next-best-action and suggested follow-ups inside chat: how are they generated, and what do usage data show?

### Takeaway
Generation is usually simple: an LLM writes about three likely follow-ups after each turn, from conversation context. Public usage evidence is thin. The closest randomised data show decent trial, a real participation lift and a perceived-quality cost. Rocket's headline "3x" metric is strongly confounded by selection.

### Cited Findings
- **[Vendor/docs]** Microsoft Security Copilot generates 3 follow-ups after each response, and clicking runs one immediately — [Microsoft blog](https://techcommunity.microsoft.com/blog/securitycopilotblog/smarter-prompts-for-smarter-investigations-dynamic-prompt-suggestions-in-securit/4432135)
- **[Docs]** Open WebUI auto-generates follow-up chips, with a setting to insert or send on click — [Open WebUI docs](https://docs.openwebui.com/features/chat-conversations/chat-features/follow-up-prompts/)
- **[E-lab, randomised, adjacent]** Møller and colleagues: 680 US participants in simulated social media groups, comparing chat, conversation starters, feedback and suggestions. 71.7% (n=91) used starters at least once, and per-topic usage was 52-54%. Open-ended prompts were the top starter type (Questions 32.3%). Starters alone significantly raised the likelihood of receiving a reply and improved participation equality. Yet comments were rated less informative and lower quality, and starters were described as impersonal — [arXiv 2506.14295](https://arxiv.org/pdf/2506.14295) (read directly; published in [Scientific Reports](https://www.nature.com/articles/s41598-026-40110-8)). This is a social-media task, not an advisory agent.
- **[Survey of Bing work, Obs/experiment]** Template choice affected engagement on clarifying questions, and a low-quality question reduced engagement with later better ones in the same session — [arXiv 2407.11605](https://arxiv.org/pdf/2407.11605) (secondary)
- **[E-lab]** Users preferred documents produced after answering AI clarifying questions and felt the AI was more engaged — [arXiv 2407.12017](https://arxiv.org/pdf/2407.12017)
- **[E-lab]** Automated follow-up strategies in a 26-person study were readable and effective at elicitation, though human wizards used techniques the algorithms lacked — [CSCW 2024](https://dl.acm.org/doi/10.1145/3637320)
- **[Preprint, preliminary]** Metacognitive cues in GenAI search can prompt deeper follow-up questioning — [MetaCues, arXiv 2603.19634](https://arxiv.org/html/2603.19634v1)
- **[Obs, company-reported]** Rocket: clients who use chat convert 3x higher from first interaction to credit pull (Q3 2024) — [earnings call](https://allmind.ai/earnings/event/bt_RKT_2024_Q3). Chat-initiated clients convert 3x for purchase and 2.5x for refinance (Q2 2025) — [RISMedia](https://www.rismedia.com/2025/07/31/rocket-reports-strong-q2-results-touts-ai-results-and-redfin-acquisition). A Pathfinder AI chat test showed 69% faster resolution, an agent-facing metric — [Q3 2023 release](https://ir.rocketcompanies.com/news-and-events/press-releases/press-release-details/2023/Rocket-Companies-Announces-Third-Quarter-2023-Results/default.aspx)

### Inferences
- Rocket's 3x compares self-selected chat users with non-users, so motivated buyers probably opt in to chat. It should not be read as a causal effect, and it measures progress to a sale, which João does not have.
- Bing's spillover is the most actionable finding: one poor suggestion costs credibility for later ones. Showing fewer, state-based chips (one anchored in the timeline's next step, one on the fear just voiced) is likely better than always showing three.
- Møller suggests offering chips that are questions the person can tailor, and labelling them as suggestions.
- Next-best-action in João can be deterministic (the 11-step state picks the action), with the LLM phrasing it. This avoids overpromising and is testable. This is a design inference.

### Gaps
- No published click-through rate for suggestion chips in a production advisory chatbot was found. No controlled test of chips versus free text in financial education was found. ChatGPT and Perplexity usage data on follow-ups were not found.

## Returning users: memory, resume points, recap, re-engagement, notification fatigue and dormant weeks. What is the evidence on nudges by WhatsApp, SMS and email?

### Takeaway
Messages reliably create short bursts of action, but their long-term effect is small and often decays. Scale evidence puts nudges in the low single-digit points. Brazilian WhatsApp appointment evidence is mixed, with the larger trial null. The best-supported mechanics are specific reminders tied to the person's own goal, and recovery after a lapse.

### Cited Findings
**Size of the prize**
- **[E-field, 126 RCTs, 23M people]** Nudge units: +1.4 points (8.0%) versus +8.7 in journals. Selective publication explains most of the gap — [NBER](https://nber.org/papers/w27594); [Econometrica](https://www.econometricsociety.org/publications/econometrica/2022/01/01/rcts-scale-comprehensive-evidence-two-nudge-units)
- **[E-meta, disputed]** Mertens et al. pooled d of about 0.43; Maier et al. report no evidence after bias correction — [PNAS letter](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9351501/). Szászi et al. stress heterogeneity, not a uniform zero — [PNAS letter](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9351519/). The nudge-unit result is the fairer anchor: small but non-zero.
- **[E-field, megastudy]** Milkman et al.: 61,293 gym members, 54 four-week programs. 45% significantly raised visits by 9-27%, the top program rewarded returning after a missed workout, only 8% had detectable lasting effects, and forecasters failed to predict winners — [Nature abstract](https://ideas.repec.org/a/nat/nature/v600y2021i7889d10.1038_s41586-021-04128-4.html); [Stanford GSB](https://www.gsb.stanford.edu/faculty-research/publications/megastudies-improve-impact-applied-behavioural-science) (the persistence detail comes from press-level summary)

**SMS and financial goals**
- **[E-field]** Karlan et al.: savings reminders by SMS or letter in Bolivia, Peru and the Philippines raised savings 6% and goal attainment 3 points — [paper](https://poverty-action.org/sites/default/files/publications/getting-to-the-top-of-mind.pdf). Mentioning both goal and incentive was most effective, while gain or loss framing had no clear extra effect — [NBER w16205](https://www.nber.org/system/files/working_papers/w16205/w16205.pdf)
- **[E-field]** Personalised SMS to 2,819 underbanked users raised savings during the messaging period — [JEBO 2024](https://www.sciencedirect.com/science/article/abs/pii/S0167268124001409) (abstract level)

**Brazil and WhatsApp**
- **[E-field, null]** Vitória, Espírito Santo, 998 participants: WhatsApp reminders gave 24% versus 25.5% non-attendance (p = 0.58), judged not effective — [UFES thesis summary](https://sappg.ufes.br/tese_drupal//tese_14416_Doc%20Resumo%20Jon.pdf)
- **[E-field, small]** Curitiba, 78 children: reminders were associated with attendance, with WhatsApp specifically at p = 0.032, but no effect on treatment abandonment. The sample is small and convenience-based — [Rev Paul Pediatr 2020](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6958533/)
- **[Press report, unverified]** In Goiás full-time high schools, two weekly SMS for one month to students and parents, with subject-specific prompts, reportedly gave a 43.7% reduction in expected dropout. Engagement declined after messages stopped, and families initially hesitated to share phone numbers, fearing political use — [IstoÉ Dinheiro](https://istoedinheiro.com.br/como-evitar-a-evasao-chame-o-aluno-por-sms); [Folha Vitória](https://www.folhavitoria.com.br/geral/como-evitar-a-evasao-chame-o-aluno-por-sms/); [O Popular](https://opopular.com.br/cidades/smss-semanais-ajudaram-a-diminuir-evas-o-escolar-em-goias-1.2174447). The underlying paper was not located, so do not quote this as a study estimate.

**Notification fatigue**
- **[E-field, MRT]** Drink Less, 350 new users randomised daily: a notification raised next-hour app opening about 3.5-fold, but time to disengagement did not differ across arms. Moderation by habituation was exploratory — [JMIR mHealth 2023](https://mhealth.jmir.org/article/export/ris/mhealth_v11i1e38342); [preprint page](https://preprints.jmir.org/preprint/38342/submitted) (abstract level). This is the key split: notification effects are strong in the moment and weak for durable retention.
- **[Methods]** Habituation is treated as reduced responsiveness to frequent stimuli, and designs should keep push to the minimum needed — [arXiv 2107.03544](https://arxiv.org/pdf/2107.03544); [arXiv 2005.05880](https://arxiv.org/pdf/2005.05880)

**Long-horizon service**
- **[E-field]** HUD First-Time Homebuyer Demonstration: about 5,854 participants in 28 metro areas — [Abt slides](https://www.abtglobal.com/files/events/2020/appam-moulton-fthecd-nov-2020-for-hud.pdf). In-person take-up was very low and online or remote much higher — [HUD report](https://www.huduser.gov/PORTAL/sites/default/files/pdf/First-Time-Home-Buyers.pdf). HUD then changed the design to offer choice — [NHC](https://nhc.org/the-future-of-housing-counseling/). Those who preferred in-person started less often — [HUD baseline](https://huduser.gov/PORTAL/node/6801). Exact percentages were not retrieved. This is the closest population match found (first-time buyers), though in the US.

**Memory and recap**
- **[Secondary, vendor blogs]** ChatGPT references past chats, Gemini learns from past chats by default, and Claude's memory is optional. Blogs disagree on the details — [MemoryPlugin comparison](https://blog.memoryplugin.com/claude-vs-chatgpt-vs-gemini-memory/); [TechRadar](https://www.techradar.com/ai-platforms-assistants/claude/you-can-now-give-claude-access-to-memories-of-previous-conversations-but-only-if-you-want-to); [WWWhatsnew, Oct 2026](https://wwwhatsnew.com/2026/10/30/memoria-chatgpt-gemini-claude-ver-borrar-desactivar/)
- **[E-lab]** A 14-day proactive agent study: an LLM's false promises of remembering or reminding across days eroded trust — [PITCH, arXiv 2509.24073](https://arxiv.org/html/2509.24073v2)

**WhatsApp as a channel (platform rules)**
- **[Primary, Meta docs]** Templates can be sent at any time and are billed by category. Non-template replies are allowed only in the 24-hour customer service window, which resets on each user message. Each number gets 1,000 free service messages per month, and charging beyond that tier began 1 October 2026. Click-to-WhatsApp ad entries open a free window of up to 7 days — [Meta pricing docs](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing). Note that many vendor blogs still say service replies are always free.
- **[Vendor]** Brazil: about R$0.04-0.08 for utility and about R$0.38-0.39 for marketing per message — [MessageCentral](https://www.messagecentral.com/blog/whatsapp-business-api-pricing-brazil); [Hyperleap](https://hyperleap.ai/whatsapp-pricing-calculator-brazil)

### Inferences
- Plan for dormant weeks as normal, since the real journey has waiting periods. Base-case return plan: a resume screen with recap (where you stopped, the last number, the single next step). Treat the Milkman result on returning after a lapse as a pointer to no-shame recovery copy.
- Recaps should state only stored facts. PITCH shows that overclaiming memory or reminders damages trust, so João must never promise a reminder it cannot deliver.
- Message content: anchor to the person's stated goal and next step (Karlan). Expect burst effects (Drink Less), and do not expect messaging to carry retention. Forecast low single-digit lifts (DellaVigna and Linos).
- Vitória's null suggests WhatsApp is not a magic channel in Brazil. Reminders may fail where the barrier is not forgetting. For João, the likely barriers are fear and confusion, which argues for helpful content over bare pings.
- Prefer event-based messages (a step-linked milestone, a rule change) over a calendar drip. Offer a cadence the user selects.
- Goiás parents' reluctance over phone numbers is a local signal: asking for WhatsApp should come with an explicit purpose. Remote access preference in HUD supports digital-first.

### Gaps
- No RCT found comparing WhatsApp, SMS and email head to head in a long-horizon financial or housing journey. The SMS versus email trial at [PMC8976257](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8976257/) was blocked and not read.
- WhatsApp opt-in policy text and LGPD requirements were not verified from primary sources. One vendor mentions fines up to R$50 million, unconfirmed here.
- No retention curves for mortgage portals during dormant waits were found. Fresh-start effect replication status (Dai, Milkman and Riis) was not retrieved. Behavioural Insights Team material was not reached directly.

## Proactive versus reactive agents: where does proactivity help, and where does it annoy?

### Takeaway
Proactivity is accepted when it is relevant, timed well, easy to dismiss and honest about limits. Perceived interruption, not proactivity itself, predicts dislike. Evidence is mostly small-sample HCI, and "adaptive" does not automatically improve perceptions.

### Cited Findings
- **[E-lab, field deployment]** PITCH (Slack LLM agent, 12 graduate students, 14 weekdays, 336 conversations): 10 of 12 followed at least some suggestions; morning chats served as external memory. Problems were rigidity when users were ill or busy, generic advice, asking several questions at once, continuing through farewells and overpromising. 32.4% of sessions ended with the user's last message unanswered. Recommendations: flexible agendas, context before advice, wait for complete answers, and be clear about capabilities — [arXiv 2509.24073](https://arxiv.org/html/2509.24073v2)
- **[Field]** In an enterprise agent deployment, perceived interruption predicted opinions more strongly than proactive messages did, and aversion to proactivity could be inferred from behaviour — [What Can You Do? (ResearchGate)](https://www.researchgate.net/publication/303901411_What_Can_You_Do_Studying_Social-Agent_Orientation_and_Agent_Proactive_Interactions_with_an_Agent_for_Employees)
- **[E-lab]** Adaptive proactive speech (adjusting to urgency and difficulty) was rated worse than static proactivity as a dialogue partner, and less socially appropriate and consistent. This surprises the common assumption — [CUI 2024, Edwards et al.](https://arxiv.org/html/2405.07528)
- **[E-lab]** Inner Thoughts: participants were generally positive on likability and timing, but excess contributions disrupted flow — [arXiv 2501.00383](https://arxiv.org/pdf/2501.00383)
- **[E-lab, storyboards]** Proactive features were valued when clearly beneficial and contextual, with some discomfort about a persistent presence — [via arXiv 2505.09938](https://arxiv.org/pdf/2505.09938) (secondary citation)
- **[E-lab]** Proactive follow-up within a session can help: the LLM agent's weakness in a clinical comparison was being too passive when answers were unclear — [CHI 2025](https://dl.acm.org/doi/full/10.1145/3706598.3713613)

### Inferences
- Useful split: in-session proactivity (clarifying, flagging a misunderstanding, naming a risk the person did not ask about) is low risk and supported. Out-of-session proactivity (messages to someone who went quiet) is higher risk and needs opt-in, a user-chosen cadence and a one-tap stop.
- Educational duty favours specific interventions: João should volunteer a warning when numbers imply risk. This is consistent with evidence that clear benefit justifies proactivity, though it is untested in a homebuying context.
- Respect resistance: if the user says "not now", drop the topic. Ask one question at a time and let conversations end.
- Do not over-engineer adaptive timing early. Consistency may matter more (CUI 2024), and one small study should not decide this.

### Gaps
- All studies here are small, non-Brazilian and non-financial. No RCT was found on proactive versus reactive agents for long-horizon financial decisions, nor any on proactive disclosure of bad news.

## Save-and-return without accounts: magic links and shareable links, and their tradeoffs

### Takeaway
A private save link is a capability URL. W3C guidance is explicit that these should not be the default and carry a very high exposure risk, but they are acceptable for low-sensitivity, no-login contexts when they have high entropy, HTTPS, referrer control and revocation. The real tradeoff for João is durability versus leak exposure: a link that expires quickly protects data but breaks a months-long journey.

### Cited Findings
- **[Standards draft]** The W3C TAG Capability URLs document (First Public Working Draft, 2014, not expected to become a Recommendation): URLs leak via address bars, history, logs, Referer headers, third-party scripts, sync services, shorteners and crawlers. Misuse is hard to detect, and risk is called very high in browsers. Mitigations: HTTPS, unguessable IDs, time limits or single use, avoiding third-party links and scripts on the page, rel=noreferrer, multiple revocable URLs per resource, no side effects on GET, robots exclusion, optional replaceState, and telling users what the link allows — [W3C TAG](https://www.w3.org/TR/capability-urls/) (read directly)
- **[Security guidance]** Tokens in URLs can appear in history, logs and proxies, and may reach third parties by Referer. The standard recommendation is cookies for session tokens — [Probely](https://probely.com/vulnerabilities/session-token-in-url)
- **[Standards discussion]** Referrer-Policy and URL fragments reduce leakage, but OAuth guidance still advises against tokens in URLs — [IETF OAuth WG post](https://mailarchive.ietf.org/arch/msg/oauth/21EyuNOMR5epQy7e8oj_CsOsYF8/)
- **[Vendor]** Magic links move the risk to the mailbox and delivery path. Tokens can leak through previews, forwarding and security tools, and links can be passed along — [NHIMG](https://nhimg.org/articles/magic-link-authentication-shifts-risk-from-passwords-to-email-access/); [Manning preview](https://www.manning.com/preview/software-security-for-developers/chapter-14); [WorkOS](https://workos.com/blog/a-guide-to-magic-links)
- **[Vendor, conflict of interest]** Critics of magic links sell alternatives — [OwnID](https://ownid.com/blog/the-rise-and-fall-of-magic-links); [Beyond Identity](https://beyondidentity.com/node/429). Most sources treat them as acceptable in lower-risk contexts — [NHIMG](https://nhimg.org/articles/magic-link-authentication-shifts-risk-from-passwords-to-email-access/)

### Inferences
- Three tiers for João:
  1. A long-lived private link in the URL, for low-risk state (steps done, a simulation). Keep the sensitive surface minimal, since income and debt values are personal data under LGPD even if there are no documents.
  2. On opening the link, swap the URL token for a same-origin cookie, removing it from the visible URL with replaceState (W3C notes this limits bookmarking, and the link's main job is bookmarking, so this needs care).
  3. Offer "send this link to myself" by WhatsApp or email as a user-initiated action, because it is the only way the link survives a change of device. Avoid the phrase "criar conta".
- Add third-party script hygiene on `/joao` private pages, since analytics and pixels are a named leak path in W3C guidance. Add a "generate a new link and disable this one" action, and a "delete my data" option.
- Warn in plain language: anyone with the link can see this, so do not post it in a family group unless intended. Shared links may be a feature, since buying a home is often a household decision. Consider a read-only share URL separate from the owner's link, which aligns with W3C's multiple-URLs advice.
- Rolling inactivity expiry (for example, renewed on each visit) seems preferable to a fixed short expiry for a months-long journey, but the time window is a judgement call.
- Do not put personal values in query parameters.

### Gaps
- No empirical data was found on return rates for accountless save links versus accounts, nor on how users understand that a private link equals access. OWASP's exact wording was not retrieved. No Brazilian guidance from ANPD on link-based access to personal data was reviewed.
