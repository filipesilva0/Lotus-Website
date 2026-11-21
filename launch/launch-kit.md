# Lotus launch kit

Drafts for launch day and the weeks after, from the "Launch and marketing" section of the business plan. Fill in everything in `[square brackets]` before posting.

**House rules, for every post below**

- Always say you are the developer, in the first lines.
- No fake reviews, no sock-puppet accounts, no asking friends to upvote.
- Answer the question first, then link Lotus, and only when it really helps.
- Never name competitors in ads. Comparisons stay on the comparison pages, written fairly.
- Say what doesn't work yet. Lotus is an early preview, and people forgive rough edges they were told about.

**Links to fill in**

- Website: `[https://filipesilva0.github.io/Lotus-Website/]` (or the domain, once there is one)
- Download: `[website]/download/`
- What runs on my PC: `[website]/gpu/`
- Video: `[YouTube link]`
- Source: https://github.com/filipesilva0/Lotus

---

## 1. The 60-second video

**The one idea:** a person interrupts Lotus mid-sentence on a voice call, in a custom voice, fully offline, on a mid-range GPU.

**Setup before recording**

- An ordinary PC with an RTX 4060 (8 GB). Show the card name on screen once, so nobody thinks it's a server.
- Wi-Fi visibly off (the taskbar icon, or unplug the cable on camera).
- Chat model: Qwen 3 8B (the Balanced pick for 8 GB cards). Voice: a voice you designed or recorded in Voices, with consent (your own voice is safest).
- Headphones or a good echo-cancelling mic, so the interruption is clean.
- Record the screen at 1080p, plus a phone camera on your face for the cut-ins if you're comfortable.
- Record everything for real, in one take per scene. No speeding up the AI's replies. If you trim pauses, say so in the description.

**Script** (vertical 9:16 for Shorts and TikTok; a 16:9 cut for YouTube and the website)

| Time | On screen | Audio |
| --- | --- | --- |
| 0:00–0:03 | Close-up of the taskbar: Wi-Fi off. Text: "No internet." | You: "My Wi-Fi is off. Watch this." |
| 0:03–0:06 | Lotus window, Voice page. Press **Call**. Text: "RTX 4060 · 8 GB" | Call connects. |
| 0:06–0:14 | Live transcript scrolling | You: "Plan my study week. Exams start Monday." Lotus starts answering in the custom voice. |
| 0:14–0:20 | Lotus mid-sentence. Text pops: "Interrupting…" | You cut in: "Wait, I only have three days." Lotus stops within a moment. |
| 0:20–0:30 | Transcript shows it changed course | Lotus: "Got it, three days…" with a new plan. |
| 0:30–0:38 | Quick cut: Voices page, the voice you made. Text: "Your own voice. Made on this PC." | You: "That's a voice I made, right here." |
| 0:38–0:48 | Quick cuts, 2 seconds each: Chat answering, Images drawing a picture, Work handing back a document | You: "Same app: chat, pictures, and it does jobs for you." |
| 0:48–0:55 | Lotus logo, text: "Your own AI. One app instead of four." | You: "It's called Lotus. I made it." |
| 0:55–1:00 | Text: "Free for Windows · [website]" | You: "It's free. Link below." |

**Description (all platforms)**

> I'm the developer of Lotus, a free app that runs your own AI on your PC. This is a real, unedited voice call on an RTX 4060 with the Wi-Fi off: I interrupt it mid-sentence and it changes course. The voice is one I made in the app. Chat, images, voice and agents in one app. Free download: [website]. Custom voices are part of Lotus Pro ($59 once, $39 for the first 500 buyers).

**Pinned comment:** "Questions about hardware? This page shows what runs on your card: [website]/gpu/"

---

## 2. r/LocalLLaMA post

Check the subreddit's current self-promotion rules on the day. Post from your own account, reply to every comment for the first few hours, and don't ask anyone to upvote.

**Title**

> I built a local AI app where you can interrupt voice calls mid-sentence. Free, runs on an 8 GB card (I'm the dev)

**Body**

> Hi all, I'm the developer of Lotus, a desktop app that puts chat, voice calls, image generation and agents in one window, all running locally. I've lurked here for ages, and a lot of what's in it came from threads here, so I wanted to show it to you first.
>
> **Demo (60 s, unedited, Wi-Fi off, RTX 4060 8 GB):** [video link]
>
> **What it is**
>
> - One app instead of a chat UI + ComfyUI + a TTS app + an agent tool.
> - Voice calls with barge-in: the mic stays open while it talks, with echo cancellation and a threshold that follows how loud its own voice is in the mic, so you can cut in without headphones on most setups.
> - Ships its own engines: llama.cpp for chat, stable-diffusion.cpp for images, sherpa-onnx for TTS/STT (Kokoro, Piper, Whisper, PocketTTS for cloning). It downloads the right build for your GPU (CUDA, Vulkan for AMD/Intel, Metal on Mac).
> - Or point it at your existing Ollama, ComfyUI or Voicebox.
> - Picks models to fit your VRAM and sizes the context from free VRAM so 8 GB cards don't spill into RAM. Per-GPU lists are here, generated from the app's catalog: [website]/gpu/
> - Any GGUF from Hugging Face by link; image models are kept with their exact VAE/text encoders; LoRAs.
>
> **Some numbers from my own test set** (31 real tasks: file edits, tasks, routines, web, memory). Qwen 3 8B passed 30/31, Nemotron 3 Nano 4B 26/31, Llama 3.2 3B 22/31. Small sample, my tasks, take it with salt; happy to share the harness.
>
> **What's not there yet (honestly):** MCP, a local OpenAI-compatible API, and BYO cloud keys are planned. Windows is the main target; Mac and Linux builds work but get less testing. It's an early preview, so expect rough edges.
>
> **Price:** free, no account, no telemetry. There's an optional one-time Pro licence ($59, $39 for the first 500) for voice cloning, your own voices in calls and multi-voice stories. Every enthusiast setting stays free.
>
> Source is public: https://github.com/filipesilva0/Lotus
>
> I'd love feedback, especially on which models you'd want in the default picks for each VRAM tier.

---

## 3. Show HN

Post on a weekday morning, US Eastern time. Stay in the thread for the first few hours.

**Title** (80 characters max)

> Show HN: Lotus – a local AI app with voice calls you can interrupt

**URL:** `[website]`

**First comment (post it yourself right after submitting)**

> Hi HN, I'm the developer. Lotus is a desktop app (Tauri + a small Bun daemon) that runs chat, voice, image generation and agents locally, in one window. I built it because running "your own AI" meant four apps with four setups, and I wanted something I could hand to a non-technical friend.
>
> The part I'm proudest of is the voice call: the mic stays open while it speaks, so you can interrupt it mid-sentence and it stops and listens. Everything runs offline; here it is on an 8 GB RTX 4060 with Wi-Fi off: [video].
>
> Under the hood it downloads llama.cpp, stable-diffusion.cpp and sherpa-onnx builds that match your GPU, and picks models that fit your VRAM. It can also drive Ollama, ComfyUI or Voicebox if you already have them.
>
> No account, no telemetry. The core is free; there's an optional one-time Pro licence for custom voices. Source is public on GitHub. It's an early preview, mostly tested on Windows.
>
> Happy to answer anything, especially about barge-in, VRAM sizing or packaging three native engines in one app.

---

## 4. Product Hunt

Launch in the same week as HN, on a Tuesday to Thursday, at 12:01 AM Pacific. Don't ask for upvotes anywhere; asking people to "check it out" is fine.

- **Name:** Lotus
- **Tagline** (60 characters max): `Your own AI on your PC. One app instead of four.`
- **Description** (260 characters max):
  > Chat, talk, make images and get things done, all on your own PC. Voice calls you can interrupt mid-sentence, fully offline. Lotus picks models that fit your graphics card. Free, no account, no telemetry. Optional one-time Pro for custom voices.
- **Topics:** Artificial Intelligence, Productivity, Privacy, Windows
- **Gallery:** (1) the 60-second video, (2) the home page hero, (3) Chat, (4) Images, (5) Voice call, (6) Work with agents, (7) the "What runs on my PC" page for an RTX 4060.
- **Pricing:** Free, with optional paid upgrade.

**Maker comment**

> Hi Product Hunt! I'm the developer of Lotus.
>
> I wanted my own AI, on my own PC, without learning what Ollama, ComfyUI or GGUF mean, and without four different apps. Lotus is that: chat, voice, images and agents in one calm window. It looks at your graphics card and picks models that fit.
>
> Try the voice call: talk, and interrupt it mid-sentence. It stops and listens, like a person. With the internet off.
>
> Lotus is free. Pro is a one-time $59 for custom voices and multi-voice stories, and the first 500 buyers pay $39. No subscription, ever, because nothing runs on my servers.
>
> It's an early preview and Windows comes first. I'll be here all day: tell me what breaks!

---

## 5. YouTuber pitches

**Plan:** 10 personal pitches a week for weeks 1 to 4, to local-AI and PC-hardware channels. Each gets a free Pro key and one demo idea that fits their channel. Keep a sheet with: channel, contact, date sent, idea, reply, follow-up date. One polite follow-up after a week, then stop.

**Rules:** watch at least two of their recent videos first, and mention one specifically. No payment for coverage, no asking for a positive review. If they make a video, they're free to criticise it.

**Email template**

> **Subject:** A local AI you can interrupt mid-sentence, for your [card / topic] videos
>
> Hi [name],
>
> I'm [your name], the developer of Lotus, a free Windows app that runs chat, voice calls, image generation and agents locally, in one window. I liked your [video title], especially [one specific thing].
>
> I think one thing in Lotus would suit your channel: [demo idea]. Here's 60 seconds of it, unedited, on an RTX 4060 with Wi-Fi off: [video].
>
> Here's a free Pro key if you'd like to try it, no strings attached: [key]. If you cover it, please say whatever you really think, good or bad. If it breaks, I'd love to hear how.
>
> The download is at [website]/download/, and [website]/gpu/[their card]/ shows what should run on your test rig.
>
> Thanks for reading,
> [name]
> Developer of Lotus · [website]

**Demo ideas by channel type**

| Channel type | Demo idea |
| --- | --- |
| GPU reviews and benchmarks | "How much local AI can a [card] really run?" Use the card's page on the site, then try Quick, Balanced and Best live. |
| Budget PC builds | "A $600 PC that talks back": voice call and images on an 8 GB card, Wi-Fi off. |
| Local LLM / AI tinkerers | Interrupt test: compare how quickly it stops and changes course with different models. |
| Privacy and self-hosting | Wi-Fi off, Task Manager open to show no network traffic, the privacy page side by side. |
| Productivity | Hand Work a job by voice and get a finished document back. |
| Creators and storytellers | Multi-voice Stories: turn a short script into a radio play with their own voice as narrator. |
| Non-English channels | A call in Portuguese, Spanish, German or French with a built-in voice. |

---

## 6. Every release

For each new version, the same three pieces:

1. **Changelog post** on GitHub Releases (already written from `release-notes/`) and pinned in the Discord.
2. **A short thread** (X, Bluesky, Reddit profile), 3 to 5 posts:
   > Lotus [version] is out (I'm the dev). The headline: [one sentence]. [clip]
   > Also new: [two or three short lines]
   > Free download: [website]/download/
3. **A 20-second clip** of the newest feature, no music needed, captions burned in, ending on "[website]".

---

## 7. Directories and listings

Each as its own small pull request or form, written as the developer:

- [ ] awesome-local-AI style lists on GitHub (one line, in each list's own format and section)
- [ ] Ollama's community integrations list in its README (Lotus can drive Ollama)
- [ ] AlternativeTo: list Lotus as an alternative to LM Studio, Jan, Msty and ChatGPT desktop
- [ ] MajorGeeks submission
- [ ] FileHorse submission
- [ ] Microsoft Store listing, once the MSIX is published (then set `STORE_URL` in `src/site.ts`)

---

## 8. Launch day checklist

- [ ] Pro checkout ready on Polar; set `BUY_URL` in `src/site.ts` so the Pricing button turns on.
- [ ] Founder counter added to the Pricing page.
- [ ] Video uploaded to YouTube Shorts and TikTok, with the description above.
- [ ] r/LocalLLaMA post, then Show HN, then Product Hunt within the same week.
- [ ] Reply to every comment for the first 48 hours. Thank people for bug reports and fix the quick ones fast.
- [ ] Start the YouTuber sheet: the first 10 pitches.
