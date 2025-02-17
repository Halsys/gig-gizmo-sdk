const { expect } = require("chai");
global["socket.io-client"] = require("socket.io-client");
global.axios = require("axios");
const { Venue, User } = require("../../dist/index.js");

describe("Venue class", () => {
	it("ModelName exists", () => {
		expect(Venue.ModelName).to.equal("Venue");
	});

	describe("Constructor", () => {
		it("Empty", () => {
			const empty = new Venue();
			expect(empty.name).to.equal(undefined);
		});
	});

	describe("Validation", () => {
		it("Valid", () => {
			const venue = new Venue({
				_id: "de4e0cd7dd992d9be2f20b42",
				dateCreated: "2018-04-29T12:00:00Z",
				dateModified: "2018-04-29T12:00:00Z",
				name: "Basic",
				location: "2d9be2f20b6f504e0cd7dd99",
				description: "Something",
				owners: ["504e0cd7dd992d9be2f20b6f"],
			});
			expect(venue.isValid()).to.equal(true);
		});
		it("Missing id", () => {
			const venue = new Venue({
				dateCreated: "2018-04-29T12:00:00Z",
				dateModified: "2018-04-29T12:00:00Z",
				name: "Basic",
				location: "2d9be2f20b6f504e0cd7dd99",
				description: "Something",
				owners: ["504e0cd7dd992d9be2f20b6f"],
			});
			expect(venue.isValid()).to.equal(false);
		});
		it("Missing dateCreated", () => {
			const venue = new Venue({
				_id: "de4e0cd7dd992d9be2f20b42",
				dateModified: "2018-04-29T12:00:00Z",
				name: "Basic",
				location: "2d9be2f20b6f504e0cd7dd99",
				description: "Something",
				owners: ["504e0cd7dd992d9be2f20b6f"],
			});
			expect(venue.isValid()).to.equal(false);
		});
		it("Missing dateModified", () => {
			const venue = new Venue({
				_id: "de4e0cd7dd992d9be2f20b42",
				dateCreated: "2018-04-29T12:00:00Z",
				name: "Basic",
				location: "2d9be2f20b6f504e0cd7dd99",
				description: "Something",
				owners: ["504e0cd7dd992d9be2f20b6f"],
			});
			expect(venue.isValid()).to.equal(false);
		});
		it("Missing name", () => {
			const venue = new Venue({
				_id: "de4e0cd7dd992d9be2f20b42",
				dateCreated: "2018-04-29T12:00:00Z",
				dateModified: "2018-04-29T12:00:00Z",
				location: "2d9be2f20b6f504e0cd7dd99",
				description: "Something",
				owners: ["504e0cd7dd992d9be2f20b6f"],
			});
			expect(venue.isValid()).to.equal(false);
		});
		it("Missing location", () => {
			const venue = new Venue({
				_id: "de4e0cd7dd992d9be2f20b42",
				dateCreated: "2018-04-29T12:00:00Z",
				dateModified: "2018-04-29T12:00:00Z",
				name: "Basic",
				description: "Something",
				owners: ["504e0cd7dd992d9be2f20b6f"],
			});
			expect(venue.isValid()).to.equal(false);
		});
		it("Missing description", () => {
			const venue = new Venue({
				_id: "de4e0cd7dd992d9be2f20b42",
				dateCreated: "2018-04-29T12:00:00Z",
				dateModified: "2018-04-29T12:00:00Z",
				name: "Basic",
				location: "2d9be2f20b6f504e0cd7dd99",
				owners: ["504e0cd7dd992d9be2f20b6f"],
			});
			expect(venue.isValid()).to.equal(false);
		});
		it("Missing owners", () => {
			const venue = new Venue({
				_id: "de4e0cd7dd992d9be2f20b42",
				dateCreated: "2018-04-29T12:00:00Z",
				dateModified: "2018-04-29T12:00:00Z",
				name: "Basic",
				location: "2d9be2f20b6f504e0cd7dd99",
				description: "Something",
			});
			expect(venue.isValid()).to.equal(false);
		});
		it("No owners", () => {
			const venue = new Venue({
				_id: "de4e0cd7dd992d9be2f20b42",
				dateCreated: "2018-04-29T12:00:00Z",
				dateModified: "2018-04-29T12:00:00Z",
				name: "Basic",
				location: "2d9be2f20b6f504e0cd7dd99",
				description: "Something",
				owners: [],
			});
			expect(venue.isValid()).to.equal(false);
		});
	});

	describe("userIsOwner", () => {
		const basicUser = new User({
			_id: "504e0cd7dd992d9be2f20b6f",
			dateCreated: "2018-04-29T12:00:00Z",
			dateModified: "2018-04-29T12:00:00Z",
			firstName: "Basic",
			middleName: "F",
			lastName: "User",
			birthday: "1994-09-04T12:00:00Z",
			country: "US",
			email: "user@network.com",
		});
		const basicVenue = new Venue({
			_id: "de4e0cd7dd992d9be2f20b42",
			dateCreated: "2018-04-29T12:00:00Z",
			dateModified: "2018-04-29T12:00:00Z",
			name: "Basic",
			location: "2d9be2f20b6f504e0cd7dd99",
			description: "Something",
			owners: ["504e0cd7dd992d9be2f20b6f"],
		});
		it("valid id string argument", () =>
			expect(basicVenue.userIsOwner(basicUser.id)).to.equal(true));
		it("valid user object argument", () =>
			expect(basicVenue.userIsOwner(basicUser)).to.equal(true));
		it("pass empty string", () =>
			expect(basicVenue.userIsOwner("")).to.equal(false));
		it("pass empty object", () =>
			expect(basicVenue.userIsOwner({})).to.equal(false));
		it("pass null", () => expect(basicVenue.userIsOwner(null)).to.equal(false));
	});
});
