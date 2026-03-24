import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import Post from "./models/post.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("MONGO_URI not set.");
  process.exit(1);
}

await mongoose.connect(MONGO_URI);
console.log("Connected to MongoDB");

// Create or find seed author
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("seed1234", salt);

let author = await User.findOne({ username: "thekey" });
if (!author) {
  author = await User.create({
    username: "thekey",
    email: "thekey@blog.com",
    password: hash,
  });
  console.log("Seed author created.");
} else {
  console.log("Seed author already exists.");
}

const uid = author._id;

const posts = [
  // ── TECHNOLOGY ──────────────────────────────────────────────────────────────
  {
    title: "The Architecture of Large Language Models",
    cat: "technology",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1200&q=80",
    desc: `<p>Large language models (LLMs) have fundamentally changed how machines process and generate human language. At their core, these systems are built on the transformer architecture — a design that replaced recurrent networks with a mechanism known as <strong>self-attention</strong>, enabling the model to weigh every word in a sequence against every other word simultaneously.</p>

<p>This parallel processing capability was a landmark shift. Earlier recurrent models processed tokens one at a time, making it difficult to capture long-range dependencies in text. Transformers eliminated that bottleneck, which is precisely why models trained on billions of parameters can now hold coherent, contextually aware conversations across thousands of tokens.</p>

<p>The training process itself is divided into two major phases. In <strong>pre-training</strong>, the model learns from a vast corpus of internet text by predicting the next token in a sequence. This phase is computationally intensive, often consuming thousands of GPU-hours and terabytes of data. The model learns grammar, facts, reasoning patterns, and even subtle stylistic conventions purely through statistical association.</p>

<p>The second phase — <strong>fine-tuning with human feedback</strong> (RLHF) — shapes raw capability into useful behavior. Human raters evaluate model responses, and those preferences are used to train a reward model. The LLM is then updated using reinforcement learning to produce outputs that score highly on this reward signal. The result is a system that is not only knowledgeable but aligned with human expectations of helpfulness and safety.</p>

<p>What makes these architectures particularly fascinating is how emergent behaviors arise at scale. Capabilities like multi-step reasoning, code generation, and analogical thinking were not explicitly programmed — they surfaced as the model grew larger. Researchers continue to debate whether this emergence is a gradual, smooth transition or a series of sharp capability jumps at specific parameter thresholds.</p>

<p>As these models are integrated into products and workflows, understanding their architecture is no longer purely academic. Engineers, designers, and product teams increasingly need to reason about context windows, token limits, temperature parameters, and hallucination tendencies. The underlying mathematics is complex, but the conceptual model is accessible to anyone willing to engage with it seriously.</p>`,
    uid,
  },
  {
    title: "Quantum Computing: Beyond the Hype",
    cat: "technology",
    img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
    desc: `<p>Quantum computing occupies a peculiar space in the technology landscape — simultaneously one of the most hyped and most misunderstood developments of the last decade. The promise is genuine: quantum machines, leveraging the principles of superposition and entanglement, could solve problems that are computationally intractable for classical computers. The reality, however, is considerably more nuanced.</p>

<p>Classical computers process information in <strong>bits</strong> — binary values of 0 or 1. Quantum computers use <strong>qubits</strong>, which can exist in a superposition of both states simultaneously. When many qubits are entangled, the system can represent and process an exponentially large number of states at once. This property gives quantum algorithms a theoretical edge for specific problem classes, particularly those involving large-scale optimization, cryptography, and molecular simulation.</p>

<p>The challenge is that qubits are extraordinarily fragile. Any interaction with the surrounding environment — a stray photon, a vibration, a temperature fluctuation — causes <strong>decoherence</strong>, collapsing the quantum state and introducing errors. Current quantum processors operate at temperatures near absolute zero and require sophisticated error-correction schemes just to maintain a few microseconds of stable computation. Most of today's machines are classified as NISQ (Noisy Intermediate-Scale Quantum) devices — useful for research but not yet reliable enough for large-scale commercial applications.</p>

<p>Despite these constraints, genuine progress is being made. Researchers have demonstrated quantum advantage in narrow, carefully designed tasks. Pharmaceutical companies are exploring quantum simulation for drug discovery, and financial institutions are investigating its use in portfolio optimization. The field of <strong>post-quantum cryptography</strong> is already developing encryption standards designed to resist future quantum attacks on current protocols like RSA.</p>

<p>A realistic timeline places fault-tolerant, general-purpose quantum computing at least a decade away — possibly longer. What is achievable now is a hybrid approach: using quantum processors for specific subroutines where they outperform classical hardware, embedded within broader classical computing pipelines. This pragmatic framing, rather than the utopian narrative of quantum supremacy rewriting all computing, is where genuine value is likely to emerge first.</p>`,
    uid,
  },

  // ── SCIENCE ─────────────────────────────────────────────────────────────────
  {
    title: "The Neuroscience of Decision-Making",
    cat: "science",
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
    desc: `<p>Every choice you make — from what to eat for breakfast to whether to accept a job offer — emerges from a cascade of neural activity that unfolds largely beneath conscious awareness. The neuroscience of decision-making reveals that the brain does not operate as a single, unified arbiter of choice. Instead, it is a collection of competing systems with distinct evolutionary histories, operating on different timescales and with conflicting priorities.</p>

<p>At the heart of the research is the tension between two broad systems. The <strong>prefrontal cortex</strong>, particularly its ventromedial and dorsolateral regions, is associated with deliberate, goal-directed reasoning. It can represent abstract future outcomes, evaluate trade-offs, and suppress impulsive responses. In contrast, the <strong>limbic system</strong> — including the amygdala and nucleus accumbens — drives reward-seeking and threat-avoidance with a swiftness that bypasses conscious deliberation entirely.</p>

<p>Nobel laureate Daniel Kahneman's framework of System 1 and System 2 thinking maps loosely onto this neural architecture. System 1 is fast, automatic, and emotionally inflected — well suited for routine decisions in familiar environments. System 2 is slow, effortful, and analytical — necessary for novel problems requiring careful reasoning. The brain defaults to System 1 whenever possible, conserving metabolic resources. Only when patterns break down or stakes are perceived as high does System 2 fully engage.</p>

<p>One of the most counterintuitive findings in this field is that emotions are not the enemy of good decisions — they are integral to them. Patients with damage to the ventromedial prefrontal cortex retain intact logical reasoning but make catastrophically poor life decisions, unable to weigh the emotional significance of options. This suggests that affect functions as a rapid heuristic signal, marking outcomes as good or bad based on prior experience, and that stripping this signal away leaves decision-making rudderless.</p>

<p>The implications for everyday life are considerable. Fatigue, stress, and decision fatigue progressively shift control toward the limbic system, degrading the quality of deliberate choices. Structuring environments to reduce unnecessary decisions — a principle behind everything from streamlined product design to behavioral policy — can meaningfully improve outcomes by preserving cognitive resources for decisions that genuinely require them.</p>`,
    uid,
  },
  {
    title: "CRISPR and the Ethics of Rewriting Life",
    cat: "science",
    img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80",
    desc: `<p>In 2012, a paper by Jennifer Doudna and Emmanuelle Charpentier described a bacterial immune mechanism that could be repurposed as a precise molecular tool for editing DNA. The technology, known as CRISPR-Cas9, earned both scientists the Nobel Prize in Chemistry in 2020, and for good reason: it democratized genetic engineering in a way that nothing before it had.</p>

<p>The mechanism works by using a short RNA sequence to guide the Cas9 protein — a molecular scissors — to a precise location in the genome. Once there, the protein cuts the DNA strand. The cell's natural repair machinery then seals the cut, either disabling the targeted gene or, if a template is provided, inserting a new sequence. The process is faster, cheaper, and more accurate than any prior technique, and it works across virtually every organism from bacteria to humans.</p>

<p>The medical applications are transformative. Clinical trials are underway for conditions including sickle cell disease, certain forms of blindness, and cancer. In 2023, a CRISPR-based therapy became the first approved gene-editing treatment for a hereditary blood disorder, offering what may be a functional cure for patients who previously had limited options. Researchers are also exploring CRISPR as a tool for disabling viral DNA within infected cells — a potential paradigm shift in antiviral medicine.</p>

<p>But the technology raises profound ethical questions, particularly around <strong>germline editing</strong> — modifying the DNA of embryos in ways that would be inherited by all future generations. When Chinese researcher He Jiankui announced in 2018 that he had edited embryos to create the world's first gene-edited babies, the global scientific community condemned the work as premature and reckless. The edited gene provided questionable HIV resistance while introducing unknown off-target effects into the permanent human lineage.</p>

<p>The deeper concern is not rogue scientists but the gradual normalization of enhancement rather than treatment. Once the infrastructure for germline editing is in place, the line between correcting a devastating disease and selecting for preferred traits — intelligence, height, athleticism — becomes a matter of social consensus rather than technical capability. Who governs that consensus, and through what institutions, remains an open and urgent question that science alone cannot answer.</p>`,
    uid,
  },

  // ── ART ─────────────────────────────────────────────────────────────────────
  {
    title: "Generative Art and the Question of Authorship",
    cat: "art",
    img: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1200&q=80",
    desc: `<p>When a neural network trained on millions of human paintings produces an image indistinguishable from a museum-worthy canvas, a question that has always lived quietly at the edges of art theory becomes suddenly urgent: what does it mean to be the author of a work?</p>

<p>Generative art — work produced through algorithms, randomness, or artificial intelligence — is not a new phenomenon. Artists have used computational processes since the 1960s, when Harold Cohen built AARON, a rule-based program capable of producing original drawings. What has changed is the scale, the accessibility, and the perceptual quality of the output. Systems like Midjourney and DALL·E can produce stunning imagery from a single line of text, and the gap between generated and hand-crafted work has narrowed to the point where it confounds even trained eyes.</p>

<p>The authorship question cuts in several directions simultaneously. One view holds that the human who writes the prompt is the author — the algorithm merely executes intent, much as a camera executes the photographer's vision. Another argues that the meaningful creative decisions are made during training, attributing authorship to the engineers and the data curators. A third position — more uncomfortable — suggests that when the model recombines patterns from millions of existing works without explicit consent, the result is closer to sophisticated plagiarism than creation.</p>

<p>Copyright law has not kept pace. In most jurisdictions, AI-generated images without meaningful human creative input are not eligible for copyright protection — a ruling that leaves artists whose styles have been absorbed into training datasets without recourse, while simultaneously leaving the companies commercializing those outputs without a clear legal claim to what they produce.</p>

<p>What generative art does productively is expose the assumptions baked into romantic conceptions of artistic genius — the notion that great work springs fully formed from individual inspiration. Most human artists are themselves recombinators of influences, apprenticed to traditions, responding to contemporaries. The difference may be one of degree, of embodied experience, of intentionality operating across a lifetime rather than a forward pass. That difference may be everything. Or it may be less than we assumed.</p>`,
    uid,
  },

  // ── CINEMA ──────────────────────────────────────────────────────────────────
  {
    title: "The Long Take: Cinema's Most Demanding Technique",
    cat: "cinema",
    img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
    desc: `<p>In an era of accelerating cuts — the average shot length in mainstream Hollywood films has dropped from nearly ten seconds in the 1930s to under four seconds today — the long take stands as a deliberate act of resistance. It is cinema at its most demanding: for the actors, who must sustain performance across minutes without a cut to hide mistakes; for the crew, who must choreograph camera, lighting, and movement with clockwork precision; and for the audience, whose attention is held without the relief of an edit.</p>

<p>The technique traces its theoretical lineage to André Bazin, the French critic who argued that deep focus and continuous shots preserve the ambiguity of reality in ways that editing cannot. A cut is an assertion — it tells the viewer what to look at and what to feel. An unbroken take presents a world and allows the viewer to inhabit it, to choose where to rest their gaze, to experience time as it actually passes.</p>

<p>Orson Welles understood this instinctively. The opening sequence of <em>Touch of Evil</em> — a single, unbroken tracking shot following a car through a border town — establishes dread through accumulation rather than montage. The camera never looks away, and that refusal to cut generates a particular kind of suspense: not the mechanical tension of crosscutting, but the existential unease of watching something terrible become inevitable.</p>

<p>Alfonso Cuarón extended this logic to entire films. <em>1917</em> (directed by Sam Mendes but shot by Roger Deakins) creates the illusion of a continuous take across its full runtime, forcing the viewer to experience the war as an unrelenting present tense. There is no cut to safety, no structural release. The technique is not a gimmick — it is the argument of the film, embodied in form.</p>

<p>Perhaps the purest practitioner of the long take is the Hungarian director Béla Tarr, whose films <em>Sátántangó</em> and <em>Werckmeister Harmonies</em> unfold at a pace that borders on the geological. Shots that last five, ten, fifteen minutes force a complete recalibration of attention. The viewer stops waiting for the next cut and begins instead to notice texture, light, the weight of bodies moving through space. It is an education in looking — and a reminder that cinema's deepest power lies not in the speed of its cuts but in the quality of its gaze.</p>`,
    uid,
  },

  // ── DESIGN ──────────────────────────────────────────────────────────────────
  {
    title: "Typography as Argument: How Fonts Shape Meaning",
    cat: "design",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    desc: `<p>Typography is the most invisible of design disciplines — invisible, at least, when it is working. Readers absorb words without consciously registering the choices that shaped their encounter with them: the weight of the strokes, the spacing between letters, the ratio of x-height to cap height, the subtle curve at the terminal of a lowercase 'a.' And yet these choices are never neutral. They carry meaning before a single word is read.</p>

<p>This is not metaphor. Research in cognitive psychology consistently shows that typeface selection influences how readers evaluate the credibility, emotional tone, and authority of a text. A legal document set in Garamond feels substantive and measured. The same document set in Comic Sans feels illegitimate — not because the words have changed but because the typographic signal contradicts the content's register. The font has made an argument that the words cannot override.</p>

<p>Modernist designers understood this well. The Bauhaus movement championed geometric sans-serifs — typefaces like Futura — as expressions of rationalism, universality, and rejection of ornamental tradition. Herbert Bayer took this further by proposing a Universal typeface that used only lowercase letters, eliminating what he viewed as the redundancy of capitalization. The politics were encoded in the letterforms themselves: a typographic democracy, stripped of hierarchy.</p>

<p>Contemporary practice has complicated this history. The resurgence of serif typefaces in digital interfaces signals a recalibration — a desire for warmth and legibility after decades of sans-serif minimalism. Editorial platforms like <em>The New York Times</em> and <em>The Atlantic</em> use distinctive typefaces as brand assets, investing in custom type design that signals seriousness and institutional identity.</p>

<p>Variable fonts represent the next evolution: typefaces with continuous axes of weight, width, and slant, allowing a single font file to express the entire range of a family with pixel-level precision. This is not merely a technical improvement — it changes the nature of typographic decision-making from a menu of options to a continuous field of expression. Type is becoming a dimension, not a category. Designers who understand that shift will work at a level of nuance that has never before been practically accessible.</p>`,
    uid,
  },

  // ── FOOD ────────────────────────────────────────────────────────────────────
  {
    title: "Fermentation: The Science of Controlled Decay",
    cat: "food",
    img: "https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&w=1200&q=80",
    desc: `<p>Fermentation is one of humanity's oldest technologies, predating writing and agriculture. For most of history, it was practiced without any understanding of its mechanism — the invisible agents responsible for transforming grain into beer, milk into cheese, and cabbage into kimchi were unknown until Pasteur's work in the nineteenth century. What people knew was the result: that controlled decay produced foods of extraordinary flavor, extended shelf life, and apparent benefit to those who ate them.</p>

<p>The biochemistry underlying this transformation is elegant. Microorganisms — bacteria, yeasts, and molds — consume sugars and produce acids, alcohols, and carbon dioxide as metabolic byproducts. In <strong>lactic acid fermentation</strong>, the dominant process in vegetables, dairy, and many grain ferments, bacteria convert sugars to lactic acid, creating an acidic environment that inhibits the growth of pathogenic microorganisms. The food preserves itself by becoming inhospitable to the very things that would spoil it.</p>

<p>What distinguishes fermented foods is not just preservation but transformation. The microbial activity generates hundreds of flavor compounds that did not exist in the original ingredient — esters, alcohols, ketones, aldehydes, peptides. This is why aged Parmigiano-Reggiano tastes nothing like fresh milk, why sourdough has a depth that yeasted bread cannot replicate, and why the umami intensity of miso is incomprehensible from its raw ingredients alone. Fermentation is a form of biochemical amplification, turning simple substrates into complex sensory experiences.</p>

<p>The gut microbiome research of the last decade has added another dimension to fermented foods' appeal. A diverse microbial community in the gut is associated with improved immune function, reduced inflammation, and even effects on mood and cognition via the gut-brain axis. Fermented foods introduce live cultures and their metabolites into the digestive system, though the mechanisms by which they interact with the resident microbiome remain an active area of research.</p>

<p>At the restaurant level, fermentation has moved from background technique to foreground philosophy. Chefs like René Redzepi at Noma have built entire tasting menus around fermented and aged preparations — garum made from insects, koji-cured meats, fermented fruit vinegars aged for years. These are not novelties but a return to a pre-industrial understanding of flavor: that patience, microorganisms, and time are as essential as heat and technique in the kitchen.</p>`,
    uid,
  },
];

// Clear ALL existing posts before reseeding
await Post.deleteMany({});
console.log("All existing posts cleared.");

// Insert posts with staggered dates so sorting works correctly
for (let i = 0; i < posts.length; i++) {
  const daysAgo = (posts.length - i) * 3;
  const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
  await Post.create({ ...posts[i], createdAt, date: createdAt });
  console.log(`Created: "${posts[i].title}"`);
}

console.log("\nAll seed posts created successfully.");
await mongoose.disconnect();
