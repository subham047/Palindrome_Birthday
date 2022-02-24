// Reverse a String
function reverseStr(str){

    // One way to split the characters, reverse and join them  
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;

    // Other short-cut way to do the same
        // return str.split('').reverse().join('');
}

// Palindrome logic
function isPalindrome(str){
    var reverse = reverseStr(str);

    // Use this logic to check palindrome
        // if(str === reverse){
        //     return true;
        // }
        // return false;

    // OR we can use this logic
        return str === reverse ;
}

// Converting DATE from NUMBER to STRING
function convertDateToStr(date){
    var dateStr = {day: '', month:'', year: ''};

    // adding 0 before the dates which is less than 10 and convert them into a string.

    // for days
    if(date.day<10){
        dateStr.day='0' + date.day;
    }else{
        dateStr.day = date.day.toString();
    }

    // for months
    if(date.month<10){
        dateStr.month='0' + date.month;
    }else{
        dateStr.month = date.month.toString();
    }

    // for year
    dateStr.year = date.year.toString();

    return dateStr; //returning Boolean
}

// Getting all the formats of date and storing it into an array for easy iteration.
function getAllDateFormats(date){
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2); //Getting the last two digits of the YEAR-string using SLICE().
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy,mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

// Checking Palindrome for all date formats which we are getting fron the date-format-array
function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);

    var flag = false;

    for(var i = 0; i < listOfPalindromes.length; i++){
        if(isPalindrome(listOfPalindromes[i])){
            flag = true;
            break;
        }
    }
    return flag;
}

// Getting next Palindrome Date
function getNextPalindromeDate(date){
    var counter = 0;
    var nextDate = getNextDate(date);

    while(1){
        counter++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [counter, nextDate];
}

// Checking Leap Year
function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

// Getting next Date
function getNextDate(date){
    var day = date.day + 1; //increment day by 1
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    //checking leap year using FEBRUARY month
    if(month === 2){
        //incrementing months by checking it's a leap year or not
        if(isLeapYear(year)){ 
            if(day > 29){
                day = 1;
                month++;
            }
        }else{
            if(day > 28){
                day = 1;
                month++;
            }
        }
    }
    else{
        //incrementing days by checking if day exceeds the max days in month
        if(day > daysInMonth[month - 1]){  
            day = 1;
            month++;
        }
    }

    //incrementing year
    if(month > 12){ 
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };

}


var dateInput = document.querySelector('#birthday-input');
var showBtn = document.querySelector('#show-btn');
var resultRef = document.querySelector('#result');
var nextPalindromeBdayResultRef = document.querySelector('#next-palindrome-bday');

// Click Event Handler
function clickHandler(e){
    var bdayStr = dateInput.value;

    if(bdayStr !== ''){
        var listOfDate = bdayStr.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        
        var isPalindrome = checkPalindromeForAllDateFormats(date);

        if(isPalindrome){
            resultRef.innerText = '🎉🎉 Yay! Your Birthday is a Palindrome!! 🎉🎉'
        }
        else{
            var [counter, nextDate]= getNextPalindromeDate(date);
            resultRef.innerText = `😞😞Sorry!!! Your Birthday is not a Palindrome!!😞😞
             The next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, 😭😭  You missed it by ${counter} days!!! 😭😭`;
        }
    }
}

showBtn.addEventListener('click', clickHandler);