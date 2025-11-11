// Plik: js/consent.js

// Funkcja do dynamicznego ładowania Clarity
function loadClarity() {
    // 
    // TUTAJ WKLEJ SWÓJ KOD ŚLEDZĄCY MICROSOFT CLARITY
    // Poniżej jest tylko przykład, jak on wygląda!
    //
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "u4nghb1zxs"); 
    //
    // Pamiętaj, aby podmienić "TWOJ_CLARITY_ID" na swój prawdziwy identyfikator!
    //
    console.log("Clarity Loaded.");
}

// Funkcja do ustawiania cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    // Użyj 'SameSite=Lax' dla bezpieczeństwa i 'path=/' aby działało na całej stronie
    document.cookie = name + "=" + (value || "")  + expires + "; path=/; SameSite=Lax";
}

// Funkcja do odczytywania cookie
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

// Główna logika, która odpala się po załadowaniu strony
window.addEventListener("load", function() {
    
    const banner = document.getElementById("cookie-consent-banner");
    const acceptBtn = document.getElementById("cookie-accept-btn");
    const declineBtn = document.getElementById("cookie-decline-btn");
    
    // 1. Sprawdź, czy zgoda została już udzielona
    const consent = getCookie("cookie_consent");

    if (consent === "true") {
        // Zgoda była, od razu ładuj Clarity
        loadClarity();
    } else if (consent === "false") {
        // Użytkownik świadomie odmówił, nie pokazuj banera, nie ładuj Clarity
        // (nic nie robimy)
    } else {
        // Brak zgody (ani tak, ani nie), pokaż baner
        banner.style.display = "flex";
    }

    // 2. Co się dzieje po kliknięciu "Akceptuję"
    acceptBtn.addEventListener("click", function() {
        loadClarity();
        setCookie("cookie_consent", "true", 365); // Zapisz zgodę na rok
        banner.style.display = "none";
    });

    // 3. Co się dzieje po kliknięciu "Odrzuć"
    declineBtn.addEventListener("click", function() {
        setCookie("cookie_consent", "false", 365); // Zapisz odmowę na rok
        banner.style.display = "none";
    });

});