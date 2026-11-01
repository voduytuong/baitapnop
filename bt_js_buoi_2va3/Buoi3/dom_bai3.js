const btnDoiTien = document.getElementById("btnDoiTien");
btnDoiTien.onclick = function () {
  const tienUSD = document.getElementById("tienUSD").value * 1;
  let tienVND = tienUSD * 23500;

  //& convert vnd
  const FORMATTER = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  let doiTienVND = FORMATTER.format(tienVND);

  const ketQua = `Số tiền được đổi từ USD sang VND là: ${doiTienVND}`;
  const pDoiTien = document.getElementById("pDoiTien");
  pDoiTien.innerHTML = ketQua;
};

