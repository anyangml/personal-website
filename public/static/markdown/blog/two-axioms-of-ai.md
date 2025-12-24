Physics has the three laws of thermodynamics—principles so universal that they form the foundation of the field. Artificial intelligence, though much younger, is also accumulating its own guiding principles. Among them, two stand out as particularly fundamental: “the bitter lesson,” articulated by Rich Sutton, and “the second half,” proposed by YS. Taken together, they sketch the deep forces that drive progress in AI and hint at where the field is headed.

## The Bitter Lesson

In 2019, Rich Sutton, one of the pioneers of reinforcement learning, wrote an essay called The Bitter Lesson. His central claim was simple but uncomfortable: throughout the history of AI, approaches infused with human knowledge or priors work well in the short term, but in the long run, methods that rely on scale, data, and search almost always win out.

Consider computer vision. For years, the state of the art was dominated by carefully engineered feature extractors—edge detectors, corner detectors, hand-crafted descriptors like SIFT or HOG. These methods embodied deep human insight. And yet, convolutional neural networks trained on raw pixels eventually swept them aside, not because they were more elegant, but because they scaled better with data and compute.

Natural language processing tells a similar story. Linguists once built elaborate syntactic parsers and semantic ontologies. These systems could be beautifully interpretable, but brittle in practice. Large language models, with far fewer hand-built assumptions, now outperform them dramatically, even though they are opaque black boxes.

The scaling law captures this principle mathematically. As models grow larger and are trained on more data with more compute, their performance improves predictably. At sufficient scale, even details of the architecture—whether embeddings are added or concatenated, whether layers are arranged in one form or another—matter surprisingly little. What matters is the model’s sheer capacity to absorb and encode information.

This is bitter because it contradicts human intuition. Researchers often prefer elegant, interpretable designs, infused with human knowledge. But history shows that our creativity is limited compared to the open-ended brute force of scale. Features we painstakingly design are brittle; constraints we impose narrow the model’s potential. The most powerful models tend to be the least interpretable—an uncomfortable but undeniable reality.

## The Second Half

If the bitter lesson tells us how AI progresses, the second half tells us where the frontier now lies. For decades, AI researchers focused heavily on algorithms: inventing new architectures, new optimization tricks, new learning paradigms. This was the first half of the field's story. But now, as models like transformers and reinforcement learning agents generalize across domains, the bottleneck is no longer algorithmic innovation. The bottleneck is in defining the tasks themselves.

This shift is subtle but profound. Once you have a general-purpose learner, the most important question becomes: what problem do you want it to solve, and how do you express that problem as a task or reward function? Reinforcement learning illustrates this clearly. If you can specify the rules of the game, the agent will eventually learn to play it. But specifying the right rules, the right goals, the right evaluation criteria—that is far harder than it sounds.

Andrew Ng once remarked that if humans can perform a task, then a machine learning system can likely be built to solve it. If humans cannot, then neither can a machine. This captures both the optimism and the limitation of AI. Many debates about "true generalization" or "out-of-distribution performance" revolve around this question. Can models truly extrapolate, invent, and create? Or are they forever confined to interpolation within their training distributions?

I believe the second half of AI research—focused on tasks, rewards, and benchmarks—will push us toward the answer. Creativity may emerge not from inventing ever-new model architectures, but from designing environments and objectives that force models to go beyond interpolation. Reinforcement learning, especially in rich, open-ended environments, might be the path that nudges machines toward genuine novelty.

## Closing Thoughts

Taken together, the bitter lesson and the second half form two guiding axioms of AI. The first warns us that scale, compute, and data tend to dominate human ingenuity in the long run. The second reminds us that once general learners exist, the real challenge shifts to defining the goals and contexts in which they learn.

If thermodynamics gave physics its ground rules, perhaps these axioms will one day be remembered as the ground rules of artificial intelligence. They do not prescribe a single path forward, but they do mark the boundaries of what progress in AI tends to look like. And, as with the laws of physics, they remind us that the universe of intelligence is not shaped entirely by human preference, but by deeper principles we are only beginning to understand.
