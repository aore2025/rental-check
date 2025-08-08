// 初期選択肢の生成
window.onload = function () {
  // ①〜④: 0.0〜20.0 万円（0.1刻み＝千円単位）
  const ids = ['rent', 'management', 'parking', 'other'];
  ids.forEach(id => {
    const select = document.getElementById(id);
    for (let i = 0; i <= 200; i++) { // 0.0〜20.0
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

  // 使いやすい初期値
  document.getElementById('rent').value = '7.0';
  document.getElementById('management').value = '0.5';
  document.getElementById('parking').value = '0.0';
  document.getElementById('other').value = '0.0';
  incomeSelect.value = '25';
};

function calculate() {
  const rent = Number(document.getElementById('rent').value) || 0;
  const management = Number(document.getElementById('management').value) || 0;
  const parking = Number(document.getElementById('parking').value) || 0;
  const other = Number(document.getElementById('other').value) || 0;
  const income = Number(document.getElementById('income').value) || 1;

  const total = rent + management + parking + other;
  const percent = (total / income) * 100;

  // 値の表示（％は全角に）
  document.getElementById('percent').innerText =
    `支出合計：${total.toFixed(1)} 万円 ／ 月収（手取り）：${income.toFixed(1)} 万円\n⇒ ${percent.toFixed(1)}％`;

  const rankBox = document.getElementById('rank');
  const rankNote = document.getElementById('rankNote');
  rankBox.className = 'rank-box'; // 既存のランク色をリセット

  // 判定基準：
  // A: <=25%
  // B: >25% && <=35%
  // C: >35% && <=50%
  // D: >50%
  let rankText = '';
  let noteText = '';
  if (percent <= 25) {
    rankText = 'A　すばらしい！引っ越し頑張って！';
    noteText = '新生活で不安もいっぱいでしょう、でもひとまず家賃は問題なさそう。\n手続きいろいろ頑張ってくださいね。';
    rankBox.classList.add('rank-a');
  } else if (percent > 25 && percent <= 35) {
    rankText = 'B　おそらく大丈夫でしょう。';
    noteText = 'ちょっと家賃高いかもだけど、大丈夫でしょう。\n新生活には家具や日用品の出費がかさむけど、やりくり頑張ってくださいね。';
    rankBox.classList.add('rank-b');
  } else if (percent > 35 && percent <= 50) {
    rankText = 'C　うーん、ちょっと心配です。';
    noteText = 'すこし背のびしているかも。家賃、ほんとに払える？\nもうすこし妥協したら家賃さがるなら、そこも検討した方がいいと思います。';
    rankBox.classList.add('rank-c');
  } else {
    rankText = 'D　高すぎ!無謀です。';
    noteText = '高収入なら大丈夫です。でも仕事始めたばかりや大学生はやりすぎ。\n思わぬところで出費がかさむことは多いから、もっと家賃下げて！';
    rankBox.classList.add('rank-d');
  }

  rankBox.innerText = rankText;
  rankNote.innerText = noteText;

  document.getElementById('result').classList.remove('hidden');
}
