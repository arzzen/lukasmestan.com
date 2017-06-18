jQuery(document).ready(function() {
        //active nav
        var pgurl = window.location.href.substr(window.location.href
      .lastIndexOf("/")+1);
           $(".main-nav ul li a").each(function(){
                if($(this).attr("href") == pgurl || $(this).attr("href") == '' )
                $(this).addClass("active");
          });
           
      //this code is for smooth scroll and nav selector
            $(document).ready(function () {
              $(document).on("scroll", onScroll);
              
              //smoothscroll
              $('a[href^="#"]').on('click', function (e) {
                  e.preventDefault();
                  $(document).off("scroll");
                  
                  $('a').each(function () {
                      $(this).removeClass('active');
                  })
                  $(this).addClass('active');
                
                  var target = this.hash,
                      menu = target;
                  $target = $(target);
                  $('html, body').stop().animate({
                      'scrollTop': $target.offset().top+2
                  }, 500, 'swing', function () {
                      window.location.hash = target;
                      $(document).on("scroll", onScroll);
                  });
              });
          });

          function onScroll(event){
              var scrollPos = $(document).scrollTop();
              $('.navbar-default .navbar-nav>li>a').each(function () {
                  var currLink = $(this);
                  var refElement = $(currLink.attr("href"));
                  if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                      $('.navbar-default .navbar-nav>li>a').removeClass("active");
                      currLink.addClass("active");
                  }
                  else{
                      currLink.removeClass("active");
                  }
              });
          } 

          $('.top-click a i.fa-minus').hide();
          $('.top-bar').hide();
          $('.top-click a i.fa-plus').click(function(){
            $(this).hide();
            $('.top-click a i.fa-minus').show();
            $('.top-bar').slideDown();
          });
          $('.top-click a i.fa-minus').click(function(){
            $(this).hide();
            $('.top-click a i.fa-plus').show();
            $('.top-bar').slideUp();
          });

          // filters
          $('.filters li').click(function() {
            $(".filters li.active").removeClass("active");
            $(this).addClass('active');
        });

          //mixitup
          $(function(){
              $('.works').mixItUp();
          });


});