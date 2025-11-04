import countryIpRanges from "../data/countryIpRanges";

function ipToNumber(ip: string): number {
  return ip.split(".").reduce((acc, octet) => (acc << 8) + +octet, 0) >>> 0;
}

function numberToIp(num: number): string {
  return [
    (num >>> 24) & 0xff,
    (num >>> 16) & 0xff,
    (num >>> 8) & 0xff,
    num & 0xff,
  ].join(".");
}

const ipRanges: Record<string, string[][]> = countryIpRanges;

export default function getRandomIpByCountry(isoCode: string): string {
  const ranges = ipRanges[isoCode.toUpperCase()];
  
  if (!ranges) {
    throw new Error("Страна не найдена или нет данных по IP диапазонам");
  }

  const [startIp, endIp] = ranges[Math.floor(Math.random() * ranges.length)];

  const startNum = ipToNumber(startIp);
  const endNum = ipToNumber(endIp);

  const randomIpNum =
    Math.floor(Math.random() * (endNum - startNum + 1)) + startNum;

  return numberToIp(randomIpNum);
}
