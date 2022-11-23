const isValidCollegeShortName = function(name){
    const regex = /^[A-Za-z]+$/;
    return regex.test(name)
}

const isValidCollegeFullName = function(name){
    const regex =  /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return regex.test(name)
}

const isValidCollegeLogoLink = function (link){
    const regex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    return regex.test(link);
};

const isValidStudentName = function(name){
    const regex =  /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/;
    return regex.test(name)
}

const isValidMail = function(email){
    const regex =  /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return regex.test(email)
}

const isValidMobile = function(number){
    const regex =  /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return regex.test(number)
}

const isEmpty = function(value){
    // if(typeof(value) === undefined || value === null) {return false};
    if(typeof(value) == 'string' && value.trim().length == 0) {return false}
    return true
}

module.exports = {isValidCollegeShortName, isValidCollegeFullName, isValidStudentName, isValidMail, isEmpty, isValidMobile, isValidCollegeLogoLink}