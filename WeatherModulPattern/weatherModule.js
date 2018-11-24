var weatherModule = (function() {      
    
    var lat, lon;
    var NOT_FOUND = 404;
    var tableHTML = "";
    var elements ;

    function requestError(error)
    {
        switch(error.status) {
            case NOT_FOUND:
            {
                elements.setErrorInfo("Not found! Try again!");
                elements.getMidleRect().appendChild(elements.getErrorInfo());
                return false;
            }            
            break;
            default:
            {
                if(document.body.contains(elements.getErrorInfo()))
                    elements.getMidleRect().removeChild(elements.getErrorInfo());
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

        setElements: function(element) {
            elements = element;
        },

        getWeatherOnStart: function() {
                                            
            //Строка запроса
            var weatherData = weatherVar().getUrlCurDayByLoc() + lat + '&lon=' + lon + weatherVar().getIdKey();
            var weatherData3Days = weatherVar().getUrl3DaysByLoc() + lat + '&lon=' + lon + weatherVar().getIdKey() + "&cnt=28";
                    
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
                var loc = "Lat: " + parseData.coord.lat.toFixed(2) + " Long: " + parseData.coord.lon.toFixed(2);
                elements.setLocation(loc);
                elements.setCity(parseData.name);
                elements.setTemp("  " + parseData.main.temp);
                elements.setDescription(parseData.weather[0].description + " ");
                elements.setImg(weatherVar().getUrlImage() + parseData.weather[0].icon +".png");

                //Запрос на несколько дней 
                request.open("GET",threeDaysUrl,false);
                request.send(null);
                parseData = JSON.parse(request.response);
                
                for(var i=0;i<parseData.list.length; i++)
                {
                    _day = new Date(parseData.list[i].dt_txt);

                    if(_day.getDay() != (new Date()).getDay() && _day.getHours() == 12 )
                    {
                        tableHTML += "<tr><td width=\"45%\" height=\"20%\">" + weatherVar().getCurrentDayToString(_day.getDay())
                                    + "</td><td width=\"45%\"height=\"20%\"><img src=" 
                                    + weatherVar().getUrlImage() + parseData.list[i].weather[0].icon + ".png" + "></td><td width=\"10%\" height=\"20%\">" 
                                    + parseData.list[i].main.temp.toFixed(1) + "</td><td width=\"10%\" height=\"20%\"><div id=\"degreSmall\" >"
                                    + " °C </div></td></tr>";
                    }
                }
                elements.getMidleRect().appendChild( elements.getTableObj(tableHTML));
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