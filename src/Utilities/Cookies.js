  const setCookie = (name, value) => {
    let now = new Date();
    let time = now.getTime();
    time += 3600 * 1000;  // 1 hour
    now.setTime(time);    // Adjust the date object to the new time
    let expires = now.toUTCString();  // Convert to UTC/GMT format

    document.cookie = `${name}=${value}; expires=${expires}; path=/; Secure; SameSite=Strict`;
}

  
  const getCookie = (name) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  
  const deleteCookie = (name) => {
    document.cookie = name + '=; Max-Age=-99999999; path=/; Secure; SameSite=Strict';
  }
  
  export {setCookie, getCookie, deleteCookie};
  