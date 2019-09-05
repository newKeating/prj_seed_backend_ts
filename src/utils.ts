import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

// import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";
// import moment from "moment";
import bcrypt from "bcrypt";
// import generator from "generate-password";
// import crypto from "crypto";

// export const generateSecret = () => {
//   const randomNumber = Math.floor(Math.random() * adjectives.length);
//   return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
// };

// export const generateCryptedSecret = () => {
//   const secret = generateSecret();
//   const hashedSecret = bcrypt.hash(secret, 5);
//   return hashedSecret;
// };

// export const generateRandomPassword = (): string => {
//   const password = generator.generate({
//     length: 10,
//     numbers: true,
//     uppercase: false
//   });
//   return password;
// };

export const sendMail = email => {
  const options = {
    auth: {
      // api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "peter@lunchwit.com",
    to: address,
    subject: "__ 로그인 시크릿 🔒",
    html: `안녕하세요. ___ 로그인 시크릿입니다. <strong>${secret}</strong>.<br/>복사하여서 아래의 링크로 입력해주세요.`
  };
  return sendMail(email);
};

export const sendPasswordResetMail = (address, name, newPassword) => {
  const email = {
    from: "peter@lunchwit.com",
    to: address,
    subject: "___ 비밀번호 변경 메일입니다.",
    html: `___ 서비스의 "${name}"님의 비밀번호 변경 요청에 의한 메일입니다. <br/> <strong>발급된 임시 비밀번호: ${newPassword} </strong> <br/> 비밀번호는 소문자와 숫자로만 구성되어져 있습니다. <br/> 발급된 임시비밀번호를 사용하여 로그인 한뒤에 비밀번호 변경을 해주세요. <br/> 만약 비밀번호 변경 신청을 한적이 없다면, 고객센터에 문의해주시기 바랍니다. `
  };
  return sendMail(email);
};

export const generateToken = id =>
  // jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });
  jwt.sign({ id }, process.env.JWT_SECRET as string);

export const hashPassword = password => {
  const BCRYPT_ROUNDS = 10;
  return bcrypt.hash(password, BCRYPT_ROUNDS);
};

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// export const todayInBetween = (startDate, endDate) => {
//   if (moment().isSameOrAfter(startDate) && moment().isSameOrBefore(endDate)) {
//     return true;
//   } else {
//     return false;
//   }
// };

// export const checkDatePassedToday = date => {
//   const datePassed = moment().isAfter(date);
//   if (datePassed) {
//     return true;
//   } else {
//     return false;
//   }
// };

// export const countDownDays = targetDate => {
//   const leftDays = moment(targetDate).diff(new Date(), "days");
//   if (leftDays > 0) {
//     return leftDays;
//   } else {
//     return 0;
//   }
// };

export const getAge = bDate => {
  const today = new Date();
  // const birthDate = new Date(DOB);
  const birthDate = new Date(bDate);
  const age = today.getFullYear() - birthDate.getFullYear() + 1;
  // const m = today.getMonth() - birthDate.getMonth();
  // if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //   age = age - 1;
  // }

  return age;
};

export const sleep = delay => {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
};

export const generateRandomFourDigitNumber = () => {
  return Math.floor(1000 + Math.random() * 9000);
};
