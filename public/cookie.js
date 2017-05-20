window.onload = (function () {
    var visit = getCookie("cookie");
    if (visit == null) {
        alert("Bem vindo! Esta é a sua primeira visita!");
        var expire = new Date();
        expire = new Date(expire.getTime() + 7776000000);
        document.cookie = "cookie=here; expires=" + expire;
    }

});


function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}