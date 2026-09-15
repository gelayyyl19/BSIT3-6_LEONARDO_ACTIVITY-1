const express = require('express');
const path = require('path');
const conn = require('./conn');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const selectQuery = "SELECT * FROM biodata";
    conn.query(selectQuery, (err, results) => {
        if (err) {
            console.error(err);
            return res.render('index', { data: [] });
        }
        res.render('index', { data: results });
    });
});

app.post('/register', (req, res) => {
    const { fn, age, gender, birth_date, address, contact, email, civil_status, education, citizenship } = req.body;

    const insert = `INSERT INTO biodata (full_name, age, gender, birth_date, address, contact_number, email, civil_status, education_level, citizenship) VALUES ('${fn}', '${age}', '${gender}', '${birth_date}', '${address}', '${contact}', '${email}', '${civil_status}', '${education}', '${citizenship}')`;

    conn.query(insert, (err) => {
        if (err) throw err;
        res.send(`
            <script>
                alert('Data inserted successfully!');
                window.location.href="/";
            </script>
        `);
    });
});

app.listen(9000, () => {
    console.log('Server running on port 9000');
});