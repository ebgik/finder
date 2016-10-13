# finder
Plugin with JQuery

Поиск информации и сохранение выбранных пунктов в виде json-строки

(Для использования необходим JQuery)

Параметры инициализации:

<pre>
<strong>inputSearch</strong> - поле, из которого берется строка для поиска (по умолчанию '.search')
<strong>urlSearch</strong> - путь к обработчику (по умолчанию '/jsonapi/search')
<strong>inputHidden</strong> - скрытое поле, в которое кладется конечный результат (по умолчанию '.json')
<strong>url_prefix</strong> - префикс url-ла(по умолчанию '/')
</pre>

Данные необходимые для вывода информации об элементе списка:

<pre>
<strong>id</strong> - уникальный идентификатор записи (по умолчанию 'id')
<strong>name</strong> - наименование записи (по умолчанию 'name')
<strong>description</strong> - описание записи (по умолчанию 'text')
</pre>

Все параметры являются необязательными

Пример использования<br>
<code>
     $('.listBlock').finder({<br>
        url_prefix:"/service/",<br>
        urlSearch:'/jsonapi/search',<br>
        id:'id',<br>
        name:'name',<br>
        description:'text'<br>
     })
</code>
