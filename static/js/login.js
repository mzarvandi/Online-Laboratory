$(document).ready(function () {
    var isAuth = false ;
    var errorBox = $("div.alert-danger") ;
    var successBox = $("div.alert-success") ;
     successBox.slideUp(1);
    errorBox.slideUp(1);
    //console.log(successBox);
    var getInfo = function () {
        //$("#commentBox").empty() ;

        $.get("/getInfo" , function (data) {
            console.log(data);
            if (data['status']) {
                    $.get("logout",function(data){
                    console.log(data.msg);
                });
                //     getComment();
                //     $("#auth").html(JSON.stringify(data['status'])) ;
            }
            else {
                console.log("khoda ro shokr kharej bud");
                //     $("#auth").html("unknown user") ;
            }
        }) ;
    };

    getInfo();

    $("#loginbutton").click(function() {
        console.log("login clicked");
        console.log({ username : $("#username").val() ,password :  $("#password").val() }) ;
        $.post("/login" , { username : $("#username").val() ,password :  $("#password").val() } , function (data) {
            if (data['status']) {
                console.log("vared mishe");
                successBox.slideUp(1);
                errorBox.slideUp(1);
                successBox.html(data['msg']).slideDown(500);
                console.log('before');
                setTimeout(function(){

                    if(data['type']=='patient') {
                        window.location = '/home_sick';
                    }else{
                        window.location = '/home_emp';
                    }
                },500);
               // getInfo() ;
            }
            else {
                successBox.slideUp(1);
                errorBox.slideUp(1);
                errorBox.html(data['msg']).slideDown(500) ;
                //getInfo();
            }
        })
    }) ;
    $("#returnbutton").click(function  () {
        window.location = '/';
    });
}) ;


    // $("#signUp").click(function () {
    //     $.post("/signup" ,{ username : $("#signUpUser").val() , password :  $("#signUpPass").val() } , function (data) {
    //         if (data['status']) {
    //             successBox.slideUp(1);
    //             errorBox.slideUp(1);
    //             successBox.html(data['msg']).slideDown(500) ;
    //         }
    //         else {
    //             successBox.slideUp(1);
    //             errorBox.slideUp(1);
    //             errorBox.html(data['msg']).slideDown(500) ;
    //         }
    //     })
    // }) ;



// ///////////////
//
//     $("#logout").click(function () {
//         console.log("!!") ;
//         $.post("/logout" , function (data) {
//             $("#info").append("<p>" + data['status'] + " || " + data['msg'] + " </p>");
//             if (data['status']) {
//                 successBox.slideUp(1);
//                 errorBox.slideUp(1);
//                 successBox.html(data['msg']).slideDown(500) ;
//                 getInfo() ;
//             }
//             else {
//                 successBox.slideUp(1);
//                 errorBox.slideUp(1);
//                 errorBox.html(data['msg']).slideDown(500) ;
//                 getInfo() ;
//             }
//         })
//     }) ;
//
//

// /////////////
//     getInfo() ;

