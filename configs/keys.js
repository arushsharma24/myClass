export default {
    mongoURI: `mongodb+srv://enola:${encodeURIComponent('Enola@123')}@enola.wyjgl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    secret: 'secret'
};
// !FIXME: instead of storing the password and secret here, store it in a better way, it is in no way a good idea to upload this file to github/heroku
