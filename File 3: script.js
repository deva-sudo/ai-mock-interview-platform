```javascript
const questions = [
  {
    question: role => `Tell me about yourself and your interest in ${role}.`,
    keywords: ["experience", "skills", "project", "goal"]
  },
  {
    question: () => "Describe a difficult problem you solved and how you solved it.",
    keywords: ["problem", "solution", "approach", "result"]
  },
  {
    question: () => "What are your greatest strengths, and how do they help you at work?",
    keywords: ["strength", "example", "skills", "improve"]
  },
  {
    question: () => "How do you handle deadlines and pressure?",
    keywords: ["plan", "priority", "communicate", "deadline"]
  },
  {
    question: () => "Why should we hire you for this position?",
    keywords: ["skills", "experience", "value", "contribute"]
  }
];

let current = 0;
let answers = [];
let role = "";
let level = "";

const setup = document.getElementById("setup");
const interview = document.getElementById("interview");
const results = document.getElementById("results");

document.getElementById("start").addEventListener("click", () => {
  role = document.getElementById("role").value.trim();
  level = document.getElementById("level").value;

  if (!role) {
    alert("Please enter a job role.");
    return;
  }

  current = 0;
  answers = [];
  setup.classList.add("hidden");
  results.classList.add("hidden");
  interview.classList.remove("hidden");
  showQuestion();
});

function showQuestion() {
  document.getElementById("progress").textContent =
    `Question ${current + 1} of ${questions.length} · ${level}`;

  document.getElementById("question").textContent =
    questions[current].question(role);

  document.getElementById("answer").value = "";
}

document.getElementById("next").addEventListener("click", () => {
  const answer = document.getElementById("answer").value.trim();

  if (answer.length < 10) {
    alert("Please write a more detailed answer before continuing.");
    return;
  }

  answers.push(answer);
  current++;

  if (current < questions.length) {
    showQuestion();
  } else {
    finishInterview();
  }
});

function finishInterview() {
  interview.classList.add("hidden");
  results.classList.remove("hidden");

  let total = 0;

  const report = answers.map((answer, index) => {
    const words = answer.toLowerCase().match(/\b[\w'-]+\b/g) || [];
    const keywords = questions[index].keywords;
    const matched = keywords.filter(word =>
      words.some(item => item.includes(word))
    );

    const score = Math.min(
      100,
      Math.round(
        (Math.min(words.length, 80) / 80) * 60 +
        (matched.length / keywords.length) * 40
      )
    );

    total += score;

    return `<p><strong>Question ${index + 1}: ${score}/100</strong><br>
      ${matched.length >= 2
        ? "Good keyword coverage. Add specific examples to strengthen your answer."
        : "Try adding relevant details, specific examples, and measurable results."}
    </p>`;
  });

  const average = Math.round(total / answers.length);

  document.getElementById("score").textContent =
    `Practice score: ${average}/100`;

  document.getElementById("feedback").innerHTML =
    report.join("") +
    "<p><strong>Tip:</strong> Structure answers using Situation, Task, Action, and Result (STAR).</p>";
}

document.getElementById("restart").addEventListener("click", () => {
  results.classList.add("hidden");
  setup.classList.remove("hidden");
});
```
