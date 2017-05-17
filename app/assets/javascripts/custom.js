var wow = new WOW(
  {
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    mobile: true,
    live: true,
    callback: function (box) {
    },
    scrollContainer: null
  }
);

$(document).ready(function() {
  wow.init();
});

$(document).on('mouseenter',".img-index-item", function(){
  $(this).next().css("display","block")
});

$(document).on('mouseenter',".img-index-item4", function(){
  $(this).next().css("display","block")
});

$(document).on('click',".img-index-item2", function(){
  $(this).children('.modal').addClass('show-modal');
  $(this).removeClass('img-index-item2')
  $(".main-right").addClass('hidden')
  $("#navbar").addClass('hidden')
});

$(document).on('click', '.show-modal', function() {
  $('.show-modal').removeClass('show-modal')
  $(this).parent().addClass("img-index-item2")
  $(".main-right").removeClass('hidden')
  $("#navbar").removeClass('hidden')
});

$(document).on('click', '#btn-cmt', function() {
  var cmt = $('#cmt-field').val();
  var img_id = $('#img-id-field').val();
  $.ajax({
    type:'POST',
    url: '/image_comments',
    dataType: "json",
    data: {
      comment: cmt,
      image_id: img_id
    }
  });
  var l = '/images/' + img_id;
  $.ajax({
    type:'GET',
    url: l,
    dataType: "json",
  }).success(function(){
    $('#like-section').load(document.URL + ' #like-section');
    $('#cmt-section-parent').load(document.URL + ' #cmt-section');
    $('#cmt-field').val('');
  })
});

function deletecmt(variable) {
  var l = '/image_comments/' + variable;
  $.ajax({
    type:'DELETE',
    url: l,
    dataType: "json",
  }).success(function(){
    $('#like-section').load(document.URL + ' #like-section');
    $('#cmt-section-parent').load(document.URL + ' #cmt-section');
    $('#cmt-field').val('');
  });
}

function openimage(variable) {
  var l = '/images/' + variable;
  $.ajax({
    type:'GET',
    url: l,
    dataType: "json"
  }).success(function(d){
    location.replace(l);
  });
}

function like() {
  var img_id = $('#img-id-field').val();
  $.ajax({
    type:'POST',
    url: '/likes',
    dataType: "json",
    data: {
      image_id: img_id
    }
  }).success(function(){
    $('#like-section').load(document.URL + ' #like-section');
  });
};

function unlike(variable) {
  var l = '/likes/' + variable;
  $.ajax({
    type:'DELETE',
    url: l,
    dataType: "json",
  }).success(function(){
      $('#like-section').load(document.URL + ' #like-section');
  });
};

function follow(variable) {
  $.ajax({
    type:'POST',
    url: '/relationships',
    dataType: "json",
    data: {
      followed_id: variable
    }
  }).success(function(){
    $('#follow-field').load(document.URL + ' #follow-field');
  });
};

function unfollow(variable) {
  var l = '/relationships/' + variable;
  $.ajax({
    type:'DELETE',
    url: l,
    dataType: "json",
  }).success(function(){
    $('#follow-field').load(document.URL + ' #follow-field');
  });
};

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#img_prev')
        .attr('src', e.target.result)
        .width('100%')
      $('#image_form')
        .removeClass('col-sm-offset-3 col-sm-6')
        .addClass('col-sm-5')
      $('#preview')
        .removeClass('hidden')
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function reloadhome(opt) {
  $('#new-feed').load(document.URL + '/?case='+ opt + ' #new-feed');
  $('.btn-hover').removeClass('btn-hover');
  $('#opt' + opt).addClass('btn-hover');
}

function cmtHome(img_id) {
  $('#cmt'+img_id).toggleClass('hidden');
}

function cmtHomeHide(img_id) {
  $('#cmt'+img_id).addClass('hidden');
}

function reloadAfterLike (img_id, like) {
  var c = $('.btn-hover').attr('id');
  var cc = 1;
  switch(c) {
    case "opt2":
      cc = 2;
      break;
    case "opt3":
      cc = 3;
      break;
    case "opt4":
      cc = 4;
      break;
    default:
      cc = 1;
  }
  var imgid = '#info'+img_id;
  $(imgid).load(document.URL + '/?case=' + cc + ' '+ imgid);
  if(like) {
    var btnid = '#btn-like'+img_id;
    $(btnid).load(document.URL + '/?case=' + cc + ' '+ btnid);
  }
}

function likeHome(img_id) {
  $.ajax({
    type:'POST',
    url: '/likes',
    data: {
      image_id: img_id
    }
  }).success(reloadAfterLike(img_id, true));
}

function unlikeHome(img_id, like_id) {
  var l = '/likes/' + like_id;
  $.ajax({
    type:'DELETE',
    url: l
  })
  .success(reloadAfterLike(img_id, true));
}

function commentHome(img_id) {
  var cmt = $('#cmt-field'+img_id).val();
  $.ajax({
    type:'POST',
    url: '/image_comments',
    dataType: "json",
    data: {
      comment: cmt,
      image_id: img_id
    }
  })
  .success(function() {
      reloadAfterLike(img_id, false);
    $('#cmt-field'+img_id).val('');
      cmtHomeHide(img_id);
  })
}
