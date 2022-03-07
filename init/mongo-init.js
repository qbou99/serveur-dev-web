db.auth(_getEnv('USERNAME_MONGO'), _getEnv('USERPWD_MONGO'));
db = db.getSiblingDB(_getEnv('DBNAME_MONGO'));
db.createCollection("test");
db.createUser({
    user: _getEnv('USERNAME_MONGO'),
    pwd: _getEnv('USERPWD_MONGO'),
    roles : [{ role: "readWrite", db: _getEnv('DBNAME_MONGO') }]
});

db.articles.insertMany(
    [
        {
            "name": "Coca Cola",
            "price": 1,
            "image": "data:image/jpg;base64,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"
        }
    ]   
)