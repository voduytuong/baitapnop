// Sự kiện: Ẩn/hiện ô "Số kết nối" khi thay đổi loại khách hàng
document.getElementById("loaiKH").onchange = function () {
  const loaiKhachHang = document.getElementById("loaiKH").value;
  const inputSoKetNoi = document.getElementById("soKetNoi");

  if (loaiKhachHang === "doanhNghiep") {
    //* Hiện ô nhập kết nối
    inputSoKetNoi.style.display = "inline-block";
  } else {
    //* Ẩn ô nhập kết nối
    inputSoKetNoi.style.display = "none";
  }
};

function calcTienNhaDan(soKenh) {
  const phiXuLy = 4.5;
  const phiCoBan = 20.5;
  const phiKenh = 7.5 * soKenh;
  return phiXuLy + phiCoBan + phiKenh;
}

function calcPhiCoBan(soKetNoi) {
  let phiCoBan = 75;
  if (soKetNoi > 10) {
    phiCoBan += (soKetNoi - 10) * 5;
  }
  return phiCoBan;
}

function calcTienDoanhNghiep(soKenh, soKetNoi) {
  const phiXuLy = 15;
  const phiKenh = 50 * soKenh;
  let phiCoBan = calcPhiCoBan(soKetNoi);
  return phiXuLy + phiCoBan + phiKenh;
}

document.getElementById("btnTinhTien").onclick = function () {
  const loaiKH = document.getElementById("loaiKH").value;
  const maKH = document.getElementById("maKH").value;
  const soKenh = document.getElementById("soKenh").value * 1;
  const soKetNoi = document.getElementById("soKetNoi").value * 1;

  let tongTien = 0;

  if (loaiKH === "nhaDan") {
    tongTien = calcTienNhaDan(soKenh);
  } else if (loaiKH === "doanhNghiep") {
    tongTien = calcTienDoanhNghiep(soKenh, soKetNoi);
  }

  const content = `Mã khách hàng: ${maKH}; Tiền cáp: $${tongTien.toFixed(2)}`;
  document.getElementById("pThongBao").innerHTML = content;
};
