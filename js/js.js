let product = '';

$(window).on('load', () => {
    /* 
     * Модальные окна
     */
    $(function () {
        let modalList = {};  // буфер модальных окон
        let dataSend = null;  // Дополнительные данные для отправки

        $('.js-open_modal').on('click', openModal);

        function openModal(e, modalName) {
          if (e) {
            e.stopPropagation();
            // e.preventDefault();

            // Устанавливаем тип кнопки, если он есть
            let type = e.target.dataset.type;

            if (type) dataSend = { type };
          }
      
          let modal = modalName || (e && e.target.dataset.modal);

          if (!modal) return;

          if (!modalList[modal]) {
              let modalElement = document.querySelector('.' + modal);

              if (!modalElement) return;

              modalList[modal] = modalElement;
          }

          modalList[modal].classList.add('active');
      
          document.querySelector('body').style.cssText = 'overflow: hidden;';
        };


        $('.js-close_modal').on('click', closeModal);

        function closeModal(e, modalName) {
          if (e) {
              e.stopPropagation();
              // e.preventDefault();
          }
      
          let modal = modalName || (e && e.target.dataset.modal);

          if (!modal) return;

          if (!modalList[modal]) {
              let modalElement = document.querySelector('.' + modal);

              if (!modalElement) return;

              modalList[modal] = modalElement;
          }

          // Удалаяем продукт
          dataSend = null;

          // Удаление alert
          let alert = $(modalList[modal]).find('.alert-close');

          alert && alert.remove();

          modalList[modal].classList.remove('active');

          document.querySelector('body').style.cssText = '';
        }

        $('modal > div').on('click', function(e) {
          e.stopPropagation();
          // e.preventDefault();
        });


      /*
      * Отправка заявок
      */
        /* Маска на телефон */
        $('.input__phone').mask("+7 (999) 999-99-99");
        
        $('.js-btn_submit').on('click', sendMail);

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

          if (dataSend && dataSend.type) 
            dataForm['type'] = dataSend.type;
      
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


    /* Появление */
    var topBar = document.querySelector('.main__top-navbar');

    window.addEventListener('scroll', tScroll);
    // document.body.addEventListener('scroll', tScroll, false);

    tScroll();

    function tScroll() {
      if ($(window).scrollTop() > 99.4) topBar.classList.add('mn__scroll');
      else topBar.classList.remove('mn__scroll');
    };


    /*Меню перемещение*/

    function moveLink(link) {
      if (!link) return;

      link = '#' + link;
      
      let V = 0.2;
      let w = window.pageYOffset;  // прокрутка
      let t = document.querySelector(link).getBoundingClientRect().top - 40;  // отступ от окна браузера до id
      let start = null;
      requestAnimationFrame(step);  // функция анимации
      function step(time) {
        if (start === null) start = time;
        var progress = time - start,
            r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
        window.scrollTo(0,r);
        if (r != w + t) {
          requestAnimationFrame(step)
        }
      }
    }

    /*Меню*/

    let menubtn = document.querySelector('.btn-menu');
    let menuNav = document.querySelector('.js-nav');
    let servicesNav = document.querySelector('.service__blocks');

    menubtn.addEventListener('click', toggleMenu);

    // menubtn.addEventListener('click', closeMenu);
    // menuNav.addEventListener('click', closeMenu);
    
    // function closeMenu(e) {
    //   e.stopPropagation();

    //   menubtn.classList.toggle('active');
    //   menuNav.classList.toggle('open');
    // }

    function toggleMenu() {
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        menuNav.classList.remove('open');
      } else {
        this.classList.add('active');
        menuNav.classList.add('open');
      }
    }

    function closeSubMenu() {
      const activeElement = menuNav.querySelector('.active');

      if (activeElement) {
        activeElement.classList.remove('active');
      }
      window.removeEventListener('click', closeSubMenu, true);
    }

    menuNav.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      let target = event.target;

      if (target.tagName != 'A') return;

      if (document.documentElement.clientWidth > 992) {
        if (target.parentElement.classList.contains('sub-menu')) {
          target.parentElement.classList.add('active');
          window.addEventListener('click', closeSubMenu, true);
        } else if (target.dataset.menu) {
          moveLink(target.dataset.menu);
        }
      } else {
        if (target.parentElement.classList.contains('sub-menu')) {
          target.parentElement.classList.add('active');
          window.addEventListener('click', closeSubMenu, true);
        } else if (target.dataset.menu) {
          menuNav.classList.remove('open');
          menubtn.classList.remove('active');
          moveLink(target.dataset.menu);
        }
      }
    });

    servicesNav.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      let target = event.target;

      if (target.tagName != 'A') return;

      if (target.dataset.menu) {
        moveLink(target.dataset.menu);
      }
    });
});

