/**
 *  죄송함다 셤 끝나고 꼭 공부할께요 ㅜㅜ, 싹 다 지우고 다시 만들어보겠습니다ㅜㅜ
 * 
 * 
 * [전역 상태 관리]
 * 이 배열이 우리 서비스의 '원본 데이터'입니다. 
 * HTML은 이 배열을 바탕으로 그려지기 때문에, 데이터가 바뀌면 화면도 render() 함수에 의해 다시 그려집니다.
 */
let lionData = [
    {
        id: 1,
        name: "양채현",
        track: "Frontend",
        skills: ["HTML/CSS", "JavaScript", "React"],
        summary: "초보 프론트엔드 개발자",
        description: "아직 부족한 점이 많지만, 그만큼 더 열정적으로 배우고 성장하고 싶습니다! 이번 멋사 14기 활동을 통해 유익한 지식도 쑥쑥 키우고, 좋은 분들과 소중한 인연을 듬뿍 만들어가고 싶어요.",
        email: "2423978@naver.com",
        phone: "010-4827-9391",
        website: "https://github.com/anwjrdid",
        oneLiner: "열심히 배워서 멋쟁이 사자로 성장하겠습니다!",
        img: "images/메타몽.png"
    },
    {
        id: 2,
        name: "메타몽 피카츄",
        track: "Frontend",
        skills: ["전기쇼크", "전광석화", "볼트태클"],
        summary: "메타몽이 피카츄로 변신한 모습이다.",
        description: "노란 털과 붉은 전기 주머니, 번개 모양 꼬리가 특징인 '쥐 포켓몬'",
        email: "2423978@naver.com",
        phone: "010-4827-9391",
        website: "https://github.com/anwjrdid",
        oneLiner: "피카피카",
        img: "images/메타몽_피카츄.png"
    },
    {
        id: 3,
        name: "메타몽 꼬부기",
        track: "Frontend",
        skills: ["물대포", "로켓박치기", "하이드로펌프"],
        summary: "메타몽이 꼬부기로 변신한 모습이다.",
        description: "단단한 등껍질에 몸을 숨겨 몸을 보호하고, 입에서 거품을 뿜어내는 '꼬마거북 포켓몬'",
        email: "2423978@naver.com",
        phone: "010-4827-9391",
        website: "https://github.com/anwjrdid",
        oneLiner: "꼬북꼬북",
        img: "images/메타몽_꼬부기.png"
    },
    {
        id: 4,
        name: "메타몽 이상해씨",
        track: "Frontend",
        skills: ["덩굴채찍", "잎날여우불", "솔라빔"],
        summary: "메타몽이 이상해씨로 변신한 모습이다.",
        description: "태어날 때부터 등에 씨앗이 있고, 자라면서 씨앗도 함께 커지는 '씨앗 포켓몬'",
        email: "2423978@naver.com",
        phone: "010-4827-9391",
        website: "https://github.com/anwjrdid",
        oneLiner: "씨익씨익",
        img: "images/메타몽_이상해씨.png"
    },
    {
        id: 5,
        name: "메타몽 파이리",
        track: "Frontend",
        skills: ["불꽃세례", "화염자동차", "화염방사"],
        summary: "메타몽이 파이리로 변신한 모습이다.",
        description: "꼬리 끝에 있는 불꽃으로 감정을 표현하고, 건강하면 강하게 타오르는 '도마뱀 포켓몬'",
        email: "2423978@naver.com",
        phone: "010-4827-9391",
        website: "https://github.com/anwjrdid",
        oneLiner: "파이파이",
        img: "images/메타몽_파이리.png"
    },
    {
        id: 6,
        name: "메타몽 이브이",
        track: "Frontend",
        skills: ["몸통박치기", "애교부리기", "희망사항"],
        summary: "메타몽이 이브이로 변신한 모습이다.",
        description: "주위 환경에 따라 몸의 구성이 바뀌며 여러 모습으로 진화하는 '진화 포켓몬'",
        email: "2423978@naver.com",
        phone: "010-4827-9391",
        website: "https://github.com/anwjrdid",
        oneLiner: "이브이브이",
        img: "images/메타몽_이브이.png"
    },
    {
        id: 7,
        name: "메타몽 망나뇽",
        track: "Frontend",
        skills: ["파괴광선", "용의춤", "신속"],
        summary: "메타몽이 망나뇽으로 변신한 모습이다.",
        description: "바다 위를 날아다니며 조난당한 사람을 돕는 상냥한 마음을 가진 '드래곤 포켓몬'",
        email: "2423978@naver.com",
        phone: "010-4827-9391",
        website: "https://github.com/anwjrdid",
        oneLiner: "망나망나",
        img: "images/메타몽_망나뇽.png"
    },
    {
        id: 8,
        name: "메타몽 또가스",
        track: "Frontend",
        skills: ["오물공격", "독가스", "자폭"],
        summary: "메타몽이 또가스로 변신한 모습이다.",
        description: "얇은 풍선 같은 몸에 독가스가 가득 차 있고 다가가면 냄새가 나는 '독가스 포켓몬'",
        email: "2423978@naver.com",
        phone: "010-4827-9391",
        website: "https://github.com/anwjrdid",
        oneLiner: "또가또가",
        img: "images/메타몽_또가스.png"
    },
    {
        id: 9,
        name: "메타몽 냐옹이",
        track: "Frontend",
        skills: ["마구할퀴기", "고양이돈받기", "속여때리기"],
        summary: "메타몽이 냐옹이로 변신한 모습이다.",
        description: "밤이 되면 활동하는 야행성으로, 반짝거리는 동전을 매우 좋아하는 '나옹 포켓몬'",
        email: "2423978@naver.com",
        phone: "010-4827-9391",
        website: "https://github.com/anwjrdid",
        oneLiner: "냐옹냐옹",
        img: "images/메타몽_냐옹이.png"
    }
];

// 재시도를 위해 마지막으로 요청했던 인원수를 저장하는 변수
let lastFetchCount = 0;

// 1. 초기 렌더링 실행
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    render(); // 초기 9명을 화면에 그립니다.
});

// 2. 이벤트 리스너 설정
function setupEventListeners() {
    // 필터/정렬/검색 값 변경 시 즉시 다시 그리기
    document.querySelector('#filterPart').onchange = render;
    document.querySelector('#sortOrder').onchange = render;
    document.querySelector('#searchInput').oninput = render;

    // 아기 사자 조작 (추가/삭제)
    document.querySelector('#addLion').onclick = toggleForm;
    document.querySelector('#removeLastLion').onclick = removeLastLion;

    // 외부 API 연동
    document.querySelector('#addOneRandom').onclick = () => fetchLions(1, 'append');
    document.querySelector('#addFiveRandom').onclick = () => fetchLions(5, 'append');
    document.querySelector('#refreshAll').onclick = () => {
        // 현재 화면에 있는 인원수만큼 새로 받아와서 교체
        fetchLions(lionData.length, 'replace');
    };
    document.querySelector('#retryBtn').onclick = () => fetchLions(lastFetchCount, 'append');
}

// 3. 핵심 화면 갱신 함수 (Render)
function render() {
    const summaryGrid = document.querySelector('#summaryGrid');
    const detailsList = document.querySelector('#detailsList');
    const partFilter = document.querySelector('#filterPart').value;
    const sortOrder = document.querySelector('#sortOrder').value;
    const searchName = document.querySelector('#searchInput').value.toLowerCase();

    // [Step 1] 필터링 & 검색
    let filtered = lionData.filter(lion => {
        const isPartMatch = (partFilter === 'all' || lion.track === partFilter);
        const isNameMatch = lion.name.toLowerCase().includes(searchName);
        return isPartMatch && isNameMatch;
    });

    // [Step 2] 정렬
    if (sortOrder === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        // 최신추가순 (ID 큰 순서)
        filtered.sort((a, b) => a.id - b.id);
    }

    // [Step 3] DOM 비우기
    summaryGrid.innerHTML = '';
    detailsList.innerHTML = '';

    // [Step 4] 조건에 맞는 데이터가 없을 때 처리
    const emptyState = document.querySelector('#emptyState');
    if (filtered.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        filtered.forEach(lion => {
            summaryGrid.appendChild(makeSummaryCard(lion));
            detailsList.appendChild(makeDetailsCard(lion));
        });
    }

    // [Step 5] 총 인원 갱신
    document.querySelector('#totalCount').textContent = lionData.length;
}

// 요약 카드 객체 생성
function makeSummaryCard(lion) {
    const card = document.createElement('div');
    card.className = lion.name === "양채현" ? 'my-card box-moving' : 'card box-moving';
    card.innerHTML = `
        <img src="${lion.img || 'images/물음표.png'}">
        <div class="text">${lion.skills[0] || 'Skill'}</div>
        <div class="card-body">
            <h2>${lion.name}</h2>
            <p>${lion.track}</p>
            <b>${lion.summary}</b>
        </div>
    `;
    return card;
}

// 상세 카드 객체 생성
function makeDetailsCard(lion) {
    const card = document.createElement('div');
    card.className = 'Details-card-body Details-card';
    card.innerHTML = `
        <h1>${lion.name}</h1>
        <p>${lion.track}</p>
        <pre class="gray">LION TRACK</pre>
        <h3>자기소개</h3>
        <b>${lion.description}</b>
        <h3>연락처</h3>
        <ul>
            <li>Email : ${lion.email}</li>
            <li>Phone : ${lion.phone}</li>
            <li>Website : <a href="${lion.website}" target="_blank">${lion.website}</a></li>
        </ul>
        <h3>관심 기술</h3>
        <ul>${lion.skills.map(s => `<li>${s.trim()}</li>`).join('')}</ul>
        <h3>한 마디</h3>
        <b><mark>${lion.oneLiner}</mark></b>
    `;
    return card;
}

// 4. API 비동기 통신 함수
async function fetchLions(count, mode) {
    lastFetchCount = count;
    updateStatus('loading');

    try {
        const response = await fetch(`https://randomuser.me/api/?results=${count}&nat=us,gb,ca,au,nz`);
        if (!response.ok) throw new Error('API 호출에 실패했습니다.');
        
        const json = await response.json();
        
        // 받아온 데이터를 우리 서비스 규격에 맞게 변환
        const mapped = json.results.map(u => ({
            id: Date.now() + Math.random(),
            name: `${u.name.first} ${u.name.last}`,
            track: ['Frontend', 'Backend', 'Design'][Math.floor(Math.random() * 3)],
            skills: ['React', 'Node.js', 'Figma', 'TypeScript'].slice(0, 2),
            summary: "외부에서 온 새내기 사자입니다!",
            description: `${u.location.city}에서 공부 중인 예비 개발자입니다. 잘 부탁드려요!`,
            email: u.email,
            phone: u.phone,
            website: `https://github.com/${u.login.username}`,
            oneLiner: "성장하는 사자가 되겠습니다!",
            img: u.picture.large
        }));

        if (mode === 'replace') {
            // '내 카드(양채현)'는 보존하고 싶다면 아래와 같이 처리 가능
            const myCard = lionData.find(l => l.name === "양채현");
            lionData = myCard ? [myCard, ...mapped] : mapped;
        } else {
            lionData = [...lionData, ...mapped];
        }

        updateStatus('success');
        render();
    } catch (err) {
        updateStatus('error', err.message);
    }
}

// 상태 문구 갱신
function updateStatus(state, msg = '') {
    const statusEl = document.querySelector('#apiStatus');
    const retryBtn = document.querySelector('#retryBtn');
    const apiBtns = document.querySelectorAll('.api-controls .button');

    if (state === 'loading') {
        statusEl.textContent = "불러오는 중...";
        statusEl.className = "status-loading";
        apiBtns.forEach(b => b.disabled = true);
        retryBtn.style.display = 'none';
    } else if (state === 'success') {
        statusEl.textContent = "준비 완료";
        statusEl.className = "status-ready";
        apiBtns.forEach(b => b.disabled = false);
    } else if (state === 'error') {
        statusEl.textContent = "실패: " + msg;
        statusEl.className = "status-error";
        apiBtns.forEach(b => b.disabled = false);
        retryBtn.style.display = 'inline-block';
    }
}

// 5. 폼 보조 및 기타 기능
function toggleForm() {
    const container = document.querySelector('#formContainer');
    if (container.innerHTML !== '') {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = `
        <form id="addLionForm" class="styled-form">
            <h3 style="margin-bottom:10px;">🦁 아기 사자 등록</h3>
            <button type="button" class="button" id="fillRandom">랜덤 값 채우기</button>
            <div class="form-row">
                <input type="text" id="lionName" placeholder="이름" required>
                <select id="lionTrack">
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Design">Design</option>
                </select>
            </div>
            <input type="text" id="lionSkills" placeholder="기술 (쉼표로 구분)">
            <input type="text" id="lionSummary" placeholder="한 줄 소개">
            <textarea id="lionDescription" placeholder="자기소개"></textarea>
            <div class="form-row">
                <input type="email" id="lionEmail" placeholder="이메일">
                <input type="tel" id="lionPhone" placeholder="전화번호">
            </div>
            <input type="url" id="lionWebsite" placeholder="웹사이트">
            <input type="text" id="lionOneLiner" placeholder="한 마디">
            <div class="form-actions">
                <button type="submit" class="button">추가하기</button>
                <button type="button" class="button" onclick="document.querySelector('#formContainer').innerHTML=''">취소</button>
            </div>
        </form>
    `;

    // 랜덤 값 채우기 (요구사항 9)
    document.querySelector('#fillRandom').onclick = async () => {
        const res = await fetch('https://randomuser.me/api/');
        const data = await res.json();
        const u = data.results[0];
        document.querySelector('#lionName').value = u.name.first;
        document.querySelector('#lionEmail').value = u.email;
        document.querySelector('#lionPhone').value = u.phone;
        document.querySelector('#lionWebsite').value = "https://github.com/" + u.login.username;
    };

    document.querySelector('#addLionForm').onsubmit = (e) => {
        e.preventDefault();
        const newLion = {
            id: Date.now(),
            name: document.querySelector('#lionName').value,
            track: document.querySelector('#lionTrack').value,
            skills: document.querySelector('#lionSkills').value.split(','),
            summary: document.querySelector('#lionSummary').value,
            description: document.querySelector('#lionDescription').value,
            email: document.querySelector('#lionEmail').value,
            phone: document.querySelector('#lionPhone').value,
            website: document.querySelector('#lionWebsite').value,
            oneLiner: document.querySelector('#lionOneLiner').value,
            img: "images/물음표.png"
        };
        lionData.push(newLion);
        container.innerHTML = '';
        render();
    };
}

function removeLastLion() {
    if (lionData.length > 0) {
        lionData.pop();
        render();
    } else {
        alert("삭제할 사자가 없습니다.");
    }
}