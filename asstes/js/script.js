async function loadComponent(id, file) {
    const response = await fetch(file);
    const data = await response.text();
    document.getElementById(id).innerHTML = data;

    if(id === "header"){
        initMenu();
    }
}

function initMenu(){
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    if(hamburger && navLinks){
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            hamburger.classList.toggle("active");
        });
    }
}

loadComponent("header","header.html");
loadComponent("footer","footer.html");