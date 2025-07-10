// ページロード時にセレクト要素を生成
window.onload = function () {
  // ①〜④: 0.0〜20.0 万円（0.1刻み）
  const ids = ['rent', 'management', 'parking', 'other'];
  ids.forEach(id => {
    const select = document.getElementById(id);
    for (let i = 0; i <= 200; i++) { // 0.0〜20.0 万円
      const value = (i / 10).toFixed(1);
      const option = document.createElement('option');
      option.value = value;
      option.text = `${value} 万円`;
      select.appendChild(option);
    }
  });

  // ⑤: 月収（手取り） 10〜100 万円（1万円刻み）
  const incomeSelect = document.getElementById('income');
  for (let i = 10; i <= 100; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = `${i} 万円`;
    incomeSelect.appendChild(option);
  }
};

function calculate() {
  const rent = Number(document.getElementById('rent').value) || 0;
  const management = Number(document.getElementById('management').value) || 0;
  const parking = Number(document.getElementById('parking').value) || 0;
  const other = Number(document.getElementById('other').value) || 0;
  const income = Number(document.getElementById('income').value) || 1;

  const total = rent + management + parking + other;
  const percent = (total / income) * 100;

  document.getElementById('percent').innerText =
    `支出合計：${total.toFixed(1)} 万円 ／ 月収：${income.toFixed(1)} 万円\n⇒ ${percent.toFixed(1)}%`;

  const rankBox = document.getElementById('rank');
  rankBox.className = 'rank-box';

  if (percent < 20) {
    rankBox.innerText = 'A判定（優）';
    rankBox.classList.add('rank-a');
  } else if (percent < 40) {
    rankBox.innerText = 'B判定（注意）';
    rankBox.classList.add('rank-b');
  } else {
    rankBox.innerText = 'C判定（危険）';
    rankBox.classList.add('rank-c');
  }

  document.getElementById('result').classList.remove('hidden');
}
