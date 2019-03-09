import forOwn from 'lodash/forOwn';

export const processFiles = fileData => {
  const filesList = [];

  let totalFileSize = 0;

  forOwn(fileData, value => 	{
    filesList.push(value);
    totalFileSize += value.size;
  });

  return { filesList, totalFileSize };
};
