function calcThueThuNhapCaNhan(tongThuNhap, soNguoiPhuThuoc) {
  const thue = tongThuNhap - 4 - soNguoiPhuThuoc * 1.6;
  return thue;
}

function soThueSuat(thuNhapChiuThue) {
  if (thuNhapChiuThue <= 60) {
    return 5;
  } else if (thuNhapChiuThue > 60 && thuNhapChiuThue <= 120) {
    return 10;
  } else if (thuNhapChiuThue > 120 && thuNhapChiuThue <= 210) {
    return 15;
  } else if (thuNhapChiuThue > 210 && thuNhapChiuThue <= 384) {
    return 20;
  } else if (thuNhapChiuThue > 384 && thuNhapChiuThue <= 624) {
    return 25;
  } else if (thuNhapChiuThue > 624 && thuNhapChiuThue <= 960) {
    return 30;
  } else if (thuNhapChiuThue > 960) {
    return 35;
  } else {
    return 0;
  }
}

document.getElementById("btnTinhThue").onclick = function () {
  const hoTen = document.getElementById("hoTen").value;
  const tongThuNhap = parseFloat(document.getElementById("tongThuNhap").value);
  const soNguoiPhuThuoc = document.getElementById("soNguoi").value * 1;

  const thuNhapChiuThue = calcThueThuNhapCaNhan(tongThuNhap, soNguoiPhuThuoc);
  const thueSuat = soThueSuat(thuNhapChiuThue);

  let thuePhaiNop = 0;
  if (thuNhapChiuThue > 0) {
    thuePhaiNop = (thuNhapChiuThue * thueSuat) / 100;
  }

  const rs = `${hoTen} phải nộp ${thuePhaiNop.toFixed(2)} triệu đồng thuế thu nhập cá nhân.`;
  document.getElementById("pThongBao").innerHTML = rs;
  console.log("Hello");
};
