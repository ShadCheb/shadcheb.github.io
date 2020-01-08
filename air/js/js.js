/*Отправка форомы*/
let alert = '';

// $('.question__form').on('submit', sendMail);
$('.modal__form-form').on('submit', sendMail);

document.querySelector('.modal__form__content').addEventListener('click', function(e){
	if(document.querySelector('.modal__form__content .alert-danger')) $('.alert-danger').fadeOut(300);
})

let loader = document.querySelector('.form__loader');

function sendMail(event, typeCourse){
    event.preventDefault();

    loader.classList.add('show');

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

        loader.classList.remove('show');
        
        setTimeout(function(){
        	if (alert) {
				alert.remove();
			}
        }, 3000);
    }

    let name = $(this).find('.form__name').val();

    $.ajax({
        // url: 'mail.php',
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

            loader.classList.remove('show');
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


/* Модвльное окно */

let modalList = {
    modal_form: null
};

let openModalAddress = '';

modalList.modal_form = document.querySelector('.modal__form');
modalList.modal_form.addEventListener('click', closeModal);

modalList.modal_form.querySelector('.modal__form__content').addEventListener('click', function(e) {
    e.stopPropagation();
});

function closeModal(e) {
    this.classList.remove('active');
    document.querySelector('body').style.cssText = '';
}

$('.open_modal').on('click', openModal);

function openModal(e) {
    e && e.stopPropagation();
    e && e.preventDefault();

    if (openModalAddress) {
        openModalAddress.classList.remove('active');
        document.querySelector('body').style.cssText = '';
    }

    if (modalList[this.dataset.modal]) {
        modalList[this.dataset.modal].classList.add('active');

        openModalAddress = modalList[this.dataset.modal];
    }

    document.querySelector('body').style.cssText = 'overflow: hidden;';
};



(function(){
    /* Появление */
    var topBar = document.querySelector('.main__nav');
    let serviceBlocks = document.querySelector('.service__blocks');

    window.addEventListener('scroll', tScroll, false);
    document.body.addEventListener('scroll', tScroll, false);

    tScroll();

    function tScroll() {
        if ($(window).scrollTop() > 400) topBar.classList.add('mn__scroll');
        else topBar.classList.remove('mn__scroll');
    };

    serviceBlocks.addEventListener('click', move);

    /*Меню перемещение*/
    function move(event) {
        event.preventDefault();
        let target = event.target;

        if(target.tagName != 'A') return false;
        moveLink(target.dataset.menu);
    }

    function moveLink(link) {
        if (!link) return;
        link = '#' + link;

        let V = 0.2;
        let w = window.pageYOffset;  // прокрутка
        let t = document.querySelector(link).getBoundingClientRect().top;  // отступ от окна браузера до id
        let start = null;

        window.scrollTo(0,w + t);
    }

    /*Меню*/

    let menubtn = document.querySelector('.btn-menu');
    let menuNav = document.querySelector('.main__nav');

    menubtn.addEventListener('click', function(e) {
        e.stopPropagation();

        menubtn.classList.toggle('active');
        menuNav.classList.toggle('open');
    });

    document.querySelector('.main__nav').addEventListener('click', function(e) {
        let target = event.target;

        if(target.tagName != 'A') return false;
        moveLink(target.dataset.menu);

        menubtn.classList.remove('active');
        menuNav.classList.remove('open');
    });


    /*Ответы на вопросы*/

    /* let answersBlocks = document.querySelector('.question__blocks');
    let openAnswerBlock = '';

    answersBlocks && answersBlocks.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        let target = e.target;
        let answers = false;

        while (this != target) {
            if (target.classList.contains('question__block-caption')) {
                answers = true;

                break;
            }
            target = target.parentElement;
        }

        if (!answers) return;

        let answerBlock =  target.nextElementSibling;

        if (openAnswerBlock === answerBlock) {
            $(openAnswerBlock).slideToggle(300);

            return;
        } else {
            if (openAnswerBlock) {
                $(openAnswerBlock).slideUp(300);
            }
        }

        openAnswerBlock = answerBlock;

        $(openAnswerBlock).slideToggle(300);
    }); */

    /* Паралакс */
    var scene = document.getElementById('parallax-1');

    var parallaxInstance = new Parallax(scene);

    // Вкладки
    $('.air__tabs').on('click', (e) => {
      let target = $(e.target);

      if (!target.is('a')) return;

      let parentBlock = target.closest('.air__block-mask');
      let tabs = target.closest('.air__tabs');

      if (!parentBlock) return;

      tabs.find('.active').removeClass('active');
      target.addClass('active');

      let link = target.data('link');
      let activeTab;
      let tab;

      if (link == 'description') {
        activeTab = 'air__block__description';
        tab = 'air__block__price';
      } else {
        tab = 'air__block__description';
        activeTab = 'air__block__price';
      }

      $(parentBlock).find('.' + tab).fadeOut(300);

      setTimeout(() => {
        $(parentBlock).find('.' + activeTab).fadeIn(300);
      }, 300);
    });


    /*Маска*/
    $(function(){
      $(".form__phone").mask("+7 (999) 999-99-99?9");
    });
}());
