$(document).ready(function () {
    var options;
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

    var init = function() {
        $.get("/searchItems", function (data) {
            console.log("search.js");
            options = data;
            console.log(data);
            for (var i = 0, len = options.test.length; i < len; i++) {
                $("#lab_type_srch").append('<option value=' + i + '>' + data.test[i] + '</option>');
            }
            for (i = 0, len = options.labs.length; i < len; i++) {
                $("#lab_name_srch").append('<option value=' + i + '>' + data.labs[i] + '</option>');
            }

        });
    };
    init();



    $("#search").click(function () {
        console.log("searchesh koo");
        var l,t;
        if($("#lab_type_srch").val()==0){ l='none';}else{l=options.labs[$("#lab_type_srch").val()];}
        if($("#lab_name_srch").val()==0){ t='none';}else{t=options.test[$("#lab_name_srch").val()];}
        $("#results").empty();

            $.post("/search" , { labratory:l , test_name: t} , function (data) {
            console.log(data);
            for (var i = 0, len = data.length; i < len; i++) {
                $("#results").append('<form class="form-horizontal" role="form">\
                    <div class="container form-group">\
                    <label for="res' + i + '" class="col-sm-2 control-label">نام آزمایش:</label>\
                <label for="res' + i + '" class="col-sm-2 control-label">' + data[i].Test_Name + '</label>\
                <label for="res'+ i + '" class="col-sm-2 control-label">نام آزمایشگاه:</label>\
                <label for="res' + i +'" class="col-sm-2 control-label">' + data[i].Lab_Name + '</label>\
                <label for="res' + i + '" class="col-sm-1 control-label"></label>\
                    <button type="button" style="background-color:lightskyblue" id="res' + i + '" class="col-sm-2 btn btn-block " onclick="myFunction' + i + '()">مشاهده</button>\
                    <script>\
                    function myFunction'+i+'() {\
                    console.log("button clicked");\
                        $.post("/gotoreserve",{ "TestName":"'+data[i].Test_Name+'", "LabName":"'+data[i].Lab_Name+'"},function(data){\
                        window.location = "/gotoreserve";\
                 });\
            }\
                                </script>\
                </div>\
                </form>');

            }
            if(data.length == 0){
                $("#results").append('<form class="form-horizontal" role="form">\
                    <div class="container form-group">\
                    <label class="col-sm-8 control-label">متاسفانه مطابق خواست شما، هیچ نتیجه ای یافت نشد.</label></div></form>');
            }

        })


    });
    $('a[href="#search"]').click(function() {
        window.location = '/search';

    });
    $('a[href="#exit"]').click(function() {
        window.location = '/logouthome';

    });
    $('a[href="#savabegh"]').click(function() {
        window.location = '/savabegh';

    });
    $('a[href="#home"]').click(function() {
        window.location = '/home_sick';

    });
    $('a[href="#follow"]').click(function() {
        window.location = '/peygiry';

    });


});