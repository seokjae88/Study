let id = $('#id');
let pw = $('#pw');
let btn = $('#btn');

$(btn).on('click', function () {
    if ($(id).val() == "") {
        $(id).next('label').addClass('warning');
        setTimeout(function() {
            $('label').removeClass('warning');
        }, 1500);
    }
    else if ($(pw).val() == "") {
        $(pw).next('label').addClass('warning');
        setTimeout(function() {
            $('label').removeClass('warning');
        }, 1500);
    }
    else {
        login($(id).val(), $(pw).val());
    }
});

function clickEvent(e) {
    if (e.keyCode == 13) {
        if ($(id).val() == "") {
            $(id).next('label').addClass('warning');
            setTimeout(function() {
                $('label').removeClass('warning');
            }, 1500);
        }
        else if ($(pw).val() == "") {
            $(pw).next('label').addClass('warning');
            setTimeout(function() {
                $('label').removeClass('warning');
            }, 1500);
        }
        else {
            login($(id).val(), $(pw).val());
        }
    }    
}

function login(id, pw) {
    fetch('/main/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'id': id,
            'pw': pw
        })
    }).then((res) => {
        return res.json();
    }).then((data) => {
        var url = window.location.href;
        if (data.resultCode == 200) {
            window.location.href = url + '/home';
        } else {
            showAlert(data)
        }
    }).catch(console.error)
}
function showAlert(data) {
    if (data.resultCode == 401) { // 권한없음
        Swal.fire({ 
            icon: 'error', // Alert 타입 
            title: data.message, // Alert 제목 
            // text: msg
            footer: '<a href="">비밀번호 찾기(미구현)</a>'
        });
    } else if (data.resultCode == 404) {// 404 사용자 없음
        Swal.fire({ 
            icon: 'error', // Alert 타입 
            title: data.message, // Alert 제목 
            // text: msg
            footer: '<a href="">회원가입(미구현)</a>'
        });
    }    
}
// if (token) {
//     let token = localStorage.getItem('wtw-token') || '';
//     localStorage.setItem('wtw-token', token);
// }