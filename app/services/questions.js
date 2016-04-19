'use strict';

var app = angular.module('jobbomat');

app.service('Questions', ['$http', '$q', function($http, $q) {
    console.log("[Questions] service initiated");
    var questions = [];

    var answers = [];

    var reset = function() {
        if(answers.length > 0) {
            send();
        }
        return fetch();
    }

    var fetch = function() {
        questions.length = 0;
        console.log('Fetching questions...');
        var def = $q.defer();
        $http.get('/questions').then(function(data) {
            questions = data.data;
            def.resolve(data.data);
        }, function(err) {
            def.reject(err);
        });

        return def.promise;
    }

    reset();

    var answer = function(ans) {
        answers.push(ans);
    }

    var send = function(mail) {
        var ans = {
            answers: answers
        };
        if(mail) {
            ans.mail = mail;
        }
        $http.post('/answers', ans).then(function(data) {
            console.log('Answers saved');
            answers.length = 0;
        }, function(err) {
            console.error('Server did not accept answer:', err);
        })
    }

    var get = function(index) {
        function findByIndex(i) {
            var def = $q.defer();
            console.log("Fetching question: ", questions);
            if(index >= 0 && index < questions.length) {
                return questions[index];
            } else {
                return false;
            }
        }

        if(questions.length === 0) {
            return fetch().then(function(){
                return findByIndex(index);
            });
        } else {
            return findByIndex(index)
        }
    }

    return {
        reset: reset,
        answer: answer,
        send: send,
        get: get
    }
}]);
