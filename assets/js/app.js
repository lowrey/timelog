var App = {
    run: function () {
        this.addview = new this.addView();
        this.listview = new this.listView();
        this.timecollection = new this.timeCollection();
        this.router = new this.Router();
        Backbone.history.start();
        //this.router.navigate('add',{trigger:true}); 
    }
};
App.Router = Backbone.Router.extend({
    routes: {
        'add': 'renderAddnew',
        'list': 'renderList',
        '*path': 'defaultRoute'
    },
    renderAddnew: function () {
        App.addview.addPage();
    },
    renderList: function () {
        App.listview.setElement('#content');
        App.listview.listPage();
    },
    defaultRoute: function(path)
    {
        this.renderList();
    }
});
App.TimeModel = Backbone.Model.extend({
    initialize: function (){
        //this.on('sync', this.view.render);
    },
    sync: function (method, model, options) {
        if(method === 'read')
        {
            Backbone.sync.call(model, method, model, options);
        }
        else if (method === 'create' || method === 'update') {
            if(App.timecollection.length === 0)
            {
                App.timecollection.fetch();
            }
            return $.ajax({
                dataType: 'json',
                url: './server/add.php',
                data: {
                    id: (this.get('id') || ''),
                    time: (this.get('time') || ''),
                    notes: (this.get('notes') || '')
                },
                success: function (data) {
                    $('span.false').html('');
                    if (data.success === true) {
                        //Add response directly to collection and rerender without fetch
                        _model = new Backbone.Model(data.record);
                        App.timecollection.add(_model);
                        App.listview.render(App.timecollection.toJSON());
                        App.router.navigate('list');
                    } else {
                        $.each(data.validationError, function () {
                            $('span.' + this.target).html(this.error);
                        }); // end of each
                    }
                    $('span.success').html(data.msg).removeClass('false').addClass(data.success.toString());
                }
            }); // end of ajax
        } // end of if
        else if (method === 'delete') {
            var id = this.get('id');
            return $.getJSON('./server/delete.php', {
                id: id
            }, function (data) {
                if (data.success === true) {
                    $('#timeTable tr[data-id="' + id + '"]').hide('slow');
                } else {
                    alert(data.msg);
                }
            }); // end of getJSON
        }
    } // end of sync

});
App.timeCollection = Backbone.Collection.extend({
    model: App.TimeModel,
    url: './server/list.php'
});
App.addView = Backbone.View.extend({
    el: '#content',
    template: _.template($('#addTimeTemplate').html()),
    events: {
        'submit form#addTimeForm': 'addTimeEvent'
    },
    initialize: function () {
        _.bindAll(this, 'addPage', 'addTimeEvent');
    },
    addPage: function () {
        this.$el.html(this.template({
            time: {}
        }));
    },
    addTimeEvent: function (event) {
        var notes = $('#inputNotes').val(),
            id = $('#time').val();
        if (id === '') {
            var timemodel = new App.TimeModel({
                notes: notes
            });
        } else {
            var timemodel = new App.TimeModel({
                id: id,
                notes: notes
            });
        }
        timemodel.save();
        return false;
    }
});
App.listView = Backbone.View.extend({
    el: '#content',
    template: _.template($('#listTimeTemplate').html()),
    initialize: function () {
        _.bindAll(this, 'listPage', 'render');
    },
    render: function (response) {
        var self = this;
        this.$el.html(this.template({
            times: response
        }));
        $('#timeTable tr[data-id]').each(function () {
            var id = $(this).attr('data-id');
            $(this).find('a.delete').click(function () {
                self.deleteTime(id);
            });
        }); //end of each
    },
    listPage: function (querystring) {
        var self = this;
        App.timecollection.fetch({
            data: querystring,
            success: function (collection, response) {
                self.render(response);
            }
        });
    },
    deleteTime: function (id) {
        if (confirm('Delete?')) {
            App.timecollection.get(id).destroy();
        }
    },
});
$(function () {
    App.run();
});
