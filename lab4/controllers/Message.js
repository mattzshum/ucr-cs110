// Controller handle to handle functionality in Message Page


function getMessage(request, response){
    response.render('message', {title:'message'});
}

module.exports = {
    getMessage
};