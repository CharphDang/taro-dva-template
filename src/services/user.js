import request from "../utils/request";

function* getProductData(data) {
  return yield request({
    url: "/api/getProductData111",
    method: "post",
    data,
  });
}

export { getProductData };
