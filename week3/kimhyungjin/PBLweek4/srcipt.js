document.addEventListener('DOMContentLoaded', () => {

    // =====================================================
    // 1. 명단 배열 - HTML 카드에서 읽어 초기화
    // =====================================================
    const cardGrid   = document.getElementById('card-grid');
    const detailList = document.getElementById('detail-list');
    const countText  = document.getElementById('count-text');

    // HTML에 이미 존재하는 카드 wrapper(div[data-name])를 순서대로 읽어 members 배열 구성
    let members = [];

    const existingCards = cardGrid.querySelectorAll(':scope > div[data-name]');
    existingCards.forEach((wrapper) => {
        const member = readDataset(wrapper);
        members.push(member);
    });

    // 초기화: 하단 상세 목록 생성 + 총 n명 갱신
    members.forEach((m, i) => {
        const detailEl = createDetailItem(m);
        detailList.appendChild(detailEl);
        // 요약 카드 DOM 요소에 인덱스를 저장해 두면 삭제 시 편리
        existingCards[i].dataset.index = i;
    });
    updateCount();


    // =====================================================
    // 2. 폼 토글
    // =====================================================
    const formWrap  = document.getElementById('add-form-wrap');
    const btnToggle = document.getElementById('btn-toggle-form');

    btnToggle.addEventListener('click', () => {
        const isOpen = formWrap.classList.contains('open');
        if (isOpen) {
            closeForm();
        } else {
            formWrap.classList.add('open');
            btnToggle.textContent = '✕ 폼 닫기';
        }
    });

    document.getElementById('btn-cancel').addEventListener('click', closeForm);

    function closeForm() {
        formWrap.classList.remove('open');
        btnToggle.textContent = '＋ 아기사자 추가';
        clearForm();
        clearErrors();
    }


    // =====================================================
    // 3. 추가하기
    // =====================================================
    document.getElementById('btn-submit').addEventListener('click', () => {
        clearErrors();

        // 필수 필드 유효성 검사
        const name       = getVal('f-name');
        const part       = getVal('f-part');
        const skillsRaw  = getVal('f-skills');
        const shortIntro = getVal('f-short-intro');
        const intro      = getVal('f-intro');
        const phone      = getVal('f-phone');
        const email      = getVal('f-email');

        let hasError = false;
        if (!name)       { showError('f-name',        'err-name',        '이름을 입력해주세요.');          hasError = true; }
        if (!part)       { showError('f-part',        'err-part',        '파트를 선택해주세요.');          hasError = true; }
        if (!skillsRaw)  { showError('f-skills',      'err-skills',      '관심 기술을 입력해주세요.');     hasError = true; }
        if (!shortIntro) { showError('f-short-intro', 'err-short-intro', '한 줄 소개를 입력해주세요.');    hasError = true; }
        if (!intro)      { showError('f-intro',       'err-intro',       '자기소개를 입력해주세요.');      hasError = true; }
        if (!phone)      { showError('f-phone',       'err-phone',       '전화번호를 입력해주세요.');      hasError = true; }
        if (!email)      { showError('f-email',       'err-email',       '이메일을 입력해주세요.');        hasError = true; }
        if (hasError) return;

        // 관심 기술: 쉼표로 분리
        const skills = skillsRaw.split(',').map(s => s.trim()).filter(Boolean);

        const newMember = {
            name,
            part,
            skills,
            shortIntro,
            intro,
            phone,
            email,
            website: getVal('f-website'),
            quote:   getVal('f-quote'),
            imgSrc:  '',
            isMine:  false,
        };

        // 명단 배열에 추가
        members.push(newMember);

        // 요약 카드 DOM 생성 → 그리드 끝에 추가
        const summaryCard = createSummaryCard(newMember);
        cardGrid.appendChild(summaryCard);

        // 상세 카드 DOM 생성 → 목록 끝에 추가
        const detailItem = createDetailItem(newMember);
        detailList.appendChild(detailItem);

        // 총 n명 갱신
        updateCount();

        // 폼 닫기 + 초기화
        closeForm();
    });


    // =====================================================
    // 4. 마지막 삭제
    // =====================================================
    document.getElementById('btn-delete-last').addEventListener('click', () => {
        if (members.length === 0) return; // 비어있으면 아무것도 안 함

        // 명단 배열에서 마지막 제거
        members.pop();

        // 요약 카드: 그리드의 마지막 자식 제거
        const lastCard = cardGrid.lastElementChild;
        if (lastCard) cardGrid.removeChild(lastCard);

        // 상세 카드: 목록의 마지막 자식 제거
        const lastDetail = detailList.lastElementChild;
        if (lastDetail) detailList.removeChild(lastDetail);

        // 총 n명 갱신
        updateCount();
    });


    // =====================================================
    // 헬퍼 함수들
    // =====================================================

    /** dataset에서 member 객체 읽기 */
    function readDataset(wrapper) {
        const d = wrapper.dataset;
        return {
            name:       d.name       || '',
            part:       d.part       || '',
            skills:     d.skills     ? d.skills.split(',').map(s => s.trim()) : [],
            shortIntro: d.shortIntro || '',
            intro:      d.intro      || '',
            phone:      d.phone      || '',
            email:      d.email      || '',
            website:    d.website    || '',
            quote:      d.quote      || '',
            imgSrc:     wrapper.querySelector('img')?.getAttribute('src') || '',
            isMine:     wrapper.classList.contains('Mine'),
        };
    }

    /** 요약 카드 DOM 생성 */
    function createSummaryCard(m) {
        const wrapper = document.createElement('div');
        if (m.isMine) wrapper.classList.add('Mine');

        // dataset 저장 (나중에 필요할 경우 참조 가능)
        wrapper.dataset.name       = m.name;
        wrapper.dataset.part       = m.part;
        wrapper.dataset.skills     = m.skills.join(',');
        wrapper.dataset.shortIntro = m.shortIntro;
        wrapper.dataset.intro      = m.intro;
        wrapper.dataset.phone      = m.phone;
        wrapper.dataset.email      = m.email;
        wrapper.dataset.website    = m.website;
        wrapper.dataset.quote      = m.quote;

        const badgeSkill = m.skills[0] || '';

        wrapper.innerHTML = `
            <details class="card">
                <summary>
                    ${m.imgSrc
                        ? `<img src="${m.imgSrc}" alt="${m.name}" onerror="this.style.display='none'">`
                        : ''}
                    <p>${m.name}</p>
                    <p><span class="badge">${badgeSkill}</span></p>
                    <p class="short-intro">${m.shortIntro}</p>
                    <span class="arrow">▼</span>
                </summary>
                <div class="detail">
                    <ul>
                        ${m.skills.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                    <p>${m.phone || '전화번호 비공개'}</p>
                    <p>${m.email || '메일 비공개'}</p>
                    ${m.website ? `<p><a href="${m.website}" target="_blank">${m.website}</a></p>` : ''}
                </div>
            </details>
        `;
        return wrapper;
    }

    /** 상세 카드 DOM 생성 */
    function createDetailItem(m) {
        const item = document.createElement('div');
        item.className = 'detail-item';
        item.innerHTML = `
            <div class="detail-name">${m.name}</div>
            <div class="detail-part">${m.part}</div>
            ${m.skills.length
                ? `<div class="detail-skills">
                    ${m.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                </div>`
                : ''}
            ${m.intro
                ? `<div class="detail-intro">${m.intro}</div>`
                : ''}
            <div class="detail-meta">
                <span>📞 ${m.phone || '비공개'}</span>
                <span>✉️ ${m.email || '비공개'}</span>
                ${m.website ? `<span>🌐 <a href="${m.website}" target="_blank">${m.website}</a></span>` : ''}
                ${m.quote   ? `<span>💬 "${m.quote}"</span>` : ''}
            </div>
        `;
        return item;
    }

    /** 총 n명 갱신 */
    function updateCount() {
        countText.textContent = `총 ${members.length}명`;
    }

    /** 입력 필드 값 가져오기 (trim) */
    function getVal(id) {
        return document.getElementById(id).value.trim();
    }

    /** 인라인 경고 메시지 표시 */
    function showError(inputId, errorId, message) {
        const input = document.getElementById(inputId);
        const errEl = document.getElementById(errorId);
        if (input) input.classList.add('invalid');
        if (errEl) errEl.textContent = message;
    }

    /** 모든 경고 메시지 초기화 */
    function clearErrors() {
        document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
        document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
    }

    /** 폼 입력값 초기화 */
    function clearForm() {
        ['f-name', 'f-skills', 'f-short-intro', 'f-intro', 'f-phone', 'f-email', 'f-website', 'f-quote']
            .forEach(id => { document.getElementById(id).value = ''; });
        document.getElementById('f-part').value = '';
    }

    //PBL week4

    let asyncStatus = 'idle';
    let lastAction = null;

    const filterPart = document.getElementById('filter-part');
    const filterSort = document.getElementById('filter-sort');
    const filterSearch = document.getElementById('filter-search');

    //랜덤 유저 뎃고오기.
    async function fetchRandomUsers(count) {
        const res = await fetch('https://randomuser.me/api/?results=' + count);
        const data = await res.json();
        return data.results;
    }

    //필터 함수
    filterPart.addEventListener('change', renderFilteredView);
    filterSort.addEventListener('change', renderFilteredView);
    filterSearch.addEventListener('input', renderFilteredView);
    

    function getFilteredMembers(){
        const part = filterPart.value;
        const sort = filterSort.value;
        const search = filterSearch.value.trim().toLowerCase();

        let result = [...members];

        if(part){
            result = result.filter(m => m.part === part);
        }
        if(search){
            result = result.filter(m => m.name.toLowerCase().includes(search));
        }
        if(sort === 'name'){
            result.sort((a,b) => a.name.localeCompare(b.name, 'ko'));
        }
        return result;
    }

    function renderFilteredView() {
        const filtered = getFilteredMembers();
        
        cardGrid.innerHTML = '';
        if (filtered.length === 0) {
            cardGrid.innerHTML = '<p>🔍 조건에 맞는 아기사자가 없습니다.</p>';
        } 
        else {
            filtered.forEach((m) => {
                const summaryCard = createSummaryCard(m);
                cardGrid.appendChild(summaryCard);
            });
        }

        detailList.innerHTML = '';
        if (filtered.length === 0) {
            detailList.innerHTML = '<p>조건에 맞는 아기사자가 없습니다.</p>';
        } 
        else {
            filtered.forEach((m) => {
                const detailItem = createDetailItem(m);
                detailList.appendChild(detailItem);
            });
        }
    }

    //상태 표시하기.
    function setAsyncState(status) {
        asyncStatus = status;
    
        const statusEl = document.getElementById('async-status');
        const retryBtn = document.getElementById('btn-retry');
    
        if (status === 'idle') {
            statusEl.textContent = '✅ 준비 완료';
            retryBtn.style.display = 'none';
        } else if (status === 'loading') {
            statusEl.textContent = '⏳ 불러오는 중...';
            retryBtn.style.display = 'none';
        } else if (status === 'error') {
            statusEl.textContent = '❌ 실패';
            retryBtn.style.display = 'inline';
        }
    }

    // 랜덤 1명 추가.
    document.getElementById('btn-add-1').addEventListener('click', async () => {
        lastAction = 'add1';
        setAsyncState('loading');
        try {
            const users = await fetchRandomUsers(1);
            users.forEach((user) => {
                const member = apiUserToMember(user);
                members.push(member);
                const summaryCard = createSummaryCard(member);
                cardGrid.appendChild(summaryCard);
                const detailItem = createDetailItem(member);
                detailList.appendChild(detailItem);
            });
            setAsyncState('idle');
        } catch (err) {
            setAsyncState('error');
        }
    });


    // 랜덤 5명 추가.
    document.getElementById('btn-add-5').addEventListener('click', async () => {
        lastAction = 'add5';
        setAsyncState('loading');
        try{const users = await fetchRandomUsers(5);
            users.forEach((user) => {
                const member = apiUserToMember(user);
                members.push(member);
                const summaryCard = createSummaryCard(member);
                cardGrid.appendChild(summaryCard);
                const detailItem = createDetailItem(member);
                detailList.appendChild(detailItem);
            });
            setAsyncState('idle');
        }
        catch(err){
            setAsyncState('error');
        }
    });

    function apiUserToMember(user) {
        return {
            name:       user.name.first + ' ' + user.name.last,
            part:       'Frontend',
            skills:     ['JavaScript', 'HTML', 'CSS'],
            shortIntro: '랜덤으로 추가된 멤버',
            intro:      '소개 없음',
            phone:      user.phone,
            email:      user.email,
            imgSrc:     user.picture.medium,
            website:    '',
            quote:      '',
            isMine:     false,
        };
    }

    //전체 새로 고침. 
    document.getElementById('btn-refresh').addEventListener('click', async () => {
        lastAction = 'refresh';
        setAsyncState('loading');
        try{
            cardGrid.innerHTML = '';
            detailList.innerHTML = '';
            members = [];
            const users = await fetchRandomUsers(9);
            users.forEach((user) => {
                const member = apiUserToMember(user);
                members.push(member);
                const summaryCard = createSummaryCard(member);
                cardGrid.appendChild(summaryCard);
                const detailItem = createDetailItem(member);
                detailList.appendChild(detailItem);
            });
            setAsyncState('idle');
        }
        catch(err){
            setAsyncState('error');
        }
    });

    //재시도 버튼 보이게하기.
    document.getElementById('btn-retry').addEventListener('click', () => {
        if (lastAction === 'add1') {
            document.getElementById('btn-add-1').click();
        } else if (lastAction === 'add5') {
            document.getElementById('btn-add-5').click();
        } else if (lastAction === 'refresh') {
            document.getElementById('btn-refresh').click();
        }
    });

    //랜덤 이름,전번, 이메일 채우기.
    document.getElementById('btn-fill-random').addEventListener('click', async () => {
        const users = await fetchRandomUsers(1);
        const u = users[0];
    
        document.getElementById('f-name').value        = u.name.first + ' ' + u.name.last;
        document.getElementById('f-phone').value       = u.phone;
        document.getElementById('f-email').value       = u.email;
        document.getElementById('f-part').value        = 'Frontend';
        document.getElementById('f-skills').value      = 'HTML, CSS, JavaScript';
        document.getElementById('f-short-intro').value = u.login.username;
        document.getElementById('f-intro').value = '안녕하세요, ' + u.name.first + '입니다!';
    });

});