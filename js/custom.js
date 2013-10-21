/**
 * Created with JetBrains PhpStorm.
 * User: foysal
 * Date: 10/19/13
 * Time: 7:36 PM
 * To change this template use File | Settings | File Templates.
 */

var MessageModel = Backbone.Model.extend({
    urlRoot : 'messages.php',
    defaults: {
        message: "Text"
    }
});

var MessageView = Backbone.View.extend({

    template:_.template($('#tpl-hello-backbone').html()),

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

var MessageRouter = Backbone.Router.extend({
    routes:{
        "": "show"
    },
    show:function() {
        var messageModel = new MessageModel();
        var messageView = new MessageView({model:messageModel});
        messageModel.fetch({
            success: function () {
                $('#msg').html(messageView.render().el);
            }
        });
        //$('#msg').html(messageView.render().el);
    }
});

var message = new MessageRouter();
//Backbone.history.start();


