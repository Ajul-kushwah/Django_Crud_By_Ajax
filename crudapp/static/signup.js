$(document).ready(function(){
    $(document).on('submit','#signupform',function(e){
        e.preventDefault();
        var name = $('input[name="name"]').val();
        var email = $('input[name="email"]').val();
        var password = $('input[name="password"]').val();

        var url = '/signup?name='+name+'&email='+email+'&password='+password;
        var req = new XMLHttpRequest();
        req.onreadystatechange = function(){
            if (this.readyState ==4 && this.status ==200){
                if (req.responseText =='true'){
                    alert('Account create successfully....');
                }
            }
        };
        req.open('GET',url,true);
        req.send();
        
    })

    $(document).on('blur','input[name="email"]',function(){
        var email = $('input[name="email"]').val();
        var url = '/checkEmail?email='+email;
        var req = new XMLHttpRequest();
        req.onreadystatechange = function(){
            if (this.readyState ==4 && this.status ==200){
                if (req.responseText =='true'){
                    // alert('you can not create account');
                    $('input[type="submit"]').attr('disabled','true');
                }else{
                    // alert('you can create account');
                    $('input[type="submit"]').removeAttr('disabled');
                }
            }
        };
        req.open('GET',url,true);
        req.send();
    })
})