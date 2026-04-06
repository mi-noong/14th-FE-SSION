document.addEventListener('DOMContentLoaded', function () {

  // ===========================
  // 요소 선택
  // ===========================
  const toggleFormBtn = document.getElementById('toggle-form-btn');
  const deleteLastBtn = document.getElementById('delete-last-btn');
  const totalCountEl = document.getElementById('total-count');
  const formSection = document.getElementById('form-section');
  const submitBtn = document.getElementById('submit-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const cardGrid = document.getElementById('card-grid');
  const detailList = document.getElementById('detail-list');

  const inputName = document.getElementById('input-name');
  const inputPart = document.getElementById('input-part');
  const inputSkills = document.getElementById('input-skills');
  const inputBio = document.getElementById('input-bio');
  const inputIntro = document.getElementById('input-intro');
  const inputEmail = document.getElementById('input-email');
  const inputPhone = document.getElementById('input-phone');
  const inputWebsite = document.getElementById('input-website');
  const inputComment = document.getElementById('input-comment');

  // ===========================
  // 명단 데이터 초기화
  // ===========================
  const members = [];

  const initialSummaryCards = cardGrid.querySelectorAll('.summary-card');
  initialSummaryCards.forEach(function (card) {
    const name = card.querySelector('.summary-card__name').textContent;
    members.push({ name: name });
  });

  updateTotalCount();

  // ===========================
  // 총 인원 갱신
  // ===========================
  function updateTotalCount() {
    totalCountEl.textContent = '총 ' + members.length + '명';
  }

  // ===========================
  // 폼 토글
  // ===========================
  toggleFormBtn.addEventListener('click', function () {
    const isHidden = formSection.classList.contains('hidden');
    if (isHidden) {
      formSection.classList.remove('hidden');
      toggleFormBtn.classList.add('active');
    } else {
      formSection.classList.add('hidden');
      toggleFormBtn.classList.remove('active');
      resetForm();
    }
  });

  // ===========================
  // 취소 버튼
  // ===========================
  cancelBtn.addEventListener('click', function () {
    formSection.classList.add('hidden');
    toggleFormBtn.classList.remove('active');
    resetForm();
  });

  // ===========================
  // 폼 초기화
  // ===========================
  function resetForm() {
    inputName.value = '';
    inputPart.value = 'Frontend';
    inputSkills.value = '';
    inputBio.value = '';
    inputIntro.value = '';
    inputEmail.value = '';
    inputPhone.value = '';
    inputWebsite.value = '';
    inputComment.value = '';
  }

  // ===========================
  // 유효성 검사
  // ===========================
 function validate() {
  const requiredInputs = [inputName, inputSkills, inputBio, inputIntro, inputPhone, inputComment];
  let valid = true;

  requiredInputs.forEach(function (input) {
    input.setCustomValidity('');
    if (!input.value.trim()) {
      const labels = {
        'input-name': '이름을 입력해 주세요.',
        'input-skills': '관심 기술을 입력해 주세요.',
        'input-bio': '한 줄 소개를 입력해 주세요.',
        'input-intro': '자기소개를 입력해 주세요.',
        'input-phone': '전화번호를 입력해 주세요.',
        'input-comment': '한 마디를 입력해 주세요.'
      };
      input.setCustomValidity(labels[input.id] || '이 입력란을 작성해 주세요.');
      input.reportValidity();
      valid = false;
    }
  });

 if (valid) {
  inputEmail.setCustomValidity('');
  if (!inputEmail.value.trim()) {
    inputEmail.setCustomValidity('이메일을 입력해 주세요.');
    inputEmail.reportValidity();
    valid = false;
  } else if (!inputEmail.value.includes('@')) {
    inputEmail.setCustomValidity("이메일 주소에 '@'를 포함해 주세요. '" + inputEmail.value + "'에 '@'가 없습니다.");
    inputEmail.reportValidity();
    valid = false;
  }
}

  if (valid && inputWebsite.value.trim()) {
    try {
      new URL(inputWebsite.value.trim());
      inputWebsite.setCustomValidity('');
    } catch {
      inputWebsite.setCustomValidity('올바른 URL을 입력해 주세요. (예: https://example.com)');
      inputWebsite.reportValidity();
      valid = false;
    }
  }

  return valid;
}
  // ===========================
  // 요약 카드 생성
  // ===========================
  function createSummaryCard(data) {
    const article = document.createElement('article');
    article.className = 'summary-card';

    const badge = data.skills[0] || '';

    article.innerHTML =
      '<div class="summary-card__image-wrap">' +
        '<img class="summary-card__photo" src="profile.png" alt="' + data.name + ' 프로필 사진" />' +
        '<span class="summary-card__badge">' + badge + '</span>' +
      '</div>' +
      '<div class="summary-card__info">' +
        '<h2 class="summary-card__name">' + data.name + '</h2>' +
        '<p class="summary-card__role">' + data.part + '</p>' +
        '<p class="summary-card__bio">' + data.bio + '</p>' +
      '</div>';

    return article;
  }

  // ===========================
  // 상세 카드 생성
  // ===========================
  function createDetailCard(data) {
    const article = document.createElement('article');
    article.className = 'detail-card';

    const skillsHTML = data.skills.map(function (skill) {
      return '<li>' + skill.trim() + '</li>';
    }).join('');

    article.innerHTML =
      '<header class="detail-card__header">' +
        '<h2 class="detail-card__name">' + data.name + '</h2>' +
        '<p class="detail-card__role">' + data.part + '</p>' +
        '<p class="detail-card__track">LION TRACK</p>' +
      '</header>' +
      '<section class="detail-card__section">' +
        '<h3 class="section-title">자기소개</h3>' +
        '<p class="section-body">' + data.intro + '</p>' +
      '</section>' +
      '<section class="detail-card__section">' +
        '<h3 class="section-title">연락처</h3>' +
        '<ul class="bullet-list">' +
          '<li>Email: ' + data.email + '</li>' +
          '<li>Phone: ' + data.phone + '</li>' +
          (data.website ? '<li><a href="' + data.website + '">' + data.website + '</a></li>' : '') +
        '</ul>' +
      '</section>' +
      '<section class="detail-card__section">' +
        '<h3 class="section-title">관심 기술</h3>' +
        '<ul class="bullet-list">' + skillsHTML + '</ul>' +
      '</section>' +
      '<section class="detail-card__section">' +
        '<h3 class="section-title">한 마디</h3>' +
        '<p class="section-body">' + data.comment + '</p>' +
      '</section>';

    return article;
  }

  // ===========================
  // 추가하기 버튼
  // ===========================
  submitBtn.addEventListener('click', function () {
    if (!validate()) return;

    const data = {
      name: inputName.value.trim(),
      part: inputPart.value,
      skills: inputSkills.value.split(',').map(function (s) { return s.trim(); }).filter(Boolean),
      bio: inputBio.value.trim(),
      intro: inputIntro.value.trim(),
      email: inputEmail.value.trim(),
      phone: inputPhone.value.trim(),
      website: inputWebsite.value.trim(),
      comment: inputComment.value.trim()
    };

    members.push({ name: data.name });

    cardGrid.appendChild(createSummaryCard(data));
    detailList.appendChild(createDetailCard(data));

    updateTotalCount();

    formSection.classList.add('hidden');
    toggleFormBtn.classList.remove('active');
    resetForm();
  });

  // ===========================
  // 마지막 항목 삭제
  // ===========================
  deleteLastBtn.addEventListener('click', function () {
    if (members.length === 0) return;

    members.pop();

    const summaryCards = cardGrid.querySelectorAll('.summary-card');
    const detailCards = detailList.querySelectorAll('.detail-card');

    summaryCards[summaryCards.length - 1].remove();
    detailCards[detailCards.length - 1].remove();

    updateTotalCount();
  });

});
