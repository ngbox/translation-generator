export function stripHtml(html: string) {
  const tempBody = document.implementation.createHTMLDocument('').body;
  tempBody.innerHTML = html;
  return tempBody.textContent || tempBody.innerText || '';
}

export function insertPlaceholders(text: string, interpolation = ['{{', '}}']) {
  const [left, right] = interpolation;
  const interpolationRegex = new RegExp(`${left}\\s*\\S+\\s*${right}`, 'g');
  const tokens = text.match(interpolationRegex) || [];

  if (tokens.length) {
    let index = 0;
    text = text.replace(interpolationRegex, () => `{{${index++}}}`);
  }

  return [text, ...tokens];
}

export function replacePlaceholders(text: string, tokens: string[]) {
  tokens.forEach((token, index) => {
    text = text.replace(`{{${index}}}`, token);
  });

  return text;
}
