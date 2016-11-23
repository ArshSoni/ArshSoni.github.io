$(document).ready(function() {

  $('.bookNow').magnificPopup({
    callbacks: {
      open: function() {
        $('.contactForm').css('display', 'block');
      }
    }, 
    type: 'inline', 
    preloader: false, 
    modal: false,
    enableEscapeKey: true
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

  function changeContactHrefOnWindowResize() {
    var bookNow = document.querySelectorAll('.bookNow');

    $(window).resize(function() {
      if (window.innerWidth < 500) {
        bookNow[0].setAttribute('href', 'mailto:contact@magicsingh.com');
        bookNow[1].setAttribute('href', 'mailto:contact@magicsingh.com');
        
      } else {
        bookNow[0].setAttribute('href', '#contactForm');
        bookNow[1].setAttribute('href', '#contactForm');
      }
    });
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

  var form = document.querySelector('.form');

  var validator = new FormValidator(form, [{
      name: 'name',
      display: 'required',
      rules: 'required'
  }, {
      name: 'email',
      rules: 'valid_email'
  }], function(errors, event) {
      if (errors.length > 0) {
          // Show the errors
      }
  });

  arrowBounceShop();
  fixedHeaderOnScroll();
  changeContactHrefOnWindowResize();
  contactFormInputFocus();
});