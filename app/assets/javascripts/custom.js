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

//
// $(document).on('page:load', function() {
//   wow.init();
// });
//
// $(document).on('page:change', function() {
//   wow.init();
// });

$(document).ready(function() {
  wow.init();
});

$(document).on('mouseenter',".img-index-item2", function(){
  $(this).next().css("display","block")
});

$(document).on('mouseenter',".img-index-item", function(){
  $(this).next().css("display","block")
});

$(document).on('mouseenter',".img-index-item4", function(){
  $(this).next().css("display","block")
});

$(document).on('mouseleave',".img-index-item2", function(){
});

$(document).on('click',".img-index-item2", function(){
  $(this).children('.modal').addClass('show-modal');
  $(this).removeClass('img-index-item2')
});

$(document).on('click', '.show-modal', function() {
  $('.show-modal').removeClass('show-modal')
  $(this).parent().addClass("img-index-item2")
});

// $(document).on('click','#btn_like',function(){
//   alert("liked");
// });

// $(document).on('click', '#change-ava', function(){
//   $('#ava-change').css("visibility","visible");
//   $(this).addClass('hide');
// });
//
// $(document).on('click', '#ava-change', function(){
//   $('#ava-ok').removeClass('hide');
// });
//
// $(document).on('click', '#ava-ok', function(){
//   console.log($('#ava-change').val());
//   var l= "'"+ $('#ava-change').val() + "'";
//   $('#ava-field').val(l);
//   alert($('#ava-field').val());
// });
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


