// ********** set date ************
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();
// ********** close links ************
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');


navToggle.addEventListener('click', function(){
    // linksContainer.classList.toggle('show-links'); This method is usable for non dinamic setups
    
    //this method will change the nav's height depending on the links you add or take out 
    //it's important to add a height auto with !important to over-right the js inline css for desktop 
    const containerHeight = linksContainer.getBoundingClientRect().height;// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
    const linksHeight = links.getBoundingClientRect().height;

    if(containerHeight === 0){
        linksContainer.style.height = `${linksHeight}px`;
    }else{
        linksContainer.style.height = 0;
    }
});

// ********** fixed navbar ************
const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');

window.addEventListener('scroll', function(){
    
    const scrollHeight = window.pageYOffset; // pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
    
    const navHeight = navbar.getBoundingClientRect().height;

    if(scrollHeight > navHeight){
        navbar.classList.add('fixed-nav');
    }else{
        navbar.classList.remove('fixed-nav');
    }

    if(scrollHeight > 500){
        topLink.classList.add('show-link');
    }else{
        topLink.classList.remove('show-link');
    }
});


// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach(function(link){
    link.addEventListener('click', function(e){

        //prevents page from scrolling when clickig link
        e.preventDefault();

        //navigate to a specific spot
        const id = e.currentTarget.getAttribute('href').slice(1);// slice extracts a section of a string without modifying original string, example instead of getting "#about" you'll get "about"
        
        //getting the element you'll scroll to
        const element = document.getElementById(id);
        
        //getting navbar height
        const navHeight = navbar.getBoundingClientRect().height;
        
        //getting container height
        const containerHeight = linksContainer.getBoundingClientRect().height;
        
        const fixedNav = navbar.classList.contains('fixed-nav'); //if it contains this class then it'll return true
       
        let position = element.offsetTop - navHeight; //offsetTop - A Number, representing the top position of the element, in pixels
        
        //if fixedNav is false 
        if(!fixedNav){
            position = position - navHeight; //we are subtracting navheight again because seance navbar wasn't fixed it's height was 0 so navHeight = 0 but latter it becomse fixed so navHeight has value for example 20px. So what is happening is (position - 0) and latter here (position - 20) becouse it became fixed latter on 
        }
        
        //for it to work on mobile and not leave the space of the oppened nav
        if(navHeight > 82){// 82 is the height of the closed navbar in mobile
            position = position + containerHeight;
        }
        
        //Adding scroll
        window.scrollTo({
            left: 0,
            top: position
        });
        
        //clossing navbar after clicking link
        linksContainer.style.height = 0;
    });
});