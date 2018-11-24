window.onload = function() {
    var elements = moduleElements();
    var mainModule = weatherModule;
    mainModule.setElements(elements);
    mainModule.getMyCurrentPosition(mainModule.getWeatherOnStart);
}

