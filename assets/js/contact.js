$('#contact-form').on('submit',function(e){
        //optional validation code here

        e.preventDefault();

        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbz-R7x6vmu0HKbNkqooJQfD3pFcY5mqtgOyDoyzgI2wMLhWWDmSGFrW2089EoeKZ6y6/exec",
            method: "POST",
            dataType: "json",
            data: $("#contact-form").serialize(),
            success: function(response) {
                console.log(response)
                if(response.result == "success") {
                    $('#contact-form')[0].reset();
                    alert('Thank you for contacting me!');
                    return true;
                }
                else {
                    alert("Something went wrong. Please try again.")
                }
            },
            error: function() {

                alert("Something went wrong. Please try again.")
            }
        })
    });
