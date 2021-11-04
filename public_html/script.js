$(document).ready(function(){
    document.getElementById("contact")
    $("#contact").validate({
        debug: true,
        errorClass: "alert alert-danger",
        ErrorLabelContainer: "#output-area",
        errorElement:"div",
        //rules here define what is good or bad input
        //each rule starts with the form nput elements NAME atribute
        rules: {
            name:{
                required: true
            },
            email: {
                email:true,
                required: true
            },
            message: {
                required: true,
                maxlength: 1000
            }
        },
        messages: {
            name:{
                required: "Please add your name"
            },
            email: {
                email:"Please provide valid email",
                required: "Email is required"
            },
            message: {
                required: "A message is required",
                maxlength: "Message must be 1000 characters long"
            }
        },
        submitHandler: (form) => {
            $("#contact").ajaxSubmit({
                type: "POST",
                url: $("#contact").attr('action'),
                success: (ajaxOutput) => {
                    $("#output-area").css("display","")
                    $("#output-area").html(ajaxOutput)

                    if($(".alert-success" >= 1)){
                        $("#contact")[0].reset()
                    }
                }
            })
        }

    })
})
