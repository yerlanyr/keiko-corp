import './css/bootstrap.css';
import './css/animate.css';
import './css/main.css';
import 'tiny-slider/dist/tiny-slider.css';
import { tns } from "tiny-slider/src/tiny-slider";
import WOW from 'wow';
var slider = tns({
    container: '#tslider',
    prevButton: '#prev_arrow',
    nextButton: '#next_arrow',
    nav: false,
    autoplay: true,
    autoplayTimeout: 3000,
    mode: 'gallery',
    autoplayButtonOutput: false,
});

//wow.js on scroll animations initialization
let wow = new WOW(
    {
        animateClass: 'animated',
        mobile: false,
        offset: 50
    }
);
wow.init();


//Popup video
const byId = (id) => document.getElementById(id);
const q = query => document.querySelector(query);
byId('play_video').addEventListener('click', function(e){
    e.preventDefault();
    var video_link = this.dataset['video'];
    console.log(video_link);
    video_link = '<iframe src="' + video_link + '" width="500" height="208" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    const aboutVideoEl = q('.about_video');
    var d = document.createElement('div');
    d.innerHTML = video_link;
    aboutVideoEl.appendChild(d);
    aboutVideoEl.style.display = 'block';
    requestAnimationFrame(() => {
        aboutVideoEl.classList.add('shown');
    });
});
const click = (el, clb) => el.addEventListener('click', clb);
click(q('.close_video'), (e) => {
    e.preventDefault();
    const aboutVideoEl = q('.about_video');
    aboutVideoEl.classList.remove('show');
    setTimeout(() => {
        aboutVideoEl.style.display = 'none';
        aboutVideoEl.querySelector('iframe').remove();
    }, 200);
});

click(q('.burger_icon'), () => {
    q('header nav').classList.toggle('show');
    q('header .burger_icon').classList.toggle('active');
});

Array.prototype.forEach.call(document.querySelectorAll('header nav ul li a'), (el) => {
    click(el, function(e){
        e.preventDefault();
        const section = q(this.getAttribute('href'));
        window.scrollTo({
            top: section.getBoundingClientRect().top,
            behavior: 'smooth'
        });
    });
    
});



byId('submit_form').addEventListener('submit', function(e){
    e.preventDefault();
    byId('mc_submit').setAttribute('disabled', 'disabled');
    processing('icon', 'loading');
    setTimeout(chimpResponce, 1000);
});
//Mailchim Subscription form
// $('#submit_form').ajaxChimp({
//     callback: chimpResponce
// });

//Mail chimp callback function
function chimpResponce(resp) {
    if (resp && resp.result === 'success') {
        q('#submit_form #mc-email').value = '';
        q('#error_msg').style.display = 'none';
        q('#success_msg').style.display = 'block';
    }else{		
        q('#error_msg').style.display = 'block';
        q('#success_msg').style.display = 'none';
    }
    processing('loading', 'icon');
    byId('mc_submit').removeAttribute('disabled');
}

function processing(hide, show){
    q('#mc_submit i').classList.remove(hide);
    q('#mc_submit i').classList.add(show);
}