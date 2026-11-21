import React from 'react';
import { PageHeader, Prose, Kbd } from '../components/Page';
import { ISSUES, href } from '../site';

const TOC: [string, string][] = [
  ['start', 'Getting started'],
  ['models', 'Choosing models'],
  ['chat', 'Chat'],
  ['call', 'Voice calls'],
  ['voice', 'Voices, Stories and transcripts'],
  ['images', 'Images'],
  ['work', 'Work and Tasks'],
  ['folder', 'Your Lotus Studio folder'],
  ['advanced', 'Advanced: engines and model files'],
  ['updates', 'Updates'],
  ['shortcuts', 'Keyboard shortcuts'],
  ['trouble', 'When something goes wrong'],
  ['help', 'Getting help'],
];

export const Docs: React.FC = () => (
  <>
    <PageHeader eyebrow="Docs" title="How to use Lotus" lead="Everything you need to get going, in plain words. Lotus is an early preview, so if something here doesn't match what you see, please tell us." />

    <div className="mx-auto mb-24 grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)]">
      <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
        <p className="text-[0.8125rem] font-medium text-[#86868b]">On this page</p>
        <ul className="mt-3 space-y-1.5 text-[0.9375rem]">
          {TOC.map(([id, label]) => (
            <li key={id}><a href={`#${id}`} className="text-[#a1a1a6] hover:text-white">{label}</a></li>
          ))}
        </ul>
      </nav>

      <Prose>
        <h2 id="start">Getting started</h2>
        <ol>
          <li><strong>Install.</strong> <a href={href('/download/')}>Download Lotus</a> and open the file. On Windows, if you see "Windows protected your PC", choose <strong>More info</strong>, then <strong>Run anyway</strong> (<a href={href('/download/#smartscreen')}>why</a>).</li>
          <li><strong>Follow the setup guide.</strong> It picks your Lotus Studio folder, checks your graphics card and suggests a chat, an image and a voice model that fit. Press Get and they download in the background.</li>
          <li><strong>Say hello.</strong> Once the chat model is ready, type in Chat, or press Call on the Voice page and talk.</li>
        </ol>
        <p>You can reopen the guide any time from <strong>Help → Setup Guide</strong>.</p>

        <h2 id="models">Choosing models</h2>
        <p>
          A model is the "brain" Lotus runs. Bigger models are smarter but need more memory on your graphics card. Lotus suggests
          three for your PC: <strong>Quick</strong> (fastest), <strong>Balanced</strong> (the everyday pick) and <strong>Best</strong>
          (highest quality that still fits). Start with Balanced.
        </p>
        <p>
          Every model on the Models page says whether it fits your computer. To see the list for a particular card before you
          download, look at <a href={href('/gpu/')}>What runs on my PC</a>. Models marked <strong>Non-commercial</strong> are for
          personal use only.
        </p>

        <h2 id="chat">Chat</h2>
        <ul>
          <li><strong>Attach anything:</strong> photos, PDFs, Word, Excel, PowerPoint and more. Everything is read on your PC.</li>
          <li><strong>Web</strong> lets Lotus search the internet when your question needs it. It's off until you turn it on.</li>
          <li><strong>Think</strong> makes the model work through a problem before answering. Turn it off for quicker replies.</li>
          <li><strong>Research</strong> turns a question into a plan you can edit, then a report where every source is one it really read.</li>
          <li><strong>Memory</strong> lets Lotus remember things you tell it. Pause it for one chat, or use Incognito to switch it off.</li>
          <li>Ask for a picture and Lotus suggests a prompt and settings. Say yes and the Images page makes it.</li>
        </ul>

        <h2 id="call">Voice calls</h2>
        <p>
          On the <strong>Voice</strong> page, press <strong>Call</strong> and start talking. Lotus listens, answers out loud and
          shows the words as it goes. To interrupt, simply start speaking: Lotus stops and listens. When you hang up, you can
          summarise the call in Chat or let Lotus remember it.
        </p>
        <ul>
          <li>Use headphones if Lotus hears itself through your speakers and stops by mistake.</li>
          <li>Change the voice in the call's settings. Built-in voices are free; your own recorded or designed voices are part of <a href={href('/pricing/')}>Lotus Pro</a>.</li>
          <li>Calls run fully offline, using the chat model you picked plus a voice and a speech-recognition model.</li>
        </ul>

        <h2 id="voice">Voices, Stories and transcripts</h2>
        <ul>
          <li><strong>Speak</strong> reads any text aloud in the voice you choose, and saves it as audio.</li>
          <li><strong>Voices</strong> copies a voice from 5 to 15 seconds of clear speech. Only copy your own voice, or a voice you have permission to use.</li>
          <li><strong>Stories</strong> gives a long text to several voices on a timeline you can play and export.</li>
          <li><strong>Speech to Text</strong> writes down recordings of any length, in the language they were spoken, and can translate or summarise them.</li>
        </ul>

        <h2 id="images">Images</h2>
        <p>
          Type what you want, or start from an example. Choose a size and how many pictures to make. Drop in a reference image to
          change an existing picture. Every run gets its own folder in <code>Lotus Studio/Images</code>.
        </p>

        <h2 id="work">Work and Tasks</h2>
        <p>
          On <strong>Work</strong>, describe a job ("write a two-page summary of these PDFs", "make a budget table"). Lotus plans
          it, may send several helper agents out at once, and hands back real files, saved in <code>Lotus Studio/Work</code>.
          Using your computer or a Chrome window is off by default, and every click asks first.
        </p>
        <p>
          <strong>Tasks</strong> is a board you share with Lotus. Assign a card to Lotus and it works through it. Routines run on
          a schedule while Lotus is open.
        </p>

        <h2 id="folder">Your Lotus Studio folder</h2>
        <p>
          Everything lives in one folder, in Documents unless you picked another place: <code>Data</code> (chats, settings,
          memory), <code>Models</code>, <code>Engines</code>, <code>Images</code>, <code>Audio</code> and <code>Work</code>. Back it
          up by copying it. Moving to a new PC? Copy the folder across and point Lotus at it.
        </p>

        <h2 id="advanced">Advanced: engines and model files</h2>
        <p>
          Lotus comes with its own engines: llama.cpp for chat, stable-diffusion.cpp for images and sherpa-onnx for voice. If you
          already use <strong>Ollama</strong>, <strong>ComfyUI</strong> or <strong>Voicebox</strong>, choose them in
          <strong> Settings → Engines</strong> and Lotus drives them instead.
        </p>
        <ul>
          <li>Add any GGUF chat model or image model from Hugging Face by pasting its link on the Models page.</li>
          <li>Image models are kept with the exact VAE and text encoders they need (Models → Image Setups). Add LoRAs there too.</li>
          <li>Arena &amp; Benchmark runs the same prompt through two or three models side by side.</li>
          <li>Coming next: MCP servers, a local API for other apps, and your own keys for cloud models. They'll be free.</li>
        </ul>

        <h2 id="updates">Updates</h2>
        <p>
          The Windows installer, the Mac app and the Linux AppImage update themselves from <strong>Settings → Updates</strong>.
          The portable zip and the .deb and .rpm packages are updated by downloading the new file.
        </p>

        <h2 id="shortcuts">Keyboard shortcuts</h2>
        <ul>
          <li><Kbd>Ctrl</Kbd> <Kbd>Alt</Kbd> <Kbd>Space</Kbd> opens the island chat</li>
          <li><Kbd>Ctrl</Kbd> <Kbd>Alt</Kbd> <Kbd>D</Kbd> starts or stops dictation</li>
          <li><Kbd>Ctrl</Kbd> <Kbd>Alt</Kbd> <Kbd>T</Kbd> shows or hides the island</li>
          <li><Kbd>Ctrl</Kbd> <Kbd>Alt</Kbd> <Kbd>S</Kbd> shows or hides the left panel</li>
          <li><Kbd>Ctrl</Kbd> <Kbd>Alt</Kbd> <Kbd>I</Kbd> shows or hides the right panel</li>
        </ul>

        <h2 id="trouble">When something goes wrong</h2>
        <h3>Replies are very slow</h3>
        <p>
          The model is probably too big for your graphics card and is spilling into normal memory. Pick the Quick or Balanced
          model for your PC on the Models page, and close games or other apps that use the graphics card.
        </p>
        <h3>An image fails with "out of memory"</h3>
        <p>Try a smaller size, one image at a time, or the "(small)" version of the model. Lotus unloads the chat model while it draws.</p>
        <h3>A download stops</h3>
        <p>Press Get again: Lotus continues where it left off. Downloads come straight from Hugging Face and GitHub, so a slow connection there slows them too.</p>
        <h3>The call stops by itself</h3>
        <p>Lotus probably heard its own voice through your speakers and thought you were speaking. Use headphones, or turn the speakers down.</p>

        <h2 id="help">Getting help</h2>
        <p>
          <a href={ISSUES}>Open an issue on GitHub</a> and describe what happened. Lotus is built by one independent developer,
          so please be patient. Pro buyers will also get email support, with a reply within 3 working days.
        </p>
      </Prose>
    </div>
  </>
);
