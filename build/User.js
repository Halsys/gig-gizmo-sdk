"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _Band = require("./Band");

var _Band2 = _interopRequireDefault(_Band);

var _Venue = require("./Venue");

var _Venue2 = _interopRequireDefault(_Venue);

var _Gig = require("./Gig");

var _Gig2 = _interopRequireDefault(_Gig);

var _Post = require("./Post");

var _Post2 = _interopRequireDefault(_Post);

var _Page = require("./Page");

var _Page2 = _interopRequireDefault(_Page);

var _Location = require("./Location");

var _Location2 = _interopRequireDefault(_Location);

var _API = require("./API");

var _API2 = _interopRequireDefault(_API);

var _Upload = require("./Upload");

var _Upload2 = _interopRequireDefault(_Upload);

var _RESTModel2 = require("./RESTModel");

var _RESTModel3 = _interopRequireDefault(_RESTModel2);

var _Notification = require("./Notification");

var _Notification2 = _interopRequireDefault(_Notification);

var _TwitterAccount = require("./TwitterAccount");

var _TwitterAccount2 = _interopRequireDefault(_TwitterAccount);

var _FacebookAccount = require("./FacebookAccount");

var _FacebookAccount2 = _interopRequireDefault(_FacebookAccount);

var _Conversation = require("./Conversation");

var _Conversation2 = _interopRequireDefault(_Conversation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by corynull on 4/1/17.
 */

var User = function (_RESTModel) {
	(0, _inherits3.default)(User, _RESTModel);

	function User() {
		(0, _classCallCheck3.default)(this, User);
		return (0, _possibleConstructorReturn3.default)(this, (User.__proto__ || Object.getPrototypeOf(User)).apply(this, arguments));
	}

	(0, _createClass3.default)(User, [{
		key: "getIcon",
		value: function getIcon() {
			var icon = this.icon;

			return _Upload2.default.getUploadById(icon);
		}
	}, {
		key: "getTwitterAccount",
		value: function getTwitterAccount(token) {
			return _TwitterAccount2.default.getTwitterAccountById(this.twitter, token);
		}
	}, {
		key: "getFacebookAccount",
		value: function getFacebookAccount(token) {
			return _FacebookAccount2.default.getFacebookAccountById(this.facebook, token);
		}
	}, {
		key: "validatePassword",
		value: function validatePassword(maybePassword) {
			var regexTest = /^[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*[0-9]?(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+[0-9]+(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+[0-9]?[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*$/g;
			var password = maybePassword || "";
			var lowercasePassword = password.toLowerCase();
			var lowercaseFirstName = this.firstName.toLowerCase();
			var lowercaseLastName = this.lastName.toLowerCase();
			if (password === "") return "Password missing";else if (password.length < 8) return "Password is too short";else if (password.length > 256) return "Password is too long";else if (!regexTest.test(password)) return "Password does not have atleast one number or is contiguous";else if (lowercasePassword.indexOf(lowercaseFirstName) !== -1) return "Password cannot contain your first name";else if (lowercasePassword.indexOf(lowercaseLastName) !== -1) return "Password cannot contain your last name";

			return null;
		}
	}, {
		key: "valid",
		value: function valid() {
			if (!(0, _get3.default)(User.prototype.__proto__ || Object.getPrototypeOf(User.prototype), "valid", this).call(this)) return false;
			// Type checks
			if (typeof this.firstName !== "string") return false;
			if (typeof this.lastName !== "string") return false;
			if (typeof this.email !== "string") return false;
			// Value checks
			if (this.firstName === "") return false;
			if (this.lastName === "") return false;
			if (this.email === "") return false;
			// TODO: More validation checks?
			return true;
		}
	}, {
		key: "password",
		get: function get() {
			return this.document.password || null;
		},
		set: function set(value) {
			this.document.dateModified = Date.now();
			this.document.password = value;
		}
	}, {
		key: "confirmPassword",
		get: function get() {
			return this.document.confirmPassword || null;
		},
		set: function set(value) {
			this.document.dateModified = Date.now();
			this.document.confirmPassword = value;
		}
	}, {
		key: "icon",
		get: function get() {
			return this.document.icon || null;
		},
		set: function set(value) {
			this.document.dateModified = Date.now();
			this.document.icon = value;
		}
	}, {
		key: "active",
		set: function set(value) {
			this.document.dateModified = Date.now();
			this.document.active = value;
		},
		get: function get() {
			return this.document.active || null;
		}
	}, {
		key: "admin",
		set: function set(value) {
			this.document.dateModified = Date.now();
			this.document.admin = value;
		},
		get: function get() {
			return this.document.admin === true;
		}
	}, {
		key: "firstName",
		get: function get() {
			return this.document.firstName || null;
		},
		set: function set(value) {
			this.document.dateModified = Date.now();
			this.document.firstName = value;
		}
	}, {
		key: "middleName",
		get: function get() {
			return this.document.middleName || null;
		},
		set: function set(value) {
			this.document.dateModified = Date.now();
			this.document.middleName = value;
		}
	}, {
		key: "lastName",
		get: function get() {
			return this.document.lastName || null;
		},
		set: function set(value) {
			this.document.dateModified = Date.now();
			this.document.lastName = value;
		}
	}, {
		key: "birthday",
		get: function get() {
			return this.document.birthday || null;
		},
		set: function set(value) {
			this.document.dateModified = Date.now();
			this.document.birthday = value;
		}
	}, {
		key: "country",
		get: function get() {
			return this.document.country || null;
		},
		set: function set(value) {
			this.document.dateModified = Date.now();
			this.document.country = value;
		}
	}, {
		key: "bandManager",
		get: function get() {
			return this.document.bandManager || null;
		},
		set: function set(value) {
			this.document.dateModified = Date.now();
			this.document.bandManager = value;
		}
	}, {
		key: "venueManager",
		get: function get() {
			return this.document.venueManager || null;
		},
		set: function set(value) {
			this.document.dateModified = Date.now();
			this.document.venueManager = value;
		}
	}, {
		key: "betaFeatureUser",
		get: function get() {
			return this.document.betaFeatureUser || null;
		},
		set: function set(value) {
			this.document.dateModified = Date.now();
			this.document.betaFeatureUser = value;
		}
	}, {
		key: "sendAnonymousReports",
		get: function get() {
			return this.document.sendAnonymousReports || null;
		},
		set: function set(value) {
			this.document.dateModified = Date.now();
			this.document.sendAnonymousReports = value;
		}
	}, {
		key: "fullName",
		get: function get() {
			return this.firstName + " " + this.lastName;
		}
	}, {
		key: "email",
		get: function get() {
			return this.document.email || null;
		},
		set: function set(value) {
			this.document.email = value;
			this.document.dateModified = Date.now();
		}
	}, {
		key: "salt",
		get: function get() {
			return this.document.salt || null;
		}
	}, {
		key: "hash",
		get: function get() {
			return this.document.hash || null;
		}
	}, {
		key: "facebook",
		get: function get() {
			return this.document.facebook || null;
		},
		set: function set(value) {
			this.document.facebook = value;
			this.document.dateModified = Date.now();
		}
	}, {
		key: "twitter",
		get: function get() {
			return this.document.twitter || null;
		},
		set: function set(value) {
			this.document.twitter = value;
			this.document.dateModified = Date.now();
		}
	}, {
		key: "description",
		get: function get() {
			return this.document.description || null;
		},
		set: function set(value) {
			this.document.description = value;
			this.document.dateModified = Date.now();
		}
	}, {
		key: "verificationSecret",
		get: function get() {
			return this.document.verificationSecret || null;
		},
		set: function set(value) {
			this.document.verificationSecret = value;
			this.document.dateModified = Date.now();
		}
	}, {
		key: "emailVerified",
		get: function get() {
			return this.document.emailVerified || false;
		},
		set: function set(value) {
			this.document.emailVerified = value;
			this.document.dateModified = Date.now();
		}
	}, {
		key: "attempts",
		get: function get() {
			return this.document.attempts || 0;
		}
	}, {
		key: "lastLoginIP",
		get: function get() {
			return this.document.lastLoginIP || null;
		},
		set: function set(value) {
			this.document.lastLoginIP = value;
			this.document.dateModified = Date.now();
		}
	}, {
		key: "lastLoginDate",
		get: function get() {
			return this.document.lastLoginDate ? (0, _moment2.default)(this.document.lastLoginDate) : null;
		},
		set: function set(value) {
			this.document.lastLoginDate = (0, _moment2.default)(value).toISOString();
			this.document.dateModified = Date.now();
		}
	}], [{
		key: "sendEmailVerification",
		value: function sendEmailVerification(token) {
			return _API2.default.Call("POST", "/API/User/Verify", { token: token });
		}
	}, {
		key: "getAllConversations",
		value: function getAllConversations(token) {
			return _Conversation2.default.getAllConversations(token);
		}
	}, {
		key: "getAllNotifications",
		value: function getAllNotifications(token) {
			return _Notification2.default.getNotifications(token);
		}
	}, {
		key: "getAllPosts",
		value: function getAllPosts(token) {
			return _Post2.default.getAllPostsFromUser(token);
		}
	}, {
		key: "getAllBands",
		value: function getAllBands(token) {
			return _Band2.default.getAllBandsFromUser(token);
		}
	}, {
		key: "getAllVenues",
		value: function getAllVenues(token) {
			return _Venue2.default.getAllVenuesFromUser(token);
		}
	}, {
		key: "getAllGigs",
		value: function getAllGigs(token) {
			return _Gig2.default.getAllGigsFromUser(token);
		}
	}, {
		key: "getAllUploads",
		value: function getAllUploads(token) {
			return _Upload2.default.getAllUploads(token);
		}
	}, {
		key: "findFacebookPages",
		value: function findFacebookPages(term) {
			return new Promise(function (resolve, reject) {
				if (term === "") {
					resolve();
				} else {
					_API2.default.Call("GET", "/API/FacebookAccount/FindPages", { term: term }).then(resolve, reject);
				}
			});
		}
	}, {
		key: "search",
		value: function search(q) {
			var modelName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
			var skip = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
			var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Number.POSITIVE_INFINITY;

			return new Promise(function (resolve, reject) {
				if (q === "") {
					resolve();
				} else {
					var data = { q: q };
					if (modelName != null) data.model = modelName;

					if (skip !== 0) data.skip = skip;

					if (Number.isFinite(limit)) data.limit = limit;

					_API2.default.Call("GET", "/API/TextSearch", data).then(function (results) {
						var _ref = results || {},
						    query = _ref.query,
						    totalFound = _ref.totalFound;

						if (!query) reject(query);
						var classMap = {
							Band: _Band2.default,
							Venue: _Venue2.default,
							User: User,
							Page: _Page2.default,
							Location: _Location2.default,
							Upload: _Upload2.default
						};
						var bands = [];
						var venues = [];
						var users = [];
						var pages = [];
						var locations = [];
						var uploads = [];
						query.forEach(function (item) {
							if (item && item.ModelName) {
								var mName = item.ModelName;
								var ClassType = classMap[mName] || null;
								if (ClassType) {
									var instance = new ClassType(item);
									if (mName === "Band") bands.push(instance);else if (mName === "Venue") venues.push(instance);else if (mName === "User") users.push(instance);else if (mName === "Page") pages.push(instance);else if (mName === "Location") locations.push(instance);else if (mName === "Upload") uploads.push(instance);
								}
							}
						});
						var sorted = {
							totalFound: totalFound,
							bands: bands,
							venues: venues,
							users: users,
							pages: pages,
							locations: locations,
							uploads: uploads
						};
						resolve(sorted);
					}, reject);
				}
			});
		}
	}, {
		key: "findMany",
		value: function findMany(criteria, token) {
			return _RESTModel3.default.findMany(User, criteria, token);
		}
	}, {
		key: "findOne",
		value: function findOne(criteria, token) {
			return _RESTModel3.default.findOne(User, criteria, token);
		}
	}, {
		key: "onChange",
		value: function onChange(callback) {
			var id = Date.now();
			User.Callbacks.set(id, callback);
			return function () {
				User.Callbacks.delete(id);
			};
		}
	}, {
		key: "setUser",
		value: function setUser(data) {
			return new Promise(function (resolve, reject) {
				try {
					if ((typeof data === "undefined" ? "undefined" : (0, _typeof3.default)(data)) === "object" && data) {
						User.Current = new User(data);
						if (_API2.default.SessionStorageSupported) {
							sessionStorage.setItem("user", JSON.stringify(data));
						}

						User.Callbacks.forEach(function (callback) {
							return callback(User.Current);
						});
						resolve(User.Current);
					} else {
						User.Current = null;
						_API2.default.token = null;
						if (_API2.default.SessionStorageSupported) {
							sessionStorage.removeItem("user");
							sessionStorage.removeItem("token");
						}
						if (typeof document !== "undefined") {
							document.cookie = "";
						}
						User.Callbacks.forEach(function (callback) {
							return callback(null);
						});
						resolve(null);
					}
				} catch (e) {
					reject(e);
				}
			});
		}
	}, {
		key: "getUser",
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(force, tokenMaybe) {
				var token, user, data;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								token = tokenMaybe || _API2.default.findToken();
								user = null;
								data = null;

								if (!(!force && User.Current)) {
									_context.next = 7;
									break;
								}

								return _context.abrupt("return", User.Current);

							case 7:
								if (!_API2.default.SessionStorageSupported) {
									_context.next = 13;
									break;
								}

								/* If the user is stored in session storage. */
								data = JSON.parse(sessionStorage.getItem("user"));

								if (!data) {
									_context.next = 13;
									break;
								}

								_context.next = 12;
								return User.setUser(data);

							case 12:
								user = _context.sent;

							case 13:
								if (!(_API2.default.UseSocketIO && _API2.default.ShouldUseSocketIO)) {
									_context.next = 19;
									break;
								}

								_context.next = 16;
								return new Promise(function (resolve, reject) {
									if (token) _API2.default.GetSocket(token).then(function (socket) {
										socket.emit("GigGizmo/User/Retreive", null, resolve);
									}, reject);else resolve(null);
								});

							case 16:
								data = _context.sent;
								_context.next = 22;
								break;

							case 19:
								_context.next = 21;
								return _API2.default.Call("GET", "/API/User", { token: token });

							case 21:
								data = _context.sent;

							case 22:
								if (!data) {
									_context.next = 28;
									break;
								}

								_context.next = 25;
								return User.setUser(data);

							case 25:
								user = _context.sent;
								_context.next = 31;
								break;

							case 28:
								_context.next = 30;
								return User.setUser(null);

							case 30:
								return _context.abrupt("return", null);

							case 31:
								return _context.abrupt("return", user);

							case 32:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function getUser(_x4, _x5) {
				return _ref2.apply(this, arguments);
			}

			return getUser;
		}()
	}, {
		key: "findById",
		value: function findById(id, token) {
			return _RESTModel3.default.findById(User, id, token);
		}
	}, {
		key: "connectFacebook",
		value: function connectFacebook() {
			window.location.href = _API2.default.root + "/API/Auth/Facebook";
		}
	}, {
		key: "facebookLogIn",
		value: function facebookLogIn() {
			window.location.href = _API2.default.root + "/API/Login/Facebook";
		}
	}, {
		key: "payPalLogIn",
		value: function payPalLogIn() {
			window.location.href = _API2.default.root + "/API/Auth/PayPal";
		}
	}, {
		key: "userLogIn",
		value: function userLogIn(email, password) {
			return new Promise(function (resolve, reject) {
				function onError(error) {
					User.setUser(null).then(function () {
						reject(error);
					});
				}
				if (!email) onError(new Error("No email"));else if (!password) onError(new Error("No password"));else {
					_API2.default.Call("POST", "/API/User/SignIn", {
						email: email,
						password: password
					}).then(function (response) {
						if (response && response.user && response.token) {
							if (_API2.default.SessionStorageSupported) {
								sessionStorage.setItem("token", response.token);
							}
							_API2.default.token = response.token;
							User.setUser(response.user).then(resolve, onError);
						} else onError(new Error(JSON.stringify(response) + " returned"));
					}, onError);
				}
			});
		}
	}, {
		key: "userLogOut",
		value: function userLogOut(tokenMaybe) {
			var token = tokenMaybe || _API2.default.findToken();
			return new Promise(function (resolve, reject) {
				_API2.default.Call("POST", "/API/User/SignOut", { token: token }).then(function () {
					User.setUser(null).then(function (user) {
						if (user && user.valid()) reject(new Error(JSON.stringify(user) + " returned, failed to log out?"));else resolve(user);
					});
				}, reject);
			});
		}
	}, {
		key: "sendPasswordResetEmail",
		value: function sendPasswordResetEmail(email) {
			return _API2.default.Call("POST", "/User/Reset", { email: email });
		}
	}, {
		key: "registerUser",
		value: function registerUser(userData) {
			return new Promise(function (resolve, reject) {
				if (userData && (typeof userData === "undefined" ? "undefined" : (0, _typeof3.default)(userData)) === "object") {
					if (userData.email) {
						var re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
						if (re[Symbol.search](userData.email) !== 0) return reject(new Error("Invalid email address"));
					} else return reject(new Error("Email is required"));
					if (userData.password) {
						var symbolTest = /(?:[\0-\/:-@\[-`\{-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g;
						var numberTest = /[0-9]/g;
						var lowercasePassword = userData.password.toLowerCase();
						if (userData.password === "") return reject(new Error("Password is required"));else if (userData.password.length < 8) return reject(new Error("Password is too short"));else if (userData.password.length > 256) return reject(new Error("Password is too long"));else if (!symbolTest.test(userData.password)) return reject(new Error("Password does not contain at least one symbol"));else if (!numberTest.test(userData.password)) return reject(new Error("Password does not contain at least one number"));else if (userData.firstName && userData.firstName.length !== 0 && lowercasePassword.indexOf(userData.firstName.toLowerCase()) !== -1) return reject(new Error("Password can not contain your first name"));else if (userData.lastName && userData.lastName.length !== 0 && lowercasePassword.indexOf(userData.lastName.toLowerCase()) !== -1) return reject(new Error("Password can not contain your last name"));
					} else return reject(new Error("Password is required"));

					if (userData.firstName) {
						if (userData.firstName.length !== 0) {
							if (userData.firstName[0] === userData.firstName[0].toLowerCase()) return reject(new Error("First name is not title case"));
						} else return reject(new Error("First name is required"));
					} else return reject(new Error("First name is required"));

					if (userData.lastName) {
						if (userData.lastName.length !== 0) {
							if (userData.lastName[0] === userData.lastName[0].toLowerCase()) return reject(new Error("Last name is not title case"));
						} else return reject(new Error("Last name is required"));
					} else return reject(new Error("Last name is required"));
				} else return reject(new Error("User data is not an object"));

				return _API2.default.Call("POST", "/API/User", userData).then(function (data) {
					if (data) User.setUser(data).then(function (user) {
						resolve(user);
					}, reject);else reject(new Error(JSON.stringify(data) + " returned"));
				}, reject);
			});
		}
	}]);
	return User;
}(_RESTModel3.default);

User.ModelName = "User";
User.Current = null;
User.Callbacks = new Map();
User.agreement = null;
exports.default = User;
//# sourceMappingURL=User.js.map