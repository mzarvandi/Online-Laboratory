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

    $.get('/allsavabegh',function(data){
        $("#sav").empty();
        for (var i = 0, len = data.length; i < len; i++) {
            $("#sav").append('<form class="form-horizontal" role="form">\
                <div class="form-group">\
                <label for="PhoneNumber" class="col-sm-3 control-label">نام آزمایشگاه :</label>\
            <div class="col-sm-3">\
                <label type="text" id="PhoneNumber' + i + '" class="form-control">' + data[i].Lab_Name + '\
                </div>\
                <label for="Doctor_name" class="col-sm-3 control-label">نام آزمایش :</label>\
            <div class="col-sm-3">\
                <label type="text" id="Doctor_name' + i + '"class="form-control">' + data[i].Test_Name + '\
                </div>\
                </div>\
                <div class="form-group">\
                <label for="Address" class="col-sm-3 control-label">تاریخ :</label>\
            <div class="col-sm-3">\
                <label type="text" id="Address' + i + '" class="form-control">' + data[i].Date_Time + '\
                </div>\
                <label for="price" class="col-sm-3 control-label">کد رهگیری :</label>\
            <div class="col-sm-3">\
                <label type="text" id="price' + i + '" class="form-control">' + data[i].followingCode + '\
                </div>\
                </div>\
                <div class="form-group">\
                <div class="col-sm-8 col-sm-offset-3">\
                <button type="result" class="btn btn-primary btn-block" id="result' + i +'">نتیجه</button>\
                <script>\
                $("#result'+ i +'").click(function() { \
                console.log(' + data[i].randomID + ');\
                 $.post("/chiz",{ \'inID\' : '+ data[i].randomID +'},function(data){\
                         window.open( data,"result","width=500,height=450");\
                         });\
                         });\
                </script>\
                </div>\
                </div>\
                </form>'
            );
        }
        if(data.length == 0){
            $("#sav").append('<form class="form-horizontal" role="form">\
                    <div class="container form-group">\
                    <label class="col-sm-8 control-label">سوابق شما خالی است.</label></div></form>');
        }
    });



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
});