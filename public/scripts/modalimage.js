$(function () {
  'use strict';

  $('.popup img').click(function () {
    var $src = $(this).attr('src');
    $('.show').fadeIn(200);
    $('.img-show img').attr('src', $src);
  });

  $('span, .overlay').click(function () {
    $('.show').fadeOut(200);
  });
});
