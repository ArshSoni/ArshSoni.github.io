$(document).ready(function() {

  function emptyForm() {
    $(".form")[0].reset();
    $(".form-message").html('');
  }

  $('.bookNow').magnificPopup({
    callbacks: {
      open: function() {
        $('.contactForm').css('display', 'block');

        $.magnificPopup.instance.close = function() {
          $.magnificPopup.proto.close.call(this);
          emptyForm();

        }
      }
    }, 
    type: 'inline', 
    preloader: false, 
    modal: false,
    enableEscapeKey: true, 
    disableOn: function() {
      if( $(window).width() < 600 ) {
        return false;
      }
      return true;
    }
  });
    

  function contactFormInputFocus() {
    $(".input-field input, .input-field textarea").focus(function() {
      $(this).parent().find('label').css('color', '#bd9643');
    }).blur(function() {
      $(this).parent().find('label').css('color', '');
    });
  }


    
  $('.showreel').magnificPopup({
    type:'iframe', 

    callbacks: {
      open: function() {
        $('.showreel').addClass('active');

        $.magnificPopup.instance.close = function() {
          $.magnificPopup.proto.close.call(this);
          $('.showreel').removeClass('active');
        }
      }
    }, 

    mainClass:'mfp-fade',
    removalDelay: 300, 
    preloader: false, 
    fixedcontentPos: false, 
    enableEscapeKey: true

    
  });

  // function changeContactHrefOnWindowResize() {
  //   var bookNow = document.querySelectorAll('.bookNow');

  //   $(window).resize(function() {
  //     if (window.innerWidth < 500) {
  //       bookNow[0].setAttribute('href', 'mailto:contact@magicsingh.com');
  //       bookNow[1].setAttribute('href', 'mailto:contact@magicsingh.com');

        
        
  //     } else {
  //       bookNow[0].setAttribute('href', '#contactForm');
  //       bookNow[1].setAttribute('href', '#contactForm');
  //     }
  //   });
  // }

  function checkHref() {
    var bookNow = document.querySelector('.bookNow');

    if (window.innerWidth < 500) {
      bookNow.addEventListener('click', function() {
        $(".overlay").addClass('visible')
      });

      $('.cross').on('click', function() {
        $(".overlay").removeClass('visible');
      })
    } 
  }


  function fixedHeaderOnScroll() {
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
  }

  function arrowBounceShop() {
    $('.js-arrow-bounce').click(function() {
      console.log($('.js-navbar').height());
      $('body').animate({
        scrollTop: $("#shop-content-start").offset().top-40
      }, 'slow');
      return false;
    });
  }

  function validateForm() {
    var formField = $(".form-field");
    var message = $('.form-message');
    var filled = false;

    $(".js-form-submit").on('click', function(e) {
      e.preventDefault();
      
      for (var i = 0; i < formField.length; i++) {
        if ($(formField[i]).val().length == 0) {
          message.html('Please complete all the fields');
          $(formField[i]).css('border-bottom', "1px solid red");
          filled = false;
        } 

        else {
          $(formField[i]).css('border-bottom', '');
          filled = true;
        }

      }

        var dataString = $('.form').serialize();
        $.ajax({
          type: 'post', 
          url: 'test.php', 
          data: dataString, 
          success: function(html) {
            message.html(html);
          }
        });
    });
  }

  validateForm();
  arrowBounceShop();
  fixedHeaderOnScroll();
  // changeContactHrefOnWindowResize();
  contactFormInputFocus();
  checkHref();
});