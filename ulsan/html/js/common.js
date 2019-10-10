var gnb = {} ;

$(function(){

	gnb = new Gnb() ;
	gnb.init() ;

	// btn page top scroll show
   var btnPageTop = $('#btnPageTop') ;

   if( btnPageTop.length > 0 ) {
      var waypoint = new Waypoint({
         element: btnPageTop,
         handler: function() {
            console.log('btn page top show !!!!!') ;
            btnPageTop.toggleClass('show') ;
         } ,
         offset: '90%'
      }) ;
   }

}) ;

function Gnb(){

	var obj = {
		wrap : $('.wrap') ,
		header : $('#header') ,
		gnb : $('.lst_nav') ,
		depth1menuBtn : $('.lst_nav > li > a') ,
		depth2menu : $('.lst_nav .depth2') ,
		depth2menuBtn : $('.depth2 > li > a') ,
		bgHoverSubMenu : $('.bg_hover_menu') ,
		btnMobileMenuOpen : $('.btn_mob_menu_open') ,
		btnMobileMenuClose : $('.btn_mob_menu_close') ,
		// dimmed : $('.full_dimmed') ,
	}
	var opt = {
		mobPoint : 1024 ,
		wWidth : $('body').width() ,
	}

	function init() {
		if( !obj.header ) return ;
		$(window).on( 'resize', resizeHandler ) ;
		// pc
		pcGnbHandler() ;
		// mobile
		mobileGnbHandler() ;
	}

	// pc gnb show
   function pcGnbShow(){
      if( opt.wWidth <= opt.mobPoint ) return;
   	obj.header.addClass('pcGnbOpen') ;
   	obj.wrap.addClass('dimmed') ;
   	// console.log('pc gnb open') ;
   }

   // pc gnb hide
   function pcGnbHide(){
      if( opt.wWidth <= opt.mobPoint ) return;
      obj.header.removeClass('pcGnbOpen') ;
      obj.wrap.removeClass('dimmed') ;
   	// console.log('pc gnb hide') ;
   }

   // pc gnb handler
	function pcGnbHandler(){
		obj.gnb.on( 'mouseenter', pcGnbShow ) ;
		obj.gnb.on( 'mouseleave', pcGnbHide ) ;
	}

	// event function
	function mobileGnbShow(){
		obj.header.addClass('gnbOpen') ;
		$('body').addClass('scrollFix');
	}

	function mobileGnbHide(){
		obj.header.removeClass('gnbOpen') ;
		$('body').removeClass('scrollFix');
	}

	function depth1menuToggle(e){
		if( opt.wWidth > opt.mobPoint ) return;
		e.preventDefault() ;
		$(this).toggleClass('open') ;
		// console.log( 'depth-2-menu open!' ) ;
	}

	function depth2menuToggle(e){
		if( opt.wWidth > opt.mobPoint ) return;
		if( !$(this).hasClass('has_submenu') ) return ;
		$(this).toggleClass('open') ;
		e.preventDefault() ;
		// console.log( 'depth-3-menu open!' ) ;
	}

	// mobile gnb handler
	function mobileGnbHandler() {
		obj.btnMobileMenuOpen.on( 'click', mobileGnbShow ) ;
		obj.btnMobileMenuClose.on( 'click', mobileGnbHide ) ;
		obj.depth1menuBtn.on( 'click' , depth1menuToggle ) ;
		obj.depth2menuBtn.on( 'click' , depth2menuToggle ) ;
	}

	// resize
	function resizeHandler(){
		opt.wWidth = $('body').width() ;
		// console.log( 'resizeHandler' , opt.wWidth ) ;
	}

	return {
		init : init ,
		pcGnbShow : pcGnbShow ,
		pcGnbHide : pcGnbHide ,
		mobileGnbShow : mobileGnbShow ,
		mobileGnbHide : mobileGnbHide ,
	}

}