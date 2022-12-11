export function makeTitle(pageURL) {
  const string = pageURL
    .replace('https://pixabay.com/photos/', '')
    .slice(0, pageURL.length - 35)
    .replaceAll('-', ' ')
    .trim()
    .split('');

  const firstWordInUpperCase = string.shift().toUpperCase();
  const withOutFirstWord = string.slice(0, string.length).join('');
  const title = firstWordInUpperCase + withOutFirstWord;

  return title;
}
