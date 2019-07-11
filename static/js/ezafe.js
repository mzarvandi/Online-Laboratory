$(document).ready(function () {
    var errorBox = $("div.alert-danger");
    var successBox = $("div.alert-success");
    successBox.slideUp(1);
    errorBox.slideUp(1);


    var getInfo = function () {
        //$("#commentBox").empty() ;

        $.get("/getInfo" , function (data) {
            console.log(data);
            if (data['status']) {
                $("#welcome").empty();
                $("#welcome").append(data['name']," عزیز، خوش آمدید.");
                //     getComment();
                //     $("#auth").html(JSON.stringify(data['status'])) ;
                $("#lab_name").html(data['worksat']);
            }
            else {
                console.log("kharej bud");
                window.location = '/logouthome';
                //     $("#auth").html("unknown user") ;
            }
        }) ;
    };

    getInfo();

    $("#yes").click(function () {
        if($("#test_name").valueOf()[0].value==="" || $("#Doctor_name").val()==="" || $("#price").val()===""){
            successBox.slideUp(1);
            errorBox.slideUp(1);
            errorBox.html("لطفا تمامی اطلاعات را وارد کنید.").slideDown(500);

        }else {
            

            $.post('/ezafe',{"nameAz" : $("#test_name").valueOf()[0].value , "nameDoc":$("#Doctor_name").val() , "hazine":$("#price").val(),
                "nameAzm":$("#lab_name").text() },function (data) {
                console.log(data.status);
		if(data['status']){
		    successBox.slideUp(1);
        	    errorBox.slideUp(1);
                    successBox.html("با موفقیت ثبت شد.").slideDown(500);
                }else{
		    successBox.slideUp(1);
	            errorBox.slideUp(1);
	            errorBox.html("ثبت با مشکل مواجه شد.").slideDown(500);
		}

            });

        }

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




});
