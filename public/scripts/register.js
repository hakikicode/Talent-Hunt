let current = 0;
const steps = document.querySelectorAll(".step");
const progress = ["p1","p2","p3","p4"];

function showStep(index) {
  steps.forEach((s, i) => s.classList.toggle("active", i === index));
  progress.forEach((p, i) =>
    document.getElementById(p).classList.toggle("done", i <= index)
  );
}

function nextStep() {
  if (current < steps.length - 1) {
    current++;
    showStep(current);
  }
}

function prevStep() {
  if (current > 0) {
    current--;
    showStep(current);
  }
}

async function submitForm() {
  const formData = new FormData();

  formData.append("fullName", fullName.value);
  formData.append("stageName", stageName.value);
  formData.append("age", age.value);
  formData.append("gender", gender.value);
  formData.append("location", location.value);
  formData.append("whatsapp", whatsapp.value);
  formData.append("talents", Array.from(talents.selectedOptions).map(o => o.value));
  formData.append("bio", bio.value);
  formData.append("instagram", instagram.value);
  formData.append("facebook", facebook.value);
  formData.append("tiktok", tiktok.value);
  formData.append("youtube", youtube.value);
  formData.append("video", video.value);

  if (photo.files[0]) {
    formData.append("photo", photo.files[0]);
  }

  const res = await fetch("/api/register", {
    method: "POST",
    body: formData
  });

  if (res.ok) {
    window.location.href =
      "https://chat.whatsapp.com/IKE91YZa9vnI3e9vRwCSf0";
  } else {
    alert("Registration failed. Try again.");
  }
}

