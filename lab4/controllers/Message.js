// Controller handle to handle functionality in Message Page


function getMessage(request, response){
    response.render('message', {title:'message', msgName: requrest.params.msgName, isAvailable: true});
}

module.exports = {
    getMessage
};