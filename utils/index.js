export function setToken (value) {
  window && window.localStorage.setItem('token', value)
}

export function getToken () {
  return window && window.localStorage.getItem('token')
}

export function removeToken () {
  return window && window.localStorage.removeItem('token')
}

export function setUserId (value) {
  window && window.localStorage.setItem('user_id', value)
}

export function getUserId () {
  return window && window.localStorage.getItem('user_id')
}

export function removeUserId () {
  return window && window.localStorage.removeItem('user_id')
}

export function cookieToJson (cookies) {
  if (!cookies) {
    return
  }
  const cookieArr = cookies.split(';')
  const obj = {}
  cookieArr.forEach((i) => {
    const arr = i.split('=')
    const key = arr[0].trim()
    obj[key] = arr[1]
  })
  return obj
}
