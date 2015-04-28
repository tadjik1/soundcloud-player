export function convertQueryParamsToString(params) {
  let orderedParams = Object.keys(params).sort();
  let res = '';

  orderedParams.forEach((key) => {
    res += key + params[key].toString();
  });

  return res;
}

