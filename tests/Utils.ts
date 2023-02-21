
export function assert_buffer(buff: Buffer | undefined): boolean {
  if (buff === undefined) {
    return false;
  }

  return buff.length !== 0;
}