window.onload = function() {

    //получаем идентификатор элемента
    var location = document.getElementById("location");
    var temp = document.getElementById("temp");
    var city = document.getElementById("city");
    var description = document.getElementById("description");
    var img = document.getElementById("img");
    var curDay = document.getElementById("day");
    var midleRect = document.getElementById("midleRect");
    var urlImage = "http://openweathermap.org/img/w/";
    var urlCurDayByLoc = "http://api.openweathermap.org/data/2.5/weather?lat=";
    var url3DaysByLoc = "http://api.openweathermap.org/data/2.5/forecast?lat=";
    var urlCurDayByCity = "http://api.openweathermap.org/data/2.5/weather?q=";
    var url3DaysByCity = "http://api.openweathermap.org/data/2.5/forecast?q=";
    var idKey = "&appid=f8c1137f61db342a4e89af8f92100131&units=metric";
    var tableObj = document.createElement("table");
    var errorInfo = document.createElement("text");
    var searchField = document.getElementById("searchField");
    var searchButton = document.getElementById("searchButton");
    var tableHTML = "";
    var NOT_FOUND = 404;
    curDay.innerHTML = currentDayToString((new Date()).getDay());

    var weatherModule = (function() {      
        
    	var lat, lon;

        function requestError(error)
        {
            switch(error.status) {
                case NOT_FOUND:
                {
                    errorInfo.innerHTML = "Not found! Try again!";
                    midleRect.appendChild(errorInfo);
                    return false;
                }            
                break;
                default:
                {
                    if(document.body.contains(errorInfo))
                        midleRect.removeChild(errorInfo);
                    return true;
                }
                break;
            }
        }

    	function locationError(error) {

            // В случае ошибки
            switch(error.code) {
            case error.TIMEOUT:
                    alert("TIMEOUT!");
                    break;
            case error.POSITION_UNAVAILABLE:
                    alert("We can not determine the location");
                    break;
            case error.PERMISSION_DENIED:
                    alert("Allow access to location data.");
                    break;
            case error.UNKNOWN_ERROR:
                    alert("Unknown error.");
                    break;
            }
        }

        return {          

            getWeatherOnStart: function() {
                                               
                //Строка запроса
                var weatherData = urlCurDayByLoc + lat + '&lon=' + lon + idKey;
                var weatherData3Days = url3DaysByLoc + lat + '&lon=' + lon + idKey + "&cnt=28";
                      
                weatherModule.getFullData(weatherData, weatherData3Days);

            },

            getFullData: function(currentDayUrl, threeDaysUrl) {

                //Запрос и парсинг
                var parseData, _day;
                var request = new XMLHttpRequest();
                request.open("GET",currentDayUrl,false);
                request.send(null);        

                if(requestError(request))
                {            
                    parseData = JSON.parse(request.response);

                    //Запись в параметров DOM
                    location.innerHTML = "Lat: " + parseData.coord.lat.toFixed(2) + " Long: " + parseData.coord.lon.toFixed(2);//взять координаты с json файла 
                    city.innerHTML =  parseData.name;
                    temp.innerHTML = "  " + parseData.main.temp;
                    description.innerHTML = parseData.weather[0].description + " ";
                    img.src = urlImage + parseData.weather[0].icon +".png";

                    //Запрос на несколько дней 
                    request.open("GET",threeDaysUrl,false);
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
                    tableHTML = "";
                }
            },

            getMyCurrentPosition: function(callBackFunction){
            	//Проверка на поддержку
			    if (navigator.geolocation) {
			        navigator.geolocation.getCurrentPosition(function(position){

                        // Текущие координаты
                        lat = position.coords.latitude;
                        lon = position.coords.longitude;
                        callBackFunction();
                    },locationError);
			    }
			    else {
			        showError("Your browser doesn`t support Geolocation!");
    			}
            }            
        }

    }());    

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

    weatherModule.getMyCurrentPosition(weatherModule.getWeatherOnStart);

    searchButton.onclick = function() {

        searchField.value = searchField.value.replace(/\s+/g," ");

        var urlCurDay = urlCurDayByCity + searchField.value + idKey;
        var url3Days = url3DaysByCity + searchField.value + idKey + "&cnt=28";

        if(document.body.contains(tableObj))
                midleRect.removeChild(tableObj);

        weatherModule.getFullData( urlCurDay, url3Days);
    };

}
