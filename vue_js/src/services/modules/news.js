import q from 'q'
import axios from 'axios'

const API_URL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=099148be22804e849a0c6fe022b7cf5e'

function getNewsItems () {
  var deferred = q.defer()
  axios({
    method: 'GET',
    url: API_URL
  }).then(resp => {
    deferred.resolve(resp)
  }).catch(err => {
    deferred.reject(err)
  })
  return deferred.promise
}

export default {
  getNewsItems
}
