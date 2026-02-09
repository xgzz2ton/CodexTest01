const fortunes = [
  {
    min: 1,
    max: 5,
    name: "エクストリーム大吉",
    messages: [
      "今日はフルアクセル。思い切った挑戦が大当たり。",
      "自信を持って前進すると、流れが一気に開きます。",
      "迷ったらGO。行動した分だけ運が味方します。"
    ],
    effect: "extreme",
    color: "#ff4d7a",
    particles: 26
  },
  {
    min: 6,
    max: 20,
    name: "超うれしい吉",
    messages: [
      "勢いがある日。小さな工夫が大きく効きます。",
      "楽しみながら進めるほど、結果がついてきます。",
      "チームワークを意識するとさらに伸びます。"
    ],
    effect: "bright",
    color: "#ffa542",
    particles: 18
  },
  {
    min: 21,
    max: 30,
    name: "大吉",
    messages: [
      "素直な姿勢がチャンスを引き寄せます。",
      "目の前のことを丁寧に進めると好結果に。",
      "良い知らせが入りやすい一日です。"
    ],
    effect: "gold",
    color: "#ffc833",
    particles: 16
  },
  {
    min: 31,
    max: 50,
    name: "中吉",
    messages: [
      "落ち着いた行動が安定した成果につながります。",
      "まず一つ仕上げると、次がスムーズに進みます。",
      "相談と確認を挟むと精度が上がります。"
    ],
    effect: "bounce",
    color: "#ff9a76",
    particles: 12
  },
  {
    min: 51,
    max: 70,
    name: "小吉",
    messages: [
      "無理をしない計画が正解です。",
      "基本を丁寧にやるほど、後半が楽になります。",
      "今日は整えることに価値があります。"
    ],
    effect: "ripple",
    color: "#89c2ff",
    particles: 10
  },
  {
    min: 71,
    max: 90,
    name: "どっちかというと吉",
    messages: [
      "慎重に進めれば問題なし。焦りだけ注意。",
      "小さな違和感を見逃さないのが鍵です。",
      "やることを絞ると、手応えが出ます。"
    ],
    effect: "wobble",
    color: "#6ecbba",
    particles: 8
  },
  {
    min: 91,
    max: 95,
    name: "末吉",
    messages: [
      "今日は準備日。明日に向けて土台を作りましょう。",
      "早めに寝ると運気が戻りやすいです。",
      "無理せず、確実に終わらせることを優先。"
    ],
    effect: "ripple",
    color: "#9aa0b9",
    particles: 6
  },
  {
    min: 96,
    max: 100,
    name: "凶",
    messages: [
      "深呼吸してリセット。立て直しは十分可能です。",
      "予定を詰め込まず、優先順位を見直しましょう。",
      "今日は守り重視で、明日攻めるのが得策です。"
    ],
    effect: "wobble",
    color: "#b07dff",
    particles: 12
  }
];

const drawButton = document.getElementById("draw");
const fortuneNameEl = document.getElementById("fortune-name");
const fortuneMessageEl = document.getElementById("fortune-message");
const rollNumberEl = document.getElementById("roll-number");
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

function rollDice() {
  return Math.floor(Math.random() * 100) + 1;
}

function findFortune(roll) {
  return fortunes.find((fortune) => roll >= fortune.min && roll <= fortune.max) ?? fortunes[fortunes.length - 1];
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
  const roll = rollDice();
  const fortune = findFortune(roll);
  const message = pickRandom(fortune.messages);

  rollNumberEl.textContent = roll.toString();
  fortuneNameEl.textContent = fortune.name;
  fortuneMessageEl.textContent = message;

  applyEffect(fortune.effect);
  spawnParticles(fortune.color, fortune.particles);
}

drawButton.addEventListener("click", drawFortune);
