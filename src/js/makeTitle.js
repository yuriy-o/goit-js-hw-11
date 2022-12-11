export function makeTitle(pageURL) {
  const string = pageURL
    .replace('https://pixabay.com/photos/', '')
    .slice(0, pageURL.length - 35)
    .replaceAll('-', ' ')
    .trim()
    .split(' ');

  const withoutDuplicates = [...new Set(string)].join(' ');
  const array = withoutDuplicates.split('');
  const firstLetterInUpperCase = array.shift().toUpperCase();
  const withOutFirstLetter = array.slice(0, array.length).join('');
  const title = firstLetterInUpperCase + withOutFirstLetter;

  return title;
}
