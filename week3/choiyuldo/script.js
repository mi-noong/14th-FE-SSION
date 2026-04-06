
const lions = [
  {
    id: Date.now(),
    name: "ME",
    part: "Frontend",
    interests: ["HTML / CSS", "JavaScript", "React"],
    oneLine: "구조 잡는 걸 좋아합니다",
    intro: "HTML과 CSS 레이아웃을 중심으로 학습하고 있으며, 안정적인 화면 구성이 목표입니다.",
    contact: {
      email: "example@mail.com",
      phone: "010-0000-0000",
      site: "https://github.com/example"
    },
    message: "즐겁게 성장하고 싶어요!"
  }
];


/* =====================
   2. DOM 요소 가져오기
===================== */
const summaryGrid = document.getElementById("summaryGrid");
const detailList = document.getElementById("detailList");
const totalCount = document.getElementById("totalCount");

const addBtn = document.getElementById("addBtn");
const removeBtn = document.getElementById("removeBtn");

const formSection = document.getElementById("formSection");
const lionForm = document.getElementById("lionForm");
const cancelBtn = document.getElementById("cancelBtn");

/* form inputs */
const nameInput = document.getElementById("nameInput");
const partInput = document.getElementById("partInput");
const interestInput = document.getElementById("interestInput");
const oneLineInput = document.getElementById("oneLineInput");
const introInput = document.getElementById("introInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById("phoneInput");
const siteInput = document.getElementById("siteInput");
const messageInput = document.getElementById("messageInput");

/* =====================
   3. 렌더 함수들
===================== */
function renderSummaryCards() {
  summaryGrid.innerHTML = "";

  lions.forEach((lion, index) => {
    const card = document.createElement("article");
    card.className = "summary-card";
    if (index === 0) card.classList.add("me");

    card.innerHTML = `
      <div class="image-wrapper">
        <img src="img/0001.webp" alt="${lion.name}">
        <span class="badge">${lion.interests[0]}</span>
      </div>
      <h3>${lion.name}</h3>
      <p class="part">${lion.part}</p>
      <p class="intro">${lion.oneLine}</p>
    `;

    summaryGrid.appendChild(card);
  });
}

function renderDetailCards() {
  detailList.innerHTML = "";

  lions.forEach((lion) => {
    const card = document.createElement("article");
    card.className = "detail-card";

    card.innerHTML = `
      <h3>${lion.name}</h3>
      <p>${lion.part} · 멋쟁이사자처럼</p>
      <p>${lion.intro}</p>

      <ul>
        ${lion.interests.map((skill) => `<li>${skill}</li>`).join("")}
      </ul>

      <p>Email: ${lion.contact.email}</p>
      <p>Phone: ${lion.contact.phone}</p>
      <p>Site: ${lion.contact.site}</p>

      <p>한 마디: ${lion.message}</p>
    `;

    detailList.appendChild(card);
  });
}

function renderCount() {
  totalCount.textContent = `총 ${lions.length}명`;
}

function renderAll() {
  renderSummaryCards();
  renderDetailCards();
  renderCount();
}

/* =====================
   4. 이벤트 처리
===================== */

/* 폼 토글 */
addBtn.addEventListener("click", () => {
  formSection.hidden = !formSection.hidden;
});

/* 마지막 아기 사자 삭제 */
removeBtn.addEventListener("click", () => {
  if (lions.length === 0) return;
  lions.pop();
  renderAll();
});

/* 폼 취소 */
cancelBtn.addEventListener("click", () => {
  formSection.hidden = true;
  lionForm.reset();
});

/* 폼 제출 → 아기 사자 추가 */
lionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newLion = {
    id: Date.now(),
    name: nameInput.value,
    part: partInput.value,
    interests: interestInput.value.split(",").map(v => v.trim()),
    oneLine: oneLineInput.value,
    intro: introInput.value,
    contact: {
      email: emailInput.value,
      phone: phoneInput.value,
      site: siteInput.value
    },
    message: messageInput.value
  };

  lions.push(newLion);
  renderAll();

  lionForm.reset();
  formSection.hidden = true;
});

/* =====================
   5. 초기 렌더링
===================== */
renderAll();
