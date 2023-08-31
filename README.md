# Тестовое задание для стажёра Frontend
### Деплой приложения
[тык](https://64f0aa2138f84e5a5d92ca88--imaginative-raindrop-9edb3b.netlify.app/)
### Скриншоты
![image](https://github.com/slysnek/avito-task/assets/75425287/8842182d-270b-49fd-90ff-e6ea65d0ee5c)
![image](https://github.com/slysnek/avito-task/assets/75425287/da6348ba-86d9-416a-bee6-04acbcfad687)



### Инструкция по запуску
* Скачать репозиторий к себе на рабочий стол либо выполнить в терминале команду ```git clone https://github.com/slysnek/avito-task.git```
* Зайти в директорию репозитория и выполнить команду ```npm i```
* В директории репозитория (**не** в ```src```!!!) создать ```.env``` файл и вписать туда ```VITE_API_KEY=*ваш_апи_ключ*```. Api ключ добывается при регистрации на сайте https://rapidapi.com/. И затем берется по адресу https://rapidapi.com/digiwalls/api/free-to-play-games-database в разделе ```Header-parameteres```-```X-RapidAPI-Key```.
* ❗ В связи с высокой нагрузкой API, он может быть недоступен или же по какой-то причине выкидывает с ошибкой 403 (не распознает ключ) и 429 (слишком много запросов). Для теста можно использовать ссылку на [деплой](https://64f0aa2138f84e5a5d92ca88--imaginative-raindrop-9edb3b.netlify.app/) netlify выше, там уже есть api ключ.
* Выполнить команду в терминале ```npm start```

## Требования (самопроверка)
### Главная страница
- Показывает игры ✔️
    - Игры можно отфильтровать по платформе и жанру (например, шутер) ✔️
    - Игры можно отсортировать по дате релиза, популярности и тд ✔️
- Каждая игра в списке содержит:
	- название ✔️
	- дата релиза (в российском формате) ✔️
    - издатель ✔️
    - жанр ✔️
    - картинка ✔️
- По клику на игру происходит переход на страницу игры ✔️
- На загрузку игр показывать индикатор загрузки ✔️
- Если не получилось получить данные, необходимо сообщить пользователю ✔️
### Страница игры ✔️
- Должна содержать (в любом порядке/виде):	
	- название ✔️
	- дата релиза (в российском формате) ✔️
    - издатель ✔️
    - разработчик ✔️
    - жанр ✔️
    - картинка/постер ✔️
    - карусель скриншотов ✔️
    - системные требования ✔️
- На странице должна быть кнопка для возврата к списку игр ✔️
- На загрузку игры показывать индикатор загрузки ✔️
- Если не получилось получить данные, необходимо сообщить пользователю ✔️

## Технические требования

- С приложением должно быть удобно работать, как с мобильного экрана, так и с десктопа (адаптивный интерфейс) ✔️
- Приложение разработано с помощью React 18+ и Redux / Redux Toolkit ✔️
- Использован [Free-To-Play Games API](https://www.freetogame.com/api-doc) (не важно с или без CORS). Вызовы API и обработка данных от него производятся напрямую с фронтенда (кроме случая, если вы сделаете опциональное задание про Node.JS). ✔️
- Роутинг выполнен с использованием [React Router v6](https://reactrouter.com/en/main) ✔️
- Фреймворк UI любой на ваше усмотрение (например, [Ant Design](https://ant.design/), [Semantic UI](https://react.semantic-ui.com/), [Element UI](http://elemental-ui.com/)) ✔️
- Пакетный менеджер `npm` ✔️
- Приложение должно запускаться по адресу `localhost:3001` командой `npm start` ✔️
- При переходах по ссылкам страница не перезагружается ✔️
- Если карточка игры была открыта, то она должна быть доступна при последующих открытиях (перезагрузках) страницы без дополнительного запроса в течение 5 минут ✔️
- Исходный код решения должен быть выложен с вашего аккаунта на [Github](http://github.com/) ✔️

## Опциональные задания
- Использование TypeScript ✔️
- Учитывать, что список игр может содержать тысячи тайтлов ✔️
- При неудачном запросе должно быть три попытки повторного запроса ✔️
- При переходе со страницы на страницу запросы, относящиеся к старой странице, должны прерываться (отменяться/прекращаться) ✔️
- Бэкенд для хостинга статики и API для инкапсуляции внешних запросов на Node.JS ❌
- Покрытие кода юнит-тестами ❓ (js-dom не хочет дружить с vitest, хотя раньше дружил, пытаюсь подружить)
