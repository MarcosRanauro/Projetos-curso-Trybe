export default function verifyQuery(query: string) {
  if (query === 'true') {
    return true;
  } if (query === 'false') {
    return false;
  }
  return '';
}
