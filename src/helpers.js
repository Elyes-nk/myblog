const getText = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const text = doc.body.textContent;
  if (text.length > 300) {
    return text.substring(0, 300) + "...";
  }
  return text
};

export { getText };
