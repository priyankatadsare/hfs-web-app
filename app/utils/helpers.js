import moment from 'moment';
import React, { Fragment } from 'react';
export function toLocaleString(totn_number = '', showCurrency) {
  return totn_number.toLocaleString(
    'en-IN',
    showCurrency
      ? {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 0,
        }
      : {
          minimumFractionDigits: 0,
        },
  );
}

export function formatDate(
  date,
  format = 'YYYY-MM-DD',
  outputFormat = 'Do MMMM',
) {
  const informat = format || 'YYYY-MM-DD';
  console.log('informat', informat, 'date', date);
  return moment(date, informat).format(outputFormat);
}

export function* downloadFile(data, filename, mime) {
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  const byteCharacters = atob(data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], {
    type: mime || 'application/octet-stream',
  });
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE doesn't allow using a blob object directly as link href.
    // Workaround for "HTML7007: One or more blob URLs were
    // revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing
    // the URL has been freed."
    window.navigator.msSaveBlob(blob, filename);
    return;
  }
  // Other browsers
  // Create a link pointing to the ObjectURL containing the blob
  const blobURL = window.URL.createObjectURL(blob);
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = blobURL;
  tempLink.setAttribute('download', filename);
  // Safari thinks _blank anchor are pop ups. We only want to set _blank
  // target if the browser does not support the HTML5 download attribute.
  // This allows you to download files in desktop safari if pop up blocking
  // is enabled.
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank');
  }
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  // yield put(downloadNachFormSuccess(true));
  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(blobURL);
  }, 100);
}

export function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export const revertFormatDate = (
  date,
  outputFormat = 'YYYY-MM-DD',
  inputFormat = 'DD-MM-YYYY',
) => {
  const inputDate = moment(date, inputFormat);
  if (inputDate.isValid()) {
    return inputDate.format(outputFormat);
  }
  return '';
};

export const formatToCurrency = (number, currency = 'en-IN') => {
  const numb = (+number || 0).toFixed(2);
  return (
    <Fragment>&nbsp; ₹{new Intl.NumberFormat(currency).format(numb)}</Fragment>
  );
};
