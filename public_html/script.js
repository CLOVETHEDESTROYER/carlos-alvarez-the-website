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

$(function () {
    $(window).on('scroll', function () {
        if ( $(window).scrollTop() > 10 ) {
            $('.navbar').addClass('active');
        } else {
            $('.navbar').removeClass('active');
        }
    });
});


/*
* rwdImageMaps jQuery plugin v1.6
*
* Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize
*
* Copyright (c) 2016 Matt Stow
* https://github.com/stowball/jQuery-rwdImageMaps
* http://mattstow.com
* Licensed under the MIT license
*/

;(function($) {
    $.fn.rwdImageMaps = function() {
        var $img = this;

        var rwdImageMap = function() {
            $img.each(function() {
                if (typeof($(this).attr('usemap')) == 'undefined')
                    return;

                var that = this,
                    $that = $(that);

                // Since WebKit doesn't know the height until after the image has loaded, perform everything in an onload copy
                $('<img />').on('load', function() {
                    var attrW = 'width',
                        attrH = 'height',
                        w = $that.attr(attrW),
                        h = $that.attr(attrH);

                    if (!w || !h) {
                        var temp = new Image();
                        temp.src = $that.attr('src');
                        if (!w)
                            w = temp.width;
                        if (!h)
                            h = temp.height;
                    }

                    var wPercent = $that.width()/100,
                        hPercent = $that.height()/100,
                        map = $that.attr('usemap').replace('#', ''),
                        c = 'coords';

                    $('map[name="' + map + '"]').find('area').each(function() {
                        var $this = $(this);
                        if (!$this.data(c))
                            $this.data(c, $this.attr(c));

                        var coords = $this.data(c).split(','),
                            coordsPercent = new Array(coords.length);

                        for (var i = 0; i < coordsPercent.length; ++i) {
                            if (i % 2 === 0)
                                coordsPercent[i] = parseInt(((coords[i]/w)*100)*wPercent);
                            else
                                coordsPercent[i] = parseInt(((coords[i]/h)*100)*hPercent);
                        }
                        $this.attr(c, coordsPercent.toString());
                    });
                }).attr('src', $that.attr('src'));
            });
        };
        $(window).resize(rwdImageMap).trigger('resize');

        return this;
    };
})(jQuery);
