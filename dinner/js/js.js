
$(window).on('load', () => {
  /*Меню*/
  let menu = document.querySelector('.menu');
  let menuBtn = document.querySelector('.btn-menu');
  let mainMenu = document.querySelector('.menu__nav');

  $('.main__arrow').on('click', function(e) {
      e.preventDefault();

      moveLink('select');
  });

  menu.addEventListener('click', openMenu);
  menuBtn.addEventListener('click', openMenu);
  mainMenu.addEventListener('click', linkNavigation);

  function linkNavigation(e) {
      e.preventDefault();
      e.stopPropagation();
      let target = event.target;

      if (target.tagName != 'A') return false;

      if (!target.dataset.menu) {
          window.open(target.href, '_blank')

          return;
      }

      moveLink(target.dataset.menu);
      openMenu();
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

  // анимация меню
  let $els = $('.menu__item a, .menu__nav header');
  let count = $els.length;
  let grouplength = Math.ceil(count/3);
  let groupNumber = 0;
  let i = 1;
  
  $('.menu__nav').css('--count', count+'');
  $els.each(function(j){
      if ( i > grouplength ) {
          groupNumber++;
          i=1;
      }
      $(this).attr('data-group',groupNumber);
      i++;
  });
  $els.each(function(j){
    $(this).css('--top',$(this)[0].getBoundingClientRect().top + ($(this).attr('data-group') * -10) - 30);
    $(this).css('--delay-in', j * .1 + 's');
    $(this).css('--delay-out', (count - j) * .1+'s');
  });

  $('.menu__nav footer button').on('click', openMenu);

  function openMenu(e) {
    if (e)
      e.preventDefault();

    $els.each(function(j){
        // console.log($(this));
        $(this).css('--top',$(this)[0].getBoundingClientRect().top + ($(this).attr('data-group') * -10) - 30);
        $(this).css('--delay-in', j * .1 + 's');
        $(this).css('--delay-out', (count - j) * .1+'s');
    });
    $('.menu__nav').toggleClass('closed');
    if ($('.menu__nav').hasClass('closed')) {
      setTimeout(() => {
        $(menu).toggleClass('opened');
        $(menuBtn).toggleClass('opened');
      }, 400);
    } else {
      $(menu).toggleClass('opened');
      $(menuBtn).toggleClass('opened');
    }

    if (e)
      e.stopPropagation();
  }

  // Выбор времени обеда
  $('.select__list').on('click', function(e) {
    if (e.target.tagName != 'INPUT')
      return;

    let selectElem = e.target.closest('.select__list__item');

    if (selectElem)
      selectElem.classList.toggle('selected');
  });

  function getSelectedList() {
    let selectedList = [];
    
    $('.select__list__item.selected').each((elem) => {
      selectedList.push($(elem).find('.select__item__text').text());
    });

    return selectedList.join(', ');
  }

  /* Паралакс */
  let scene = document.getElementById('parallax-1');

  new Parallax(scene);
  
  /* Маска на телефон */
  $('.input__phone').mask("+7 (999) 999-99-99?9");


  /* Открытие модального окна */
  let modalList = {};  // буфер модальных окон
  let nameModal = ""; // открытое модальное окно
  let buttonModal = ""; // если форма не в модалном окне

  $('.js-open_modal').on('click', openModal);

  function openModal(e, modalName) {
      if (e) {
          e.stopPropagation();

          nameModal = e.target.textContent;
      }
  
      let modal = modalName || (e && e.target.dataset.modal);

      if (!modal) return;

      if (!modalList[modal]) {
          let modalElement = document.querySelector('.' + modal);

          if (!modalElement) return;

          modalList[modal] = modalElement;
      }

      // Заголовок в модальном окне
      modalList[modal].querySelector('.modal__caption').textContent = nameModal;

      modalList[modal].classList.add('active');
  
      document.querySelector('body').style.cssText = 'overflow: hidden;';
  };


  $('.js-close_modal').on('click', closeModal);

  $('.js--not-modal').on('click', function(e) {
    buttonModal = $(this).text();
  });

  function closeModal(e, modalName) {
    if (e) 
        e.stopPropagation();

    let modal = modalName || (e && e.target.dataset.modal);

    if (!modal) return;

    if (!modalList[modal]) {
        let modalElement = document.querySelector('.' + modal);

        if (!modalElement) return;

        modalList[modal] = modalElement;
    }

    // Удалаяем продукт
    nameModal = '';

    // Удаление alert
    let alert = $(modalList[modal]).find('.alert-close');

    alert && alert.remove();

    modalList[modal].classList.remove('active');

    document.querySelector('body').style.cssText = '';
  }

  $('.modal > div').on('click', function(e) {
      e.stopPropagation();
  });  


  // Отправка заявок
  $('.form').on('submit', sendMail);
  // $('.form__record').on('submit', sendMail);

  document.querySelector('body').addEventListener('click', function() {
    if(document.querySelector('.alert-danger')) $('.alert-danger').fadeOut(300);
  })

  let loader = document.querySelector('.form__loader');

  function sendMail(event){
      event.preventDefault();

      let button = $(this);
      let form = $(this).closest('form');

      // loader
      form.addClass('load');

      button.attr('disabled', 'disabled');
      
      let resRequired = checkRequired(form);

      if (!resRequired) {
          button.prop('disabled', false);
          form.removeClass('load');

          return;
      }

      let dataForm = {};

      form.find ('input, textearea').each((index, value) => {
          dataForm[value.name] = $(value).val();
      });

      if (nameModal) dataForm['modal'] = nameModal;
      else dataForm['modal'] = buttonModal;

      dataForm['selected'] = getSelectedList();

      console.log(dataForm);

      $.ajax({
          url: './mail.php',
          type: 'POST',
          data: dataForm,
      })
      .done((msg) => {
          console.log(msg);
          if(msg == "Ok"){
              let message = 'Ваша заявка принята. Мы скоро позвоним к Вам.';
              let succesTemplate = '<div class="alert alert-success"><p>'+ message +'</p></div>';

              form.removeClass('load');
              form.append(succesTemplate);

              let alert = form.find('.alert-success');

              setTimeout(() => {
                  if (alert) {
                      alert.remove();
                  }
              }, 3000);
          }
          else {
              let message = 'Произошла ошибка. Попробуйте позже.';

              button.prop('disabled', false);
              form.removeClass('load');
              alertDanger(form, message);
          }
      })
      .fail(function(msg) {
        console.log(msg);
          let message = 'Произошла ошибка. Попробуйте позже.';

          form.removeClass('load');
          button.prop('disabled', false);
          alertDanger(form, message);
      })
  };

  function checkRequired(form) {
      let requiredList = form.find('.input__required');
      let validate = true;
      let validData = {
          phone: (val) => {
              val = val.replace(/[()-\s+]/g, '');

              /* let re = /^\d[\d\(\)\ -]{4,14}\d$/;
              let valid = re.test(val); */

              let valid = (val.length > 10) ? true : false;

              return (valid) ? true : false;
          },
          email: (val) => {
              let re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
              let valid = re.test(val);

              return (valid) ? true : false;
          },
          check: (val) => {
            return val;
          }
      };

      requiredList.each((index, value) => {
          let valid = value.dataset.valid;
          let valueInput = (value.name == 'check') 
            ? value.checked
            : value.value;

          if (valid && validData[valid]) {
              validate = validData[valid](valueInput);
          }

          if (!valueInput || !validate) {
              value.classList.add('required');

              /* Убираем Error */
              form.find('input', 'textarea').on('click', (e) => {
                  $(e.target).removeClass('required');
              });
          }

          if (!valueInput) {
              alertDanger(form, 'Заполнены не все обязательные данные');

              return false;
          }
          if (!validate) {
              alertDanger(form, 'Даные введены неверно.');

              return false;
          }
      });

      return validate;
  }

  function alertDanger(form, message){
      var errorTemplate = `<div class="alert-close">
          <div class="alert alert-danger">` 
          + message 
          + '</div></div>';

      form.prop('disabled', false);
      form.append(errorTemplate);

      let alert = form.find('.alert-close');

      alert.on('click', () => {
          alert.remove();
      });
      
      setTimeout(() => {
          if (alert) {
              alert.remove();
          }
      }, 3000);
  }
});


