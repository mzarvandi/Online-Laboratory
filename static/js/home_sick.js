$(document).ready(function () {

    
    var getInfo = function () {


        $.get("/getInfo" , function (data) {
            console.log(data);
            if (data['status']) {
                $("#welcome").empty();
                $("#welcome").append(data['name']," عزیز، خوش آمدید.");
              
            }
            else {
                console.log("kharej bud");
                window.location = '/logouthome';

            }
        }) ;
    };

    getInfo();

    $('a[href="#search"]').click(function() {
        window.location = '/search';

    });
    $('a[href="#exit"]').click(function() {
        window.location = '/logouthome';

    });

    $('a[href="#home"]').click(function() {
        window.location = '/home_sick';

    });
    $('a[href="#history"]').click(function() {
        window.location = '/savabegh';

    });
    $('a[href="#follow"]').click(function() {
        window.location = '/peygiry';

    });


}) ;
