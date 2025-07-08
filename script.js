function calculate() {
  const rent = Number(document.getElementById('rent').value) || 0;
  const management = Number(document.getElementById('management').value) || 0;
  const parking = Number(document.getElementById('parking').value) || 0;
  const other = Number(document.getElementById('other').value) || 0;
  const income = Number(document.getElementById('income').value) || 1;

  const total = rent + management + parking + other;
  const percent = (total / income) * 100;

  const percentText = `支出合計は手取りの ${percent.toFixed(1)}% です。`;
  document.getElementById('percent').innerText = percentText;

  const rankBox = document.getElementById('rank');
  rankBox.className = 'rank-box';

  if (percent < 30) {
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
