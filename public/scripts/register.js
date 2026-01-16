const questions = [
  { q: "What is your full name?", id: "fullName", type: "text" },
  { q: "Stage name (optional)", id: "stageName", type: "text" },
  { q: "How old are you?", id: "age", type: "number" },

  { q: "Select your gender", id: "gender", type: "select",
    options: ["Male", "Female", "Other"]
  },

  { q: "Where are you from?", id: "location", type: "select",
    options: ["Ilorin", "Offa", "Omu-Aran", "Other Kwara", "Non-Kwaran"]
  },

  { q: "WhatsApp number", id: "whatsapp", type: "tel" },

  { q: "Select your talent category", id: "talents", type: "select-multi",
    options: ["Music","Dance","Comedy","Modelling","Chant","Art","Acting","Spoken Word","DJing","Magic","Others"]
  },

  { q: "Tell us briefly about yourself (optional)", id: "bio", type: "textarea" },

  { q: "Instagram username", id: "instagram", type: "text" },
  { q: "Facebook username", id: "facebook", type: "text" },
  { q: "TikTok username", id: "tiktok", type: "text" },
  { q: "YouTube channel link", id: "youtube", type: "url" },

  { q: "Upload your photo (optional)", id: "photo", type: "file" },
  { q: "Performance video link (optional)", id: "video", type: "url" }
];

let current = 0;
const answers = {};

const questionEl = document.getElementById("question");
const inputArea = document.getElementById("input-area");
const bar = document.getElementById("bar");

document.getElementById("backBtn").onclick = prev;
document.getElementById("nextBtn").onclick = next;

render();

function render() {
  const step = questions[current];
  questionEl.textContent = step.q;
  inputArea.innerHTML = "";

  let input;

  if (step.type === "select") {
    input = document.createElement("select");
    step.options.forEach(o => {
      const opt = document.createElement("option");
      opt.textContent = o;
      input.appendChild(opt);
    });
  }

  else if (step.type === "select-multi") {
    input = document.createElement("select");
    input.multiple = true;
    step.options.forEach(o => {
      const opt = document.createElement("option");
      opt.textContent = o;
      input.appendChild(opt);
    });

    // extra input if "Others"
    const other = document.createElement("input");
    other.placeholder = "If Others, specify";
    other.oninput = e => answers.otherTalent = e.target.value;
    inputArea.appendChild(other);
  }

  else if (step.type === "textarea") {
    input = document.createElement("textarea");
  }

  else {
    input = document.createElement("input");
    input.type = step.type;
  }

  input.value = answers[step.id] || "";
  input.oninput = e => answers[step.id] = e.target.value;

  inputArea.appendChild(input);
  input.focus();

  bar.style.width = ((current + 1) / questions.length) * 100 + "%";
}

function next() {
  if (current < questions.length - 1) {
    current++;
    render();
  } else {
    submit();
  }
}

function prev() {
  if (current > 0) {
    current--;
    render();
  }
}

async function submit() {
  const fd = new FormData();

  Object.keys(answers).forEach(k => fd.append(k, answers[k]));

  const res = await fetch("/api/register", { method: "POST", body: fd });

  if (res.ok) {
    window.location.href = "https://chat.whatsapp.com/IKE91YZa9vnI3e9vRwCSf0";
  } else {
    alert("Submission failed");
  }
}
