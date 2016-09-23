/**
 * @module Clients
 * @desc [MangoPay Users API Reference](https://docs.mangopay.com/endpoints/v2.01/clients)
 */
var _ = require('underscore');
var fs = require('fs');
var Service = require('../service');

var Client = require('../models/Client');

var Clients = Service.extend({
    /**
     * Get client by ID
     * @param {string}  clientId  Client identifier
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}        Request promise
     */
    get: function(callback, options) {
        options = this._api._getOptions(callback, options, {
            dataClass: Client
        });

        return this._api.method('clients_get', callback, options);
    },

    /**
     * Update client
     * @param client            Client to be updated
     * @param callback          Callback function
     * @param options           Request options
     * @returns {*}             Promise of the request
     */
    update: function(client,callback, options) {
        options = this._api._getOptions(callback, options, {
            data: client,
            dataClass: Client
        });

        return this._api.method('clients_update', callback, options);
    },

    /**
     * Upload client logo
     * @param {string}  logo                    Logo
     * @param {Function} callback               Callback function
     * @param {Object} options                  Request options
     * @return {Object}                         Promise of the request
     */
    uploadLogo: function(logo, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: {File: logo}
        });

        return this._api.method('clients_upload_logo', callback, options);
    },

    /**
     * Upload client logo from file
     * @param {string}  file                    File path
     * @param {Function} callback               Callback function
     * @param {Object} options                  Request options
     * @return {Object}                         Promise of the request
     */
    uploadLogoFromFile: function(file, callback, options) {
        if (!file) {
            this._api.errorHandler('File path cannot be empty');
            return;
        }

        try {
            fs.statSync(file);
        } catch (e) {
            this._api.errorHandler('File does not exist');
            return;
        }

        var logo = new Buffer(fs.readFileSync(file)).toString('base64');


        if (!logo) this._api.errorHandler('Content of the file cannot be empty');
        return this.uploadLogo(logo, callback, options);
    }
});

module.exports = Clients;