module.exports = function (restClient) {
  let module = {};
  const urlPrefix = 'order/';
  let url = urlPrefix;
  function isResponseValid(data) {
    return data.code === 200;
  }
  function getResponse(data){
    if(isResponseValid(data)){
      return data.result;
    }
    return false;
  }
  module.create = (orderData) => {
    url += `create`;
    return restClient.post(url, orderData).then((data)=> {
      if (isResponseValid(data)) {
        data.result = {
          magentoOrderId: data.result.order_id,
          backendOrderId: data.result.order_id,
          transferedAt: new Date(),
          token: data.result.token,
          upgrade: data.result.upgrade
        };
      }
      return getResponse(data);
    });
  }
  return module;
}
