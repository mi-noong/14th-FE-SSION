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
  const emptyState = document.getElementById('empty-state');

  const inputName = document.getElementById('input-name');
  const inputPart = document.getElementById('input-part');
  const inputSkills = document.getElementById('input-skills');
  const inputBio = document.getElementById('input-bio');
  const inputIntro = document.getElementById('input-intro');
  const inputEmail = document.getElementById('input-email');
  const inputPhone = document.getElementById('input-phone');
  const inputWebsite = document.getElementById('input-website');
  const inputComment = document.getElementById('input-comment');

  const fetchOneBtn = document.getElementById('fetch-one-btn');
  const fetchFiveBtn = document.getElementById('fetch-five-btn');
  const fetchRefreshBtn = document.getElementById('fetch-refresh-btn');
  const fetchStatus = document.getElementById('fetch-status');
  const retryBtn = document.getElementById('retry-btn');
  const randomFillBtn = document.getElementById('random-fill-btn');

  const filterPart = document.getElementById('filter-part');
  const sortOrder = document.getElementById('sort-order');
  const searchName = document.getElementById('search-name');

  // ===========================
  // 랜덤 값 풀 (임의 생성용)
  // ===========================
  const PARTS = ['Frontend', 'Backend', 'Design'];
  const SKILLS_POOL = {
    Frontend: ['React', 'Vue', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Next.js', 'CSS Grid', 'Figma'],
    Backend: ['Node.js', 'Spring', 'Django', 'Express', 'MySQL', 'PostgreSQL', 'MongoDB', 'GraphQL'],
    Design: ['Figma', 'Illustrator', 'Photoshop', 'Design System', 'Storybook', 'Zeplin']
  };

  // ===========================
  // 명단 데이터 초기화 (HTML에서 읽기)
  // ===========================
  let idCounter = 0;
  const members = [];

  // '내 카드'를 먼저 등록
  const mineCard = cardGrid.querySelector('.summary-card--mine');
  if (mineCard) {
    members.push({
      id: 'mine',
      isMine: true,
      name: mineCard.querySelector('.summary-card__name').textContent,
      part: mineCard.querySelector('.summary-card__role').textContent,
      bio: mineCard.querySelector('.summary-card__bio').textContent,
      skills: [mineCard.querySelector('.summary-card__badge').textContent],
      photo: mineCard.querySelector('.summary-card__photo').src,
      intro: '',
      email: '',
      phone: '',
      website: '',
      comment: '',
      addedAt: idCounter++
    });
  }

  // 나머지 초기 카드 읽기
  const initialCards = cardGrid.querySelectorAll('.summary-card:not(.summary-card--mine)');
  initialCards.forEach(function (card) {
    const dataId = card.getAttribute('data-id');
    members.push({
      id: dataId,
      isMine: false,
      name: card.querySelector('.summary-card__name').textContent,
      part: card.querySelector('.summary-card__role').textContent,
      bio: card.querySelector('.summary-card__bio').textContent,
      skills: [card.querySelector('.summary-card__badge').textContent],
      photo: card.querySelector('.summary-card__photo').src,
      intro: '',
      email: '',
      phone: '',
      website: '',
      comment: '',
      addedAt: idCounter++
    });
  });

  updateTotalCount();
  renderAll();

  // ===========================
  // 보기 옵션 상태
  // ===========================
  function getViewOptions() {
    return {
      part: filterPart.value,
      sort: sortOrder.value,
      search: searchName.value.trim()
    };
  }

  function getFilteredMembers() {
    const opts = getViewOptions();
    let result = members.slice();

    if (opts.part !== '전체') {
      result = result.filter(function (m) { return m.part === opts.part; });
    }

    if (opts.search) {
      const keyword = opts.search.toLowerCase();
      result = result.filter(function (m) {
        return m.name.toLowerCase().includes(keyword);
      });
    }

    if (opts.sort === 'name') {
      result.sort(function (a, b) { return a.name.localeCompare(b.name, 'ko'); });
    } else {
      result.sort(function (a, b) { return b.addedAt - a.addedAt; });
    }

    return result;
  }

  // ===========================
  // 전체 렌더링
  // ===========================
  function renderAll() {
    const filtered = getFilteredMembers();

    cardGrid.innerHTML = '';
    detailList.innerHTML = '';

    if (filtered.length === 0) {
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');
      filtered.forEach(function (member) {
        cardGrid.appendChild(createSummaryCard(member));
        detailList.appendChild(createDetailCard(member));
      });
    }
  }

  // ===========================
  // 총 인원 갱신
  // ===========================
  function updateTotalCount() {
    totalCountEl.textContent = '총 ' + members.length + '명';
  }

  // ===========================
  // 요약 카드 생성
  // ===========================
  function createSummaryCard(data) {
    const article = document.createElement('article');
    article.className = 'summary-card' + (data.isMine ? ' summary-card--mine' : '');
    article.setAttribute('data-id', data.id);

    const badge = (data.skills && data.skills[0]) ? data.skills[0] : '';
    const photoSrc = data.photo || 'profile.png';

    article.innerHTML =
      '<div class="summary-card__image-wrap">' +
        '<img class="summary-card__photo" src="' + photoSrc + '" alt="' + data.name + ' 프로필 사진" />' +
        (badge ? '<span class="summary-card__badge">' + badge + '</span>' : '') +
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
    article.setAttribute('data-id', data.id);

    const skillsHTML = (data.skills || []).map(function (skill) {
      return '<li>' + skill.trim() + '</li>';
    }).join('');

    const contactItems =
      (data.email ? '<li>Email: ' + data.email + '</li>' : '') +
      (data.phone ? '<li>Phone: ' + data.phone + '</li>' : '') +
      (data.website ? '<li><a href="' + data.website + '">' + data.website + '</a></li>' : '');

    article.innerHTML =
      '<header class="detail-card__header">' +
        '<h2 class="detail-card__name">' + data.name + '</h2>' +
        '<p class="detail-card__role">' + data.part + '</p>' +
        '<p class="detail-card__track">LION TRACK</p>' +
      '</header>' +
      '<section class="detail-card__section">' +
        '<h3 class="section-title">자기소개</h3>' +
        '<p class="section-body">' + (data.intro || data.bio || '') + '</p>' +
      '</section>' +
      (contactItems ?
        '<section class="detail-card__section">' +
          '<h3 class="section-title">연락처</h3>' +
          '<ul class="bullet-list">' + contactItems + '</ul>' +
        '</section>' : '') +
      (skillsHTML ?
        '<section class="detail-card__section">' +
          '<h3 class="section-title">관심 기술</h3>' +
          '<ul class="bullet-list">' + skillsHTML + '</ul>' +
        '</section>' : '') +
      (data.comment ?
        '<section class="detail-card__section">' +
          '<h3 class="section-title">한 마디</h3>' +
          '<p class="section-body">' + data.comment + '</p>' +
        '</section>' : '');

    return article;
  }

  // ===========================
  // API 응답 → member 객체 변환
  // ===========================
  function apiUserToMember(user) {
    const part = PARTS[Math.floor(Math.random() * PARTS.length)];
    const skillPool = SKILLS_POOL[part];
    const skillCount = 2 + Math.floor(Math.random() * 2);
    const shuffled = skillPool.slice().sort(function () { return Math.random() - 0.5; });
    const skills = shuffled.slice(0, skillCount);

    const name = user.name.first + ' ' + user.name.last;
    const city = user.location.city;
    const country = user.location.country;

    return {
      id: 'fetch-' + (idCounter++),
      isMine: false,
      name: name,
      part: part,
      bio: part + ' · ' + country + ' ' + city + '에서 함유했어요!',
      skills: skills,
      photo: user.picture.large,
      intro: part + ' 파트에서 활동하는 아기 사자입니다.',
      email: user.email,
      phone: user.phone,
      website: '',
      comment: '',
      addedAt: idCounter
    };
  }

  // ===========================
  // 비동기 상태 관리
  // ===========================
  let isLoading = false;
  let lastAction = null;

  const fetchBtns = [fetchOneBtn, fetchFiveBtn, fetchRefreshBtn];

  function setLoading() {
    isLoading = true;
    fetchStatus.textContent = '불러오는 중...';
    fetchStatus.className = 'fetch-status fetch-status--loading';
    retryBtn.classList.add('hidden');
    fetchBtns.forEach(function (btn) { btn.disabled = true; });
  }

  function setSuccess() {
    isLoading = false;
    fetchStatus.textContent = '완료!';
    fetchStatus.className = 'fetch-status fetch-status--success';
    fetchBtns.forEach(function (btn) { btn.disabled = false; });
    setTimeout(function () {
      fetchStatus.textContent = '준비 완료';
      fetchStatus.className = 'fetch-status';
    }, 2000);
  }

  function setError(message) {
    isLoading = false;
    fetchStatus.textContent = '불러오기 실패: ' + message;
    fetchStatus.className = 'fetch-status fetch-status--error';
    retryBtn.classList.remove('hidden');
    fetchBtns.forEach(function (btn) { btn.disabled = false; });
  }

  // ===========================
  // fetch 공통 함수
  // ===========================
  async function fetchUsers(count) {
    const res = await fetch('https://randomuser.me/api/?results=' + count + '&nat=us,gb,ca,au,nz');
    if (!res.ok) throw new Error('네트워크 오류 (' + res.status + ')');
    const data = await res.json();
    return data.results;
  }

  // ===========================
  // 랜덤 1명 추가
  // ===========================
  async function addRandom(count) {
    if (isLoading) return;
    lastAction = function () { return addRandom(count); };
    setLoading();
    try {
      const users = await fetchUsers(count);
      users.forEach(function (user) {
        members.push(apiUserToMember(user));
      });
      updateTotalCount();
      renderAll();
      setSuccess();
    } catch (err) {
      setError(err.message);
    }
  }

  // ===========================
  // 전체 새로고침
  // ===========================
  async function refreshAll() {
    if (isLoading) return;
    lastAction = refreshAll;
    setLoading();

    const currentCount = members.length;

    try {
      const users = await fetchUsers(currentCount);
      // 내 카드 보존
      const myCard = members.find(function (m) { return m.isMine; });
      members.length = 0;
      if (myCard) members.push(myCard);

      users.forEach(function (user) {
        if (members.length < currentCount) {
          members.push(apiUserToMember(user));
        }
      });

      // 내 카드만 있고 나머지가 부족한 경우 보충
      // (API가 정확히 currentCount개를 반환하므로 보통 정확히 맞음)

      updateTotalCount();
      renderAll();
      setSuccess();
    } catch (err) {
      setError(err.message);
    }
  }

  fetchOneBtn.addEventListener('click', function () { addRandom(1); });
  fetchFiveBtn.addEventListener('click', function () { addRandom(5); });
  fetchRefreshBtn.addEventListener('click', refreshAll);
  retryBtn.addEventListener('click', function () {
    if (lastAction) lastAction();
  });

  // ===========================
  // 보기 옵션 이벤트
  // ===========================
  filterPart.addEventListener('change', renderAll);
  sortOrder.addEventListener('change', renderAll);
  searchName.addEventListener('input', renderAll);

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
  // 랜덤 값 채우기
  // ===========================
  randomFillBtn.addEventListener('click', async function () {
    randomFillBtn.disabled = true;
    randomFillBtn.textContent = '불러오는 중...';
    try {
      const users = await fetchUsers(1);
      const user = users[0];
      const part = PARTS[Math.floor(Math.random() * PARTS.length)];
      const skillPool = SKILLS_POOL[part];
      const shuffled = skillPool.slice().sort(function () { return Math.random() - 0.5; });
      const skills = shuffled.slice(0, 3);
      const city = user.location.city;
      const country = user.location.country;

      inputName.value = user.name.first + ' ' + user.name.last;
      inputPart.value = part;
      inputSkills.value = skills.join(', ');
      inputBio.value = part + ' · ' + country + ' ' + city + '에서 함유했어요!';
      inputIntro.value =
        '4주차 미션에서 fetch를 활용해 transitions을 컬렉션으로 만들고 있는 중 입니다. ' +
        '비동기(async/await)를 써서 데이터를 map으로 변환해 UI에 반영하는 과정을 이해하려고 합니다. ' +
        '또한, "데이터가 바뀌면 UI도 다시 그리는 구조"를 자연스럽게 체득하는 것에 집중하고 있습니다.';
      inputEmail.value = user.email;
      inputPhone.value = user.phone;
      inputWebsite.value = 'https://example.com/' + user.login.username;
      inputComment.value = '데이터가 바뀌면 UI도 바뀐다!';
    } catch (err) {
      alert('랜덤 값을 불러오는 데 실패했습니다: ' + err.message);
    } finally {
      randomFillBtn.disabled = false;
      randomFillBtn.textContent = '랜덤 값 채우기';
    }
  });

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
        inputEmail.setCustomValidity("이메일 주소에 '@'를 포함해 주세요.");
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
  // 추가하기 버튼
  // ===========================
  submitBtn.addEventListener('click', function () {
    if (!validate()) return;

    const data = {
      id: 'manual-' + (idCounter++),
      isMine: false,
      name: inputName.value.trim(),
      part: inputPart.value,
      skills: inputSkills.value.split(',').map(function (s) { return s.trim(); }).filter(Boolean),
      bio: inputBio.value.trim(),
      intro: inputIntro.value.trim(),
      email: inputEmail.value.trim(),
      phone: inputPhone.value.trim(),
      website: inputWebsite.value.trim(),
      comment: inputComment.value.trim(),
      photo: 'profile.png',
      addedAt: idCounter
    };

    members.push(data);
    updateTotalCount();
    renderAll();

    formSection.classList.add('hidden');
    toggleFormBtn.classList.remove('active');
    resetForm();
  });

  // ===========================
  // 마지막 항목 삭제
  // ===========================
  deleteLastBtn.addEventListener('click', function () {
    // 내 카드를 제외한 마지막 항목 삭제
    for (let i = members.length - 1; i >= 0; i--) {
      if (!members[i].isMine) {
        members.splice(i, 1);
        break;
      }
    }
    updateTotalCount();
    renderAll();
  });

});
