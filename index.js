const isNode = typeof process !== 'undefined'
  && process.versions != null
  && process.versions.node != null;

if (isNode) {
    global.fetch = require('node-fetch');
    global.FormData = require('form-data');
}

const DEFAULT_TIMEOUT = 300;

async function getPosts(user) {
    var promise = new Promise((resolve, reject) => {
        setTimeout(function() {
            fetch("https://curiouscat.qa/api/v2.1/profile?username=" + user + "&_ob=registerOrSignin2")
            .then(res => res.json())
            .then((body) => {
                if ("error" in body) {
                    resolve(undefined);
                } else {
                    resolve(body);
                }
            });
        });
    }, DEFAULT_TIMEOUT);

    return promise;
}

async function newPost(user, question) {
    var promise = new Promise((resolve, reject) => {
        setTimeout(function() {
            var form = new FormData();

            form.append("to", user);
            form.append("anon", "true");
            form.append("question", question);
            form.append("in_response_to", "");
            form.append("_ob", "registerOrSignin2");

            fetch("https://curiouscat.qa/api/v2/post/create", {
                method: "POST",
                body: form
            })
            .then(res => res.json())
            .then((body) => {
                resolve(body.success);
            })
        }, DEFAULT_TIMEOUT);
    });

    return promise;
}