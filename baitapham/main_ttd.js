const KW0 = 500;
const KW50 = 650;
const KW100 = 850;
const KW150 = 1100;
const KW150_HON = 1300;

let total = 0;

function calcTier1(soDien, price1) {
  return soDien * price1;
}

function calcTier2(soDien, price2) {
  return (soDien - 50) * price2;
}

function calcTier3(soDien, price3) {
  return (soDien - 100) * price3;
}

function calcTier4(soDien, price4) {
  return (soDien - 200) * price4;
}

function calcTier5(soDien, price5) {
  return (soDien - 350) * price5;
}

function calcSoTienDien(soDien, price1, price2, price3, price4, price5) {
  if (0 <= soDien && soDien <= 50) {
    const tier1 = calcTier1(soDien, price1);
    total = tier1;
    console.log(total);
  } else if (50 < soDien && soDien <= 100) {
    const tier1 = calcTier1(50, price1);
    const tier2 = calcTier2(soDien, price2);
    total = tier1 + tier2;
    console.log(total);
  } else if (100 < soDien && soDien <= 200) {
    const tier1 = calcTier1(50, price1);
    const tier2 = calcTier2(100, price2);
    const tier3 = calcTier3(soDien, price3);
    total = tier1 + tier2 + tier3;
    console.log(total);
  } else if (200 < soDien && soDien <= 350) {
    const tier1 = calcTier1(50, price1);
    const tier2 = calcTier2(100, price2);
    const tier3 = calcTier3(200, price3);
    const tier4 = calcTier4(soDien, price4);
    total = tier1 + tier2 + tier3 + tier4;
    console.log(total);
  } else if (soDien > 350) {
    const tier1 = calcTier1(50, price1);
    const tier2 = calcTier2(100, price2);
    const tier3 = calcTier3(200, price3);
    const tier4 = calcTier4(300, price4);
    const tier5 = calcTier5(soDien, price5);
    total = tier1 + tier2 + tier3 + tier4 + tier5;
    console.log(total);
  }
}

document.getElementById("btnTinhTien").onclick = function () {
  const soDien = document.getElementById("soDien").value * 1;

  calcSoTienDien(soDien, KW0, KW50, KW100, KW150, KW150_HON);

  const content = `Số tiền điện phải trả là: ${total.toLocaleString()} VNĐ`;
  document.getElementById("pThongBao").innerHTML = content;
};
