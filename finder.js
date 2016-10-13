;(function( $ ){

  var defaults = {

    inputSearch:'.search',
    inputHidden:'.json',
    urlSearch:'/jsonapi/search',
    url_prefix:'/',
    id:'id',
    name:'name',
    description:'description'

  };

  $.fn.finder = function(params) {
    return this.each(function() {
      var $this = $(this)
    //  console.info('finderRntd init');


      var settings = $.extend({}, defaults, params);

      var el = $this,
          inputSearch = el.children(settings.inputSearch),
          inputHidden = el.children(settings.inputHidden),
          url_prefix = settings.url_prefix,
          result;

      if (el.children('.items').length==0)
        el.prepend('<div class="items"></div>');

      var items = el.children('div.items');

      if (items.find('sup').length==0)
          inputHidden.val('{}');
      else {
        items.find('sup').on('click',itemRemove);
      }

      inputSearch.on('keyup',function(){

            var q = $(this).val();

            $(this).next('.results').remove();

            if (q=='') return;

            $(this).after('<div class="results"></div>');
            result = $(this).next('.results');

            //console.log(q)
            $.getJSON(settings.urlSearch, {q: q})
             .done(function(res){
               if (res.data.length>0)
               {
                 var $ol = $('<ol class="search">');
                 res.data.forEach(function(item,i, arr){
                   //console.log(item);
                    var $li = $('<li class="col_12">');
                     $('<a>').html(
                         item[settings.name] +
                         (item[settings.description] ? '. ' +
                         item[settings.description] : '' )
                     ).appendTo($li);
                     $('<i class="action fa fa-plus-circle" title="Добавить связь"></i>')
                     .data('info',item)
                     .on('click',itemAdd)
                     .appendTo($li);
                     $li.appendTo($ol);
                 })
                 result.html('').append($ol);
               }
             })
             .fail(function(res){
               //console.log(res.status);
               if (res.status == 404) {
                   result.text('По запросу "' + q + '" нет данных');
               } else if (res.status != 0 && res.statusText != 'abort') {
                   console.log('error', res);
               }
             })
          })


      function itemAdd(){
          //  console.log($(this).data('info'))
            var info = $(this).data('info'),
                value = JSON.parse(inputHidden.val());

            if (!value.items) {
                value.items = [];
            }

            if (el.find('[data-'+settings.id+'=' + info[settings.id] + ']').length) {
                alert('Уже в списке');
                return;
            }

            var $span = $('<p>'),
                name = info[settings.name] + (info[settings.description] ? '. ' + info[settings.description] : '' );

            $('<a data-'+settings.id+'="' + info[settings.id] + '" href="' + url_prefix + info[settings.id] + '">')
                .html(name)
                .appendTo($span);

            $('<sup class="action" title="Удалить связь">')
                .data('index', value.items.length)
                .on('click', itemRemove)
                .appendTo($span)
                .append('<i class="fa fa-remove">')

            items.append($span);

            value.items.push({'value': info[settings.id], 'name': name});
            inputHidden.val(JSON.stringify(value));
            inputSearch.val('');
            result.remove();
      };


      function itemRemove() {
              var value = JSON.parse(inputHidden.val()),
                  uuid = $(this).prev('a').attr('data-'+settings.id);

              value.items = $.grep(value.items,function (it, i){
                  return (it.value!=uuid);
              });

              $(this).parent().remove();
              inputHidden.val(JSON.stringify(value));
      };

    });
  };

})( jQuery );
