'use strict';

var sinon = require('sinon');
var should = require('should');
var MasternodesController = require('../lib/masternodes');

describe('Masternode', function() {
	describe('/masternodes/list', function () {
		var MNList = [{
			"vin": "f31bd0fcb34317a3db0dbf607c899d022c9e8a9d712c94c87bac953caafcf1a2-1",
			"status": "ENABLED",
			"rank": 1,
			"ip": "52.202.12.210:9999",
			"protocol": 70206,
			"payee": "Xjd6yGfWcsuDcHdECCwn3XUScLb3q3ChJK",
			"activeseconds": 14556663,
			"lastseen": 1502078628
		}];
		var node = {
			services: {
				bitcoind: {
					getMNList: sinon.stub().callsArgWith(0, null, MNList)
				}
			}
		};

		var masternodes = new MasternodesController(node);

		it('getList', function (done) {
			var req = {};
			var res = {
				jsonp: function (data) {
					data.length.should.equal(5);
					should.exist(data[0].vin);
					should.exist(data[0].status);
					should.exist(data[0].rank);
					should.exist(data[0].ip);
					should.exist(data[0].protocol);
					should.exist(data[0].payee);
					should.exist(data[0].activeseconds);
					should.exist(data[0].lastseen);
					done();
				}
			};

			masternodes.list(req, res);
		});
	});
});
