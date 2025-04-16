function camelToSnake(str: string) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function camelToSnakeObject(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(camelToSnakeObject);
  } else if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        camelToSnake(key),
        camelToSnakeObject(value),
      ])
    );
  }
  return obj;
}
