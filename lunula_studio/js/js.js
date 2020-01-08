/* Паралакс */
var scene = document.getElementById('parallax-1');

var parallaxInstance = new Parallax(scene);


/*Меню*/
let menubtn = document.querySelector('.btn-menu');
let mainMenu = document.querySelector('.main__menu');

$('.record_link').on('click', function(e) {
    e.preventDefault();

    let target = event.target;

    moveLink(target.dataset.menu);
});

menubtn.addEventListener('click', function(e) {
    e.stopPropagation();

    menubtn.classList.toggle('active');
    mainMenu.classList.toggle('open');
});

mainMenu.addEventListener('click', function(e) {
    e.stopPropagation();

    menubtn.classList.toggle('active');
    mainMenu.classList.toggle('open');
});

document.querySelector('.main__nav').addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    let target = event.target;

    if (target.tagName != 'A') return false;

    if (!target.dataset.menu) {
        window.open(target.href, '_blank')

        return;
    }

    moveLink(target.dataset.menu);

    menubtn.classList.remove('active');
    mainMenu.classList.remove('open');
});

function moveLink(link) {
    if (!link) return;
    link = '#' + link;
    let V = 0.2;
    let w = window.pageYOffset;  // прокрутка
    let t = document.querySelector(link).getBoundingClientRect().top;  // отступ от окна браузера до id
    let start = null;

    window.scrollTo(0,w + t);
}

lightGallery(document.querySelector('#gallery-master')); 


// Видео заставка
let videoList = {
    video1: {
        idContainer: 'video-1',
        idVideo: 'gZLEDz3sFys',
        api: null
    },
    video2: {
        idContainer: 'video-2',
        idVideo: '59ZFxufnUWE',
        api: null
    },
    video3: {
        idContainer: 'video-3',
        idVideo: 'TE_7EwUukSA',
        api: null
    },
    video4: {
        idContainer: 'video-4',
        idVideo: 'n6mcU8OiUBE',
        api: null
    },
};
let containerVideo = document.querySelector('.review__video-blocks');
let templateVideo = document.querySelector('#template-video');


function onYouTubePlayer() {
    for (let video in videoList) {
        let idContent = videoList[video].idContainer;
        let idVideo = videoList[video].idVideo;

        renderTemplateVideo(video);

        runAPIReady(idContent, idVideo, video);
    }

    $('.video-block__play').on('click', clickPlayVideo);
};

function renderTemplateVideo(video) {
    let element;

    if('content' in templateVideo){
        element = templateVideo.content.children[0].cloneNode(true);
    } else{
        element = templateVideo.children[0].cloneNode(true);
    }

    element.dataset.video = video;
    element.querySelector('.video-block__video').id = videoList[video].idContainer;

    containerVideo.appendChild(element);
}

function clickPlayVideo(e) {
    let number = e.target.parentElement.dataset.video;

    this.classList.add('hidden');
    this.parentElement.classList.add('play');

    videoList[number].api.playVideo();
}

/* function clickPauseVideo(e) {
    let number = e.target.parentElement.dataset.video;

    this.classList.add('hidden');

    videoList[number].api.playVideo();
} */

function runAPIReady(container, video, number) {
    videoList[number].api = new window['YT'].Player(container, {
        videoId: video,
        playerVars: {
            // controls: 0,
            modestbranding: 1,
            rel: 0,
        },
        events: {
            'onPlay': clickPlayVideo
        }
    });
}

$(document).ready(function () {
    function loadPlayer() {
        if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
            let scriptYT = document.createElement("script");
  
            scriptYT.src = "https://www.youtube.com/iframe_api";
            let firstScriptTag = document.getElementsByTagName("script")[0];

            firstScriptTag.parentNode.insertBefore(scriptYT, firstScriptTag);

            window.onYouTubePlayerAPIReady = function () {
                onYouTubePlayer();
            };
        }
    }

    $(function () {
        loadPlayer();
    })
});


// Отправка заявок
$('.form-form').on('submit', sendMail);

document.querySelector('body').addEventListener('click', function() {
	if(document.querySelector('.alert-danger')) $('.alert-danger').fadeOut(300);
})

let loader = document.querySelector('.form__loader');

function sendMail(event, typeCourse){
    event.preventDefault();

    loader && loader.classList.add('show');

    var nameForm = event.target.className;
	$(this).find('button').attr('disabled', 'disabled');
    if ($(this).find('.alert').length) {
    	$(this).find('.alert').remove();
    }

    let phone = $(this).find('.form__phone').val();

    if (!phone || phone === '' ||  phone.length < 6){
        let message = '';
        phone === '' ? message = "Заполните поле Телефон" : message = "Введите Телефон правильно";
        alertDanger(message);
        return;
    }
    function alertDanger(mess){
    	var errorTemplate = '<div class="alert alert-danger"><p>'+ mess +'</p></div>';

    	$('.' + nameForm + ' button').prop('disabled', false);
        $('.' + nameForm).append(errorTemplate);
        alert = $('.' + nameForm + ' .alert-danger');

        loader && loader.classList.remove('show');
        
        setTimeout(function(){
        	if (alert) {
				alert.remove();
			}
        }, 3000);
    }

    let name = $(this).find('.form__name').val();

    $.ajax({
        url: 'telegram.php',
        type: 'POST',
        data: {
            name: name || 'Клиент',
            phone
        },
    })
    .done((msg) => {
        if(msg === "Ok"){
            var message = 'Ваша заявка принята. Мы скоро позвоним к Вам.';
            var succesTemplate = '<div class="alert alert-succes"><p>'+ message +'</p></div>';

            $(this).find('input').attr('disabled', 'disabled');
            $(this).append(succesTemplate);

            loader && loader.classList.remove('show');
        }
        else {
            var message = 'Произошла ошибка. Попробуйте позже.';
            alertDanger(message);
        }
    })
    .fail(function(msg) {
        var message = 'Произошла ошибка. Попробуйте позже.';
        alertDanger(message);
    })
};
