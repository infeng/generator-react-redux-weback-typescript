'use strict';
var yeoman = require('yeoman-generator');
var path = require('path');
var glob = require('glob');
var mkdirp = require('mkdirp');
var generators = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  prompting: {
    dir: function () {
      if (this.options.createDirectory !== undefined) {
        return true;
      }

      var done = this.async();
      var prompt = [{
        type: 'confirm',
        name: 'createDirectory',
        message: 'Would you like to create a new directory for your project?'
      }];

      this.prompt(prompt, function (response) {
        this.options.createDirectory = response.createDirectory;
        done();
      }.bind(this));
    },
    dirname: function () {
      if (!this.options.createDirectory || this.options.dirname) {
        return true;
      }

      var done = this.async();
      var prompt = [{
        type: 'input',
        name: 'dirname',
        message: 'Enter directory name'
      }];

      this.prompt(prompt, function (response) {
        this.options.dirname = response.dirname;
        done();
      }.bind(this));
    }
  },

  writing: {
    buildEnv: function () {

      //create directory
      if (this.options.createDirectory) {
        this.destinationRoot(this.options.dirname);
        this.appname = this.options.appname;
      }

      //shared across all generators
      this.sourceRoot(path.join(__dirname, 'templates', 'basic'));
      glob.sync('**', {cwd: this.sourceRoot()}).map(function (file) {
        this.template(file, file.replace(/^_/, ''));
      }, this);

      //basic
      this.sourceRoot(path.join(__dirname, 'templates', 'src'));
      this.template('.', 'src');
    }
  },

  install: function () {
    this.installDependencies();
  }
});
