function toggleForm() {
    const formSection = document.getElementById('form-section');
    formSection.classList.toggle('hidden');
}





function addLion() {
    const name = document.getElementById('input-name').value;
    const part = document.getElementById('input-part').value;
    const bio = document.getElementById('input-bio').value;
    const skills = document.getElementById('input-skills').value.split(',')[0]; // 첫 번째 기술만 배지로 사용

    if (!name || !bio) {
        alert("이름과 한 줄 소개를 입력해주세요!");
        return;
    }

    const container = document.getElementById('card-container');

    const newCard = document.createElement('div');
    newCard.className = 'cardbox';

    newCard.innerHTML = `
        <div class="img-frame">
            <img src="C:\\Users\\silvercastle\\pblwork\\새 폴더\\75a8c7e3299d1.png" alt="멤버">
            <span class="badge">React</span>
        </div>
        <div class="cardbox-text">
            <h2>${name}</h2>
            <span class="point"><b>${part}</b></span>
            <p>${bio}</p>
        </div>
    `;

    container.appendChild(newCard);

    toggleForm(); 
}