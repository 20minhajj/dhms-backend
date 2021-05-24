const db = require("../config/connection.config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = db.users;

