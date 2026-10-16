const btnSumKySo = document.getElementById("btnSumKySo");
btnSumKySo.onclick = function () {
  const number = document.getElementById("number").value * 1;
  let number1 = number % 10;
  let number2 = Math.floor(number / 10);

  let sum = number1 + number2;
  const ketQua = `Tổng ký số là: ${sum}`;
  const pInfo = document.getElementById("pInfo");
  pInfo.innerHTML = ketQua;
};