window.onload = (function () {
    var visit = getCookie("visit");
    if (visit == null) {
        console.log("site ainda não visitado.");
        alert("Bem vindo! Esta é a sua primeira visita!");
        var date = new Date();
        date.setDate(date.getDate() + 3650000);
        setCookie("visit", "here", date)
        return;
    }
    console.log("site já visitado.");

});

function setCookie(name, value, duration) {
        var cookie = name + "=" + escape(value) +
        ((duration) ? "; duration=" + (duration).toUTCString() : "");
 
        document.cookie = cookie;
}

function getCookie(name) {
    var cookies = document.cookie;
    var prefix = name + "=";
    var begin = cookies.indexOf("; " + prefix);
 
    if (begin == -1) {
 
        begin = cookies.indexOf(prefix);
         
        if (begin != 0) {
            return null;
        }
 
    } else {
        begin += 2;
    }
 
    var end = cookies.indexOf(";", begin);
     
    if (end == -1) {
        end = cookies.length;                        
    }
 
    return unescape(cookies.substring(begin + prefix.length, end));
}

function deleteCookie(name) {
       if (getCookie(name)) {
              document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
       }
}