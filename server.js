// ==========================================
// IMPORT MODULES
// ==========================================

const http = require("http");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");


// ==========================================
// SERVER SETTINGS
// ==========================================

const PORT = 3000;


// ==========================================
// MYSQL CONNECTION
// ==========================================

const db = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "mianshoaib@448@",

    database: "noteflow"

});


// ==========================================
// CONNECT TO MYSQL
// ==========================================

db.connect(function (error) {

    if (error) {

        console.log("MySQL connection failed:");
        console.log(error.message);

        return;
    }

    console.log("MySQL connected successfully.");

});


// ==========================================
// CREATE SERVER
// ==========================================

const server = http.createServer(function (req, res) {


    // ==========================================
    // CORS
    // ==========================================

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS"
    );

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );


    // ==========================================
    // OPTIONS REQUEST
    // ==========================================

    if (req.method === "OPTIONS") {

        res.writeHead(204);
        res.end();

        return;
    }


    // ==========================================
    // SIGNUP API
    // ==========================================

    if (
        req.url === "/api/signup" &&
        req.method === "POST"
    ) {

        let body = "";


        req.on("data", function (chunk) {

            body = body + chunk;

        });


        req.on("end", async function () {

            try {

                const userData = JSON.parse(body);


                const fullName = userData.fullName;
                const email = userData.email;
                const specialty = userData.specialty;
                const password = userData.password;


                // Check required fields
                if (
                    !fullName ||
                    !email ||
                    !specialty ||
                    !password
                ) {

                    res.writeHead(400, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        success: false,
                        message: "All fields are required."
                    }));

                    return;
                }


                // ==========================================
                // HASH PASSWORD
                // ==========================================

                const hashedPassword =
                    await bcrypt.hash(password, 10);


                // ==========================================
                // INSERT USER
                // ==========================================

                const sql = `
                    INSERT INTO users
                    (full_name, email, specialty, password)
                    VALUES (?, ?, ?, ?)
                `;


                db.query(
                    sql,
                    [
                        fullName,
                        email,
                        specialty,
                        hashedPassword
                    ],
                    function (error, result) {

                        if (error) {

                            console.log(error);


                            // Duplicate email
                            if (error.code === "ER_DUP_ENTRY") {

                                res.writeHead(409, {
                                    "Content-Type": "application/json"
                                });

                                res.end(JSON.stringify({
                                    success: false,
                                    message: "This email is already registered."
                                }));

                                return;
                            }


                            res.writeHead(500, {
                                "Content-Type": "application/json"
                            });

                            res.end(JSON.stringify({
                                success: false,
                                message: "Unable to create account."
                            }));

                            return;
                        }


                        // Signup successful
                        res.writeHead(200, {
                            "Content-Type": "application/json"
                        });

                        res.end(JSON.stringify({

                            success: true,

                            message:
                                "Account created successfully."

                        }));

                    }
                );


            } catch (error) {

                console.log(error);

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    success: false,
                    message: "Invalid request."
                }));

            }

        });

        return;
    }


    // ==========================================
    // LOGIN API
    // ==========================================

    if (
        req.url === "/api/login" &&
        req.method === "POST"
    ) {

        let body = "";


        req.on("data", function (chunk) {

            body = body + chunk;

        });


        req.on("end", async function () {

            try {

                const loginData = JSON.parse(body);


                const email = loginData.email;
                const password = loginData.password;


                // ==========================================
                // CHECK INPUT
                // ==========================================

                if (!email || !password) {

                    res.writeHead(400, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        success: false,
                        message: "Email and password are required."
                    }));

                    return;
                }


                // ==========================================
                // FIND USER
                // ==========================================

                const sql = `
                    SELECT *
                    FROM users
                    WHERE email = ?
                `;


                db.query(
                    sql,
                    [email],
                    async function (error, results) {

                        if (error) {

                            console.log(error);

                            res.writeHead(500, {
                                "Content-Type": "application/json"
                            });

                            res.end(JSON.stringify({
                                success: false,
                                message: "Database error."
                            }));

                            return;
                        }


                        // ==========================================
                        // USER NOT FOUND
                        // ==========================================

                        if (results.length === 0) {

                            res.writeHead(401, {
                                "Content-Type": "application/json"
                            });

                            res.end(JSON.stringify({
                                success: false,
                                message: "Email or password is incorrect."
                            }));

                            return;
                        }


                        // Get user
                        const user = results[0];


                        // ==========================================
                        // CHECK PASSWORD
                        // ==========================================

                        const passwordCorrect =
                            await bcrypt.compare(
                                password,
                                user.password
                            );


                        if (!passwordCorrect) {

                            res.writeHead(401, {
                                "Content-Type": "application/json"
                            });

                            res.end(JSON.stringify({
                                success: false,
                                message: "Email or password is incorrect."
                            }));

                            return;
                        }


                        // ==========================================
                        // LOGIN SUCCESS
                        // ==========================================

                        res.writeHead(200, {
                            "Content-Type": "application/json"
                        });

                        res.end(JSON.stringify({

                            success: true,

                            message: "Login successful.",

                            user: {

                                id: user.id,

                                fullName: user.full_name,

                                email: user.email,

                                specialty: user.specialty

                            }

                        }));

                    }
                );


            } catch (error) {

                console.log(error);

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    success: false,
                    message: "Invalid request."
                }));

            }

        });

        return;
    }


    // ==========================================
    // DEFAULT ROUTE
    // ==========================================

    res.writeHead(200, {
        "Content-Type": "text/plain"
    });

    res.end("NoteFlow AI Backend is running!");

});


// ==========================================
// START SERVER
// ==========================================

server.listen(
    PORT,
    "127.0.0.1",
    function () {

        console.log(
            `NoteFlow AI Backend running at http://127.0.0.1:${PORT}`
        );

    }
);