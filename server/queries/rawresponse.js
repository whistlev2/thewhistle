import db from '../db';

// TODO - L - include new fields

class RawResponse {
    //TODO: Remove if not needed
    private static processJson(rows) {
        let ret = [];
        for (let i = 0; i < rows.length; i++) {
            let el = {};
            for (var key in rows[i].response_json) {
                el[key] = rows[i].response_json[key];
            }
            ret.push(el);
        }
        return ret;
    }

    //TODO: Remove if not needed
    static get(req, res) {
        db.query('SELECT response_json FROM reports ORDER BY id ASC LIMIT 1', (error, results) => {
            if (error) {
                throw error;
            }

            let ret = RawResponse.processJson(results.rows);
            res.json(ret);
        });
    }

    //TODO: Remove if not needed
    static insertResponse(data) {
        const query = 'INSERT INTO reports (response_json) VALUES($1)'
        const values = [data]
        db.query(query, values, (error, results) => {
            if (error) {
                console.error(error);
            }
        });
    }
}

export default RawResponse
