/**
 * Created with JetBrains PhpStorm.
 * User: foysal
 * Date: 10/19/13
 * Time: 7:36 PM
 * To change this template use File | Settings | File Templates.
 */

var MessageModel = Backbone.Model.extend({
    urlRoot : 'messages.php',
    message : "test"
});

var MessageView = Backbone.View.extend({

    template:_.template($('#tpl-hello-backbone').html()),

    render:function (eventName) {
        $(this.el).html(this.template(this.model));
        return this;
    }
});

var MessageRouter = Backbone.Router.extend({
    routes:{
        "": "show"
    },
    show:function() {
        this.messageModel = new MessageModel();
        this.messageView = new MessageView({model:this.messageModel});
        this.messageModel.fetch();

        $('#msg').html(this.messageView.render().el);
    }
});

var message = new MessageRouter();
Backbone.history.start();


