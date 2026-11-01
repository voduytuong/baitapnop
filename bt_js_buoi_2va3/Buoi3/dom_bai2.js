const btnTinh = document.getElementById("btnTinh");
btnTinh.onclick = function () {
  const soThuc_1 = document.getElementById("soThuc_1").value * 1;
  const soThuc_2 = document.getElementById("soThuc_2").value * 1;
  const soThuc_3 = document.getElementById("soThuc_3").value * 1;
  const soThuc_4 = document.getElementById("soThuc_4").value * 1;
  const soThuc_5 = document.getElementById("soThuc_5").value * 1;
  let giaTriTrB = (soThuc_1 + soThuc_2 + soThuc_3 + soThuc_4 + soThuc_5) / 5;

  const ketQua = `Giá trị trung bình của 5 số thực là: ${giaTriTrB}`;
  const pGiaTriTrB = document.getElementById("pGiaTriTrB");
  pGiaTriTrB.innerHTML = ketQua;
};


