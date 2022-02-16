$(function () {
  function get2digits(num) {
    return ('0' + num).slice(-2);
  }

  function getDate(dateObj) {
    if (dateObj instanceof Date)
      return dateObj.getFullYear() + '-' + get2digits(dateObj.getMonth() + 1) + '-' + get2digits(dateObj.getDate());
  }

  function getTime(dateObj) {
    if (dateObj instanceof Date)
      return get2digits(dateObj.getHours()) + ':' + get2digits(dateObj.getMinutes()) + ':' + get2digits(dateObj.getSeconds());
  }

  function convertDate() {
    $('[data-date]').each(function (index, element) {
      var dateString = $(element).data('date');
      if (dateString) {
        var date = new Date(dateString);
        $(element).html(getDate(date));
      }
    });
  }

  function convertDateTime() {
    $('[data-date-time]').each(function (index, element) {
      var dateString = $(element).data('date-time');
      if (dateString) {
        var date = new Date(dateString);
        $(element).html(getDate(date) + ' ' + getTime(date));
      }
    });
  }
  convertDate();
  convertDateTime();
});
$(function () {
  // 왼쪽메뉴 드롭다운
  //$(".sub_menu > ul.small_menu").hide();
  $(".sub_menu > ul.big_menu").click(function () {
    $("ul", this).slideToggle(300);
    //$("ul", this).hide();
    //$(this).next($('.small_menu')).slideToggle('fast');
  });
  getCookieValue('id');
});
const getCookieValue = (key) => {
  let cookieKey = key + "=";
  let result = "";
  const cookieArr = document.cookie.split(";");

  for (let i = 0; i < cookieArr.length; i++) {
    if (cookieArr[i][0] === " ") {
      cookieArr[i] = cookieArr[i].substring(1);
    }

    if (cookieArr[i].indexOf(cookieKey) === 0) {
      result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
      break;
    }
  }
  document.getElementById("username").innerText = result;
  return result;
}
