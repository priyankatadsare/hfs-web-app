import _ from 'lodash';
// import $ from 'jquery';
let timeout = null;

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
async function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  const checkStatus = response;
  const body = await checkStatus.json().then(resp => resp);
  return new Promise(function(resolve, reject) {
    if (body.status >= 400) {
      // TODO- remove jquery and add react-bootstrap modal
      // $('#serverErrorModal').modal('show');
      resolve(body);
    } else {
      resolve(body);
    }
  });
}

function checkException(response) {
  if (response.throwError === true) {
    throw response.json;
  }
  autoLogoutUser(1000 * 60 * 15);

  return response;
}
/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (
    (response.status >= 200 && response.status < 300) ||
    response.status === 409
  ) {
    return response;
  }
  return response.json().then(json => ({
    json,
    status: response.status,
    throwError: true,
  }));
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(
  url,
  options,
  skipHeaders = false,
  content_type = { 'Content-Type': 'application/json' },
) {
  let headers = {};
  if (skipHeaders) {
    headers = {
      headers: {
        // 'Content-Type': 'multipart/form-data;boundary="boundary"',
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
        // type: 'formData',
      },
    };
  } else {
    headers = {
      headers: {
        Accept: 'application/json',
        // 'Access-Control-Allow-Credentials': true,
        'x-api-key': 'clix-dev-kyfhzu1nsZTx4y7kZH1H3IOmX2jwMJyI8sX6WsuW',
        'x-api-secret': 'ZpT5X51vUH0zQnc4zfTP26PRlFTU3rq6d25tjolB',
        authorization: 'Basic SEZTX0NMSUVOVDpwYXNzd29yZA==',
      },
    };
    headers.headers = _.merge({}, headers.headers, content_type);
  }

  /* eslint-disable no-param-reassign */
  options = _.merge(headers, options);
  // options = _.merge(options, { withCredentials: true });
  // options = _.merge(options, { mode: 'cors' });
  /* eslint-enable no-param-reassign */

  return fetch(url, options)
    .then(checkStatus)
    .then(checkException)
    .then(parseJSON);
}

function autoLogoutUser(expiry) {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    if (sessionStorage.getItem('cuid')) {
      sessionStorage.removeItem('cuid');
      window.location.reload();
    }
  }, expiry);
}
