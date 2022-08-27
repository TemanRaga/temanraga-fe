const urlSplitter = (index) => {
  let currentURL = window.location.href;
  let splitURL = currentURL.split("/");
  let lengthURL = splitURL.length;
  console.log(splitURL);
  console.log(splitURL[lengthURL - index]);
  return splitURL[lengthURL - index];
};

export default urlSplitter;
