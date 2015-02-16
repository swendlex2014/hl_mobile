(function(app) {
    var $appData = function($localStorage){
        var app = $localStorage.getObject('App');
        
        return {
            getIndexes : function(num){
                if (num !== undefined && num === true)
                    return app.indexes.num;
                return app.indexes.alpha;
            },

            getTable : function(ID, num){
                var table = app.table.alpha;
                if (num !== undefined && num === true)
                    return app.table.num;
                for(var i = 0; i < table.length; i++){
                    var key = Object.keys(table[i]);
                    if (key[0] === ID){
                        return table[i][ID];
                    }
                }
            },

            getChant : function(ID){
                if (this.IsValidChant(ID)){
                    $localStorage.set('chant', ID);
                    return app.chants[ID-1];
                } else{
                    var temp = $localStorage.get('chant'); 
                    return app.chants[temp > -1 === true ? temp : 0];
                }

            },

            IsValidChant : function(ID) {
                return ID !== undefined && ID >= 1 && ID <= 654;
            }    
        };
    }
    
    app.factory('$appData', ['$localStorage', $appData])

})(angular.module('ionicapp'));