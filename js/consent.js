// Plik: js/consent.js

function loadClarity() {
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "u4nghb1zxs"); 
    console.log("Clarity Loaded.");
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

window.addEventListener("load", function() {
    
    const banner = document.getElementById("cookie-consent-banner");
    const acceptBtn = document.getElementById("cookie-accept-btn");
    const declineBtn = document.getElementById("cookie-decline-btn");
    
    const consent = getCookie("cookie_consent");

    if (consent === "true") {
        loadClarity();
    } else if (consent === "false") {
    } else {
        banner.style.display = "flex";
    }

    acceptBtn.addEventListener("click", function() {
        loadClarity();
        setCookie("cookie_consent", "true", 365);
        banner.style.display = "none";
    });

    declineBtn.addEventListener("click", function() {
        setCookie("cookie_consent", "false", 365);
        banner.style.display = "none";
    });

});