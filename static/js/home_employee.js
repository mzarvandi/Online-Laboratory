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

        $.get("/alltests",function (data){
            $("#all_tests").empty();
            console.log(data[0]);
            for (var i = 0, len = data.length; i < len; i++) {
                $("#all_tests").append('<div class="container">\
                <form class="form-horizontal" role="form">\
                <div class="form-group">\
                    <label for="test'+ i +'" class="col-sm-3 control-label">نام آزمایش :</label>\
                <div class="col-sm-3">\
                <name="text" id="test'+i+'" class="form-control">'+data[i].Test_Name+'\
                    </div>\
                    <label for="time'+i+'" class="col-sm-3 control-label">ساعت :</label>\
                <div class="col-sm-3">\
                <name="text" id="time'+i+'" class="form-control">'+data[i].Date_Time+'\
                    </div>\
                    <label for="userID'+i+'" class="col-sm-3 control-label">کد ملی مراجعه کننده :</label>\
                <div class="col-sm-3">\
                <name="text" id="userID' + i + '" class="form-control">'+data[i].user_ID+'\
                    </div>\
                    <div class="col-sm-3 col-sm-offset-3">\
                    <button type="button" style="background-color:lightskyblue" id="res' + i + '" class="col-sm-12 btn btn-block " onclick="myFunction' + i + '()">مشاهده</button>\
                    <script>\
                    function myFunction'+i+'() {\
                    console.log("button clicked"+' + data[i].randomID + ');\
                    $.post("/gototest_page",{ "ID":"' + data[i].randomID + '"},function(data){\
                    window.location = "/gototest_page";\
                    });\
                    }\
                    </script>\
                    </div>\
                     </div></form></div>');
            }
        });

        $('a[href="#home"]').click(function() {
            window.location = '/home_emp';

        });
        $('a[href="#add"]').click(function() {
            window.location = '/ezafe';

        });$('a[href="#exit"]').click(function() {
        window.location = '/logouthome';

    });




});
