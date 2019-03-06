$(document).on('turbolinks:load', function() {
  // 販売価格部分のアクション
  $(function(){
    $('#selling-price').on('keyup', function(){
    var pri = String($('#selling-price').val());
      if ((pri >= 300) && (pri <= 999999)){
        $('.l-right-commission').text(Math.floor(pri * 0.1))
        var com = String($('.l-right-commission').text())
        $('.l-right-gain').text(parseInt(pri) - parseInt(com))
      } else{
        $('.l-right-commission').text('-')
        $('.l-right-gain').text('-')
      }
    });
  });

  // ドロップダウンリストのアクション
  // 大categoryが選ばれた時のみ小category表示
  // カテゴリ
  $(function(){
    $('#first_category').change(function(){
      var drop1listVal = $('#first_category option:selected').attr("value");
      if (drop1listVal == ""){
        $('.select-wrap[name="drop2"]').hide();
        $('.select-wrap[name="drop3"]').hide();
      } else $('.select-wrap[name="drop2"]').show();
        $('.form-group[name="size"], .form-suggest-container[name="brand"]').hide();
    });
  });

  $(function(){
    $(".form-group").on("change", "#second_category", function(){
      var drop2listVal = $('#second_category option:selected').attr("value");
      if (drop2listVal == ""){
        $('.select-wrap[name="drop3"]').hide();
        $('.form-group[name="size"], .form-suggest-container[name="brand"]').hide();
      } else $('.select-wrap[name="drop3"]').show();
        $('.form-group[name="size"], .form-suggest-container[name="brand"]').hide();
    });
  });

  $(function(){
    $('.form-group').on("change", "#third_category", function(){
      var drop3listVal = $('#third_category option:selected').attr("value");
      if (drop3listVal == ""){
        $('.form-group[name="size"], .form-suggest-container[name="brand"]').hide();
      } else $('.form-group[name="size"], .form-suggest-container[name="brand"]').show();
    });
  });
  // 配送料負担
  $(function(){
    $('#item_delivery_attributes_fee').change(function(){
      var droplistVal = $('#item_delivery_attributes_fee option:selected').attr("value");
      if (droplistVal == ""){
        $('.form-group[name="d_method"]').hide();
      } else $('.form-group[name="d_method"]').show();
    });
  });

  // 大categoryに紐づく小categoriの表示
  // カテゴリ
  $(function() {
    $('select[name="drop1list"]').change(function() {
      var drop1listVal = $('select[name="drop1list"] option:selected').attr("value");
      var count = $('select[name="drop2list"]').children().length;
      for (var i=0; i<count; i++) {
        var drop2option = $('select[name="drop2list"] option:eq(' + i + ')');
        if(drop2option.attr("class") === drop1listVal) {
          drop2option.show();
        } else drop2option.hide();
      };
    });
  });

  $(function() {
    $('select[name="drop2list"]').change(function() {
      var drop2listVal = $('select[name="drop2list"] option:selected').attr("value");
      var count = $('select[name="drop3list"]').children().length;
      for (var i=0; i<count; i++) {
        var drop3option = $('select[name="drop3list"] option:eq(' + i + ')');
        if(drop3option.attr("class") === drop2listVal) {
          drop3option.show();
        } else drop3option.hide();
      };
    });
  });

  $(function() {
    $('select[name="drop3list"]').change(function() {
      var drop3listVal = $('select[name="drop3list"] option:selected').attr("value");
      var count = $('select[name="drop3list"]').children().length;
      for (var i=0; i<count; i++) {
        var sizeoption = $('select[name="sizelist"] option:eq(' + i + ')');
        if(sizeoption.attr("class") === drop3listVal) {
          sizeoption.show();
        } else sizeoption.hide();
      };
    });
  });
  // 配送料負担
  $(function() {
    $('select[name="item[delivery_attributes][fee]"]').change(function() {
      var d_fee_listVal = $('select[name="item[delivery_attributes][fee]"] option:selected').attr("class");
      var count = $('select[name="item[delivery_attributes][kind]"]').children().length;
      for (var i=0; i<count; i++) {
        var d_method_listoption = $('select[name="item[delivery_attributes][kind]"] option:eq(' + i + ')');
        if(d_method_listoption.attr("class") === d_fee_listVal) {
          d_method_listoption.show();
        } else d_method_listoption.hide();
      };
    });
  });

// 以下、画像のプレビュー関連
  function buildHTML(imgsrc){
    var html =
               `<div class="sell-upload-figure">
                  <img src=${imgsrc} height="138">
                  <div class="sell-upload-button">
                    <a class="sell-upload-edit">編集</a>
                    <a class="sell-upload-delete">削除</a>
                  </div>
                </div>`
    return html;
  }
  //画像ファイルプレビュー表示のイベント追加 fileを選択時に発火するイベントを登録
  $('#item1').on('change', 'input[type="file"]', function(e) {
    var file = e.target.files[0],
        reader = new FileReader(),
        $preview1 = $("#item1");
    // 画像ファイル以外の場合は何もしない
    if(file.type.indexOf("image") < 0){
      return false;
    }
    // ファイル読み込みが完了した際のイベント登録
    reader.onload = (function(file) {
      return function(e) {
        // .prevewの領域の中にロードした画像を表示するimageタグを追加
        $('#file1').siblings('.sell-upload-figure').remove();
        var imgsrc = e.target.result;
        var imgHtml = buildHTML(imgsrc);
        $preview1.append(imgHtml);
        $("#file1").css('height', '44px');
        $("#file1").css('width', '50%');
        $("#vs1").css('opacity', '0');
      };
    })(file);
    reader.readAsDataURL(file);
  });
// 削除ボタン
  $('#item1').on("click", ".sell-upload-delete", function(e){
    $(this).parent().parent().remove();
    $("#file1").css('height', '100%');
    $("#file1").css('width', '100%');
    $("#vs1").css('opacity', '100');
    $("#file1").val('');
  });

// 左から２番目
  $('#item2').on('change', 'input[type="file"]', function(e) {
    var file = e.target.files[0],
        reader = new FileReader(),
        $preview2 = $("#item2");
    // 画像ファイル以外の場合は何もしない
    if(file.type.indexOf("image") < 0){
      return false;
    }
    // ファイル読み込みが完了した際のイベント登録
    reader.onload = (function(file) {
      return function(e) {
        // .prevewの領域の中にロードした画像を表示するimageタグを追加
        $('#file2').siblings('.sell-upload-figure').remove();
        var imgsrc = e.target.result;
        var imgHtml = buildHTML(imgsrc);
        $preview2.append(imgHtml);
        $("#file2").css('height', '44px');
        $("#file2").css('width', '50%');
        $("#vs2").css('opacity', '0');
      };
    })(file);
    reader.readAsDataURL(file);
  });
// 削除ボタン
  $('#item2').on("click", ".sell-upload-delete", function(e){
    $(this).parent().parent().remove();
    $("#file2").css('height', '100%');
    $("#file2").css('width', '100%');
    $("#vs2").css('opacity', '100');
    $("#file2").val('');
  });

// 左から３番目
  $('#item3').on('change', 'input[type="file"]', function(e) {
    var file = e.target.files[0],
        reader = new FileReader(),
        $preview3 = $("#item3");
    // 画像ファイル以外の場合は何もしない
    if(file.type.indexOf("image") < 0){
      return false;
    }
    // ファイル読み込みが完了した際のイベント登録
    reader.onload = (function(file) {
      return function(e) {
        // .prevewの領域の中にロードした画像を表示するimageタグを追加
        $('#file3').siblings('.sell-upload-figure').remove();
        var imgsrc = e.target.result;
        var imgHtml = buildHTML(imgsrc);
        $preview3.append(imgHtml);
        $("#file3").css('height', '44px');
        $("#file3").css('width', '50%');
        $("#vs3").css('opacity', '0');
      };
    })(file);
    reader.readAsDataURL(file);
  });
// 削除ボタン
  $('#item3').on("click", ".sell-upload-delete", function(e){
    $(this).parent().parent().remove();
    $("#file3").css('height', '100%');
    $("#file3").css('width', '100%');
    $("#vs3").css('opacity', '100');
    $("#file3").val('');
  });

// 左から４番目
  $('#item4').on('change', 'input[type="file"]', function(e) {
    var file = e.target.files[0],
        reader = new FileReader(),
        $preview4 = $("#item4");
    // 画像ファイル以外の場合は何もしない
    if(file.type.indexOf("image") < 0){
      return false;
    }
    // ファイル読み込みが完了した際のイベント登録
    reader.onload = (function(file) {
      return function(e) {
        // .prevewの領域の中にロードした画像を表示するimageタグを追加
        $('#file4').siblings('.sell-upload-figure').remove();
        var imgsrc = e.target.result;
        var imgHtml = buildHTML(imgsrc);
        $preview4.append(imgHtml);
        $("#file4").css('height', '44px');
        $("#file4").css('width', '50%');
        $("#vs4").css('opacity', '0');
      };
    })(file);
    reader.readAsDataURL(file);
  });
// 削除ボタン
  $('#item4').on("click", ".sell-upload-delete", function(e){
    $(this).parent().parent().remove();
    $("#file4").css('height', '100%');
    $("#file4").css('width', '100%');
    $("#vs4").css('opacity', '100');
    $("#file4").val('');
  });
});
