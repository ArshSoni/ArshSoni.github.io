$(document).ready(function() {
  
  var Overlay = (function() {
    var bookNow = document.querySelectorAll('.bookNow'), 
      overlay = document.querySelector('.overlay'), 
      visibleClass = ' visible',
      overlayCross = document.querySelector('.cross'),
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

      overlayCross.removeEventListener('click', _showOrHideOverlay);
    }

    function init() {

      resizeOnLoad = true;

      window.addEventListener('resize', function() {
        if (window.innerWidth < 767) {
          addShowOverlayEventListener();
          addHideOverlayEventListener();
        } else {
          removeAllEventListeners();
        }
      });

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
        contactFormSelector = '.contactForm',
        $bookNow = $(bookNowSelector),
        $contactForm = $(contactFormSelector);

      $bookNow.magnificPopup({
        callbacks: {
          open: function() {
            $contactForm.css('display', 'block');

            $.magnificPopup.instance.close = function() {
              $.magnificPopup.proto.close.call(this);
            }
          }
        }, 
        mainClass:'mfp-fade',
        type: 'inline', 
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
      var formFieldsSelector = '.form-field',
        messageSelector = '.form-message',
        submitButtonSelector = '.js-form-submit',
        allFieldsFull = false,
        formFields = document.querySelectorAll(formFieldsSelector),
        message = document.querySelector(messageSelector),
        submitButton = document.querySelector(submitButtonSelector);
        
      function checkCurrentField() {
        for (var i = 0; i < formFields.length; i++) {
          formFields[i].addEventListener('input', function() {
            if (this.value == '') {
              this.style.borderBottom = '1px solid red';
              allFieldsFull = false;
            } else {
              this.style.borderBottom = "1px solid green";
            }
          });

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
        submitButton.addEventListener('click', function() {
          checkAllFields();
          checkCurrentField();
          ajax();
        });
      }
      submitEventListener();

      function ajax() {
        if (allFieldsFull) {
          var dataString = $('.form').serialize();
          $.ajax({
            type: 'post', 
            url: 'test.php', 
            data: dataString, 
            beforeSend: function() {
              message.html('loading');
            },
            
            success: function(html) {
              message.html(html);
              
            }
          });
        }
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
    // var navbarSelector = '.js-navbar',
    //   headerSelector = '.header',
    //   fixedClass = ' header-fixed', 
    //   navbar = document.querySelector(navbarSelector), 
    //   header = document.querySelector(headerSelector);
    //   navbarHasFixedClass = (navbar.className.indexOf(fixedClass) > -1)
    //   checkTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

      
    // function onscroll() {
    //   window.addEventListener('scroll', function() {
    //     if (checkTop >= 200) {
    //       if (!navbarHasFixedClass) {
    //         header.height = 60;
    //         navbar.className += fixedClass;
    //       }
    //     } else {
    //       navbar.className = navbar.className.replace(fixedClass, '');
    //     }
    //   })
    // }

    window.onscroll = function() {
      var y = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      var x = $('.js-navbar');
      var header = $('.header');
      

      if (y >= 200) {
        x.addClass('header-fixed');
        header.height = 60;
      } else {
        x.removeClass('header-fixed');
      }
    }


  })();

  var ArrowBounce = (function() {


    var arrowBounceSelector = '.js-arrow-bounce',
      bodySelector = 'body',
      shopSectionSelector = '#shop-content-start',
      arrowBounce = document.querySelector(arrowBounceSelector),
      body = document.querySelector(bodySelector),
      shopSection = document.querySelector(shopSectionSelector);
      

    function addArrowEventListener() {
      arrowBounce.addEventListener('click', function() {
        body.scrollTop = shopSection.offsetTop-60;
      });
    }

    function init() {
      addArrowEventListener();
    }

    return {
      init: init
    }
  })();


  /* Set up - inits */
  Overlay.init();
  Magnific.init(); /* Showreel and Contact Form */
  /* fixed header already initialisd */
  ContactForm.init();


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