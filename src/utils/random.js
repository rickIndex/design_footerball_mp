function getRandomNumber(min, max) {
  // 获取 min（包括）和 max（包括）之间的随机整数
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default getRandomNumber