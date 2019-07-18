import db from '../db';


class Surveys {
    static getAll(req, res) {
        db.query('SELECT * FROM surveys ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error;
            }
            req.json(results.rows);
        });
    }
}

export default Surveys;
