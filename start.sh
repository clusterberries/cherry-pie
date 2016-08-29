#!/bin/bash

gulp build:dev

node index.js &
gulp watch &
wait
