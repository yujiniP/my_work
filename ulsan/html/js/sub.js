$(function(){

   subFunc() ;

   // depth3 menu scroll fix
   var subTopDepth3Menu = $('.wrap_sub_top .menu_area') ;

   if( subTopDepth3Menu.length > 0 ) {
      console.log( '3depth 메뉴가 존재합니다! 스크롤시 고정됩니다.' ) ;
      var waypoint = new Waypoint({
         element: subTopDepth3Menu,
         handler: function() {
            console.log('menu fix!!!!!') ;
            subTopDepth3Menu.toggleClass('fix') ;
         }
      }) ;
   }

  var $Motion = $('#animate');
    $Motion.waypoint(function(direction) {
    if (direction=='down') {
      $Motion.addClass('active');
    }
    else {
      $Motion.removeClass('active');
    }
  },
    {offset:'80%'});


   // recruit input box state
   var inputState = (function(){

      var ipTxt = $('.box_ipt .iptxt_default') ;

      if( ipTxt.length < 1 ) return ;

      console.log( 'inputState start' ) ;

      ipTxt.on('focus', function(){

         var boxIp = $(this).closest('.box_ipt') ;

         if( boxIp.hasClass('state_disable') ) return ;

         if( boxIp.hasClass( 'state_done' ) ) {
            boxIp.removeClass( 'state_done' ) ;
         }
         boxIp.addClass( 'state_on' ) ;

      }).on('blur', function() {

         var boxIp = $(this).closest('.box_ipt') ;
         if( $(this).val().length < 1 ) {
            boxIp.removeClass( 'state_done state_on' ) ;
         } else if ( $(this).val().length > 0 ){
            boxIp.removeClass( 'state_on' ) ;
            boxIp.addClass( 'state_done' ) ;
         }

      }) ;


   })() ;

   // EHS page tab menu
   var ehsTab = new Accordian(
      '#tabEhs', '.tab_btn li a', '.tab_content .bx_tab',
      {
         firstChildExpand : true,
         multiShow : true
      }
   );
   ehsTab.init();

   // 윤리경영 page acodian menu
   var ethicsAcod = new Accordian(
      '#acodEthics', '.acod_btn button', '.acod_tab',
      {
         firstChildExpand : true,
         multiShow : true
      }
   );
   ethicsAcod.init();

   // 포토 슬라이드 01
   var $photoSlider01 = $('#photoSlider01')
   ,   $photoSlider01Container = $photoSlider01.find('.photo_slider_container') ;

   if( $photoSlider01Container.length > 0 ) {

      var btnAutoPlay = $photoSlider01.find('.btn_play')
      ,   btnAutoStop = $photoSlider01.find('.btn_stop') ;

      $photoSlider01Container.slick({
         autoplay : true ,
         autoplaySpeed : 5000 ,
         speed : 500 ,
         dots : true ,
         dotsClass: 'custom_paging',
          customPaging: function (slider, i) {
              return '<strong>'+ (i + 1) + '</strong><span>/</span>' + slider.slideCount;
          }
      });

      btnAutoPlay.on('click', function(){
         $photoSlider01Container.slick('slickPlay') ;
         console.log('play') ;
      }) ;

      btnAutoStop.on('click', function(){
         $photoSlider01Container.slick('slickPause') ;
         console.log('stop') ;
      }) ;

   }

   // 포토 슬라이드 02
   var $photoSlider02 = $('#photoSlider02')
   ,   $photoSlider02Container = $photoSlider02.find('.photo_slider_container') ;

   if( $photoSlider02Container.length > 0 ) {

      var btnAutoPlay = $photoSlider02.find('.btn_play')
      ,   btnAutoStop = $photoSlider02.find('.btn_stop') ;

      $photoSlider02Container.slick({
         autoplay : true ,
         autoplaySpeed : 5000 ,
         speed : 500 ,
         dots : true ,
         dotsClass: 'custom_paging',
          customPaging: function (slider, i) {
              return '<strong>'+ (i + 1) + '</strong><span>/</span>' + slider.slideCount;
          }
      });

      btnAutoPlay.on('click', function(){
         $photoSlider02Container.slick('slickPlay') ;
         console.log('play') ;
      }) ;

      btnAutoStop.on('click', function(){
         $photoSlider02Container.slick('slickPause') ;
         console.log('stop') ;
      }) ;

   }

   // 포토 슬라이드 01
   var $photoSlider03 = $('#photoSlider03')
   ,   $photoSlider03Container = $photoSlider03.find('.photo_slider_container') ;

   if( $photoSlider03Container.length > 0 ) {

      var btnAutoPlay = $photoSlider03.find('.btn_play')
      ,   btnAutoStop = $photoSlider03.find('.btn_stop') ;

      $photoSlider03Container.slick({
         autoplay : true ,
         autoplaySpeed : 5000 ,
         speed : 500 ,
         dots : true ,
         dotsClass: 'custom_paging',
          customPaging: function (slider, i) {
              return '<strong>'+ (i + 1) + '</strong><span>/</span>' + slider.slideCount;
          }
      });

      btnAutoPlay.on('click', function(){
         $photoSlider03Container.slick('slickPlay') ;
         console.log('play') ;
      }) ;

      btnAutoStop.on('click', function(){
         $photoSlider03Container.slick('slickPause') ;
         console.log('stop') ;
      }) ;

   }




}) ;

var subFunc = function(){

	var obj = {
		depth3menu : $('.wrap_sub_top .menu_area') ,
		depth3btn : $('.btn_m_3depth') ,
		pathMenuBtn : $('.wrap_path_menu .lst_menu button') ,
	}

	var opt = {
		winScrollY : null ,
		depth3menuAreaTop : null ,
	}

	// event function
	var depth3Toggle = function(){
		obj.depth3menu.toggleClass('open') ;
	}

	var pathMenuToggle = function(){
		if( !$(this).closest('dt').next().is('dd') ) return ;
		$(this).closest('li').toggleClass('active') ;
	}

	// 3depth 메뉴가 있을 경우에만 동작하도록!
	if( obj.depth3menu ) {
		obj.depth3btn.on('click', depth3Toggle) ;
	}

	// path menu toggle
	obj.pathMenuBtn.on( 'click' , pathMenuToggle ) ;

}

function Accordian( wrap, tab, content, opt ){

   var $wrap = wrap || false,
      $tab = tab || false,
      $content = content || false,
      $actived_tab,
      $actived_content,
      activeIdx,
      activeClass = 'active',
      len = 0,
      opt = opt || {};

   // 옵션
   opt.control = opt.control || false;
   opt.allOpenButton = opt.allOpenButton || false;
   opt.allCloseButton = opt.allCloseButton || false;
   opt.firstChildExpand = opt.firstChildExpand || false;
   opt.multiShow = opt.multiShow || false;

   // 초기 실행 함수
   function init(){
      $wrap = document.querySelector( $wrap );

      if( $wrap == null || $wrap.length < 1 ) return;


      $tab = $wrap.querySelectorAll( $tab );
      $content = $wrap.querySelectorAll( $content );
      len = $tab.length;

      if( $tab.length < 1 ){
         $wrap.classList.add('none');
         return;
      }

      // 옵션 체크 및 실행
      if( typeof opt.control == 'boolean' && opt.control ){
         makeControlBtn();
      }
      if( typeof opt.allOpenButton == 'string' && opt.allOpenButton ){
         addBtnAllOpen( opt.allOpenButton );
      }
      if( typeof opt.allCloseButton == 'string' && opt.allCloseButton ){
         addBtnAllClose( opt.allCloseButton );
      }
      if( typeof opt.firstChildExpand == 'boolean' && opt.firstChildExpand ){
         show( 0 );
      }

      [].forEach.call( $tab, function(item,idx){
         item.addEventListener('click', function(){
            show( idx );
            console.log('tab click in') ;
         });
      });
   }

   // 기본 기능 : 클릭한 버튼에 해당하는 요소를 보여라!
   function show( idx ){
      activeIdx = idx;

      if( activeIdx < 0 || activeIdx > len ) return;

      if( $tab[activeIdx].classList.contains( activeClass ) ) return;

      for( var i=0, max=$tab.length; i<max; i++ ){
         if( i === activeIdx ) continue;
         if( $tab[i].classList.contains( activeClass ) ){
            $tab[i].classList.remove( activeClass );
            $content[i].classList.remove( activeClass );
         }
      }

      $tab[activeIdx].classList.add( activeClass );
      $content[activeIdx].classList.add( activeClass );

      // $actived_tab = $tab[activeIdx];
      // $actived_content = $content[activeIdx];
   }

   // 옵션 기능 1-1 : 모두 열기/닫기 버튼 생성!
   function makeControlBtn() {
      var arrControl = [
         {
            name : '모두 열기',
            data : 'all-open'
         },
         {
            name : '모두 닫기',
            data : 'all-close'
         }
      ] ,
      wrapControl = document.createElement('div');

      for( var i=0; i<arrControl.length; i++ ){

         var btn = document.createElement('button');
         btn.setAttribute('class','btn-control');
         btn.setAttribute('data-control', arrControl[i].data);
         btn.textContent = arrControl[i].name;
         wrapControl.appendChild( btn );

      }

      wrapControl.classList.add('box-control');
      $btnControl = wrapControl.querySelectorAll('button');

      $wrap.appendChild( wrapControl );

      [].forEach.call( $btnControl, function(item,idx){
         item.addEventListener('click', function(){
            allBtnControl( item );
         });
      })
   }

   // 옵션 기능 1-2 : 모두 열기/닫기 버튼 직접 추가!
   function addBtnAllOpen( button ){
      var btn = document.querySelector( button );
      btn.setAttribute( 'data-control' , 'all-open' );
      btn.addEventListener('click', function(){
         allBtnControl( this );
      });
   }
   function addBtnAllClose( button ){
      var btn = document.querySelector( button );
      btn.setAttribute( 'data-control' , 'all-close' );
      btn.addEventListener('click', function(){
         allBtnControl( this );
      });
   }

   // 모두 열기 함수
   function allShow(){
      for( var i=0; i<$tab.length; i++ ){
         $tab[i].classList.add('active');
         $content[i].classList.add('active');
      }
   }

   // 모두 닫기 함수
   function allHide() {
      for( var i=0; i<$tab.length; i++ ){
         $tab[i].classList.remove('active');
         $content[i].classList.remove('active');
      }
   }

   // 모두 열기/닫기 버튼 클릭 함수
   function allBtnControl( item ) {
      switch( item.getAttribute('data-control') ){
         case 'all-open' :
            allShow();
            break;
         case 'all-close' :
            allHide();
            break
         default : console.log( '잘못된 버튼 입니다' );
      }
   }

   return {
      init : init,
      show : show,
      allShow : allShow,
      allHide : allHide,
      addBtnAllOpen : addBtnAllOpen,
      addBtnAllClose : addBtnAllClose
   }

}