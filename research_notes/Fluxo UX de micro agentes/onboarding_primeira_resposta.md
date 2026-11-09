# Onboarding and the first response in narrow-scope AI agents

Evidence labels used on every finding:

- **[EMPIRICAL]** a study with a described method and sample, peer reviewed or preprint.
- **[QUAL]** qualitative or observational research with a small sample (usability tests, diary studies).
- **[GUIDELINE]** published design guidance from a research or platform organization. It is reasoned opinion, not a test result.
- **[OPINION]** an individual practitioner or analyst.
- **[VENDOR]** a claim by the company selling the product, or its supplier. Self-reported.
- **[S]** added to any label when I saw the source only through a search snippet or search summary and did not open the full text. Confirm before quoting. For some [S] items the link is the best match among the search results.

Overall evidence quality: there is little direct, controlled evidence on first-session patterns for LLM agents. The strongest material is about adjacent questions (buttons versus free text, chat versus forms, suggested questions in field use). Almost all the numbers on activation and conversion are vendor-reported or anecdotal.

## How do well-regarded narrow agents explain what they can and cannot do on first contact?

### Takeaway
Guidance converges on a short statement of purpose, a few concrete tappable examples close to the input, and capability help delivered in context rather than as a tutorial. The best field evidence is ASHABot: tappable related questions made up 59.1% of questions asked by lower-literacy health workers.

### Cited Findings

Usability research

- **[QUAL]** NN/g study of 6 Chinese participants on 3 Chinese chatbots (3 with no AI experience, 3 with limited awareness). Low-AI-literacy users did not understand how the tools worked or what they could do, and felt confused when the tools assumed they knew. — [NN/g, New Users Need Support](https://www.nngroup.com/articles/new-AI-users-onboarding/)
- **[QUAL]** Same study: SparkDesk's long tutorial with prompt-writing tips came before users understood the chat interface, and users skipped what did not seem relevant. Its FAQ "How to ask questions" confused people who did not see why they should ask anything or where the input was. — [NN/g](https://www.nngroup.com/articles/new-AI-users-onboarding/)
- **[QUAL]** When capabilities are not visible, users ask the bot itself. Ernie wrongly told a participant that file upload was unavailable, which damaged that user's understanding. NN/g's conclusion is that the bot must know its own capabilities. — [NN/g](https://www.nngroup.com/articles/new-AI-users-onboarding/)
- **[QUAL]** Broad examples ("Help me generate text") worked better than niche ones (horoscope matching), which users ignored. Sample is 6 people on general-purpose bots, so this may not transfer to a single-domain agent. — [NN/g](https://www.nngroup.com/articles/new-AI-users-onboarding/)
- **[QUAL]** A character-selection step led one user to think personality would affect content quality. A voice-selection step helped users realize they could speak to the bot. Popups were dismissed and may be mistaken for ads. — [NN/g](https://www.nngroup.com/articles/new-AI-users-onboarding/)
- **[EMPIRICAL]** Jain et al.: 16 first-time chatbot users, 8 Messenger bots, multiple sessions, logs plus interviews. Design implications include clarifying what the bot can and cannot do, keeping context, handling dialog failure, and ending conversations gracefully. Pre-LLM (2018). — [Jain et al.](https://ubicomplab.cs.washington.edu/publications/chatbot_study)
- **[EMPIRICAL]** Asisof, Nißen and von Wangenheim (AMCIS 2025): a survey of information needs produced an onboarding framework with three themes: Capabilities and Limitations, Disclosures and Validations, Guidance and Contestability. In a second study 85% of users engaged in onboarding. Depth influenced ease of use, breadth influenced trust and agent perceptions, and both influenced satisfaction. Sample sizes are not on the abstract page. — [AMCIS 2025](https://aisel.aisnet.org/amcis2025/sig_hci/sig_hci/4)

Field evidence in a low-literacy, mobile, messaging context

- **[EMPIRICAL]** ASHABot, a WhatsApp LLM bot in Hindi with voice input and output, used by 20 community health workers (ASHAs) and 15 nurse-midwives (ANMs) in Rajasthan for about three months, 107 days logged. Related Questions accounted for 59.1% of ASHA questions (about 1,040 of 1,761 messages). They helped users form follow-ups and introduced unfamiliar terms. — [ASHABot, arXiv](https://arxiv.org/html/2409.10913v3)
- **[EMPIRICAL]** Same study: ASHAs first tested the bot against what they already knew, then relied on it more. The bot admitting uncertainty built confidence. Some over-reliance appeared despite training. Some users avoided sensitive questions because they wrongly believed supervisors could see them. — [ASHABot](https://arxiv.org/html/2409.10913v3)
- **Caveat:** ASHABot users had an NGO field worker, a 15-minute group training and ongoing phone contact. João has no such human onboarding, and those users are working professionals. — [ASHABot](https://arxiv.org/html/2409.10913v3)

Design guidance

- **[GUIDELINE]** Google PAIR: be clear what the product can and cannot do at first encounter, ideally already in marketing messages. Describe the benefit, not the technology. Avoid "AI magic" hype. Its framework says what the product is, what it helps with, what it cannot do yet, how it will change, and how users can help. — [PAIR, Mental Models](https://pair.withgoogle.com/chapter/mental-models/)
- **[GUIDELINE]** PAIR: introduce features when relevant to the current task rather than as a list in onboarding, keep first run short, and let users begin with a low-risk, reversible action. — [PAIR](https://pair.withgoogle.com/chapter/mental-models/)
- **[GUIDELINE]** PAIR worksheet suggests asking users whether they want to see examples of what the AI can do or just start trying it. **[S]** — [PAIR worksheet](https://pair.withgoogle.com/worksheet/mental-models.pdf)
- **[GUIDELINE]** Microsoft HAX Guideline 1 (make clear what the system can do) lists these patterns: 1A introductory blurb, 1B explanation patterns, 1C expose system controls, 1D demonstrate possible inputs, 1E show a set of outputs. Guideline 2 (how well it can do it) lists matching the precision of language and numbers to system performance, reporting performance information, and low-performance alerts. I read titles only, not the pattern pages. — [HAX Design Library](https://www.microsoft.com/en-us/haxtoolkit/library/pattern/)
- **[GUIDELINE]** NN/g on prompt controls: visible controls show what the bot can do so users need not ask "can you...?". Four uses: discoverability, inspiration, constraining the conversation, and followups. Best practices: standard icons with labels, clear feature names ("Think Carefully" left users unsure), grouping by function. Based on NN/g usability observation and diary work, explicitly not statistically generalizable. — [NN/g, Prompt Controls](https://www.nngroup.com/articles/prompt-controls-genai/)
- **[GUIDELINE]** NN/g on use-case prompt suggestions: place near the input; pills for short prompts, cards for longer ones; one tap inserts the prompt; prefer specific, situation-relevant prompts over vague categories; curate by hand; randomize order because position skews click analytics. No controlled study. — [NN/g, Designing Use-Case Prompt Suggestions](https://www.nngroup.com/articles/designing-use-case-prompt-suggestions/)
- **Tension between two NN/g pieces:** the onboarding study favors broad examples, while the prompt-suggestion article favors specific ones. They address different things (a general tool's first exposure versus suggestions in context), and neither ran a head-to-head test. — [NN/g onboarding](https://www.nngroup.com/articles/new-AI-users-onboarding/); [NN/g suggestions](https://www.nngroup.com/articles/designing-use-case-prompt-suggestions/)
- **[GUIDELINE]** Shape of AI "wayfinders" for the first prompt: Example gallery, Follow up, Initial CTA, Nudges, Prompt details, Randomize, Suggestions, Templates. This is a pattern catalog, not evidence of effect. — [Shape of AI](https://www.shapeof.ai/pattern-types/wayfinders)
- **[GUIDELINE] [S]** Apple's HIG on generative AI, via a developer forum post: tell people when and where the app uses AI so they can knowingly choose it. I could not read Apple's page itself because the fetch returned only the title. — [Apple forum thread](https://developer.apple.com/forums/thread/799064)

What products do on screen

- **Claude:** a pre-sign-in carousel of four use cases. NN/g judged that it showed capabilities and set expectations, but noted the simplified "conversations" misrepresent the effort real results take. **[QUAL]** — [NN/g](https://www.nngroup.com/articles/designing-use-case-prompt-suggestions/)
- **ChatGPT:** pills such as "Analyze data" and "Summarize text"; tapping opened autocomplete with a fuller question. Screens were as NN/g observed them and may have changed. — [NN/g](https://www.nngroup.com/articles/designing-use-case-prompt-suggestions/)
- **Tripadvisor, Amazon Rufus, Instacart:** contextual suggestions tied to the location, the product being viewed, or the task ("Easy family dinners"). — [NN/g](https://www.nngroup.com/articles/designing-use-case-prompt-suggestions/)
- **Perplexity:** explains a Pro feature with a hover tooltip instead of a tutorial; Focus narrowed the sources searched. — [NN/g onboarding](https://www.nngroup.com/articles/new-AI-users-onboarding/); [NN/g controls](https://www.nngroup.com/articles/prompt-controls-genai/)
- **Khanmigo:** starter prompts change with the page the student is on, and the student taps one or types their own. A short orientation appears at first login. No published data on use. **[VENDOR] [S]** — [Khan Academy support](https://support.khanacademy.org/hc/de/articles/13982652883341); [Khan webinar transcript](https://rosetta.to/u/khanacademy/real-tools-for-real-classrooms-a-direct-look-at-the-next-chapter-of-khan-academy)
- **Duolingo Max:** Lily opens the Video Call herself, usually on a topic the learner just studied, so the user does not have to invent a first message. **[VENDOR]** — [Duolingo blog](https://blog.duolingo.com/duolingo-max). One reviewer found Lily gave a generic reply and steered back to the script when they went off-topic; a single anecdote. **[OPINION] [S]** — [Copycat Cafe review](https://copycatcafe.com/blog/duolingo-max)
- **Intercom Fin:** informal notes from a Fin discussion recommend the welcome message name the option to reach a human and give tips on phrasing rich questions. **[S]**, informal notes. — [Knowt notes](https://knowt.com/note/a3d7044c-5913-4768-903d-3d486317b78b/Intercom-AI-Agent-Fin-Breakout-Discuss)
- **[VENDOR] [S]** A chatbot vendor recommends four to six starters in action-oriented language. No data given. — [Watermelon](https://watermelon.ai/blog/conversation-starters-help-visitors-start-the-right-conversation/)

### Inferences
- For João, the opener is probably one line of purpose plus a line of limits, in benefit language, followed by 3 to 4 tappable real questions. Example of content: what it does (explains and simulates), what it does not do (does not approve credit, does not ask for documents).
- João's system prompt must describe its own limits accurately, because novices will ask it directly. The Ernie failure shows the cost of a wrong self-description.
- ASHABot suggests related questions should appear after every answer, not only at the start. For people who lack vocabulary, the chips also teach the domain ("carta de crédito", "FGTS", "entrada") by exposure.
- The broad versus specific conflict is likely resolved by audience: a single-domain agent has no need for "help me write"-style breadth, so chips should be the literal questions a first-time buyer has, phrased in their words.
- Admitting uncertainty appears to help rather than hurt, at least in ASHABot. João can say "não sei" and point to where to check.

### Gaps
- No controlled test found of the number, wording or placement of starter chips in an LLM agent.
- Could not find official documentation or data on Fin's suggested questions, or any on-screen first-contact detail for Ada or Decagon. Sierra's page describes the flow only in marketing terms.
- Notion AI was seen only as a passing example in NN/g's list, with no details extracted.
- Apple HIG text was not read directly.

## Open chat box versus guided intake versus hybrid: what works for novices and low-confidence users?

### Takeaway
No study directly compares the three for LLM agents with novices. Adjacent evidence leans toward buttons and menus for structured tasks, while conversation helps with vague or exploratory needs. A hybrid is the defensible choice, though that is an inference and not a proven result.

### Cited Findings
- **[EMPIRICAL] [S]** Nguyen, Sidorova and Torres (Computers in Human Behavior, 2022): chatbots produced lower perceived autonomy and higher cognitive load than menu-based interfaces, which lowered satisfaction. — [Catalog record](https://eld.bl.uk/catalog/100148539178_0x000001)
- **[EMPIRICAL] [S]** 2024 study in the International Journal of Human-Computer Interaction: participants preferred button-based interaction, possibly because the free-text bot seemed less warm and competent. Buttons may make the flow more transparent but reduce perceived humanness and social presence. I could not open the paper (403). — [IJHCI](https://informahealthcare.com/doi/full/10.1080/10447318.2024.2351707)
- **[EMPIRICAL] [S]** A customer-service chatbot study found better overall results for rule-based button input, moderated by task complexity. — [Interaction types study](https://oasisbr.ibict.br/vufind/Record/RCAP_a17e70f8a9cdea27aad6a9a94cd77a3f)
- **[EMPIRICAL] [S]** A within-subject comparison of a chatbot and a graphical search interface concluded conversational search needs flawless usability to add value over a GUI. — [iConf 2021](https://vbn.aau.dk/files/397932014/iConf2021_Chatbot_final.pdf)
- **Caveat on all four above:** they test pre-LLM or rule-based bots, or are of uncertain relevance. A bad free-text bot in 2021 is not a good LLM in 2026, and part of the button advantage may reflect intent-recognition failures that LLMs reduce.
- **[EMPIRICAL]** Preprint with 73 participants, between-subjects, Traditional-Only versus AI-First versus Hybrid, in a content management system with 16 tasks. AI conditions substantially reduced clicks, navigation and scrolling, but task duration did not differ. Individual differences explained about half the variance in agent use (ICC = .50). Authors conclude the benefit is less effort, not more speed. Task domain is unlike João's. — [arXiv 2608.19551](https://arxiv.org/abs/2608.19551)
- **[EMPIRICAL]** NN/g diary study (18 participants, 425 conversations over two weeks, 2023): users struggled to phrase prompts. One said they did not know how to start the chat and tried "Should I buy life insurance?", a broad opener, before refining. Bots asked a clarifying question in only 16 of 425 conversations (3.76%), and participants wanted more of that narrowing. **[QUAL]** — [NN/g diary](https://www.nngroup.com/articles/generative-ai-diary/)
- **[EMPIRICAL]** AIED 2025: 107 users, 642 interactions, comparing three types of prompting guidance. The abstract says structured guidance can help but gives no effect size. — [arXiv 2504.07840](https://arxiv.org/abs/2504.07840)
- **[OPINION]** Jakob Nielsen's "articulation barrier": writing prompts demands prose skill, and he estimates under 20% of the population in rich countries can write well enough for advanced use. Writing is harder than reading, so low-articulation users may outnumber low-literacy users. The concept is his own and, by his account, unstudied. He wrote this on his own channel and it is not an NN/g study. **[S]** — [Nielsen, Articulation Barrier](https://jakobnielsenphd.substack.com/p/prompt-driven-ai-ux-hurts-usability)
- **[OPINION] [S]** Nielsen's mitigations: style galleries, prompt rewrite, related prompts, prompt builders, parametrization. He also suggests voice likely eases the barrier. — [Nielsen, Prompt Augmentation](https://jakobnielsenphd.substack.com/p/prompt-augmentation)
- **[OPINION] [S]** Nielsen reports AI output is typically at a 12th-grade reading level or beyond. — [Nielsen, Complex Text](https://jakobnielsenphd.substack.com/p/ai-generates-complex-text-challenging)
- **[EMPIRICAL] [S]** Brazilian context: INAF 2024 puts functional illiteracy at 29% of people aged 15 to 64, roughly 40 million, unchanged since 2018; 16% among ages 15 to 29. Fieldwork December 2024 to February 2025, 2,554 respondents. — [UNICEF Brasil](https://www.unicef.org/brazil/comunicados-de-imprensa/analfabetismo-funcional-nao-apresenta-melhora-e-alcanca-29-por-cento-dos-brasileiros-mesmo-patamar-de-2018-aponta-novo-levantamento-do-inaf); [Agência Brasil](https://agenciabrasil.ebc.com.br/educacao/noticia/2025-05/tres-cada-10-brasileiros-sao-analfabetos-funcionais-0)
- **[EMPIRICAL]** Voice is real but not a cure-all. In ASHABot 26.7% of ASHA questions were audio, and those who struggled to type Hindi found voice easier. Transcription errors occurred, and nurses kept 96.8% of their responses in text, partly so they could revise, and some avoided playing audio in public. — [ASHABot](https://arxiv.org/html/2409.10913v3)
- **[EMPIRICAL, preliminary] [S]** Mijke, a WhatsApp voice bot for people with low literacy in the Netherlands, has a single-participant pilot only. — [USINET 2025 paper](https://www.drhu.eu/publications/2025-USINET-EnhancingAccessibility.pdf)

### Inferences
- A chat box alone is a poor default for João's audience: with about 3 in 10 Brazilian adults functionally illiterate (INAF) and a writing barrier on top, an empty box asks for the hardest skill. Keep the box, but do not rely on it.
- Likely best shape: open input always available, tappable options leading, and João asks a narrowing question only when a vague message needs one. This combines the clarifying behavior users wanted (NN/g diary) with the transparency of buttons.
- João's replies need a plain-language target. The default LLM reading level is a likely hidden failure, since most of the risk for this audience is on the output side.
- Support audio input as an option rather than the main path. Test Goiânia speech and housing vocabulary for transcription errors, because a misheard number or term is costly here.
- ICC = .50 suggests no single first screen fits everyone, so one that lets a person either tap or type is better than one that forces either.

### Gaps
- No direct evidence found on low-confidence users specifically in LLM agents; nothing on financial anxiety and first-message behavior.
- No study of first-session chips versus a free box with Brazilian Portuguese speakers or low-income buyers.
- No finance-focused WhatsApp or low-literacy LLM study turned up.

## What is known about time to first value, activation moments, and signup or gate placement?

### Takeaway
Value before signup is now standard among large AI products, but public evidence is observational and anecdotal. I found no published controlled experiment with numbers. João's no-account design avoids the gate question entirely, so its activation moment needs its own definition.

### Cited Findings
- **Fact, reported by press:** OpenAI removed the account requirement for ChatGPT on April 1, 2024, with a gradual rollout. Chats could not be saved or shared without an account, and OpenAI added stricter content safeguards for logged-out use. It cited over 100 million weekly users in 185 countries. These are 2024 terms and I did not check current ones. OpenAI's own page returned 403. **[S]** — [Engadget](https://www.engadget.com/you-can-now-use-chatgpt-without-an-account-184417749.html); [SD Times](https://sdtimes.com/softwaredev/chatgpt-no-longer-requires-users-to-sign-up/)
- **[OPINION]** Sandy Diao, from observing "dozens of companies" with no published methods: in AI products activation increasingly precedes acquisition, and long checklists are being compressed or removed. — [Diao](https://sandydiao.substack.com/p/how-the-ai-growth-funnel-is-changing)
- **[OPINION], secondhand:** Diao states Perplexity "tested extensively" and found the best gate came after a few searches, shown inline in the chat. No numbers, and I found no primary source. — [Diao](https://sandydiao.substack.com/p/how-the-ai-growth-funnel-is-changing)
- **[OPINION]** Other observed patterns from the same article: Talkie starts sign-up after the 4th interaction; Lovable lets users prompt on the landing page and asks for sign-up afterward; ElevenLabs puts its demo on the landing page; Gamma uses direct "zero-shot" prompting; Finch and Tolans blend personalized onboarding into sign-up through conversation. — [Diao](https://sandydiao.substack.com/p/how-the-ai-growth-funnel-is-changing)
- **[OPINION] [S]** A commenter on that post argues gate placement depends on time to value, and that deferring signup can work when repeat intent does not require an account. — [Comments](https://sandydiao.substack.com/p/how-the-ai-growth-funnel-is-changing/comments)
- **[OPINION] [S]** A founder anecdote: removing a login wall cut cost per acquisition by 50% overnight. Single case, no controlled test. — [Indie Hackers](https://www.indiehackers.com/post/we-removed-the-login-wall-cpa-dropped-50-overnight-7fb2d1c5c1)
- **[VENDOR] [S]** A benchmark report measures time to value from the signup timestamp to the first value event, for users who eventually activated. This does not fit logged-out products, and it excludes those who never activated. — [Perspective AI](https://getperspective.ai/blog/2026-customer-onboarding-benchmark-activation-rates-by-industry)
- **[EMPIRICAL]** Diary evidence on what returns value: about 53% of conversations led to some follow-up action, and users rated helpfulness closely with trust. — [NN/g diary](https://www.nngroup.com/articles/generative-ai-diary/)
- **[QUAL]** NN/g's advice against long pre-use instruction fits the low-friction direction: show detailed help after users see the chat, just before the first conversation. — [NN/g](https://www.nngroup.com/articles/new-AI-users-onboarding/)
- **[OPINION]** Anonymous sessions carry intent data but need linking to accounts later for attribution. — [Diao](https://sandydiao.substack.com/p/how-the-ai-growth-funnel-is-changing)

### Inferences
- João already has the most favorable position in this debate: no gate. The real question is how soon a person reaches a useful, personal answer. A candidate activation moment: the first answer that uses the person's own numbers or situation, or a saved result they could return to.
- Without an account there is no continuity by default. If continuity matters, offer a way to keep the result on request (a share link, or sending it to WhatsApp) after value, which also keeps the "nunca criar conta" tone rule intact.
- Without accounts, measure from first page load to first reply, first tap and first personal answer, and count non-activators, unlike the benchmark definition above.

### Gaps
- No published A/B results on gate placement or value-before-signup for any AI product.
- No credible time-to-first-value benchmark for conversational agents.
- Nothing found on how logged-out users retain in the absence of history.

## How do agents ask their first questions, and when do forms beat chat?

### Takeaway
Results are mixed and depend on the task. Chat can draw richer answers to open questions; forms hold up better for repeated, factual, structured data. Generative UI wins preference comparisons by a smaller margin with real users than headline figures suggest, and plain text wins on easy how-to questions.

### Cited Findings

Chat versus forms

- **[EMPIRICAL] [S]** Xiao et al. (ACM TOCHI, 2020): about 600 participants, half on Qualtrics and half with an AI chatbot. The chatbot drove more engagement and better-quality open-text answers (relevance, depth, readability). — [arXiv 1905.10700](https://arxiv.org/pdf/1905.10700)
- **[EMPIRICAL] [S]** A web versus chatbot experiment with formal versus casual tone: chatbot respondents differentiated responses more and satisficed less. Listed DOI 10.1145/3290605.3300316. — [Record](https://www.springerprofessional.de/doi/10.1145/3290605.3300316)
- **[EMPIRICAL] [S]** Contradiction: a 2024 study of Dutch users (N=304) on longitudinal data collection found the web survey gave better response characteristics and data quality, and rated the chatbot lower on enjoyment, usefulness and security. — [UvA record](https://dare.uva.nl/id/8d1a3d3a-31ff-4fcf-9dd5-614e9e37efed)
- **[EMPIRICAL] [S]** Barari et al. (2025), web-survey experiment with 1,800 participants: AI-assisted conversational interviewing can improve respondent experience and, in certain circumstances, data quality. — [arXiv 2504.13908](https://arxiv.org/pdf/2504.13908v3)

Generative UI and widgets in chat

- **[EMPIRICAL]** Chen et al., "Generative Interfaces for Language Models" (read directly from the PDF). 428 Prolific annotators judged pairs of outputs by majority vote of three; Fleiss' Kappa 0.525 (moderate). GenUI won 84.0% against Claude 3.7 chat. — [arXiv 2508.19227](https://arxiv.org/abs/2508.19227)
- **Same study, the more telling result:** on 380 real queries written by 76 participants, GenUI's edge shrank to 50.8% win, 8.2% tie, 41.1% loss. 30.3% strongly preferred GenUI and 18.4% strongly preferred chat. — [arXiv 2508.19227](https://arxiv.org/abs/2508.19227)
- **Same study, limits:** chat did better on easy, basic how-to queries, where added tools imposed cognitive load. GenUI was preferred more on detailed (80%) than concise queries (73%). Latency of refinement reached several minutes. The authors suggest a classifier to invoke GenUI only when interaction is needed. — [arXiv 2508.19227](https://arxiv.org/abs/2508.19227)
- **Same study, population caveat:** annotators were US native English speakers, all with at least a bachelor's degree and regular chatbot users, judging side by side. This measures preference, not task success, and is close to the opposite of João's audience. — [arXiv 2508.19227](https://arxiv.org/abs/2508.19227)
- **[EMPIRICAL] [S]** TaskArtisan (N=12): widgets improved clarity and visual presentation but added rigidity and extra prompting work. — [arXiv 2607.17394](https://arxiv.org/pdf/2607.17394)
- **[EMPIRICAL] [S]** GenerativeGUI, as summarized in a survey: widgets in chat lowered mental demand and task time compared with text, but GUI generation can hurt when clarification options multiply. Primary paper not located; my attempt to read the survey failed on file size. — [arXiv 2603.21334](https://arxiv.org/pdf/2603.21334)
- **[VENDOR] [S]** Thesys report: 83% chose the GenUI response in an A/B test with 115 respondents, relayed secondhand on a blog. Unverified, and sold by a GenUI vendor. — [DEV post](https://dev.to/rahulkhinchi03/ui-based-chatbots-vs-text-based-chatbots-task-completion-rate-time-on-task-and-user-satisfaction-2o4e)

How products sequence questions

- **Rocket's Digital Assistant:** answers questions conversationally, then gathers information, pulls credit, presents rates and hands off to a banker. **[VENDOR]** — [Sierra](https://sierra.ai/customers/rocket-mortgage). Answers come first, intake second, which is a useful ordering even though João stops well before credit.
- **Rocket** also routes chats by the page or app the user came from. **[VENDOR] [S]** — [AWS](https://aws.amazon.com/blogs/machine-learning/how-rocket-streamlines-the-home-buying-experience-with-amazon-bedrock-agents)
- **Zillow in ChatGPT:** users describe a home in natural language and listings appear in a Zillow-styled view, so language goes in and a structured result comes out. Launched October 2025. **[VENDOR] [S]** — [Zillow](https://www.zillowgroup.com/news/zillow-becomes-first-real-estate-app-in-chatgpt); [HousingWire](https://www.housingwire.com/articles/zillow-chatgpt-launch-app-integration/)

### Inferences
- Rule of thumb from this evidence: use conversation for what the person wants and fears, which is open text and where chat drew better answers. Use a structured control for numbers (renda, entrada, parcela), where a slider or typed field is faster and error-resistant on a phone.
- This fits the project's "aprender e simular" framing (CLAUDE.md); I did not inspect João's current code. Ask one thing at a time and answer something useful before asking anything, following the Rocket sequence.
- Do not generate interfaces by default. Plain text fits João's many simple how-to questions, and a pre-built widget gives the benefit without the latency or rigidity of generation.
- Keep the option lists short, given the warning about many clarification options.
- Every question needs a visible reason in a context of no documents and no credit check, or it will read as a form for a bank. This is my inference and I found no direct test of it.

### Gaps
- No direct test found of one-at-a-time questions versus a form-in-chat for LLM agents, on mobile or otherwise.
- Nothing found on phone-specific behavior for chat widgets (keyboard covering chips, scroll).
- The survey studies measure data collection, not a person seeking help, so transfer is uncertain.

## What do NN/g, PAIR, HAX, Apple HIG and Shape of AI say, and what do usability studies actually show?

### Takeaway
The guidelines agree: state limits, avoid hype, keep onboarding short, reveal help in context, and offer a human or fallback path. The studies support parts of this, but they rest on small samples, older bots and preference measures, so the agreement should not be mistaken for proof.

### Cited Findings

Where guidance and study agree

- **Short first run:** PAIR recommends a short first run and contextual feature introduction **[GUIDELINE]** — [PAIR](https://pair.withgoogle.com/chapter/mental-models/). NN/g observed users skipping long tutorials **[QUAL]** — [NN/g](https://www.nngroup.com/articles/new-AI-users-onboarding/).
- **State limits:** PAIR and HAX G1 say to, and Jain et al. derived the same implication from 16 first-time users. AMCIS 2025 links onboarding breadth to trust. — [PAIR](https://pair.withgoogle.com/chapter/mental-models/); [HAX](https://www.microsoft.com/en-us/haxtoolkit/library/pattern/); [Jain](https://ubicomplab.cs.washington.edu/publications/chatbot_study); [AMCIS](https://aisel.aisnet.org/amcis2025/sig_hci/sig_hci/4)
- **Follow-up support:** NN/g guidance on followups, plus diary data that 77% of conversations had more than one exchange and half included a followup action. — [NN/g controls](https://www.nngroup.com/articles/prompt-controls-genai/). ASHABot's Related Questions at 59.1% is the strongest support found. — [ASHABot](https://arxiv.org/html/2409.10913v3)

Where evidence complicates guidance

- **Suggested follow-ups are not automatically good.** Reactions to Bing's suggestions were mixed: one user found a cost question useful, while another got repeated generic advice. — [NN/g diary](https://www.nngroup.com/articles/generative-ai-diary/)
- **Disclosing AI identity may carry a cost.** A 2025 working paper found disclosure can reduce trust and sales even when the bot performs well, and an ACIS 2025 paper found disclosure triggers negative emotion and lowers perceived trustworthiness. **[EMPIRICAL] [S]** — [Techstrong summary](https://techstrong.ai/articles/should-you-disclose-when-an-agent-is-ai-it-shouldnt-matter/); [ACIS 2025](https://aisel.aisnet.org/acis2025/106)
- **Guidance nonetheless favors disclosure**, as do ethics. Apple says to tell people where AI is used **[GUIDELINE] [S]** — [Apple forum](https://developer.apple.com/forums/thread/799064). Twilio advises naming AI in the opening line **[VENDOR] [S]** — [Twilio](https://www.twilio.com/en-us/blog/insights/ai-disclosure-transparency-gap).
- **Trust can run ahead of accuracy.** Average trust was 6.00 of 7, and only about 22% of conversations were followed by verification, more often when stakes were high. Participants judged about 7.8% of answers wrong, unverified by the authors. — [NN/g diary](https://www.nngroup.com/articles/generative-ai-diary/)
- **Human escalation:** 45% said clear escalation paths would raise their trust in AI agents **[VENDOR survey] [S]** — [Salesforce via Tectonic](https://gettectonic.com/ai-agents-as-tools-of-trust/).

Assessment of the evidence base

- NN/g's onboarding study is 6 participants on Chinese apps; its diary study is 18 people from 2023 on early models. — [NN/g onboarding](https://www.nngroup.com/articles/new-AI-users-onboarding/); [NN/g diary](https://www.nngroup.com/articles/generative-ai-diary/)
- PAIR, HAX and Shape of AI are frameworks and catalogs, not tests of those recommendations in LLM first sessions. — [Shape of AI](https://www.shapeof.ai/pattern-types/wayfinders)
- Baymard: I found no Baymard study comparing guided suggestions with open input for chatbots. — [Baymard UX-Query page](https://baymard.com/lp/ux-query-checkout)

### Inferences
- João should say it is an AI assistant, despite the disclosure studies. Those studies measure sales, while João is free and educational and relies on credibility. A named character with a warm voice could reduce the cost, but this is untested for João.
- High trust and low verification are the main risk for a first-time buyer. The first session should model checking, such as saying which numbers are estimates and when a banco or Caixa will decide.
- Prefer a clear path to a person at the moments that matter, even if the handoff is modest.

### Gaps
- Apple HIG could not be read directly; the point cited rests on a forum summary.
- I did not read the individual HAX pattern pages or the HAX 2019 paper.
- I did not find a 2024 to 2026 CHI or CSCW paper on first-session onboarding for LLM agents specifically; the searches surfaced mostly preprints and AMCIS.

## Real product examples: what they do on screen, and what the results claims are worth

### Takeaway
Most product outcomes are self-reported and exposed to selection effects. The clearest lessons are structural: answer first, use the user's context, and keep a person reachable. Klarna shows what happens when headline volume is treated as proof of quality.

### Cited Findings
- **Rocket Mortgage / Rocket.com:** launched January 2025 with an AI Agent at the center, for 24/7 questions, help with applications and banker connection. **[S]** — [Inman](https://www.inman.com/2025/01/22/rocket-consolidates-home-search-mortgage-with-rocket-com-launch/)
- **Rocket Logic is a different thing:** a patented, largely back-office origination platform for document data extraction and underwriting, not a consumer first-session experience. **[S]** — [HousingWire](https://housingwire.com/articles/rocket-launches-patented-ai-driven-tech-platform); [National Mortgage News](https://www.nationalmortgagenews.com/news/rocket-mortgage-rolls-out-ai-powered-platform-for-underwriting)
- **Rocket conversion claim [VENDOR]:** clients who start with the assistant close at three times the rate; four times with both chat and a banker. Stages are defined inconsistently (refinance lead-to-application, purchase lead-to-PAL), "close" and "successful" conversations are undefined, and 400,000+ monthly conversations is a vendor figure. — [Sierra](https://sierra.ai/customers/rocket-mortgage)
- **Rocket conversion, different wording [VENDOR] [S]:** AWS says web-to-closed-loan conversion tripled because the agent captured leads outside business hours. So the sources describe different comparisons. — [AWS](https://aws.amazon.com/blogs/machine-learning/how-rocket-streamlines-the-home-buying-experience-with-amazon-bedrock-agents); contrast [Sierra](https://sierra.ai/customers/rocket-mortgage)
- **Klarna:** February 2024: about 2.3 million chats in the first month, equivalent to 700 agents, with satisfaction on par with humans **[VENDOR] [S]** — [Finextra](https://finextra.com/newsarticle/43770/klarnas-ai-chatbot-does-the-equivalent-work-of-700-full-time-humans). In May 2025 the CEO said the push went too far and quality suffered, and Klarna resumed hiring so customers can always reach a person **[S]** — [Entrepreneur](https://www.entrepreneur.com/business-news/klarna-ceo-reverses-course-by-hiring-more-humans-not-ai/491396). Some commentary says the reversal narrative is overstated; AI stays central to Klarna. **[S]** — [Tech.co](https://tech.co/news/klarna-reverses-ai-overhaul)
- **Zillow:** see the question-asking section. A third-party listing notes affordability answers still need independent checking. **[S]** — [Anavem](https://www.anavem.com/apps/chatgpt/zillow-chatgpt-app)
- **Redfin:** a ChatGPT app that lets users refine a search without re-entering filters. **[S]** — [HousingWire](https://www.housingwire.com/articles/zillow-chatgpt-launch-app-integration/)
- **Khanmigo, Duolingo, Claude, ChatGPT, Perplexity, Tripadvisor, Rufus:** covered in the first section.

### Inferences
- The 3x claim from Rocket cannot be read as causal, since people who choose to start in chat are likely more motivated. It should not be used as a benchmark for João, which also has no closing event.
- Do not copy Rocket's flow beyond the first answers. Its assistant collects data and pulls credit, while João's value promise depends on doing neither.
- From Klarna, measure answer quality and whether people understood, not message counts.
- Useful product models for João, in order: Duolingo's agent speaking first with context, Khanmigo's page-aware starters, and Zillow's language-in, structured-result-out.

### Gaps
- Could not verify current (late 2026) first screens of any product; I did not use them directly, so on-screen descriptions date from when NN/g or the vendors observed them.
- No independent audit found of Rocket, Sierra or Klarna figures.
- Nothing usable on Decagon or Ada first-contact design, and no Sierra deployment details beyond Rocket.
- Duolingo's onboarding into Max was not documented in what I found.
