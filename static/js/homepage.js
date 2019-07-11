$(document).ready(function () {
    var isAuth=false;

    $("#login").click(function  () {
        window.location = '/login';
    });
    $("#signup").click(function  () {
        console.log("signup berim");
        window.location = '/signup';
    });


    $("#logout").click(function () {
        console.log("!!") ;
        window.location = '/logouthome';

    }) ;

/*
    var getInfo = function () {

        $.get("/getInfo" , function (data) {
            if (data['status']) {
                isAuth = true ;

            }
            else {
            }
            console.log(isAuth);
        }) ;
    }  ;
    getInfo() ;*/

});
