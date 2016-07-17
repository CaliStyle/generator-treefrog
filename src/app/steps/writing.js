/* eslint no-console: [0, { allow: ["log","warn", "error"] }] */
/**
 * Step 5
 * Where you write the generator specific files (routes, controllers, etc)
 */

import fs from 'fs'
import path from 'path'
import {util as Util} from '@trails/generator-util'
import chalk from 'chalk'
import falafel from 'falafel'
import merge from '../../lib/package-merge'

const TRAILS_TEMPLATE = path.dirname(require.resolve('trails/archetype'))
const TREEFROG_TEMPLATE = path.dirname(require.resolve('../../../archetype'))

const mkdirp = require('mkdirp');

const SOURCE_CONFIG = 'treefrog.js';
const DESTINATION_CONFIG_INDEX = 'config/index.js';
const DESTINATION_CONFIG = name => `config/${name}.js`;

const DESTINATION_CONFIG_MAIN = 'config/main.js';

const trailsPackage = require(path.resolve(TRAILS_TEMPLATE, 'package.json'))
const treefrogPackage = require(path.resolve(TREEFROG_TEMPLATE, 'package.json'))
let pkg = merge(trailsPackage, treefrogPackage)

export default {
  genericApi () {
    this.fs.copy(path.resolve(TRAILS_TEMPLATE, 'api/services', '**'), this.destinationPath('api/services'))
    this.fs.copy(path.resolve(TRAILS_TEMPLATE, 'api/models', '**'), this.destinationPath('api/models'))
  },
  serverDependentApi () {
    const fs = this.fs
    //copy config files
    fs.copy(path.resolve(TRAILS_TEMPLATE, 'config', '**'), this.destinationPath('config'))

    let trailpacks = this.options.trailpacks
    const server = this.answers ? this.answers['web-engine'] : null
    const orm = this.answers ? this.answers['orm-engine'] : null
    const dest = this.destinationPath()
    const PROJECT_PATH = this.destinationPath('node_modules/')
    const indexPath = path.resolve(dest, 'config', 'index.js')

    if (!trailpacks) {
      trailpacks = server == 'other' ? this.answers['web-engine-other'] : 'trailpack-' + server
      if (orm && orm != 'none') {
        trailpacks += ',' + (orm == 'other' ? this.answers['orm-engine-other'] : 'trailpack-' + orm)
        if (this.answers['footprints']) {
          trailpacks += ',' + 'trailpack-footprints'
        }
      }
    }

    trailpacks = trailpacks.replace(/,/g, ' ')

    const trailpackNames = trailpacks.split(' ')

    let trailpackRequires = ''
    trailpackNames.forEach(item => {
      trailpackRequires += item + '\'), \n    require(\''
    })

    trailpackRequires = trailpackRequires.substring(trailpackRequires.length - 18, trailpackRequires)
    const mainConfigFile = path.resolve(dest, 'config', 'main.js')

    fs.delete(mainConfigFile)//Delete main.js to generate it from template

    fs.copyTpl(path.resolve(TRAILS_TEMPLATE, 'config', 'main.js'), mainConfigFile, {trailpacks: trailpackRequires})

    let npmTrailpacks = trailpackNames.map(name => `${name}@latest`)

    if (server == 'express') {
      if (this.answers['express-version'] == '4') {
        npmTrailpacks.push('express@4')
      }
      else if (this.answers['express-version'] == '5') {
        npmTrailpacks.push('express@5.0.0-alpha.2') //Replace by express@5 when is out of alpha
      }
      else {
        npmTrailpacks.push(`express@${this.answers['express-version-other']}`)
      }
    }

    // Add Treefrog
    npmTrailpacks.push('trailpack-treefrog@latest')

    this.npmInstall(npmTrailpacks, {
      save: true,
      silent: true,
      loglevel: 'silent'
    }, (err) => {
      if (err) {
        console.log(err)
        return
      }
      trailpackNames.forEach(item => {
        let ARCH = path.resolve(PROJECT_PATH, item, 'archetype', '**')
        fs.copy(ARCH, dest)
      })

      //FIXME is there a better way for doing this ???
      fs.commit(function () {
        Util.updatedIndexesFolder(indexPath, path.resolve(dest, 'config'), ['locales'])
      }.bind(this))
    })
  },

  config() {
    
    Util.patchConflicter()

    let name = `treefrog`
    let fileName = `treefrog`
    // let packName = `trailpack-treefrog`
    let indexPath = this.destinationPath(DESTINATION_CONFIG_INDEX)

    //create template file `config/treefrog.js`
    this.template(SOURCE_CONFIG, DESTINATION_CONFIG(name), {name, fileName, answers: this.answers});

    //create or update `config/index.js`
    if (!this.fs.exists(this.destinationPath(DESTINATION_CONFIG_INDEX))) {
      return this.fs.write(this.destinationPath(DESTINATION_CONFIG_INDEX), Util.getRequireStatement(fileName))
    }

    if (Util.hasRequireStatement(fileName, this.fs.read(indexPath))) {
      this.log.identical(DESTINATION_CONFIG_INDEX);
      return
    }
    
    let indexContents = this.fs.read(indexPath)
    let updatedIndexFile = Util.getUpdatedIndexFile(fileName, indexContents)

    this.fs.write(indexPath, updatedIndexFile)

  },

  root() {
    this.fs.copy(path.resolve(TRAILS_TEMPLATE, 'index.js'), this.destinationPath('index.js'))
    this.fs.copy(path.resolve(TRAILS_TEMPLATE, 'api/index.js'), this.destinationPath('api/index.js'))
    this.fs.copy(path.resolve(TREEFROG_TEMPLATE, 'server.js'), this.destinationPath('server.js'))
  },

  // javascript
  typescript() {
    if (this.answers['javascript'] == 'typescript') {
      // console.log('Writing typescript')
    }
  },

  es6() {
    if (this.answers['javascript'] == 'es6') {
      // console.log('Writing es6')
    }
  },

  vanilla() {
    if (this.answers['javascript'] == 'vanilla') {
      // console.log('Writing vanilla')
    }
  },

  // frontend
  react() {
    if (this.answers['frontend'] == 'react') {
      // console.log('Writing react')
      // Copy Folder
      this.fs.copy(path.resolve(TREEFROG_TEMPLATE, 'lib/react/app', '**'), this.destinationPath(this.answers['srcDir']))

      // Add to Package
      const reactPackage = require(path.resolve(TREEFROG_TEMPLATE, 'lib/react/package.json'))
      pkg = merge(pkg, reactPackage)
    }
  },

  angular() {
    if (this.answers['frontend'] == 'angular') {
      if (this.answers['angular-version'] == '1'){
        // console.log('Writing angular')
        // Copy Folder
        this.fs.copy(path.resolve(TREEFROG_TEMPLATE, 'lib/angular/app', '**'), this.destinationPath(this.answers['srcDir']))

        // Add to Package
        const angularPackage = require(path.resolve(TREEFROG_TEMPLATE, 'lib/angular/package.json'))
        pkg = merge(pkg, angularPackage)
      }
      if (this.answers['angular-version'] == '2'){
        // console.log('Writing angular2')
        // Copy Folder
        this.fs.copy(path.resolve(TREEFROG_TEMPLATE, 'lib/angular2/app', '**'), this.destinationPath(this.answers['srcDir']))

        // Add to Package
        const angular2Package = require(path.resolve(TREEFROG_TEMPLATE, 'lib/angular2/package.json'))
        pkg = merge(pkg, angular2Package)
      }
    }
  },

  // style
  treefrog() {
    if (this.answers['style'] == 'treefrog') {
      // console.log('Writing treefrog')
      // Add to Package
      const treefrogPackage = require(path.resolve(TREEFROG_TEMPLATE, 'lib/treefrog/package.json'))
      pkg = merge(pkg, treefrogPackage)
    }
  },

  foundation() {
    if (this.answers['style'] == 'foundation') {
      console.log('Writing foundation')
      // Copy Folder
      // this.fs.copy(path.resolve(TREEFROG_TEMPLATE, 'lib/foundation/app', '**'), this.destinationPath(this.answers['srcDir']))

      // Add to Package
      const foundationPackage = require(path.resolve(TREEFROG_TEMPLATE, 'lib/foundation/package.json'))
      pkg = merge(pkg, foundationPackage)
    }
  },

  bootstrap() {
    if (this.answers['style'] == 'bootstrap') {
      // this.fs.copy(path.resolve(TREEFROG_TEMPLATE, 'lib/bootstrap/app', '**'), this.destinationPath(this.answers['srcDir']))

      // Add to Package
      const bootstrapPackage = require(path.resolve(TREEFROG_TEMPLATE, 'lib/bootstrap/package.json'))
      pkg = merge(pkg, bootstrapPackage)
    }
  },

  // taskmanager
  gulp() {
    if (this.answers['taskmanager'] == 'gulp') {
      // console.log('Writing gulp')
      this.fs.copy(path.resolve(TREEFROG_TEMPLATE, 'lib/gulp/gulpfile.js'), this.destinationPath('gulpfile.js'))
      
      // Add to Package
      const gulpPackage = require(path.resolve(TREEFROG_TEMPLATE, 'lib/gulp/package.json'))
      pkg = merge(pkg, gulpPackage)
    }
  },

  webpack() {
    if (this.answers['taskmanager'] == 'webpack') {
      // console.log('Writing webpack')
      // Add to Package
      const webpackPackage = require(path.resolve(TREEFROG_TEMPLATE, 'lib/webpack/package.json'))
      pkg = merge(pkg, webpackPackage)
    }
  },

  grunt() {
    if (this.answers['taskmanager'] == 'grunt') {
      // console.log('Writing grunt')
      // Add to Package
      const gruntPackage = require(path.resolve(TREEFROG_TEMPLATE, 'lib/grunt/package.json'))
      pkg = merge(pkg, gruntPackage)
    }
  },

  // Install Selected Packages
  pkg() {

    // node:app generator will merge into this
    if (!this.options['skip-install']) {
      this.fs.writeJSON(this.destinationPath('package.json'), JSON.parse(pkg))
    }
  }

};
