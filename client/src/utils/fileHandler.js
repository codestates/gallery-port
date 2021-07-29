import axios from 'axios';

export function deleteHandler(e, curFiles, setCurFiles) {
  const deleteId = e.target.parentElement.id;
  const filteredCurFiles = curFiles.filter(
    curFile => curFile !== curFiles[deleteId]
  );
  setCurFiles(filteredCurFiles);
}
export function inputFilesHandler(input, setCurFiles) {
  const imageFiles = input.current.files;
  const fileArray = Object.values(imageFiles);
  setCurFiles(fileArray);
}

export function addFilesHandler(addAnother, curFiles, setCurFiles) {
  const imageFiles = addAnother.current.files;
  const fileArray = Object.values(imageFiles);
  setCurFiles(curFiles.concat(fileArray));
}

export function addFileHandler(selectThumbnail, setProject_thumbnail) {
  const imageFiles = selectThumbnail.current.files;
  setProject_thumbnail(imageFiles[0]);
}

export const convertURLtoFile = async url => {
  const response = await axios.get(url);
  const data = await response.blob();
  const jpg = url.split('.').pop();
  const filename = url.split('/').pop();
  const metadata = { type: `image/${jpg}` };
  return new File([data], filename, metadata);
};

// export function convertURLtoFile(url) {
// return fetch(url).then(res => res.blob());
// .then(blob => {
//   return URL.createObjectURL(blob);
// });
// }
