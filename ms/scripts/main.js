$(document).ready(function() {

  function debounce(func, wait, immediate) {
    var timeout;
      return function() {
          var context = this, args = arguments;
          clearTimeout(timeout);
          timeout = setTimeout(function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
          }, wait);
          if (immediate && !timeout) func.apply(context, args);
      };
  };



  
  var Overlay = (function() {
    var bookNow = document.querySelectorAll('.bookNow'), 
      overlay = document.querySelector('.js-overlay'), 
      visibleClass = ' overlay__visible',
      overlayCross = document.querySelector('.js-overlayClose'),
      containsVisibleClass = (overlay.className.indexOf(visibleClass) > -1);


    function _showOrHideOverlay() {
      if (!containsVisibleClass) {
        overlay.className += visibleClass;
        containsVisibleClass = true;
      } else {
        overlay.className = overlay.className.replace(visibleClass, '');
        containsVisibleClass = false;
      }
    }

    function addHideOverlayEventListener() {
      overlayCross.addEventListener('click', _showOrHideOverlay);
    }

    function addShowOverlayEventListener() {
      for (var i = 0; i < bookNow.length; i++) {
        bookNow[i].addEventListener('click', _showOrHideOverlay);
      }
    }

    function removeAllEventListeners() {
      for (var i = 0; i < bookNow.length; i++) {
        bookNow[i].removeEventListener('click', _showOrHideOverlay);
      }

      if (containsVisibleClass) {
        overlay.className = overlay.className.replace(visibleClass, '');
        containsVisibleClass = false;
      }

      overlayCross.removeEventListener('click', _showOrHideOverlay);
    }

    function init() {

      resizeOnLoad = true;

      var resize = debounce(function() {
        if (window.innerWidth < 767) {
          addShowOverlayEventListener();
          addHideOverlayEventListener();
        } else {
          removeAllEventListeners();
        }
        
      }, 350);

      window.addEventListener('resize', resize);

      if (resizeOnLoad) {
        window.dispatchEvent(new Event('resize'));
        resizeOnLoad = false;
      }      
    }

    return {
      init: init
    }
  })();

  var Magnific = (function() {

    function initShowreel() {
      var showreelSelector = '.showreel',
        activeClass = 'active',      
        $showreel = $(showreelSelector);

      $showreel.magnificPopup({
        type:'iframe', 

        callbacks: {
          open: function() {
            $showreel.addClass(activeClass);

            $.magnificPopup.instance.close = function() {
              $.magnificPopup.proto.close.call(this);
              $showreel.removeClass(activeClass);
            }
          }
        }, 

        mainClass:'mfp-fade',
        removalDelay: 300, 
        preloader: false, 
        fixedcontentPos: false, 
        enableEscapeKey: true
      });
    }

    function initContactForm() {
      var bookNowSelector = '.bookNow'
        contactFormSelector = '.js-contactForm',
        $bookNow = $(bookNowSelector),
        $contactForm = $(contactFormSelector);

      $bookNow.magnificPopup({
        callbacks: {
          open: function() {
            $contactForm.css('display', 'block');

            $.magnificPopup.instance.close = function() {
              $(".contact__form")[0].reset();
              $(".contact__submitMessage").html('');
              $.magnificPopup.proto.close.call(this);
            }
          }
        }, 
        type: 'inline',
        mainClass:'mfp-fade',
        removalDelay: 300,
        preloader: false, 
        modal: false,
        enableEscapeKey: true, 
        disableOn: function() {
          if( $(window).width() < 767 ) {
            return false;
          }
          return true;
        }
      });
    }

    function init() {
      initShowreel();
      initContactForm();
    }

    return {
      init: init
    }

  })();



  ContactForm = (function() {
    function changeLabelColorOnFocus() {
      
    }

    function validateForm() {
      var formFieldsSelector = '.contact__inputField',
        messageSelector = '.contact__submitMessage',
        submitButtonSelector = '.js-form-submit',
        allFieldsFull = false,
        formFields = document.querySelectorAll(formFieldsSelector),
        message = document.querySelector(messageSelector),
        submitButton = document.querySelector(submitButtonSelector);




        var inputDebounce = debounce(function() {
          var regex = new RegExp(this.pattern);

          if (this.value == '') {
            this.style.borderBottom = '1px solid red';
            allFieldsFull = false;
          } else {
              if (regex.test(this.value) != false) {
                this.style.borderBottom = "1px solid green";
              } else {
                this.style.borderBottom = '1px solid red';
              }
          }
          
        }, 400);
        
      function checkCurrentField() {
        for (var i = 0; i < formFields.length; i++) {
          formFields[i].addEventListener('input', inputDebounce);
        }

      }

      function checkAllFields() {
        for (var i = 0; i < formFields.length; i++) {
          if (formFields[i].value == '') {
            formFields[i].style.borderBottom = "1px solid red";
            allFieldsFull = false;
          } else {
            formFields[i].style.borderBottom = "1px solid black";
            allFieldsFull = true;
          }
        }
      }

      function submitEventListener() {
        submitButton.addEventListener('click', function(e) {
          e.preventDefault();
          checkAllFields();
          checkCurrentField();
          ajax();
        });
      }
      checkCurrentField();
      submitEventListener();
      function ajax() {

          if (!message.innerHTML == '') {
            message.innerHTML = '';
          }

          var dataString = $(".contact__form").serialize();
          $(".spinner").css('display', 'block');
          $.ajax({
            type: 'post',
            url: 'test.php',
            data: dataString,
            success: function(html) {
              setTimeout(function() {
                $(".spinner").css('display', 'none');

                var response = html.trim();
                if (response == 'success') {
                  message.innerHTML = 'Thank you for your enquiry. We will get back to you shortly.';
                } else if (response == 'fail') {
                  message.innerHTML = 'Please fill in all fields.'
                } else {
                  // message.innerHTML = 'There was a problem sending your message.';
                  message.innerHTML = response;
                }
              }, 500);
            }
          });
      }
    }

    function init() {
      validateForm();
    }

    return {
      init: init
    }
  })();

  var FixedHeaderOnScroll = (function() {


    window.onscroll = function() {
      var y = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      var x = $('.js-navbar');
      var header = $('.header');
      

      if (y >= 350) {
        x.addClass('navbar--fixed');
      } else {
        x.removeClass('navbar--fixed');
      }
    }


    // $(window).scroll(function() {
    //   var scroll = $(window).scrollTop();

    //   if (scroll >= 380) {
    //     if ($('.js-navbar').css('position') != 'fixed') {
    //       $('.js-navbar').css({position:"fixed",top:"-70px"}).animate({top:"0",},400,"linear")
    //     } else if (scroll <= 180) {
    //         if($('.js-navbar').css("position") != "static")
    //           $('.js-navbar').animate({top:"-70px",},400,"linear",function(){
    //           $('.js-navbar').css({position:"static"})
    //         })
    //     }
    //   }
    // });


  })();

  var ArrowBounce = (function() {


    var arrowBounceSelector = '.js-arrow-bounce',
      bodySelector = 'body',
      shopSectionSelector = '#shop-content-start',
      arrowBounce = document.querySelector(arrowBounceSelector),
      body = document.querySelector(bodySelector),
      shopSection = document.querySelector(shopSectionSelector);
      

    function getElementY(query) {
      return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top
    }

    function doScrolling(element, duration) {
      var startingY = window.pageYOffset
      var elementY = getElementY(element)
      // If element is close to page's bottom then window will scroll only to some position above the element.
      var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY
      var diff = targetY - startingY
      // Easing function: easeInOutCubic
      // From: https://gist.github.com/gre/1650294
      var easing = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }
      var start

      if (!diff) return

      // Bootstrap our animation - it will get called right before next frame shall be rendered.
      window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp
        // Elapsed miliseconds since start of scrolling.
        var time = timestamp - start
        // Get percent of completion in range [0, 1].
        var percent = Math.min(time / duration, 1)
        // Apply the easing.
        // It can cause bad-looking slow frames in browser performance tool, so be careful.
        percent = easing(percent)

        window.scrollTo(0, (startingY + diff * percent) - 40)

        // Proceed with animation as long as we wanted it to.
        if (time < duration) {
          window.requestAnimationFrame(step)
        }
      })
    }

    function init() {
      if (!arrowBounce || !shopSection) {
        return;
      }
      arrowBounce.addEventListener('click', function() {
        doScrolling(shopSectionSelector, 1000);
      });
    }

    return {
      init: init
    }

  })();


  var navbarDropdown = (function() {
    var navbarSelector = '.js-navbar',
      navbar = document.querySelector(navbarSelector);

    function navbarAndDocumentEventListeners() {
      // document.addEventListener('click', function() {
      //   navbar.style.maxHeight = '0';
      // })
    }

    function init() {
      navbarAndDocumentEventListeners();
    }

    return {
      init: init
    }
  })();

  
  // var bLazy = new Blazy({
  //   selector: 'img', 

  //   success: function() {
  //     $(".loadingAnimation").css('display', 'none');
  //   }
  // });

  /* Set up - inits */
  Overlay.init();
  Magnific.init(); /* Showreel and Contact Form */
  /* fixed header already initialisd */
  ContactForm.init();
  navbarDropdown.init();
  ArrowBounce.init('#shop-content-start');



});



//   function validateForm() {
//     var formField = $(".form-field");
//     var message = $('.form-message');
//     var filled = false;

//     $(".js-form-submit").one('click', function(e) {
//       e.preventDefault();
      
//       for (var i = 0; i < formField.length; i++) {
//         if ($(formField[i]).val().length == 0) {
//           message.html('Please complete all the fields');
//           $(formField[i]).css('border-bottom', "1px solid red");
//           filled = false;
//         } 

//         else {
//           $(formField[i]).css('border-bottom', '');
//           filled = true;
//         }

//       }

//       if (filled == true) {

//         var dataString = $('.form').serialize();
//         $.ajax({
//           type: 'post', 
//           url: 'test.php', 
//           data: dataString, 
//           beforeSend: function() {
//             message.html('loading');
//           },
          
//           success: function(html) {
//             message.html(html);
            
//           }
//         });
//       }
//     });
//   }

// });