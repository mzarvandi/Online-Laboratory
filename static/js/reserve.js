$(document).ready(function () {
    //var options;


    var getInfo = function () {
        //$("#commentBox").empty() ;

        $.get("/getInfo" , function (data) {
            console.log(data);
            if (data['status']) {
                $("#welcome").empty();
                $("#welcome").append(data['name']," عزیز، خوش آمدید.");
                //     getComment();
                //     $("#auth").html(JSON.stringify(data['status'])) ;
            }
            else {
                console.log("kharej bud");
                window.location = '/logouthome';
                //     $("#auth").html("unknown user") ;
            }
        }) ;
    };

    getInfo();

    var id=[];
    var tst,lab;
    $.post("/secreserve",{"status":true},function (data) {
        // $.post("/secreserve",{LabName : $("#lab_name").val(),TestName :$("#lab_type").val()},function (data) {
        $("#lab_name").append(data.tstpDB[0].Lab_Name);
            $("#lab_type").append(data.tstpDB[0].Test_Name);
            //  ?????????????
            $("#PhoneNumber").append(data.tstpDB[0].phone);
            $("#price").append(data.tstpDB[0].Price);
            $("#Doctor_name").append(data.tstpDB[0].doctor);
            $("#Address").append(data.tstpDB[0].address);
            for (var i = 0, len = data.timedate.length; i < len; i++) {
                $("#zmtakh").append('<option value=' + i + '>' + data.timedate[i] + '</option>');
                id[i]=data.tstpDB[i]._id;

            }
            tst=data.tstpDB[0].Test_Name;
            lab=data.tstpDB[0].Lab_Name;
            $("#Date_Time").html(data.timedate[0]);


        });
    $('select[name=zamantarikh]').change(
        function () {
            var newText = $('option:selected', this).text();
            $("#Date_Time").text(newText);

        });


    $("#ack").click(function () {

        console.log("az drop dow rad shod\n");
        var chck=($("#incu").is(":checked"));
        var pay=($("#onlinepay").is(":checked"));
        var date = new Date();
        date.setDate(date.getDate()+7);
        console.log( $("#zmtakh option:selected").text());
        $.post("/reserveaccepted",{"_id": id[$("#zmtakh option:selected").val()], "Insurance" :chck,"onlinepay":pay,
            "LabName" : lab,"TestName" :tst,"datetime": $("#zmtakh option:selected").text(),"resdate":date,
            "Price" : $("#price").val()},function (data) {
            window.location= '/bank';

        })
    });
    $("#ret").click(function(){
        window.location="/search";
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
