var moduleElements = (function(){

//получаем идентификатор элемента
var location = document.getElementById("location");
var temp = document.getElementById("temp");
var city = document.getElementById("city");
var description = document.getElementById("description");
var img = document.getElementById("img");
var midleRect = document.getElementById("midleRect");
var tableObj = document.createElement("table");
var errorInfo = document.createElement("text");
var searchField = document.getElementById("searchField");
var searchButton = document.getElementById("searchButton");

return {

    setLocation: function(text) {
        location.innerHTML = text;
    },

    setTemp: function(text) {
        temp.innerHTML = text;
    },

    setCity: function(text) {
        city.innerHTML = text;
    },

    setDescription: function(text) {
        description.innerHTML = text;
    },

    setImg: function(text) {
        img.src = text;
    },

    getMidleRect: function() {
        return midleRect;
    },

    setTableObj: function(text) {
        tableObj.innerHTML = text;
    },

    getTableObj: function(text) {
        tableObj.innerHTML = text;
        return tableObj;
    },

    getTableObj2: function() {
        return tableObj;
    },

    setErrorInfo: function(text) {
        errorInfo.innerHTML = text;
    },

    getErrorInfo: function(text) {
        return errorInfo;
    },

    getSearchField: function() {
        return searchField;
    },

    getSearchButton: function() {
        return searchButton;
    }
}
    
})

searchButton.onclick = function() {

    moduleElements().getSearchField().value = moduleElements().getSearchField().value.replace(/\s+/g," ");


    var urlCurDay = weatherVar().getUrlCurDayByCity() + moduleElements().getSearchField().value + weatherVar().getIdKey();
    var url3Days = weatherVar().getUrl3DaysByCity() + moduleElements().getSearchField().value + weatherVar().getIdKey() + "&cnt=28";

    if(document.body.contains(moduleElements().getTableObj2()))
        moduleElements().getMidleRect().removeChild(moduleElements().getTableObj2());

        weatherModule.getFullData( urlCurDay, url3Days);
};