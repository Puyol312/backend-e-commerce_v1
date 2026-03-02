export function getRandomNumber(start?:number, finish?:number) { 
  if (!start) 
    start = 0;
  if (!finish)
    finish = Number.MAX_SAFE_INTEGER;
  return Math.floor(Math.random() * (finish - start + 1)) + start;
}