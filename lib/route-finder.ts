export const lastItem = (url:string) => {
  const last = url.split('/')
  return last[last.length - 1]
}

export const routeItem = (url:string):string[] => {
  const lastItm = url.split('/')
  return lastItm
}

export function countSlashes(url: string): number {
  const count = (url.match(/\//g) || []).length;
  return count;
}