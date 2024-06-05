export function deleteKeys(obj: any, keys: string[]): any {
  const out = { ...obj };
  for (const key of keys) {
    const subKeys = key.split('.');
    let curObj = out;
    let curKey = '';
    for (const subKey of subKeys) {
      curKey = !curKey ? subKey : `${curKey}.${subKey}`;
      if (subKey in curObj) {
        if (curKey === key) {
          delete curObj[subKey];
        } else {
          curObj = curObj[subKey];
        }
      }
    }
  }
  return out;
}
