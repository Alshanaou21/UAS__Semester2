//Toggle Class Actrive
const navbarNav = document.querySelector('.navbar-nav');

// When Hamburger Menu is Clicked
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');   
};

//Click on outside of the navbar, to close the navbar
const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function(e){
    if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)){
        navbarNav.classList.remove('active');
    }
})
