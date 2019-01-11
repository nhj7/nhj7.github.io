window.onload = function(){

    //content height resizing
    winResize();
    function winResize(){
        var winH = window.innerHeight;
        var headerH = document.getElementsByClassName('header')[0].clientHeight;
        var footerH = document.getElementsByClassName('footer')[0].clientHeight;

        if( window.innerWidth > 1250 ){
            document.getElementsByClassName('wrap')[0].style.height = winH-( headerH+footerH ) - 100 + "px";
        }
    }

    //Mobile IMG
    var checkDivTop = document.getElementsByClassName('top-img')[0];
    var checkDivFoot = document.getElementsByClassName('foot-img')[0];
    var checkImgTop = checkDivTop.querySelector('img');
    var checkImgFoot = checkDivFoot.querySelector('img');

    changeImg();
    function changeImg(){
        if( window.innerWidth <= 1250 ){
            //Mobile IMG - top
            checkImgTop.setAttribute('src','img/img-sys01.gif');
            //Mobile IMG - foot
            checkImgFoot.setAttribute('src','img/img-sys03.gif');
        }else{
            //PC IMG - top
            checkImgTop.setAttribute('src','img/img-sys01-pc.gif');
            //PC IMG - foot
            checkImgFoot.setAttribute('src','img/img-sys03-pc.gif');
        }
    };
    window.addEventListener('resize', function(){
        changeImg();
        winResize();
    });

    //mobile link
    var mobileArry = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var mobile_Android = /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var mobile_iPhone = /iPhone|ipad|ipod/i.test(navigator.userAgent);
    var $link = document.getElementsByClassName('gotobank')[0];

    function isMobile_Android(){
        return mobile_Android;
    }
    function isMobile_iPhone(){
        return mobile_iPhone;
    }
    if( isMobile_Android() ){
      var android_pkg_name = 'kr.or.sbbank.banksb';
      $link.setAttribute('href',"intent://" + android_pkg_name + "#Intent;scheme=http;package=" + android_pkg_name + ";end");
    } else if( isMobile_iPhone() ){
        //Mobile iPhone link
        $link.setAttribute('href','https://itunes.apple.com/kr/app/id567325889?mt=8');
    }else {
        //PC link
        $link.setAttribute('href','https://ok.banking.fsb.or.kr');
    }
}
