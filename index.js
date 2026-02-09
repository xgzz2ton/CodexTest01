const fortunes = [
  {
    name: "大吉",
    messages: [
      "勢いのある一日。迷ったら前へ。",
      "準備してきたことが実りやすい日です。",
      "周りへの気配りが運気をさらに上げます。"
    ],
    effect: "extreme",
    color: "#ff4d7a",
    particles: 24
  },
  {
    name: "吉",
    messages: [
      "小さな挑戦が大きな手応えにつながります。",
      "丁寧な確認が良い流れを作ります。",
      "素直な行動がチャンスを呼び込みます。"
    ],
    effect: "bright",
    color: "#ffa542",
    particles: 16
  },
  {
    name: "中吉",
    messages: [
      "焦らず進めばしっかり成果が出ます。",
      "相談すると良いヒントをもらえます。",
      "いつも通りを大切にすると安定します。"
    ],
    effect: "gold",
    color: "#ffc833",
    particles: 14
  },
  {
    name: "小吉",
    messages: [
      "無理のないペースで進むのが正解です。",
      "身の回りを整えると気分が軽くなります。",
      "休憩をうまく取ると運気も整います。"
    ],
    effect: "bounce",
    color: "#ff9a76",
    particles: 10
  },
  {
    name: "末吉",
    messages: [
      "今日は基礎固めに向いた日です。",
      "派手さよりも確実さを優先しましょう。",
      "一歩ずつ進めるほど後半に伸びます。"
    ],
    effect: "ripple",
    color: "#89c2ff",
    particles: 8
  },
  {
    name: "凶",
    messages: [
      "急ぎすぎに注意。慎重さが守りになります。",
      "予定を詰めすぎず、余白を作りましょう。",
      "気分転換してから再開すると流れが変わります。"
    ],
    effect: "wobble",
    color: "#9aa0b9",
    particles: 6
  }
];

const drawButton = document.getElementById("draw");
const fortuneNameEl = document.getElementById("fortune-name");
const fortuneMessageEl = document.getElementById("fortune-message");
const card = document.getElementById("card");
const particleLayer = document.getElementById("particles");

const effectClasses = [
  "effect-extreme",
  "effect-bright",
  "effect-gold",
  "effect-bounce",
  "effect-ripple",
  "effect-wobble"
];

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function spawnParticles(color, count) {
  particleLayer.innerHTML = "";
  const rect = card.getBoundingClientRect();

  for (let i = 0; i < count; i += 1) {
    const dot = document.createElement("span");
    dot.className = "particle";
    dot.style.setProperty("--color", color);

    const x = rect.left + rect.width / 2 + (Math.random() - 0.5) * rect.width * 0.8;
    const y = rect.top + rect.height / 2 + (Math.random() - 0.2) * rect.height * 0.5;

    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.style.animationDelay = `${Math.random() * 0.2}s`;
    dot.style.width = `${8 + Math.random() * 10}px`;
    dot.style.height = dot.style.width;

    particleLayer.appendChild(dot);
    setTimeout(() => dot.remove(), 1100);
  }
}

function applyEffect(effectName) {
  effectClasses.forEach((className) => card.classList.remove(className));
  if (effectName) {
    card.classList.add(`effect-${effectName}`);
  }
}

function drawFortune() {
  const fortune = pickRandom(fortunes);
  const message = pickRandom(fortune.messages);

  fortuneNameEl.textContent = fortune.name;
  fortuneMessageEl.textContent = message;

  applyEffect(fortune.effect);
  spawnParticles(fortune.color, fortune.particles);
}

drawButton.addEventListener("click", drawFortune);
