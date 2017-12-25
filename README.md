# AWS Nodejs Development 
<a href="https://github.com/subhendukundu/AWSWithNodejs" rel="some text">![ ](https://github.com/subhendukundu/AWSWithNodejs)</a>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Prerequisites

``` NodeJS (atleast v6.6.0 or above) ```

## Installing

To get a development env running ``` npm i ``` or   ``` yarn ```

## Start the application
 ``` npm start ```

## Debug application
 ``` npm run inspect ```

## Zip application for Lambda
 ``` npm run zipit --files=FILENAMES --zipto=DISTFILENAME ```
 For example ``` npm run zipit --files=make,shared/getAllModels,services/makeServices --zipto=make ```
 will return all the files including the node_modules as getAllModels.zip

## Coding style

* Expected to follow eslint rules and fix all the linting error before adding in the repo
* ES6 syntax

## Author

* Subhendu Kundu