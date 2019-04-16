
function fetch(url, data, method, callback) {
  if (method == "GET") {
    var header = { 'Content-Type': 'application/json' }
  }
  else if (method == "POST") {
    var header = { "Content-Type": "application/x-www-form-urlencoded" }
  }
  wx.request({
    url: app.host + url,
    data: data,
    method: method,
    header: header,
    success(res) {
      callback(null, res.data);
    },
    fail(e) {
      callback(e);
    }
  })
}

module.exports.fetch = fetch;