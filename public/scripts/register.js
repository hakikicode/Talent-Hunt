import { db } from "../firebase/setup.js";
import { ref, push } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";

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
  { q: "YouTube channel link", id: "youtube", type: "url" }
];

let current = 0;
const answers = {};

const questionEl = document.getElementById("question");
const inputArea = document.getElementById("input-area");
const bar = document.getElementById("bar");

document.getElementById("backBtn").onclick = prev;
document.getElementById("nextBtn").onclick = next;

render();

/* ================= UI ================= */

function render() {
  const step = questions[current];
  questionEl.textContent = step.q;
  inputArea.innerHTML = "";

  let input;

  if (step.type === "select") {
    input = document.createElement("select");
    step.options.forEach(o => {
      const opt = document.createElement("option");
      opt.value = o;
      opt.textContent = o;
      input.appendChild(opt);
    });
  }

  else if (step.type === "select-multi") {
    input = document.createElement("select");
    input.multiple = true;

    step.options.forEach(o => {
      const opt = document.createElement("option");
      opt.value = o;
      opt.textContent = o;
      input.appendChild(opt);
    });
  }

  else if (step.type === "textarea") {
    input = document.createElement("textarea");
  }

  else {
    input = document.createElement("input");
    input.type = step.type;
  }

  if (answers[step.id]) {
    if (input.multiple) {
      [...input.options].forEach(o => {
        o.selected = answers[step.id].includes(o.value);
      });
    } else {
      input.value = answers[step.id];
    }
  }

  input.onchange = () => {
    if (input.multiple) {
      answers[step.id] = [...input.selectedOptions].map(o => o.value);
    } else {
      answers[step.id] = input.value;
    }
  };

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

/* ================= SUBMIT ================= */

async function submit() {
  try {
    const contestantsRef = ref(db, "contestants");

    await push(contestantsRef, {
      full_name: answers.fullName || "",
      stage_name: answers.stageName || "",
      age: answers.age || "",
      gender: answers.gender || "",
      location: answers.location || "",
      whatsapp: answers.whatsapp || "",
      talents: answers.talents || [],
      bio: answers.bio || "",
      socials: {
        instagram: answers.instagram || "",
        facebook: answers.facebook || "",
        tiktok: answers.tiktok || "",
        youtube: answers.youtube || ""
      },
      status: "pending",
      votes: 0,
      created_at: Date.now()
    });

    window.location.href =
      "https://chat.whatsapp.com/IKE91YZa9vnI3e9vRwCSf0";

  } catch (err) {
    console.error(err);
    alert("Submission failed. Please try again.");
  }
}
