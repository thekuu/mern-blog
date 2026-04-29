import dotenv from "dotenv";
import { eq, desc } from "drizzle-orm";
import { db, pool } from "./db.js";
import { users, posts as postsTable } from "./schema.js";

dotenv.config();

if (!process.env.NEON_DATABASE_URL && !process.env.DATABASE_URL) {
  console.error("No Postgres connection string set (NEON_DATABASE_URL or DATABASE_URL).");
  process.exit(1);
}
console.log("Connected to Postgres (Neon)");

const authorRows = await db.select().from(users).where(eq(users.username, "thekey")).limit(1);
const author = authorRows[0];
if (!author) {
  console.error("User 'thekey' not found. Run seed.js first.");
  process.exit(1);
}
const uid = author.id;

const posts = [

  // ── TECHNOLOGY ───────────────────────────────────────────────────────────────
  {
    title: "The Rise of Edge Computing",
    cat: "technology",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    desc: `<h2>From Cloud to Edge</h2>
<p>For the better part of a decade, the dominant model of computing was straightforward: devices at the periphery capture data, send it to a centralized cloud, and receive instructions back. The cloud's advantages were obvious — vast storage, elastic compute, easy management. Its limitations were less visible, until the applications that exposed them began to proliferate.</p>

<p>Edge computing inverts this model. Rather than routing all data to a distant data center, computation happens as close as possible to where data is generated — on the device itself, on a local server, or on a regional node a few milliseconds away. The driving forces behind this shift fall into three categories:</p>

<ul>
  <li><strong>Latency:</strong> Applications like autonomous vehicles, surgical robotics, and industrial automation cannot tolerate the round-trip delay of a cloud call. Decisions must happen in milliseconds, locally.</li>
  <li><strong>Bandwidth:</strong> A modern factory floor may generate terabytes of sensor data per hour. Transmitting all of it to the cloud is economically and practically unsustainable.</li>
  <li><strong>Privacy and sovereignty:</strong> Regulations in healthcare, finance, and government increasingly require that sensitive data never leave a defined geographic boundary.</li>
</ul>

<h2>What Changes at the Edge</h2>
<p>The technical challenges of edge deployment are substantial. Unlike cloud infrastructure — standardized, climate-controlled, centrally managed — edge hardware is heterogeneous and exposed. A processing unit embedded in a wind turbine on the North Sea faces conditions utterly unlike a server rack in a Virginia data center.</p>

<p>Software architecture must also adapt. Containerization and lightweight orchestration systems designed for the edge allow applications to run reliably across diverse hardware profiles. Models once trained in the cloud are compressed and deployed to edge devices, where inference happens without a network call. This pattern — <strong>cloud for training, edge for inference</strong> — is rapidly becoming standard in production AI systems.</p>

<p>The result is a computing landscape that is genuinely distributed: not centralized, not purely local, but a tiered architecture where each layer handles the work it is best suited for. The cloud does not disappear; it becomes the coordination layer for a network of intelligent, semi-autonomous nodes at the periphery.</p>`,
    uid,
  },

  // ── SCIENCE ──────────────────────────────────────────────────────────────────
  {
    title: "Dark Matter: The Universe's Invisible Scaffold",
    cat: "science",
    img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80",
    desc: `<p>Approximately 27% of the universe is made of something we cannot see, detect directly, or explain with any particle in the current Standard Model of physics. We call it <strong>dark matter</strong> — a name that is more confession of ignorance than description. We know it exists because of what it does, not because of what it is.</p>

<h2>The Evidence</h2>
<p>The case for dark matter rests on multiple independent lines of evidence, each pointing to the same conclusion:</p>

<ol>
  <li><strong>Galaxy rotation curves:</strong> Stars at the outer edges of spiral galaxies orbit far faster than they should given the visible mass at the center. Something unseen must be providing additional gravitational pull.</li>
  <li><strong>Gravitational lensing:</strong> The bending of light around galaxy clusters is far stronger than the visible mass can account for. The Bullet Cluster — two colliding galaxy clusters — provides a particularly clean demonstration: ordinary matter slowed down in the collision, while the gravitational lensing signal (presumed dark matter) passed through unimpeded.</li>
  <li><strong>Large-scale structure:</strong> Computer simulations of cosmic structure formation only produce the web of filaments and voids we observe when dark matter is included. Without it, the universe looks nothing like the one we inhabit.</li>
</ol>

<h2>What It Might Be</h2>
<p>The leading candidates include <strong>WIMPs</strong> (Weakly Interacting Massive Particles), which interact via gravity and the weak nuclear force but not electromagnetism — making them invisible to conventional detectors. Decades of increasingly sensitive experiments have searched for WIMPs without a confirmed detection, which has not ruled them out but has significantly constrained the parameter space.</p>

<p>Other candidates include axions — extremely light particles originally proposed to solve a different problem in particle physics — and primordial black holes formed in the early universe. Each comes with its own experimental signature and its own set of theoretical tensions.</p>

<p>What is striking is that despite being the dominant form of matter in the universe, dark matter has never once been directly detected. It is among the most consequential things we do not understand — a reminder that the visible universe, the part we can photograph and measure and theorize about, is a thin layer atop something far more vast and far more strange.</p>`,
    uid,
  },

  // ── ART ──────────────────────────────────────────────────────────────────────
  {
    title: "Street Art and the Ownership of Public Space",
    cat: "art",
    img: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&w=1200&q=80",
    desc: `<p>Street art exists in permanent tension with the structures that govern public space. It appears without permission, claims surfaces that belong to others, and communicates to audiences who did not seek it out. This is not incidental to its nature — it is the nature. To sanitize that tension is to misunderstand the form entirely.</p>

<blockquote>
"The thing I hate the most about advertising is that it attracts all the bright, creative and ambitious young people, leaving us mainly with the slow and self-obsessed to become our artists." — Banksy
</blockquote>

<p>The history of street art is inseparable from the history of marginalized communities asserting presence in spaces that systematically excluded them. The murals of the Chicano movement in 1970s Los Angeles, the tags proliferating across New York's subway system in the same era, the political stencils of post-dictatorship Buenos Aires — each was an act of visibility by groups whose visibility was otherwise suppressed.</p>

<h2>When the Walls Get Curated</h2>
<p>The institutionalization of street art raises questions it cannot cleanly answer. When a city commissions a mural, authorizes a street art festival, or converts a formerly illegal wall into a legal canvas, something changes — not in the paint, but in the act. The work becomes decoration rather than disruption. The relationship between artist and surface shifts from transgression to contract.</p>

<p>Banksy has navigated this paradox more deliberately than most. Works destroyed almost immediately after creation, pieces appearing in war zones, installations designed to self-shred at auction — each move is calculated to resist absorption into the art market's logic of scarcity and valuation. The irony is that this resistance has itself become a brand, generating the market value it was designed to undermine.</p>

<p>None of this makes street art less interesting — it makes it more so. The form thrives on contradiction. It is both democratic and elitist, illegal and celebrated, ephemeral and preserved in ten thousand photographs the moment it appears. What it consistently does, at its best, is force a question that urban space usually forecloses: who does this wall actually belong to?</p>`,
    uid,
  },

  // ── CINEMA ───────────────────────────────────────────────────────────────────
  {
    title: "The Unreliable Narrator: Trust and Deception in Film",
    cat: "cinema",
    img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80",
    desc: `<p>Cinema is built on a fundamental deception: we are invited to trust what we see. The frame is the world. Light and shadow construct a reality we accept without negotiating the terms. The unreliable narrator exploits this trust — not to betray the audience, but to reveal something about the limits of perspective that a more straightforward telling could not.</p>

<h2>The Classic Case</h2>
<p>The device is as old as storytelling, but cinema found in it a particular power. In <em>Rashomon</em> (1950), Kurosawa presents the same murder from four incompatible perspectives, each internally coherent, each self-serving. There is no omniscient correction. The audience leaves not with a resolution but with a question about the nature of truth itself — whether any account of events can escape the gravity of the teller's interests.</p>

<p><em>The Usual Suspects</em> operates differently: here, the unreliability is not philosophical but structural. Verbal Kint controls the story because he controls the telling, and the audience, seduced by narrative logic, does not think to question the storyteller's authority until it is too late. The film weaponizes cinematic grammar — the flashback, the authoritative voiceover — against the viewer's own assumptions.</p>

<h2>Form as Argument</h2>
<p>What separates the unreliable narrator as technique from the unreliable narrator as gimmick is whether the deception is thematically load-bearing. The best examples use unreliability to say something irreducible about:</p>

<ul>
  <li>The nature of memory (<em>Memento</em>, <em>Eternal Sunshine of the Spotless Mind</em>)</li>
  <li>The psychology of trauma (<em>Jacob's Ladder</em>, <em>Shutter Island</em>)</li>
  <li>The construction of identity (<em>Fight Club</em>, <em>Mulholland Drive</em>)</li>
</ul>

<p>In each case, the revelation is not the point — the point is what the revelation retroactively illuminates about everything we already watched. Lynch's <em>Mulholland Drive</em> pushes this furthest: the film does not reveal an alternative reality so much as suggest that the entire question of which version is "real" is the wrong question. Both versions are true. Neither is complete. The gap between them is where the film actually lives.</p>`,
    uid,
  },

  // ── DESIGN ───────────────────────────────────────────────────────────────────
  {
    title: "The Psychology of Color in Design",
    cat: "design",
    img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80",
    desc: `<p>Color is the fastest communicating element in visual design. Before a user reads a word or registers a shape, color has already delivered a signal — about tone, about trust, about the emotional register of what they are about to engage with. This makes it enormously powerful and, for the same reason, enormously easy to get wrong.</p>

<h2>What Research Actually Shows</h2>
<p>The popular version of color psychology is riddled with overstatement. The claim that blue universally communicates trust, or that red invariably creates urgency, collapses under cross-cultural scrutiny. Color meaning is deeply context-dependent, shaped by:</p>

<ul>
  <li>Cultural associations that vary substantially across geographies</li>
  <li>The surrounding palette — a color reads differently against white than against black</li>
  <li>Industry conventions that create expectations users apply unconsciously</li>
  <li>Personal history and individual variation</li>
</ul>

<p>What is more consistently supported is that <strong>color harmony</strong> — the internal coherence of a palette — reliably affects perceived quality. Dissonant combinations read as amateur regardless of what individual colors are used. A brand with a well-constructed palette signals competence before its product is evaluated.</p>

<h2>Applied Thinking</h2>
<p>Skilled designers approach color less as a system of fixed meanings and more as a vocabulary with syntax. The questions worth asking are not "what does blue mean?" but rather: what is this color doing in relation to every other color in the system? What does it emphasize, and what does it subordinate? Where does the eye go first, and where next?</p>

<p>Accessibility adds a non-negotiable layer to this thinking. Approximately 8% of men and 0.5% of women have some form of color vision deficiency. A design that relies solely on color to communicate — using red for error, green for success, with no other distinguishing signal — fails a meaningful portion of its audience. Contrast ratios mandated by WCAG standards are a floor, not a ceiling.</p>

<p>The most sophisticated color work in contemporary design is systematic rather than decorative. Design tokens, semantic color naming, and dark-mode-aware palettes treat color as an infrastructural layer rather than a cosmetic one. The best color systems are nearly invisible in use — felt rather than noticed, which is precisely the point.</p>`,
    uid,
  },

  // ── ART (Camus) ──────────────────────────────────────────────────────────────
  {
    title: "Camus and the Artist: Creation as the Ultimate Revolt",
    cat: "art",
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80",
    desc: `<p>Albert Camus was not primarily a literary theorist, and he would have been suspicious of anyone who tried to make him one. He was, first and last, a man seized by questions — about suffering, about solidarity, about whether a life without guaranteed meaning could still be lived fully and honestly. But running through everything he wrote, from the early notebooks to the final, unfinished manuscript found in the wreckage of his car, was a conviction about art that is as radical now as it was in 1942: <strong>to create is to refuse.</strong></p>

<h2>The Absurd and Why It Demands a Response</h2>
<p>Camus's starting point is what he called the <em>absurd</em> — not a property of the world, and not a property of the human mind, but the collision between them. The world is silent. It offers no explanation for suffering, no guarantee of justice, no confirmation that our longing for clarity will ever be satisfied. And yet we long anyway. We demand that the universe make sense, and the universe, indifferently, does not answer.</p>

<blockquote>
"The absurd is born of the confrontation between the human need and the unreasonable silence of the world."
</blockquote>

<p>Faced with this collision, Camus argued, there are three possible responses. The first is physical suicide — the literal refusal to continue. The second is what he called philosophical suicide: leaping into faith, embracing a belief system that dissolves the tension by supplying the transcendent meaning the world refuses to provide. Both of these, he insisted, are evasions. They resolve the absurd by abandoning one of its terms.</p>

<p>The third response — the only honest one — is revolt. To live without appeal. To refuse the leap and refuse the exit, to hold the absurd open and keep walking anyway.</p>

<h2>Where Art Enters</h2>
<p>This is precisely where artistic creation becomes, for Camus, not a decoration on top of philosophical life but its highest expression. In <em>The Myth of Sisyphus</em>, he dedicates an entire section to the absurd creator, and the argument is worth sitting with carefully.</p>

<p>The artist, Camus writes, does not create to escape meaninglessness — that would be philosophical suicide in aesthetic clothing. The serious artist creates <em>in full knowledge</em> of meaninglessness, and creates anyway. The work of art does not claim to resolve anything. It does not preach. It does not offer consolation by gesturing toward a higher order. It simply presents — a world, a character, a moment of experience — rendered with enough precision and honesty that the reader encounters something real.</p>

<blockquote>
"To work and create 'for nothing', to sculpture in clay, to know that one's creation has no future, to see one's work destroyed in a day while being aware that fundamentally this has no more importance than building for centuries — this is the difficult wisdom that absurd thought sanctions."
</blockquote>

<p>This is why Camus distrusted art that moralizes, that resolves its tensions too neatly, that leaves the reader feeling instructed rather than implicated. His own novels — <em>The Stranger</em>, <em>The Plague</em>, <em>The Fall</em> — do not tell you how to feel. <em>The Stranger</em> ends with Meursault opening himself to the gentle indifference of the world and finding something like peace in it, but Camus does not endorse this peace or condemn it. He presents it. The reader is left to reckon with it alone.</p>

<h2>The Mediterranean Dimension</h2>
<p>There is a sensory dimension to Camus's aesthetic that purely philosophical readings miss. He was born in Algeria, grew up poor in Belcourt, and carried throughout his life an almost physical attachment to light, heat, and the sea. His notebooks are full of passages that read less like philosophy and more like prose poems — meditations on the sun on white walls, on swimming in the harbor, on the smell of the city in summer.</p>

<p>This is not incidental. For Camus, the body's pleasure in the world is itself a form of knowledge — a counterweight to abstraction, a reminder that revolt is not merely intellectual but lived. The artist who creates from within embodied experience, who refuses to aestheticize suffering into something bearable or beautiful on false terms, is practicing a form of solidarity. Not because the work will fix anything, but because the honesty of the witness matters.</p>

<h2>Why It Still Holds</h2>
<p>Camus died in 1960, at forty-six, in circumstances that felt almost cosmically ironic — killed not by the absurdity he had spent his life confronting but by a car accident on a road in Provence, his unfinished novel in his bag. He never resolved the tensions he spent his life holding open. He was not supposed to.</p>

<p>What he left is not a system but a stance: that art made honestly, without evasion, without false comfort, is one of the few things a human being can do that is fully worthy of the situation we find ourselves in. Not because it saves us. Because it does not pretend to.</p>

<p>In an era of content — of frictionless consumption, algorithmic comfort, and relentless optimization for engagement — this feels less like a historical position and more like a live challenge. To make something that holds difficulty open rather than resolving it prematurely. To refuse the consolation prize of easy meaning. To create, as Camus put it, <em>in spite of</em> everything.</p>

<p>That is still, perhaps, the most interesting thing an artist can do.</p>`,
    uid,
  },

  // ── FOOD ─────────────────────────────────────────────────────────────────────
  {
    title: "The Art and Science of Spice Blending",
    cat: "food",
    img: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=1200&q=80",
    desc: `<p>A spice blend is a theory of flavor — an argument, compressed into a mixture, about which tastes should reinforce one another, which should create tension, and how heat, sweetness, bitterness, and aromatics should be sequenced on the palate. The great spice traditions of the world are not arbitrary; they encode centuries of empirical knowledge about how chemical compounds interact.</p>

<h2>The Structure of a Blend</h2>
<p>Most classic blends follow an implicit architecture. There are base notes — spices like cumin, coriander, and fenugreek that provide depth and body but do not dominate. There are mid notes — paprika, turmeric, dried chilies — that carry the blend's characteristic identity. And there are top notes — cinnamon, cardamom, clove, fresh herbs — that register first on the nose and fade quickly, creating the aromatic impression that precedes the actual taste.</p>

<p>Ras el hanout, the Moroccan blend whose name translates roughly to "head of the shop" (the spice merchant's best), can contain anywhere from a dozen to thirty ingredients. The variation between producers is not randomness but philosophy — each blend reflects a distinct position on the relative weight of warmth versus brightness, floral versus savory, sweet versus earthy.</p>

<h2>Heat as a Dimension</h2>
<p>Capsaicin, the active compound in chili peppers, is not technically a flavor — it is a pain signal. It binds to the same receptor that detects heat above 43°C, creating the sensation of burning without actual tissue damage. What makes chili heat interesting in culinary terms is its interaction with other compounds:</p>

<ul>
  <li>Fat solubility means that dairy, coconut milk, and oil carry capsaicin flavor while also providing a relief mechanism</li>
  <li>Acidity (citrus, vinegar) brightens chili heat and shifts its perceived character from blunt to sharp</li>
  <li>Sugar suppresses the pain signal slightly, which is why sweet-heat combinations are so persistently compelling</li>
</ul>

<p>Understanding this allows a cook to treat heat not as a volume control but as a textured element with directionality. The slow, building heat of dried ancho chili is categorically different from the immediate, high-register punch of fresh bird's eye — and both are different again from the floral, almost narcotic quality of Sichuan peppercorn, which achieves its numbing effect not through capsaicin but through hydroxy-alpha sanshool acting on different nerve pathways entirely.</p>

<p>To blend spices well is to think in time as much as in flavor: what hits first, what lingers, what the finish communicates about everything that came before it. It is, in the most literal sense, a form of composition.</p>`,
    uid,
  },

];

// Insert posts with staggered dates newer than existing ones
const latestRows = await db.select().from(postsTable).orderBy(desc(postsTable.createdAt)).limit(1);
const baseDate = latestRows[0] ? latestRows[0].createdAt : new Date();

for (let i = 0; i < posts.length; i++) {
  const daysAhead = (i + 1) * 2;
  const createdAt = new Date(baseDate.getTime() + daysAhead * 24 * 60 * 60 * 1000);
  await db.insert(postsTable).values({
    title: posts[i].title,
    desc: posts[i].desc,
    img: posts[i].img,
    cat: posts[i].cat,
    uid: posts[i].uid,
    createdAt,
  });
  console.log(`Created: "${posts[i].title}"`);
}

console.log("\nAll new posts added successfully.");
await pool.end();
