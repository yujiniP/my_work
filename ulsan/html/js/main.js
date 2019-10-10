$(function(){

	mainSlider() ;

	function mainSlider(){

		var $mainVisualSliderWrap = $('.wrap_main_visual_slider')
		,	 $mainVisualSlider = $mainVisualSliderWrap.find('.slider_wrapper')
		,	 $pagingWrap = $mainVisualSliderWrap.find('.paging')
		// ,	 $paging = $mainVisualSliderWrap.find('.paging button')
		,	 $paging = null
		,	 $btnAutoPlay = $mainVisualSliderWrap.find('.btn_play')
      ,   $btnAutoStop = $mainVisualSliderWrap.find('.btn_stop')
      ,	 initSlideNum = 0
      ,	 len = $mainVisualSlider.find('.slider_item').length ;

		$mainVisualSlider.on('init', function(){
			$(this).addClass("ani");
		}).slick({
			fade : true ,
			initialSlide : initSlideNum ,
			autoplay : true ,
			autoplaySpeed : 5000 ,
			speed : 1500 ,
			infinite: true ,
			pauseOnHover: false,
			pauseOnFocus: false,
			cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
		}) ;

		for( var i=0; i<len; i++ ){
			if( i == initSlideNum ) {
				$pagingWrap.append( '<button class="active">'+ ( i + 1 ) + '번째 이미지 보기'+'</button>') ;
			} else {
				$pagingWrap.append( '<button>'+ ( i + 1 ) + '번째 이미지 보기'+'</button>') ;
			}
		}

		$paging = $pagingWrap.find('button') ;

		$paging.on('click', function(){
			var idx = $paging.index(this) ;
			$mainVisualSlider.slick( 'slickGoTo', idx ) ;
		}) ;

		$mainVisualSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
			$paging.removeClass('active') ;
			$paging.eq(nextSlide).addClass('active') ;
		});

		$btnAutoPlay.on('click', function(){
         $mainVisualSlider.slick('slickPlay') ;
      }) ;

      $btnAutoStop.on('click', function(){
         $mainVisualSlider.slick('slickPause') ;
      }) ;

	}

	var $header = $('#header') ;
	if( $header.length > 0 ){
		$(window).on('scroll', function(){
			$(this).scrollTop() > 100 ? $header.addClass('light') : $header.removeClass('light') ;
		}) ;
	}


	var automotive = $('.item.automotive') ;

	var waypoint = new Waypoint.Inview({
      element: automotive,
		enter: function(direction) {
			 automotive.addClass('active') ;
		},
		// exit: function(direction) {
		// 	automotive.removeClass('active') ;
		// },
   }) ;

   var special = $('.item.special') ;

	var waypoint = new Waypoint.Inview({
      element: special,
		enter: function(direction) {
			 special.addClass('active') ;
		},
		// exit: function(direction) {
		// 	special.removeClass('active') ;
		// },
   }) ;

   var can = $('.item.can') ;

	var waypoint = new Waypoint.Inview({
      element: can,
		enter: function(direction) {
			 can.addClass('active') ;
		},
		// exit: function(direction) {
		// 	can.removeClass('active') ;
		// },
   }) ;



}) ;