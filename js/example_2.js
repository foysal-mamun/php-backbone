/**
 * Created with JetBrains PhpStorm.
 * User: foysal
 * Date: 10/23/13
 * Time: 4:52 PM
 * To change this template use File | Settings | File Templates.
 */
var MessageModel = Backbone.Model.extend();

var MessageCollection = Backbone.Collection.extend({

    model: MessageModel,
    url: "../api/example_2.php"

});

var MessageListView = Backbone.View.extend({

    tagName: "ul",

    render: function(eventName) {
        _.each(this.model.models, function (msg) {
            $(this.el).append(new MessageListItemView({model:msg}).render().el);
        }, this);
        return this;
    }

});

var MessageListItemView = Backbone.View.extend({

    tagName:"li",

    template:_.template($('#tpl-message-item').html()),

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

var MessageRouter = Backbone.Router.extend({

    routes: {
        "": "displayMessages"
    },

    displayMessages: function() {

        var messageCollection = new MessageCollection();

        var messageListView = new MessageListView({model:messageCollection});
        messageCollection.fetch({
            success: function () {
                $('#messageList').html(messageListView.render().el);
            }
        });

    }

});

var messageRouter = new MessageRouter();
Backbone.history.start();