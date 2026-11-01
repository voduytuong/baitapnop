const btnCongThuc = document.getElementById("btnCongThuc");
btnCongThuc.onclick = function () {
  const chieuDai = document.getElementById("chieuDai").value * 1;
  const chieuRong = document.getElementById("chieuRong").value * 1;

  let dienTich = chieuDai * chieuRong;
  let chuVi = (chieuDai + chieuRong) * 2;
  const tinhDienTich = `Diện tích của HCN là:  ${dienTich}`;
  const tinhChuVi = `Chu vi của HCN là: ${chuVi}`;

  const pCongThuc_1 = document.getElementById("pCongThuc_1");
  pCongThuc_1.innerHTML = tinhDienTich;
  const pCongThuc_2 = document.getElementById("pCongThuc_2");
  pCongThuc_2.innerHTML = tinhChuVi;
};