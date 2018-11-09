window.onload = function() {

//получаем идентификатор элемента
var request = new XMLHttpRequest();
var parseData;
var location = document.getElementById("location");
var temp = document.getElementById("temp");
var city = document.getElementById("city");
var description = document.getElementById("description");
var img = document.getElementById("img");
var curDay = document.getElementById("day");
var midleRect = document.getElementById("midleRect");
var day3 = document.getElementById("day3");
var urlImage = "http://openweathermap.org/img/w/";
var urlCurDay = "http://api.openweathermap.org/data/2.5/weather?lat=";
var url3Days = "http://api.openweathermap.org/data/2.5/forecast?lat=";
var idKey = "&appid=f8c1137f61db342a4e89af8f92100131&units=metric";
var tableObj = document.createElement("table");
var tableHTML = "";
var _day;
var lat, lon;

curDay.innerHTML = currentDayToString((new Date()).getDay());

    //Проверка на поддержку
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
	}
	else {
        showError("Ваш браузер не поддерживает Geolocation!");
	}

	function locationSuccess(position) {
		
		// Текущие координаты.
        lat = position.coords.latitude;
        lon = position.coords.longitude;	        

        //Строка запроса
        var weatherData = urlCurDay + lat + '&lon=' + lon + idKey;

        var weatherData3Days = url3Days + lat + '&lon=' + lon + idKey + "&cnt=28";


        //Запрос и парсинг
        request.open("GET",weatherData,false);
        request.send(null);
        parseData = JSON.parse(request.response);

        //Запись в параметров DOM
        location.innerHTML = "Lat: " + lat.toFixed(2) + " Long: " + lon.toFixed(2); 
        city.innerHTML =  parseData.name;
        temp.innerHTML = "  " + parseData.main.temp;
        description.innerHTML = parseData.weather[0].description + " ";
        img.src = urlImage + parseData.weather[0].icon +".png";


        //Запрос на несколько дней 
        request.open("GET",weatherData3Days,false);
        request.send(null);
        console.log(request.response);
        parseData = JSON.parse(request.response);
        
        for(var i=0;i<parseData.list.length; i++)
        {
            _day = new Date(parseData.list[i].dt_txt);

            if(_day.getDay() != (new Date()).getDay() && _day.getHours() == 12 )
            {
                tableHTML += "<tr><td width=\"45%\" height=\"20%\">" + currentDayToString(_day.getDay())
                            + "</td><td width=\"45%\"height=\"20%\"><img src=" 
                            + urlImage + parseData.list[i].weather[0].icon + ".png" + "></td><td width=\"10%\" height=\"20%\">" 
                            + parseData.list[i].main.temp.toFixed(1) + "</td><td width=\"10%\" height=\"20%\"><div id=\"degreSmall\" >"
                            + " °C </div></td></tr>";
            }
        }
        tableObj.innerHTML = tableHTML;
        midleRect.appendChild(tableObj);
                

	}

	// В случае ошибки
	function locationError(error){
        switch(error.code) {
                case error.TIMEOUT:
                        showError("Время вышло попробуйте ещё!");
                        break;
                case error.POSITION_UNAVAILABLE:
                        showError('Не можем определить местоположение.');
                        break;
                case error.PERMISSION_DENIED:
                        showError('Разрешите доступ к получению данных о месте расположения.');
                        break;
                case error.UNKNOWN_ERROR:
                        showError('Неизвестная ошибка.');
                        break;
        }
	}
	//elem.onclick = function() {
    //}; кнопка <input id="elem" type="button" value="Получить" />


    function currentDayToString(day)
    {
        switch(day)
        {
            case 0:
                return "Sunday";
            break;
            case 1:
                return "Monday";
            break;
            case 2:
                return "Tuesday";
            break;
            case 3:
                return "Wednesday";
            break;
            case 4:
                return "Thursday";
            break;
            case 5:
                return "Friday";
            break;
            case 6:
                return "Saturday";
            break;
            default:
                return "none";
            break;
        }
    }

}
