import db from '../db';

class SimpleSurveys {
    static store(req, res) {
        var query = req.query;
        var response = {};
        _.each(query, function(val, key) {
            var keys = key.split('_');
            var id = keys[0];
            var title = keys[1];
            if (response.hasOwnProperty(id)) {
                response['' + id].push(get_value(title, val));
            } else {
                response['' + id] = [get_value(title, val)];
            }
        });
        console.log(response);
        return res.status(200).json(query);
    }

    get_value(key, value) {
        if (value == 'on') {
            return key;
        } else {
            return value;
        }
    }
}

export default SimpleSurveys;
