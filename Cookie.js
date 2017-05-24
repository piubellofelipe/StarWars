window.onload = (function () {
    var visit = getCookie("cookie");
    console.log("cookie: ", visit.getDate);
    if (visit == null) {
        console.log("site ainda não visitado.");
        alert("Bem vindo! Esta é a sua primeira visita!");

        setCookie("cookie", "here", 36500)
        return;
    }
    console.log("site já visitado.");

});

function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}


function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


function deleteCookie(name) {
       if (getCookie(name)) {
              document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
       }
}