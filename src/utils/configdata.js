function getConfigJson() {
  var baseData
  $.ajax({
    url: 'serverConfig.json',
    type: 'get',
    dataType: 'json',
    async: false,
    success: function(req) {
      baseData = req
    }
  })
  return baseData
}

export default getConfigJson()

