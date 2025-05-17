// otp.js

function generateOtp() {
  const otp = 100000 + Math.floor(Math.random() * 900000);
  return otp.toString();
}

module.exports = { generateOtp };
