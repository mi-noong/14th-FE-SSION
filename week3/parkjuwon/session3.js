// 아기 사자 추가 버튼 클릭 시 입력 카드 보여주기
document.getElementById("add").onclick = function() {
    document.querySelector(".addcard").style.display = "block";
};

// 카드 개수 업데이트 함수
function updateCardCount() {
    const countEl = document.getElementById('count');
    const cards = document.querySelectorAll('.cardlist .card');
    countEl.innerText = `${cards.length}명`;
}

// 페이지 로드 후 초기 개수 업데이트
window.addEventListener('DOMContentLoaded', () => {
    updateCardCount();
});

// 카드 생성 버튼 클릭
document.getElementById("creatCard").onclick = function() {
    const name = document.getElementById("name").value.trim();
    const part = document.getElementById("part").value.trim();

    // 필수 입력 체크
    if (!name) {
        alert("이름을 입력하세요!");
        return;
    }
    if (!part) {
        alert("파트를 선택하세요!");
        return;
    }

    // 카드 생성
    const cardList = document.querySelector(".cardlist");
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="https://via.placeholder.com/200" alt="사진">
        <h2>${name}</h2>
        <p class="role">${part}</p>
        <p>자기소개가 없습니다.</p>
    `;
    cardList.appendChild(card);

    // 카드 개수 업데이트
    updateCardCount();

    // 입력창 초기화
    document.getElementById("name").value = "";
    document.getElementById("part").value = "";
    document.querySelector(".addcard").style.display = "none";
};

// 마지막 카드 삭제 버튼 클릭
document.getElementById("del").onclick = function() {
    const cardList = document.querySelector(".cardlist");
    const cards = cardList.querySelectorAll('.card');
    if (cards.length > 0) {
        cardList.removeChild(cards[cards.length - 1]);
        updateCardCount();
    }
};