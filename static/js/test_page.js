$(document).ready(function () {
    var successBox = $("div.alert-success");
    successBox.slideUp(1);
    var errorbox = $("div.alert-danger");
    errorbox.slideUp(1);
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



    $("#save").click(function () {
        var p = $("#paid").is(":checked");
        var d = $("#done").is(":checked");
        $.post('/updateDoc',{ 'paid' : p , 'done' : d },function(data){
            if(data['status']){
                $("#fail").slideUp(1);
                $("#success").slideUp(1);
                $("#success").html("اسناد با موفقیت تغییر کرد").slideDown(500);
            }else {
                $("#fail").slideUp(1);
                $("#success").slideUp(1);
                $("#fail").html("تغییر اسناد موفق نبود").slideDown(500);
            }
        });
    });
    $.get('/test_page',function (data){
        $("#paid")[0].checked = false;
        $("#done")[0].checked = false;
        console.log(data);
        $("#name_exp").append(data.Test_Name);
        $("#name_cus").append(data.user_ID);
        $("#time").append(data.Date_Time);

        $("#pay").append(data.paymentMethod);
        if(data.paymentMethod === "" || data.paymentMethod === undefined )
            $("#pay").append("پرداخت نشده است");
        if(data['Paid_Status'])$("#paid")[0].checked = true;
        if(data['done'])$("#done")[0].checked = true;


    });

    $("#show").click(function(){
        window.open('/resultemp',"result","width=500,height=450");
    });
    $("#up").hide();
    $("#upload").click(function(){
        $("#up").show();
    });
    $('a[href="#home"]').click(function() {
        window.location = '/home_emp';

    });
    $('a[href="#add"]').click(function() {
        window.location = '/ezafe';

    });
    $('a[href="#exit"]').click(function() {
        window.location = '/logouthome';

    });
    $('a[href="#search"]').click(function() {
        window.location = '/search';

    });

    $('a[href="#savabegh"]').click(function() {
        window.location = '/savabegh';

    });
    $('a[href="#follow"]').click(function() {
        window.location = '/peygiry';

    });
});
