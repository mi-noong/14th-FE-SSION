document.addEventListener("DOMContentLoaded", function () {
  const app = document.getElementById("app");
  const summaryContainer = document.querySelector(".page");
  const detailContainer = document.querySelector(".detail-list");

  // 상단 컨트롤 + 폼 삽입
  app.innerHTML = `
    <section class="control-panel" style="margin: 20px;">
      <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin-bottom:14px;">
        <button id="toggleFormBtn" type="button">아기 사자 추가</button>
        <button id="deleteLastBtn" type="button">마지막 아기 사자 삭제</button>
        <p id="memberCount" style="margin:0; font-weight:bold;">총 0명</p>
      </div>

      <form id="lionForm" style="display:none; background:#f7f7f7; padding:16px; border-radius:12px;">
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:12px;">
          <div>
            <label>이름</label><br />
            <input type="text" id="name" style="width:100%; padding:8px;" />
            <small class="error" id="nameError" style="color:red;"></small>
          </div>

          <div>
            <label>파트</label><br />
            <select id="part" style="width:100%; padding:8px;">
              <option value="">선택하세요</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Design">Design</option>
            </select>
            <small class="error" id="partError" style="color:red;"></small>
          </div>

          <div style="grid-column:1 / -1;">
            <label>관심 기술 (쉼표로 구분)</label><br />
            <input type="text" id="skills" placeholder="HTML, CSS, JavaScript" style="width:100%; padding:8px;" />
            <small class="error" id="skillsError" style="color:red;"></small>
          </div>

          <div style="grid-column:1 / -1;">
            <label>한 줄 소개</label><br />
            <input type="text" id="oneLine" style="width:100%; padding:8px;" />
            <small class="error" id="oneLineError" style="color:red;"></small>
          </div>

          <div style="grid-column:1 / -1;">
            <label>자기소개</label><br />
            <textarea id="description" rows="4" style="width:100%; padding:8px;"></textarea>
            <small class="error" id="descriptionError" style="color:red;"></small>
          </div>

          <div>
            <label>이메일</label><br />
            <input type="text" id="email" style="width:100%; padding:8px;" />
            <small class="error" id="emailError" style="color:red;"></small>
          </div>

          <div>
            <label>전화번호</label><br />
            <input type="text" id="phone" style="width:100%; padding:8px;" />
            <small class="error" id="phoneError" style="color:red;"></small>
          </div>

          <div style="grid-column:1 / -1;">
            <label>웹사이트</label><br />
            <input type="text" id="website" style="width:100%; padding:8px;" />
            <small class="error" id="websiteError" style="color:red;"></small>
          </div>

          <div style="grid-column:1 / -1;">
            <label>한 마디</label><br />
            <input type="text" id="comment" style="width:100%; padding:8px;" />
            <small class="error" id="commentError" style="color:red;"></small>
          </div>

          <div style="grid-column:1 / -1;">
            <label>이미지 경로</label><br />
            <input type="text" id="image" placeholder="profile.jpg" style="width:100%; padding:8px;" />
            <small class="error" id="imageError" style="color:red;"></small>
          </div>
        </div>

        <div style="margin-top:14px; display:flex; gap:10px;">
          <button type="submit">추가하기</button>
          <button type="button" id="cancelFormBtn">취소</button>
        </div>
      </form>
    </section>
  `;

  const toggleFormBtn = document.getElementById("toggleFormBtn");
  const deleteLastBtn = document.getElementById("deleteLastBtn");
  const lionForm = document.getElementById("lionForm");
  const cancelFormBtn = document.getElementById("cancelFormBtn");
  const memberCount = document.getElementById("memberCount");

  let lions = [];

  function clearErrors() {
    document.querySelectorAll(".error").forEach((el) => {
      el.textContent = "";
    });
  }

  function updateCount() {
    memberCount.textContent = `총 ${lions.length}명`;
  }

  function parseSkills(text) {
    return text
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
  }

  // 기존 HTML 카드 읽어서 배열로 초기화
  function initializeData() {
    const summaryCards = document.querySelectorAll(".page > section");
    const detailCards = document.querySelectorAll(".detail-list .detail-card");

    lions = [];

    summaryCards.forEach((card, index) => {
      const img = card.querySelector("img");
      const name = card.querySelector(".name")?.textContent.trim() || "";
      const part = card.querySelector(".part")?.textContent.trim() || "";
      const oneLine = card.querySelector(".one-line")?.textContent.trim() || "";

      const detailCard = detailCards[index];
      const description =
        detailCard?.querySelector(".detail-desc")?.textContent.trim() || "자기소개가 없습니다.";

      const role =
        detailCard?.querySelector(".detail-role")?.textContent.trim() || part;

      lions.push({
        name: name,
        part: role,
        oneLine: oneLine,
        description: description,
        skills: [part || "기술", "HTML", "CSS"],
        email: "example@email.com",
        phone: "010-0000-0000",
        website: "https://example.com",
        comment: "반갑습니다!",
        image: img ? img.getAttribute("src") : "profile.jpg",
        isMine: card.classList.contains("card1")
      });
    });

    renderAll();
  }

  function createBadge(skill) {
    const badge = document.createElement("span");
    badge.textContent = skill;
    badge.style.position = "absolute";
    badge.style.top = "10px";
    badge.style.right = "10px";
    badge.style.backgroundColor = "black";
    badge.style.color = "white";
    badge.style.padding = "4px 8px";
    badge.style.borderRadius = "999px";
    badge.style.fontSize = "12px";
    badge.style.fontWeight = "bold";
    return badge;
  }

  function createSummaryCard(lion) {
    const section = document.createElement("section");
    section.className = lion.isMine ? "card1" : "card";
    section.setAttribute("aria-label", "자기소개 요약 카드");

    section.innerHTML = `
      <div style="position:relative;">
        <img class="profile-image" src="${lion.image}" alt="프로필 이미지">
      </div>
      <h1 class="name">${lion.name}</h1>
      <div class="part">${lion.part}</div>
      <p class="one-line">${lion.oneLine}</p>
    `;

    const imageWrap = section.querySelector("div");
    imageWrap.appendChild(createBadge(lion.skills[0] || ""));

    return section;
  }

  function createDetailCard(lion) {
    const article = document.createElement("article");
    article.className = "detail-card";

    const skillItems = lion.skills.map((skill) => `<li>${skill}</li>`).join("");

    article.innerHTML = `
      <h2 class="detail-name">${lion.name}</h2>
      <p class="detail-role">${lion.part}</p>
      <p><strong>동아리명:</strong> 멋쟁이사자처럼</p>
      <p class="detail-desc">${lion.description}</p>

      <div>
        <strong>관심 기술</strong>
        <ul>${skillItems}</ul>
      </div>

      <div>
        <strong>연락처</strong>
        <p>이메일: ${lion.email}</p>
        <p>전화번호: ${lion.phone}</p>
        <p>웹사이트: ${lion.website}</p>
      </div>

      <div>
        <strong>한 마디</strong>
        <p>${lion.comment}</p>
      </div>
    `;

    return article;
  }

  function renderAll() {
    summaryContainer.innerHTML = "";
    detailContainer.innerHTML = "";

    lions.forEach((lion) => {
      summaryContainer.appendChild(createSummaryCard(lion));
      detailContainer.appendChild(createDetailCard(lion));
    });

    updateCount();
  }

  function validateForm() {
    clearErrors();
    let isValid = true;

    const fields = [
      { id: "name", message: "이름을 입력하세요." },
      { id: "part", message: "파트를 선택하세요." },
      { id: "skills", message: "관심 기술을 입력하세요." },
      { id: "oneLine", message: "한 줄 소개를 입력하세요." },
      { id: "description", message: "자기소개를 입력하세요." },
      { id: "email", message: "이메일을 입력하세요." },
      { id: "phone", message: "전화번호를 입력하세요." },
      { id: "website", message: "웹사이트를 입력하세요." },
      { id: "comment", message: "한 마디를 입력하세요." },
      { id: "image", message: "이미지 경로를 입력하세요." }
    ];

    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      if (!input.value.trim()) {
        document.getElementById(field.id + "Error").textContent = field.message;
        isValid = false;
      }
    });

    return isValid;
  }

  function resetForm() {
    lionForm.reset();
    clearErrors();
  }

  toggleFormBtn.addEventListener("click", function () {
    if (lionForm.style.display === "none" || lionForm.style.display === "") {
      lionForm.style.display = "block";
    } else {
      lionForm.style.display = "none";
    }
  });

  cancelFormBtn.addEventListener("click", function () {
    lionForm.style.display = "none";
    resetForm();
  });

  deleteLastBtn.addEventListener("click", function () {
    if (lions.length === 0) return;
    lions.pop();
    renderAll();
  });

  lionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    const newLion = {
      name: document.getElementById("name").value.trim(),
      part: document.getElementById("part").value.trim(),
      skills: parseSkills(document.getElementById("skills").value.trim()),
      oneLine: document.getElementById("oneLine").value.trim(),
      description: document.getElementById("description").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      website: document.getElementById("website").value.trim(),
      comment: document.getElementById("comment").value.trim(),
      image: document.getElementById("image").value.trim(),
      isMine: false
    };

    lions.push(newLion);
    renderAll();
    resetForm();
    lionForm.style.display = "none";
  });

  initializeData();
});