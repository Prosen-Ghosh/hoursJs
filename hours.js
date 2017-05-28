/*
    Author : Prosen Ghosh
*/

(function(window){

    /************************* Additional Functions ***************************** */

    String.prototype.ucFirst = function(){
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    Number.prototype.last2OfYear = function(){
        return Number(this.toString().slice(-2));
    }

    Number.prototype.isLeapYear = function(){
        return ((this % 4 == 0) && (this % 100 != 0)) || (this % 400 == 0);
    }

    String.prototype.isLeapYear = function(){
        return Number(this).isLeapYear();
    }


    let _getArray = function(){
        let tmpDaysName = [];
        if(arguments[0] === false){
            tmpDaysName = this.dayName;
        }
        else {
            tmpDaysName = this.dayAbbrName;
        }
        return tmpDaysName;
    }

    let _getMonthArray = function(){
        let tmpMonthsName = [];
        if(arguments[0] === false){
            tmpMonthsName = this.monthName;
        }
        else {
            tmpMonthsName = this.monthAbbrName;
        }
        return tmpMonthsName;
    }

    /*************************************************************************** */


    //This Function Will Return Current Day
    let _getTodaysName = function(abbr = false){
        let getArray = _getArray.bind(this,abbr);
        let tmpDaysName = getArray();
        return tmpDaysName[this.today.getDay()].ucFirst();
    }

    //This Function Will Retun Next Day
    let _getNextDay = function(abbr = false){
        let getArray = _getArray.bind(this,abbr);
        let tmpDaysName = getArray();
        return tmpDaysName[((this.today.getDay() + 1) % 7)].ucFirst();
    }

    //This Function Will Take a Parameter (Deafult Parameter is 1), And Return Expected Day
    let _nextDay = function(val = 1,abbr = false){
        let getArray = _getArray.bind(this,abbr);
        let tmpDaysName = getArray();
        val = val < 0 ? -val : val;
        return tmpDaysName[(this.today.getDay()+Math.ceil(Number(val)))%7].ucFirst();
    }

    // This Function Will Retun The Diffreance Between Current Date And Expected Date
    let _getDayByName = function(name){
        name = name.toLowerCase() || this.dayName[this.today.getDay()].toLowerCase();
        let index = this.dayName.indexOf(name);
        return Math.abs(this.today.getDay() - index);
    }

    // This Function Will Return Previous Day Name
    let _getPrevDay = function(abbr = false){
        let getArray = _getArray.bind(this,abbr);
        let tmpDaysName = getArray();
        return tmpDaysName[((this.today.getDay() + 6) % 7)].ucFirst();
    }

    // This Function Will Return Boolean Value If the day is current day then it will return true otherwise return false
    let _isTheDay = function(name,abbr = false){
        let getArray = _getArray.bind(this,abbr);
        let tmpDaysName = getArray();
        return tmpDaysName[this.today.getDay()].toLowerCase() === name.toLowerCase();
    }
    
    //This Function Will Take two Parameter first parameter will take a number and second will take boolean  (Deafult Parameter is -1), And Return Expected Day
    let _prevDay = function(val = -1,abbr = false){
        let getArray = _getArray.bind(this,abbr);
        let tmpDaysName = getArray();
        val = val > 0 ? -val : val;
        return tmpDaysName[((this.today.getDay() + 7 ) + Math.ceil(Number(val))%7)].ucFirst();
    }

    // This Function Will Return The Current Month
    let _getMonth = function(abbr = false){
        let getArray = _getMonthArray.bind(this,abbr);
        let monthsName = getArray();
        return monthsName[this.today.getMonth()].ucFirst();
    }

    // This Function Will Return Next Month of the current month
    let _nextMonth = function(val = 1,abbr = false){
        let getArray = _getMonthArray.bind(this,abbr);
        let monthsName = getArray();
        val = val < 0 ? -val : val;
        return monthsName[(this.today.getMonth() + Math.ceil(Number(val))) % 12].ucFirst();
    }

    // This Function Will Return Previous Moth Of the Current Month
    let _prevMonth = function(val = -1,abbr = false){
        let getArray = _getMonthArray.bind(this,abbr);
        let monthsName = getArray();
        val = val > 0 ? -val : val;
        return monthsName[((this.today.getMonth() + 12) + Math.ceil(Number(val))) % 12].ucFirst();
    }

    // This Function Will Check the Current Month With The Argument if it's same then it will return true otherwise it will return false
    let _isTheMonth = function(name , abbr = false){
        let getArray = _getMonthArray.bind(this,abbr);
        let monthsName = getArray();
        return monthsName[this.today.getMonth()].toLowerCase() === name.toLowerCase();
    }

    // This Function Will Return Current Year
    let _getYear = function(abbr = false){
        if(abbr === false){
            return this.today.getFullYear();
        }
        else {
            return this.today.getFullYear().last2OfYear();
        }        
    }

    // This Function Will return the next year of the current year
    let _nextYear = function(val = 1,abbr = false){
        val = val < 0 ? -val : val;
        if(abbr === false){
            return this.today.getFullYear() + val;
        }
        else {
            return (this.today.getFullYear() + val).last2OfYear();
        }
    }

    // This Function Will return Previous year of the current year if no argument is given otherwise it will give the expected year
    let _prevYear = function(val = 1,abbr = false){
        val = val < 0 ? -val : val;
        if(val < this.today.getFullYear()){
            if(abbr === false){
                return this.today.getFullYear() - val;
            }
            else {
                return Number(this.today.getFullYear() - val).last2OfYear();
            }
        }
        else {
            if(abbr === false){
                return this.today.getFullYear();
            }
            else {
                return this.today.getFullYear().last2OfYear();
            }
        } 
    }

    // This Function Will Return Next Leap Year;
    let _nextLeapYear = function(){
        let year = this.today.getFullYear();
        while(true){
            year++;
            if(year.isLeapYear()){
                return year;
            }
        }
    }

    // This Function Will Return Previous Leap Year;
    let _prevLeapYear = function(){
        let year = this.today.getFullYear();
        while(true){
            year--;
            if(year.isLeapYear()){
                return year;
            }
        }
    }

    // This Function Will Return Munites
    let _daysToMinutes = function(days){
        return Math.round(days * 1440);
    }

    // This Function Will Return seconds
    let _daysToSeconds = function(days){
        return Math.round(days * 86400);
    }
    // This Function Will Return hours
    let _daysToHours = function(days){
        return Math.round(days * 24);
    }

    // This Function Will Return Days
    let _hoursToDays = function(hours){
        return Math.round(hours / 24);
    }

    // This Function Will Return Days
    let _secondsToDays = function(seconds){
        return Math.round(seconds / 86400);
    }

    // This Function Will Return Days
    let _minutesToDays = function(minutes){
        return Math.round(minutes / 1440);
    }
    // Hour Constructure 
    function Hour(){

        let _hours = {};
        // This Are For Days
        _hours.today = new Date();
        _hours.dayName = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
        _hours.getTodaysName = _getTodaysName;
        _hours.getNextDay = _getNextDay;
        _hours.nextDay = _nextDay;
        _hours.getDayByName = _getDayByName;
        _hours.getPrevDay = _getPrevDay;
        _hours.isTheDay = _isTheDay;
        _hours.prevDay = _prevDay;
        /*For Abbreviations of Days of the Week*/
        _hours.dayAbbrName = ["sun","mon","tue","wed","thu","fri","sat"];


        // This Are For Months
        _hours.monthName = ["january","february","march","april","may","june","july","august","september","october","november","december"];
        _hours.monthAbbrName = ["jan","feb","mar","apr","may","jun","jul","aug","sept","oct","nov","dec"];
        _hours.getMonth = _getMonth;
        _hours.nextMonth = _nextMonth;
        _hours.prevMonth = _prevMonth;
        _hours.isTheMonth = _isTheMonth;

        // This Are For Years
        _hours.getYear = _getYear;
        _hours.nextYear = _nextYear;
        _hours.prevYear = _prevYear;
        _hours.nextLeapYear = _nextLeapYear;
        _hours.prevLeapYear = _prevLeapYear;

        // Time Conversions

        _hours.daysToMinutes = _daysToMinutes;
        _hours.daysToSeconds = _daysToSeconds;
        _hours.daysToHours = _daysToHours;

        _hours.hoursToDays = _hoursToDays;
        _hours.secondsToDays = _secondsToDays;
        _hours.minutesToDays = _minutesToDays;
        
        return _hours;
    }
    window.Hours = window.H = window.$H = window.$h = Hour();
    window.Hours.version = window.Hours.v = window.Hours.V = window.Hours.VERSION = "1.0.0";
    window.Hours.AUTHOR = window.Hours.author = "Prosen Ghosh";
	
})(window);