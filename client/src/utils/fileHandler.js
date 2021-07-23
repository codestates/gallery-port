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
