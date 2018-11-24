var weatherVar = (function()
{
    var curDay = document.getElementById("day");
    var urlImage = "http://openweathermap.org/img/w/";
    var urlCurDayByLoc = "http://api.openweathermap.org/data/2.5/weather?lat=";
    var url3DaysByLoc = "http://api.openweathermap.org/data/2.5/forecast?lat=";
    var urlCurDayByCity = "http://api.openweathermap.org/data/2.5/weather?q=";
    var url3DaysByCity = "http://api.openweathermap.org/data/2.5/forecast?q=";
    var idKey = "&appid=f8c1137f61db342a4e89af8f92100131&units=metric";           

    return {

        getCurrentDayToString: function(day)
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
        },

        setCurrentDay: function()
        {
            curDay.innerHTML = currentDayToString((new Date()).getDay());
        },

        getUrlImage: function()
        {
            return urlImage;
        },

        getUrlCurDayByLoc: function()
        {
            return urlCurDayByLoc;
        },

        getUrl3DaysByLoc: function()
        {
            return url3DaysByLoc;
        },

        getUrlCurDayByCity: function()
        {
            return urlCurDayByCity;
        },

        getUrl3DaysByCity: function()
        {
            return url3DaysByCity;
        },

        getIdKey: function()
        {
            return idKey;
        }
    }

})