const urlSplitter = (index) => {
  let currentURL = window.location.href;
  let splitURL = currentURL.split("/");
  let lengthURL = splitURL.length;
  return splitURL[lengthURL - index];
};

export default urlSplitter;
