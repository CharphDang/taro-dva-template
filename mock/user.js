module.exports = {
  "POST /api/getProductData111": (req, res) => {
    //搜索
    res.send({
      status: "ok",
      data: {
        title: "Hello World",
        name: "CharphDang",
        age: "789",
      },
    });
  },
};
